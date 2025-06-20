import { SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text, Div, StatusBar } from 'react-native-magnus';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';

const LoginScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={'#154360'} barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#154360' }}>
        <Div flex={1} justifyContent="center" alignItems="center" bg="#154360">
          <Div w={'100%'} px={20} >
            <Text
              color="white"
              fontSize="4xl"
              fontWeight="bold"
              textAlign="center"
              pb="xl"
            >
              Login Page
            </Text>
            <CustomInput placeholder="Enter your email" />
            <CustomInput placeholder="Enter your password" type="password" />
            <CustomButton content="Log In" />
          </Div>
          <Div w={'100%'} flexDir='row' alignItems='center' justifyContent='center' pt={10} >
          <Text>Don't have an account?{" "}</Text>
          <TouchableOpacity>
            <Text color="red600" fontWeight="bold" textDecorLine='underline'>
              Sign Up
            </Text>
          </TouchableOpacity>
          </Div>
        </Div>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
