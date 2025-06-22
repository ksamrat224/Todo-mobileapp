import { Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text, Div, StatusBar } from 'react-native-magnus';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { axiosInstance } from './utils/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrices from 'react-native-biometrics';

const rnBiometrices = new ReactNativeBiometrices();

const LoginScreen = () => {
 const navigation = useNavigation<any>();
  const[password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

  React.useEffect(()=>{
    rnBiometrices.isSensorAvailable().then(resultObject => {
      if(resultObject.available && resultObject.biometryType !== null){
        setIsBiometricSupported(true);
      }
  });
  }, []);
 
  const handleLogin =async () => {
    if (!username || !password) {
      Alert.alert('Please fill all fields');
      return;
    }
    try {
      const response = await axiosInstance.post('auth/login', {
        username,
        password,
      });
      console.log('Login Response:', response.data);
      const token = response.data.token;
     
      await AsyncStorage.setItem('token', token);
      navigation.navigate('Home');
    } catch (error: any) {
      console.log(error?.response?.data || error.message);
      Alert.alert(
        'Login Failed',
        error?.response?.data?.message ||
          'An error occurred during login.',
      );
    }
  }

  return (
    <>
      <StatusBar backgroundColor={'#154360'} barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#154360' }}>
        <Div flex={1} justifyContent="center" alignItems="center" bg="#154360">
          <Div w={'100%'} px={20} >
            <Text
              color="white"
              fontSize="4xl"
              fontWeight="bold"
              textAlign="center"
              pb="xl"
            >
              Login Page
            </Text>
            <CustomInput 
            placeholder="Enter your email or phone number" 
            value={username}
            onChangeText={setUsername}
            />
            <CustomInput placeholder="Enter your password" type="password" 
            value={password}
            onChangeText={setPassword}
            />
            <CustomButton content="Log In"  onPress={handleLogin}/>
          </Div>
          <Div w={'100%'} flexDir='row' alignItems='center' justifyContent='center' pt={10} >
          <Text>Don't have an account?{" "}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text color="red600" fontWeight="bold" textDecorLine='underline'>
              Sign Up
            </Text>
          </TouchableOpacity>
          </Div>
        </Div>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
