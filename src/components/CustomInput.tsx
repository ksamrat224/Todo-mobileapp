import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Icon, Input } from 'react-native-magnus';

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  type?: 'text' | 'password';
}

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  type = 'text',
  ...rest
}: CustomInputProps) => {
  const [showPassword,setShowPassword]=useState(false);
  const isPassword = type === 'password';
  const secureTextEntry = isPassword && !showPassword;
  return(
  <Input
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    h={50}
    rounded="lg"
    fontSize="lg"
    px="10"
    mb="10"
    suffix={
      isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
          name={showPassword ? 'eye' : 'eye-off'}
          fontFamily='Ionicons'
          fontSize="lg"
          color="gray800"
          />
        </TouchableOpacity>
      )
    }
  />);
};

export default CustomInput;
