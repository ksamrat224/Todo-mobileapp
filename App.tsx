import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'react-native-magnus';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/LoginScreen';
import SignUp from './src/SignUp';
import Home from './src/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { ActivityIndicator, View } from 'react-native';
import AddTodoScreen from './src/AddTodoScreen';
import EditTodoScreen from './src/EditTodoScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    SplashScreen?.hide?.();
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          const isExpired = decoded.exp * 1000 < Date.now();
          setInitialRoute(isExpired ? 'Login' : 'Home');
        } catch (err) {
          console.error('Token decoding error:', err);
          setInitialRoute('Login');
        }
      } else {
        setInitialRoute('Login');
      }
    };
    init();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#154360" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddTodo" component={AddTodoScreen} />
          <Stack.Screen name="EditTodo" component={EditTodoScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
