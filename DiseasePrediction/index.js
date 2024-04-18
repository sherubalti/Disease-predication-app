/**
 * @format
 */

import {AppRegistry, LogBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
LogBox.ignoreLogs(['new NativeEventEmitter']);
AppRegistry.registerComponent(appName, () => App);
