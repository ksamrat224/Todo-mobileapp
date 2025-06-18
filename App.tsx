import React from 'react';
import { ThemeProvider } from 'react-native-magnus';
import LoginScreen from './src/LoginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <ThemeProvider>
      <LoginScreen />
    </ThemeProvider>
  );
};

export default App;
