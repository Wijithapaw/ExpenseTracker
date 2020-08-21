import Reactotron from 'reactotron-react-native';

Reactotron
  //.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings {host: '192.168.1.6'}
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

//adb reverse tcp:9090 tcp:9090

if (__DEV__) {
  /* eslint-disable no-console */
  const oldConsoleLog = console.log;
  console.log = (...args) => {
    oldConsoleLog(...args);
    Reactotron.log(...args);
  };
}
