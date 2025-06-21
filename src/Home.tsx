import React, { useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Div, Text } from 'react-native-magnus';
import CustomButton from './components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import { axiosInstance } from './utils/axiosInterceptor';
import TodoList from './components/TodoList'; 

const Home = () => {
  const navigation = useNavigation<any>();
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/todos');
      setTodos(res.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      fetchTodos();
    } catch {
      Alert.alert('Error', 'Failed to delete todo');
    }
  };

  const editTodo = (item: any) => {
    navigation.navigate('EditTodo', { todo: item });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTodos();
    }, []),
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#154360' }}>
      <Div p="lg" row justifyContent="space-between" alignItems="center">
        <Text fontSize={22} fontWeight="bold">
          Your Todos
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddTodo')}>
          <Feather name="plus-circle" size={26} color="#51E6A6" />
        </TouchableOpacity>
      </Div>

      {!loading && todos.length === 0 && (
        <Div alignItems="center" mt="xl">
          <Text color="gray700" fontSize="lg">
            No todos found.
          </Text>
        </Div>
      )}

      {!loading && todos.length > 0 && (
        <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />
      )}

      <Div p="lg">
        <CustomButton content="Logout" onPress={logout} bg="red" />
      </Div>
    </View>
  );
};

export default Home;
