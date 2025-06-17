import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert, View, Text } from 'react-native';

export default function App() {
  useEffect(() => {
    const getToken = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      }
    };

    getToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Foreground Notification', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>FCM Setup Done ✅</Text>
    </View>
  );
}
