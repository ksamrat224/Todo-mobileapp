// EditTodoScreen.tsx
import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Div, Text } from 'react-native-magnus';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import { axiosInstance } from './utils/axiosInterceptor';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditTodoScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const todo = route.params?.todo;

  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!todo) {
      Alert.alert('Error', 'No todo data provided');
      navigation.goBack();
    }
  }, [todo]);

  const updateTodo = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title is required');
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.patch(`/todos/${todo.id}`, { title, description });
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F0F4F8' }}
    >
      <Div p="lg" flex={1}>
        <Text fontSize={22} fontWeight="bold" mb="lg">
          Edit Todo
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
        <CustomButton
          content="Update Todo"
          onPress={updateTodo}
          loading={loading}
        />
      </Div>
    </KeyboardAvoidingView>
  );
};

export default EditTodoScreen;