import { SafeAreaView } from 'react-native';
import React from 'react';
import { Text, Div, StatusBar } from 'react-native-magnus';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';

const LoginScreen = () => {
 
  return (
    <>
   <StatusBar backgroundColor={'#154360'} barStyle="light-content"/>
    <SafeAreaView>
      <Div>
        <Div>
          <Text color='white' fontSize="4xl" fontWeight="bold" textAlign="center" mt="5">
            Login Page
          </Text>
          <CustomInput placeholder='Enter your email'/>
          <CustomInput
            placeholder='Enter your password'
            type='password'
          />
          <CustomButton content='Log In'/>
        </Div>

      </Div>
    </SafeAreaView>
    </>
      
  );
};

export default LoginScreen;
