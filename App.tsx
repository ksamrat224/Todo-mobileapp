import React, { useEffect } from 'react';
import { Button, ThemeProvider } from 'react-native-magnus';
import LoginScreen from './src/LoginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import CustomInput from './src/components/CustomInput';

const App = () => {
  useEffect(() => {
    if(SplashScreen && SplashScreen.hide) {
    SplashScreen.hide();
    }
  }, []);
  return (
    <ThemeProvider>
      <CustomInput/>
    </ThemeProvider>
  );
};

export default App;
