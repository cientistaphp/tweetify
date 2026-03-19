import 'react-native-gesture-handler';

import React from 'react';
import { LogBox } from 'react-native';

import Routes from './routes';

// Ignorar warnings específicos (equivalente ao YellowBox)
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Inrecognized WebSocket',
]);

export default function App() {
  return <Routes />;
}

