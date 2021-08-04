import React from 'react';

import { AuthProvider } from './auth';
import { CoursesProvider } from './courses';
import { OfflineProvider } from './offline';

// eslint-disable-next-line react/prop-types
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CoursesProvider>
      <OfflineProvider>{children}</OfflineProvider>
    </CoursesProvider>
  </AuthProvider>
);

export default AppProvider;
