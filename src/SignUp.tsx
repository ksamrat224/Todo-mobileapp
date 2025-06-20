import { Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Text, Div, StatusBar } from 'react-native-magnus';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import { axiosInstance } from './utils/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    // Here you can add the logic to handle user registration
    console.log('User Registered:', { name, email, phone, password });
    if (!name || !email || !phone || !password) {
      Alert.alert('Please fill all fields');
      return;
    }
    try {
      const response = await axiosInstance.post('auth/register', {
        name,
        email,
        phone,
        password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      Alert.alert(
        'Registration Successful',
        'You have been registered successfully!',
      );
    } catch (error: any) {
      console.log(error?.response?.data || error.message);
      Alert.alert(
        'Registration Failed',
        error?.response?.data?.message ||
          'An error occurred during registration.',
      );
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'#154360'} barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#154360' }}>
        <Div flex={1} justifyContent="center" alignItems="center" bg="#154360">
          <Div w={'100%'} px={20}>
            <Text
              color="white"
              fontSize="4xl"
              fontWeight="bold"
              textAlign="center"
              pb="xl"
            >
              SignUp Page
            </Text>
            <CustomInput
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            <CustomInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
            <CustomInput
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
            />
            <CustomInput
              placeholder="Enter your password"
              type="password"
              value={password}
              onChangeText={setPassword}
            />
            <CustomButton content="Sign Up" onPress={registerUser} />
          </Div>

          <Div
            w={'100%'}
            flexDir="row"
            alignItems="center"
            justifyContent="center"
            pt={10}
          >
            <Text>Already a user? </Text>
            <TouchableOpacity>
              <Text color="red600" fontWeight="bold" textDecorLine="underline">
                Sign In
              </Text>
            </TouchableOpacity>
          </Div>
        </Div>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
