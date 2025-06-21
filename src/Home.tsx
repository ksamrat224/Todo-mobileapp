import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from './components/CustomButton';
import { Div } from 'react-native-magnus';

const Home = () => {
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Welcome to Home Screen!</Text>
      <Div mt="lg" w="80%">
        <CustomButton content="Logout" onPress={handleLogout} bg="red600" />
      </Div>
    </View>
  );
};

export default Home;
