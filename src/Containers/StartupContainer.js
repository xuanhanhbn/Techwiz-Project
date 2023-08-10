import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { setDefaultTheme } from "@/Store/Theme";
import { navigateAndSimpleReset } from "@/Navigators/utils";

import { useDispatch, useSelector } from "react-redux";
import {
  makeSelectLogin,
  loginActions,
} from "@/Containers/LoginPage/loginSlice";
import { getApi } from "@/Containers/User/api";
import LinearGradient from "react-native-linear-gradient";
import Logo from "@/Assets/Images/Logo.png";
import EncryptedStorage from "react-native-encrypted-storage";
import crashlytics from "@react-native-firebase/crashlytics";

const StartupContainer = () => {
  // const { Layout, Gutters, Fonts } = useTheme();
  const loginPageData = useSelector(makeSelectLogin);
  const dispatch = useDispatch();
  const { loginData } = loginPageData;

  const handleRedirect = (stepActive) => {
    if (loginData.access_token) {
      if (stepActive === "0") {
        return "UPDATE_INFO_ACCOUNT";
      }
      if (stepActive === "1") {
        return "ACTIVE_ACCOUNT";
      }
      if (stepActive === "2") {
        return "Main";
      }
    }
    return "Start";
  };

  const init = async (stepActive) => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 2000)
    );
    await setDefaultTheme({ theme: "default", darkMode: null });
    // navigateAndSimpleReset(!loginData.access_token ? 'Start' : 'Main')
    navigateAndSimpleReset(handleRedirect(stepActive));
  };

  // const getObjectDeviceInfo = async () => {
  //   // Lấy tên thiết bị
  //   const deviceName = await getDeviceName();

  //   // Lấy phiên bản hệ điều hành
  //   const osVersion = await getSystemVersion();

  //   // Lấy tên hãng sản xuất thiết bị
  //   const manufacturer = await getManufacturer();

  //   // Lấy loại thiết bị (điện thoại, máy tính bảng, ...)
  //   const deviceType = await getDeviceType();

  //   // lấy id thiết bị
  //   const deviceId = await getUniqueId();

  //   return {
  //     deviceName,
  //     osVersion,
  //     manufacturer,
  //     deviceType,
  //     deviceId,
  //   };
  // };

  const handleSetAttrCrashlytics = async (data) => {
    if (data) {
      return crashlytics().setAttributes("userData", data || {});
    }
  };

  const handleGetMeError = async () => {
    try {
      await EncryptedStorage.removeItem("loginData");
      dispatch(loginActions.cleanup());
    } catch (error) {
      dispatch(loginActions.cleanup());
    }
  };

  const handleGetMe = async () => {
    // console.log('handlegetme');
    try {
      const url = "users/me";
      const res = await getApi(url);
      // debugger
      if (
        res?.status === 200 &&
        res?.data?.status === 1 &&
        res?.data?.stepActive
      ) {
        dispatch(loginActions.getUserInfoSuccess(res.data));
        init(res.data.stepActive);
        handleSetAttrCrashlytics(res.data);
        // Chuyển đối tượng thành chuỗi JSON
        const jsonUser = JSON.stringify(res.data);
        // Lưu trữ dữ liệu nhạy cảm vào Keychain
        await EncryptedStorage.setItem("userInfo", jsonUser);
      } else {
        // trường hợp lấy thông tin người dùng thất bại sẽ xóa login data trong storage và store
        handleGetMeError();
        // handleSetAttrCrashlytics();
      }
    } catch (error) {
      // trường hợp lấy thông tin người dùng thất bại sẽ xóa login data trong storage và store
      handleGetMeError();
      // handleSetAttrCrashlytics();
    }
  };

  const handleInit = async () => {
    // debugger;
    try {
      // thường xử lý khi chưa có dữ liệu login hoặc dữ liệu login lỗi khi call /me(clear dữ liệu của loginData của store sẽ chạy vào đây)
      const loginDataStorage =
        (await EncryptedStorage.getItem("loginData")) || "{}";

      // nếu cả storage và trong store không có thì mới call init
      const data = JSON.parse(loginDataStorage);

      if (!data?.access_token) {
        init();
      }
    } catch (error) {
      init();
    }
  };

  useEffect(() => {
    // khi login data từ store thay đổi sẽ chạy vào đây
    if (loginData.access_token) {
      handleGetMe();
    } else {
      handleInit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#d64040", "#d64050"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        // locations={[0, 0.5, 1]}
        style={styles.boxLoading}
      >
        <Image source={Logo} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxLoading: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default StartupContainer;
