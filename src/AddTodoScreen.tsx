import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Div, Text } from 'react-native-magnus';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import { axiosInstance } from './utils/axiosInterceptor';
import { useNavigation } from '@react-navigation/native';

const AddTodoScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation<any>();

  const addTodo = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title is required');
      return;
    }
    try {
      await axiosInstance.post('/todos', {
        title,
        description,
      });
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Failed to add todo');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F0F4F8' }}
    >
      <Div p="lg" flex={1}>
        <Text fontSize={22} fontWeight="bold" mb="lg">
          Add New Todo
        </Text>
        <CustomInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <CustomInput
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
        />
        <CustomButton content="Save Todo" onPress={addTodo} />
      </Div>
    </KeyboardAvoidingView>
  );
};

export default AddTodoScreen;