import { Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text, Div, StatusBar, Icon } from 'react-native-magnus';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { axiosInstance } from './utils/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

  React.useEffect(() => {
    rnBiometrics.isSensorAvailable().then(result => {
      if (result.available && result.biometryType !== null) {
        setIsBiometricSupported(true);
      }
    });
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Please fill all fields');
      return;
    }
    try {
      const response = await axiosInstance.post('auth/login', {
        username,
        password,
      });
      const token = response.data.token;

      await AsyncStorage.setItem('token', token);

      // Save token with biometric protection
      await keychain.setGenericPassword('biometric', token, {
        accessControl: keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
        accessible: keychain.ACCESSIBLE.WHEN_UNLOCKED,
      });

      navigation.navigate('Home');
    } catch (error: any) {
      console.log(error?.response?.data || error.message);
      Alert.alert(
        'Login Failed',
        error?.response?.data?.message || 'An error occurred during login.',
      );
    }
  };

  const handleFingerprintLogin = async () => {
    try {
      const credentials = await keychain.getGenericPassword({
        authenticationPrompt: {
          title: 'Authentication Required',
          subtitle: 'Please authenticate to log in',
          description: 'Use your fingerprint to log in',
        },
      });
      if (credentials) {
        const token = credentials.password;
        await AsyncStorage.setItem('token', token);
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'No credentials found',
          'Please log in with your username and password first.',
        );
      }
    } catch (error) {
      Alert.alert('Biometric Authentication Failed');
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
              Login Page
            </Text>
            <CustomInput
              placeholder="Enter your email or phone number"
              value={username}
              onChangeText={setUsername}
            />
            <CustomInput
              placeholder="Enter your password"
              type="password"
              value={password}
              onChangeText={setPassword}
            />
            <CustomButton content="Log In" onPress={handleLogin} />
            {isBiometricSupported && (
              <Div mt="xl" alignItems="center">
                <TouchableOpacity
                  onPress={handleFingerprintLogin}
                  activeOpacity={0.7}
                >
                  <Div row alignItems="center">
                    <Icon
                      name="fingerprint"
                      fontFamily="MaterialIcons"
                      fontSize="2xl"
                      color="white"
                      mr={10}
                    />
                    <Text color="white" fontSize="lg">
                      Login with Fingerprint
                    </Text>
                  </Div>
                </TouchableOpacity>
              </Div>
            )}
          </Div>
          <Div
            w={'100%'}
            flexDir="row"
            alignItems="center"
            justifyContent="center"
            pt={10}
          >
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text color="red600" fontWeight="bold" textDecorLine="underline">
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
