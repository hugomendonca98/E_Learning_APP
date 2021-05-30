import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import MyCourses from '../pages/MyCourses';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#6548A3' },
    }}
  >
    <App.Screen name="Home" component={Home} />
    <App.Screen name="MyCourses" component={MyCourses} />
  </App.Navigator>
);

export default AppRoutes;
