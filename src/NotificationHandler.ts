import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { navigate } from './NavigationService';
import { Alert } from 'react-native';

const NotificationHandler = () => {
  useEffect(() => {
    // Handle foreground notification
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log(' Foreground Message:', remoteMessage);
      const { screen, chatId } = remoteMessage.data || {};
      if (screen === 'Chat') {
        Alert.alert(
          remoteMessage.notification?.title || 'New Chat',
          remoteMessage.notification?.body || '',
          [
            {
              text: 'Open Chat',
              onPress: () => navigate('Chat', { chatId }),
            },
            { text: 'Dismiss', style: 'cancel' },
          ]
        );
      }
    });

    // Handle background tap
    const unsubscribeOpened = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(' Background Open:', remoteMessage);
      const { screen, chatId } = remoteMessage?.data || {};
      if (screen === 'Chat') {
        navigate('Chat', { chatId });
      }
    });

    // Handle quit state open
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(' Quit Open:', remoteMessage);
        const { screen, chatId } = remoteMessage?.data || {};
        if (screen === 'Chat') {
          navigate('Chat', { chatId });
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOpened();
    };
  }, []);

  return null;
};

export default NotificationHandler;
