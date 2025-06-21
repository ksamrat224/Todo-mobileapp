import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-magnus'

interface CustomButtonProps {
  bg?: string;
  onPress?: () => void;
  content:string;
  loading?: boolean;
  disabled?: boolean;
  }

const CustomButton = ({bg='#f49b33',onPress,content,loading=false,disabled=false}:CustomButtonProps) => {
  return (
   <Button
    h={50}
    w="100%"
    rounded="lg"
    bg={bg}
    onPress={onPress}
    justifyContent='center'
    alignItems='center'
    loading={loading}
    disabled={disabled}
   >
    {content}
   </Button>
  )
}

export default CustomButton