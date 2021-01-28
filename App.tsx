/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';

import AppRoutes from './src/navigation';
import { GlobalContextProvider } from './src/store/GlobalContext';
import ThemeProvider from './src/theme/ThemeProvider';

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

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
