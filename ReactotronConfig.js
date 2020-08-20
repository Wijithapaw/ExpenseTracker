import Reactotron from 'reactotron-react-native';

Reactotron
  //.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

if (__DEV__) {
  /* eslint-disable no-console */
  const oldConsoleLog = console.log;
  console.log = (...args) => {
    oldConsoleLog(...args);
    Reactotron.log(...args);
  };
}
