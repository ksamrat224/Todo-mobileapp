import React from 'react';
import { View, Text } from 'react-native';

export default function ChatScreen({ route }: any) {
  const { chatId } = route.params;

  return (
    <View>
      <Text>Welcome to chat #{chatId}</Text>
    </View>
  );
}
