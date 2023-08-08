import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { NativeBaseProvider } from 'native-base';
import { LogBox } from 'react-native';
import { store, persistor } from '@/Store';
import ApplicationNavigator from '@/Navigators/Application';
import './Translations';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { Settings } from 'react-native-fbsdk-next';
import messaging from '@react-native-firebase/messaging';
// import { googleLoginConfig } from '@/utils/constants';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
// import { LoginManager } from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import EncryptedStorage from 'react-native-encrypted-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Settings.setAppID('1373344543455420');

// config cho google login
// GoogleSignin.configure(googleLoginConfig);

const theme = createTheme({
  components: {
    Button: {
      titleStyle: {
        color: 'red',
      },
    },
  },
  mode: 'light',
});
//  chỉ mở comment khi build lên máy
LogBox.ignoreAllLogs(true);

const queryClient = new QueryClient()

const App = () => {

  async function onMessageReceived(message) {
    await notifee.displayNotification(message?.notification);
  }

  const getTokenFCM = async () => {
    try {
      const localFCMToken = await AsyncStorage.getItem('fcmToken');
      // console.log('localFCMTokennnnnnnnnnnnnnnnnnn = ', localFCMToken);
      if (!localFCMToken) {
        // đăng ký thiết bị
        await messaging().registerDeviceForRemoteMessages();
        // generate token mới
        const newFCMToken = await messaging().getToken();
        // console.log('newFCMTokennnnnnnnnnnnnnnnnnn = ', newFCMToken);
        if (newFCMToken) {
          // call api lưu token và lưu token vào storage
          await AsyncStorage.setItem('fcmToken', newFCMToken);
        }
      }
    } catch (error) {
      // console.log('error', error);
      crashlytics().log('getTokenFCM Error');
    }
  };

  const registerMessaging = async () => {
    setTimeout(async () => {
      try {
        // cin quyền thông báo
        const permission = await notifee.requestPermission();
        // // từ chối
        if (permission.authorizationStatus === AuthorizationStatus.DENIED) {
          // đồng ý
        } else if (permission.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
          getTokenFCM();
          // tạm thời đồng ý
        } else if (permission.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
          // console.log('User provisionally granted permissions request');
        }
      } catch (error) {
        crashlytics().log('registerMessaging Error');
        // console.log('registerMessaging errror', error);
      }
    }, 5000);
    messaging().onMessage(onMessageReceived);
  };

  useEffect(() => {
    registerMessaging();
    // LoginManager.logOut();
    // AsyncStorage.clear();
    // EncryptedStorage.clear();
    analytics().logAppOpen(); // khai báo chạy app cho firebase
    // analytics().setAnalyticsCollectionEnabled(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      analytics().logEvent('CLOSE_APP' , {});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <NativeBaseProvider>
            <ApplicationNavigator />
          </NativeBaseProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
    </QueryClientProvider>
  );
};

export default App;
