import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import globalStyles from './global/globalStyles';

import Home from './pages/home';

const App: React.FC = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#6548A3" translucent />
    <SafeAreaView style={globalStyles.droidSafeArea}>
      <View style={{ backgroundColor: '#6548A3', flex: 1 }}>
        <Home />
      </View>
    </SafeAreaView>
  </>
);

export default App;
