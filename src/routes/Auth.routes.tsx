import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInPage from '../pages/SignIn';

const App = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#6548A3' },
    }}
  >
    <App.Screen name="Sign" component={SignInPage} />
  </App.Navigator>
);

export default AuthRoutes;
