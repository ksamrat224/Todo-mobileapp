import React, { useEffect } from 'react';
import { ThemeProvider } from 'react-native-magnus';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/LoginScreen';
import SignUp from './src/SignUp';
import Home from './src/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    if (SplashScreen && SplashScreen.hide) {
      SplashScreen.hide();
    }
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
