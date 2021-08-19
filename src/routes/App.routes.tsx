import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home/index';
import Lessons from '../pages/Lessons';
import SavedCourses from '../pages/SavedCourses';
import Lesson from '../pages/Lesson';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#6548A3' },
    }}
  >
    <App.Screen name="Home" component={Home} />
    <App.Screen name="Lessons" component={Lessons} />
    <App.Screen name="Lesson" component={Lesson} />
    <App.Screen name="SavedCourses" component={SavedCourses} />
  </App.Navigator>
);

export default AppRoutes;
