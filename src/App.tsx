import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from './global/globalStyles';

import AppRoutes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#6548A3" translucent />
    <SafeAreaView style={globalStyles.droidSafeArea}>
      <AppProvider>
        <View style={{ backgroundColor: '#6548A3', flex: 1 }}>
          <AppRoutes />
        </View>
      </AppProvider>
    </SafeAreaView>
  </NavigationContainer>
);

export default App;
