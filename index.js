/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

// Kiểm tra xem ứng dụng đang chạy trong chế độ headless hay không

// // function xử lý hiển thị notification
const onMessageReceived = async (remoteMessage) => notifee.displayNotification(remoteMessage?.notification);

// // // lắng nghe thông báo
messaging().setBackgroundMessageHandler(onMessageReceived);

// // // Check if app was launched in the background and conditionally render null if so
const HeadlessCheck = ({ isHeadless }) => {
    // console.log('isHeadlessssssssssssssssssssssssss', isHeadless);
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }
    // Render the app component on foreground launch
    return <App />;
};

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, (data) => HeadlessCheck);
