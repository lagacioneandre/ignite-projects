import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';
import { tagUserEmailCreate } from './src/notifications/notificationsTag';
import { useEffect } from 'react';

OneSignal.initialize('0ac78edc-dd59-4e99-9bba-652f5b46a215');
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  tagUserEmailCreate('email@mail.com');

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result;
    };
    OneSignal.Notifications.addEventListener('click', handleNotificationClick);
    return () => OneSignal.Notifications.removeEventListener('click', handleNotificationClick);
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}