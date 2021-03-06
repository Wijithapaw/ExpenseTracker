/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import AppRoutes from './src/navigation';
import { GlobalContextProvider } from './src/store/GlobalContext';
import ThemeProvider from './src/theme/ThemeProvider';

function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <GlobalContextProvider>
          <AppRoutes />
        </GlobalContextProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
