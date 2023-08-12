/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { StartupContainer } from "@/Containers";
import { useTheme } from "@/Hooks";
import MainNavigator from "./Main";
import { navigationRef } from "./utils";
// import { makeSelectGlobal } from './globalSlice';
import {
  loginActions,
  makeSelectLogin,
} from "@/Containers/LoginPage/loginSlice";
import routes from "@/routes";
import { isLogin } from "./utils";
import Start from "@/Containers/StartApp/index";
import eventEmitter from "@/utils/eventEmitter";
import { navigate } from "@/Navigators/utils.js";
import { useToast } from "native-base";
import crashlytics from "@react-native-firebase/crashlytics";
import analytics from "@react-native-firebase/analytics";

const Stack = createStackNavigator();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const routeNameRef = React.useRef();
  const dispatch = useDispatch();
  const { colors } = NavigationTheme;
  const loginPageData = useSelector(makeSelectLogin);
  const { loginData } = loginPageData;
  const toast = useToast();

  // const handleSetAttrCrashlytics = async (data) => {
  //   if (data) {
  //     return crashlytics().setAttributes({
  //       ...data,
  //       ...deviceInfo,
  //     });
  //   }
  //   return crashlytics().setAttributes({
  //     ...deviceInfo,
  //   });
  // };

  const getLoginData = async () => {
    const data = await isLogin();
    if (data.access_token) {
      // console.log('dispatch(loginActions.loginSuccess(data))');
      dispatch(loginActions.loginSuccess(data));
    }
  };

  // const getStepActiveData = async () => {
  //   const data = await getStepActive();
  //   if(data) {
  //     // console.log(data)
  //     dispatch(loginActions.getStepActiveSuccess(data))
  //   }
  // }

  useEffect(() => {
    getLoginData();
    crashlytics().log("Khởi động app");
    crashlytics().setCrashlyticsCollectionEnabled(true);
    // getStepActiveData()
  }, []);

  // useEffect(() => {
  //   if(stepActive.id){
  //     handleSetAttrCrashlytics(stepActive);
  //   }
  // }, [stepActive])

  useEffect(() => {
    // Đăng ký lắng nghe sự kiện
    eventEmitter.on("reset", () => {
      dispatch(loginActions.cleanup());
      toast.closeAll();
      toast.show({
        duration: 2000,
        placement: "top",
        description: "Phiên đăng nhập đã hết hạn",
      });
    });
    // Gửi sự kiện
    // eventEmitter.emit('eventName', 'Hello, world!');
    return () => eventEmitter.removeListener("reset");
  }, []);

  useEffect(() => {
    if (!loginData) {
      navigate("Start");
    }
  }, [loginData]);

  const isDisableBack = (name) => {
    return (
      name === "LOGIN" ||
      name === "UPDATE_INFO_ACCOUNT" ||
      name === "ACTIVE_ACCOUNT"
    );
  };

  const handleUpdateCurrentViewToFireBase = async () => {
    const previousRouteName = routeNameRef.current; // lưu name của màn hiện tại
    // console.log('previousRouteName', previousRouteName);
    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name; // set tên cho màn chuẩn bị chueyenr sang
    // console.log('currentRouteName', currentRouteName);
    routeNameRef.current = currentRouteName;
    if (previousRouteName !== currentRouteName) {
      // nếu chuyển màn sẽ gọi để lưu lại thông tin
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
        screen_data: navigationRef?.current?.getCurrentRoute()?.params,
      });
    }
  };

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer
        theme={NavigationTheme}
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current =
            navigationRef?.current?.getCurrentRoute()?.name;
        }}
        onStateChange={() => handleUpdateCurrentViewToFireBase()}
      >
        <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          {!loginData.access_token && (
            <Stack.Screen name="Start" component={Start} />
          )}
          <Stack.Screen name="Main" component={MainNavigator} />
          {routes
            .filter((item) => !item.isShowBottom)
            .map((item) => (
              <Stack.Screen
                name={item.name}
                key={item.name}
                navigationKey={item.name}
                path={item.path}
                component={item.component}
                options={{
                  gestureEnabled: isDisableBack(item.name) ? false : true, // chặn back lại từ màn đăng nhập
                }}
                initialParams={
                  item.name === "LOGIN" ? { type: "FROM_START" } : null
                }
              />
            ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default memo(ApplicationNavigator);
