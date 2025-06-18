import React from 'react';
import { ThemeProvider } from 'react-native-magnus';
import LoginScreen from './src/LoginScreen';

const App = () => {
  return (
    <ThemeProvider>
      <LoginScreen />
    </ThemeProvider>
  );
};

export default App;
