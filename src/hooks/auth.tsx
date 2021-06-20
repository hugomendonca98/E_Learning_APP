import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
  loading: boolean;
}

interface AuthState {
  token: string;
  user: User;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  // VERIFICA SE EXISTE UM TOKEN NO LOCAL STORAGED.
  useEffect(() => {
    async function loadStoragedDate(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@ELearning:token',
        '@ELearning:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }
    loadStoragedDate();
  }, []);

  // HOOK DE LOGIN/AUTH
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  // HOOK DE LOGOUT.
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@ELearning:token', '@ELearning:user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@ELearning:token', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
