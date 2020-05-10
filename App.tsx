/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './src/navigation';

function App() {
  return (
    <NavigationContainer >
      <AppRoutes/>
    </NavigationContainer>
  );
}


export default App;
