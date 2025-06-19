import { ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Text, Button, Div, Input, Icon } from 'react-native-magnus';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleLogin = () => {
    console.log('Login pressed');
    console.log('Email:', email);
    console.log('Password:', password);
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Div
        bg="white"
        flex={1}
        p="xl"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="4xl" fontWeight="bold" mb="lg">
          Login
        </Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          w="100%"
          mb="md"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder="password"
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          secureTextEntry={!showPassword}
          w="100%"
          mb="lg"
          p="md"
          borderWidth={1}
          rounded="md"
          suffix={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                fontFamily="Feather"
                fontSize="xl"
                color="gray600"
              />
            </TouchableOpacity>
          }
        />

        <Button block bg="blue600" onPress={handleLogin}>
          Login
        </Button>
        <Div row justifyContent="center" mt="lg">
          <Text mr="sm">Don't have an account?</Text>
          <TouchableOpacity onPress={() => console.log('Navigate to Sign Up')}>
            <Text color="blue600" fontWeight="bold" style={{ textDecorationLine: 'underline' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          </Div>
      </Div>
    </ScrollView>
  );
};

export default LoginScreen;
