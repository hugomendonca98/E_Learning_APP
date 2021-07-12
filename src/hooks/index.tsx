import React from 'react';

import { AuthProvider } from './auth';
import { CoursesProvider } from './courses';

// eslint-disable-next-line react/prop-types
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CoursesProvider>{children}</CoursesProvider>
  </AuthProvider>
);

export default AppProvider;
