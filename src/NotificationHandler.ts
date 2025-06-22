import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { navigate } from './NavigationService';

const NotificationHandler = () => {
  useEffect(() => {
  const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
    const screen = remoteMessage?.data?.screen;
    if (typeof screen === 'string') {
      navigate(screen, remoteMessage.data);
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        const screen = remoteMessage.data?.screen;
        if (typeof screen === 'string') {
          navigate(screen, remoteMessage.data);
        }
      }
    });

  return unsubscribe;
}, []);


  return null;
};

export default NotificationHandler;
