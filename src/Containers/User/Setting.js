/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  // ScrollView,
  Image,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@/Hooks";
import { userActions, makeSelectUser } from "./userSlice";
import Icon from "react-native-vector-icons/Ionicons";
import IconFeather from "react-native-vector-icons/Feather";
// import { Dialog } from '@rneui/themed';
import { listTitle, listSupport } from "./constants";
import { useToast } from "native-base";
import { Switch } from "@rneui/themed";
import Clipboard from "@react-native-clipboard/clipboard";
import EncryptedStorage from "react-native-encrypted-storage";
import FlashMessage, { showMessage } from "react-native-flash-message";

import styles from "./style";
import DisableAccount from "./components/DisableAccount";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FaceIDIcon from "./images/face-id.png";
import TouchIDIcon from "./images/touch_id.png";
import { getUniqueId } from "react-native-device-info";
import {
  loginActions,
  makeSelectLogin,
} from "@/Containers/LoginPage/loginSlice";
import analytics from "@react-native-firebase/analytics";

const Setting = () => {
  // const { t } = useTranslation();
  const { Common, Fonts, Gutters, Layout, ColorText, Colors } = useTheme();
  const dispatch = useDispatch();
  const toast = useToast();

  const userData = useSelector(makeSelectUser);
  const loginPageData = useSelector(makeSelectLogin);
  const { userInfo } = loginPageData;
  const isLogoutSuccess = userData?.isLogoutSuccess;
  const errorMessage = userData?.errorMessage;
  const isRegisterBioSuccess = userData?.isRegisterBioSuccess;

  const { userType } = userInfo || ""; // lay ra user Type

  const [visible, setVisible] = useState(false);
  const [isShowModalDisable, setIsShowModalDisable] = useState(false);
  const navigation = useNavigation();
  const [sensorAvailable, setSensorAvailable] = useState(null);
  const [isCheckedBio, setIsCheckedBio] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  // console.log('user page');
  // check  đã tồn tại key trong store chưa
  const getBiometricKeysExist = async () => {
    try {
      const { keysExist } = await rnBiometrics.biometricKeysExist();
      // console.log('keysExist', keysExist);
      return keysExist;
    } catch (error) {
      return false;
    }
  };

  const getSensorAvailableData = async () => {
    try {
      const data = await rnBiometrics.isSensorAvailable();
      setSensorAvailable(data);
    } catch (error) {}
    // console.log('data', data);
  };

  const checkDeviceMatchBio = async () => {
    try {
      const deviceId = await getUniqueId();
      const isMatch = userInfo?.biometricRegister === deviceId;
      const isExistKey = await getBiometricKeysExist();
      // dữ liệu người dùng match nhưng trên máy ko có key phải đăng ký lại
      if (isMatch && !isExistKey) {
        return setIsCheckedBio(false);
      }
      // match và có tồn tại key trên máy thì hủy đăng ký
      if (isMatch && isExistKey) {
        return setIsCheckedBio(true);
      }
      // trường hợp không match và máy đã có key thì đăng ký lại
      if (!isMatch && isExistKey) {
        return setIsCheckedBio(false);
      }
      // trường hợp ko match cũng ko có key phải đăng ký lại
      if (!isMatch && !isExistKey) {
        return setIsCheckedBio(false);
      }
    } catch (error) {
      return setIsCheckedBio(false);
    }
  };

  useEffect(() => {
    checkDeviceMatchBio();
  }, [userInfo]);

  const handleShowToast = (text) => {
    toast.closeAll();
    return toast.show({
      duration: 2000,
      placement: "top",
      description: text,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      // dispatch(userActions.cleanup())
      dispatch(loginActions.getUserInfo());
      getSensorAvailableData();
      getBiometricKeysExist();
      // dispatch(userActions.test());
      // dispatch(userActions.getAccountBalance());
    }, [])
  );

  const handleAfterLogoutSuccess = async () => {
    dispatch(userActions.cleanup());
    dispatch(loginActions.cleanup());
    await EncryptedStorage.removeItem("loginData");
    showMessage({
      message: "Logout Success",
      type: "success",
    });
    setTimeout(() => {
      // console.log('aaaa');
      navigation.navigate("LOGIN");
    }, 500);
  };

  useEffect(() => {
    if (isLogoutSuccess) {
      handleAfterLogoutSuccess();
    }
  }, [isLogoutSuccess]);

  useEffect(() => {
    if (isRegisterBioSuccess) {
      // lấy lại thông tin user sau khi đăng ký hoăc hủy faceid
      dispatch(loginActions.getUserInfo());
      dispatch(userActions.clear());
      handleShowToast("Thành công");
    }
  }, [isRegisterBioSuccess]);

  useEffect(() => {
    if (errorMessage) {
      handleShowToast(errorMessage);
      dispatch(userActions.clear());
    }
  }, [errorMessage]);

  //  Đăng xuất
  const handleLogout = () => {
    handleAfterLogoutSuccess();
    // dispatch(userActions.logout());
    // analytics().logEvent("LOGOUT", {});
    // handleCloseLogoutModal()
    setVisible(false);
  };

  // copy
  const copyToClipboard = async (text) => {
    Clipboard.setString(text);
    handleShowToast("Đã sao chép");
  };

  // Xử lí modal disableAccount
  const handleDisableAccount = () => {
    if (userInfo?.userType !== "WEBAPP") {
      setIsShowAlert(true);
    }
    setIsShowModalDisable(true);
  };

  const handleOpenConfirmLogout = () => {
    Alert.alert("Are you sure you want to log out?", "", [
      {
        text: "Cancel",
        // onPress: () => handleNavigateLogin(),
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
      },
    ]);
  };

  const handlePressLogout = () => {
    handleOpenConfirmLogout();
  };

  const getSupportedBiometryType = () => {
    if (sensorAvailable) {
      const { biometryType } = sensorAvailable;
      if (biometryType === BiometryTypes.FaceID) {
        return "FaceID";
      }
      if (biometryType === BiometryTypes.TouchID) {
        return "TouchID";
      }
      if (biometryType === BiometryTypes.Biometrics) {
        return "TouchID";
      }
    }
    return "";
  };

  // đăng ký bio
  const handleRegisterBio = async () => {
    try {
      const result = await rnBiometrics.createKeys();
      const deviceId = await getUniqueId();
      // console.log('====================================');
      // console.log('result?.publicKey', result?.publicKey);
      // console.log('====================================');
      const dataRequestBio = {
        isRegister: true,
        userName: userInfo?.username,
        biometricType: getSupportedBiometryType(),
        publicKey: result?.publicKey || "",
        deviceId, // id thiết bị
      };
      // const { signature } = await rnBiometrics.createSignature({
      //   promptMessage: 'Đăng nhập',
      //   payload: '',
      // });
      // console.log('====================================');
      // console.log('signature', signature);
      // console.log('====================================');

      // const { keysExist } = await rnBiometrics.biometricKeysExist();
      // console.log('keysExist', keysExist);

      dispatch(userActions.registerBio(dataRequestBio));
      return analytics().logEvent("REGISTER_BIOMETRIC", {
        userName: userInfo?.username,
        biometricType: getSupportedBiometryType(),
      });
    } catch (error) {
      // console.log('====================================');
      // console.log('error register', error);
      // console.log('====================================');
      return handleShowToast("Có lỗi trong quá trình thực hiện");
    }
  };

  // hủy đăng ký bio
  const handleUnRegisterBio = async () => {
    // console.log('====================================');
    // console.log('handleUnRegisterBio');
    // console.log('====================================');
    try {
      await rnBiometrics.deleteKeys();
      // if (keysDeleted) {
      const dataRequestBio = {
        isRegister: false,
        userName: userInfo?.username,
      };
      dispatch(userActions.registerBio(dataRequestBio));
      return analytics().logEvent("UN_REGISTER_BIOMETRIC", {
        userName: userInfo?.username,
      });
      // }
      // call api xóa
    } catch (error) {
      return handleShowToast("Có lỗi trong quá trình thực hiện");
    }
  };

  const handleBio = async () => {
    // debugger
    const deviceId = await getUniqueId();
    const isMatch = userInfo?.biometricRegister === deviceId;
    const isExistKey = await getBiometricKeysExist();

    // dữ liệu người dùng match nhưng trên máy ko có key phải đăng ký lại
    if (isMatch && !isExistKey) {
      return handleRegisterBio();
    }
    // match và có tồn tại key trên máy thì hủy đăng ký
    if (isMatch && isExistKey) {
      return handleUnRegisterBio();
    }
    // trường hợp không match và máy đã có key thì đăng ký lại
    if (!isMatch && isExistKey) {
      // gọi api đăng ký
      return handleRegisterBio();
    }
    // trường hợp ko match cũng ko có key phải đăng ký lại
    if (!isMatch && !isExistKey) {
      return handleRegisterBio();
    }
    // gọi api hủy đăng ký
    return handleUnRegisterBio();
  };

  const handlePromptBio = async (value) => {
    // debugger
    // check tồn tại thông tin người dùng
    if (userInfo?.username) {
      setIsCheckedBio(!isCheckedBio);
      // nhập FaceId/TouchID/Bio
      rnBiometrics
        .simplePrompt({ promptMessage: "Xác thực" })
        .then((resultObject) => {
          const { success } = resultObject;
          // xác thực thành không
          if (success) {
            // đăng ký hoặc hủy đăng ký
            return handleBio(value);
          } else {
            setIsCheckedBio(isCheckedBio);
            // người dùng hủy xác thực
            return handleShowToast("Xác thực không thành công");
          }
        })
        .catch(() => {
          return handleShowToast("Xác thực không thành công");
        });
    }
    // try {
    //   const result = await rnBiometrics.createSignature({
    //     promptMessage: 'Sign in',
    //     payload: '',
    //   });
    //   console.log('====================================');
    //   console.log('result', console.log(JSON.stringify(result)));
    //   console.log('====================================');
    // } catch (error) {
    //   console.log('====================================');
    //   console.log('error', error);
    //   console.log('====================================');
    // }
  };

  const getIconBio = () => {
    if (getSupportedBiometryType() === "FaceID") {
      return FaceIDIcon;
    }
    return TouchIDIcon;
  };

  return (
    <View style={styles.wrapper}>
      <FlashMessage position="top" />
      <View style={[styles.topBackground, { backgroundColor: Colors.black }]} />
      <Pressable
        onPress={() => navigation.goBack()}
        style={[
          Gutters.largeTMargin,
          Gutters.middleLMargin,
          styles.backButton,
          Layout.rowHCenter,
        ]}
        hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }} // expand pham vi cua button
      >
        <IconFeather
          name="chevron-left"
          size={20}
          style={{ color: Colors.white }}
        />
        <Text
          style={[
            Fonts.titleSmall,
            Gutters.middleLMargin,
            { color: Colors.white },
          ]}
        >
          Settings
        </Text>
      </Pressable>
      <View style={Gutters.regularHPadding}>
        <View
          style={[
            styles.container,
            styles.zIndex1,
            { backgroundColor: Colors.secondaryBackground },
          ]}
        >
          <View style={[styles.topElements]}>
            <Image
              source={require("@/Components/img/blankProfile.webp")}
              style={styles.avatar}
              alt="avatar"
            />
            <View style={{ overflow: "hidden" }}>
              <Text style={[ColorText.white, ColorText.fontWeight700]}>
                {userInfo?.email}
              </Text>
              <TouchableOpacity
              // onPress={() => copyToClipboard(userInfo?.username)}
              >
                <View style={styles.boxUserName}>
                  <View style={styles.userName}>
                    <Text
                      numberOfLines={1}
                      style={[
                        Gutters.tinyTMargin,
                        ColorText.fontWeight700,
                        { color: Colors.primary },
                      ]}
                    >
                      {userInfo?.name}
                    </Text>
                  </View>
                  <View style={styles.boxIconCopy}>
                    <Text
                      numberOfLines={1}
                      style={[styles.greyText, Gutters.tinyTMargin]}
                    >
                      {/* <Icon name="copy-outline" /> */}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={[Gutters.regularHPadding, Gutters.largeTMargin]}>
          <Text
            style={[
              styles.borderBottom,
              Gutters.smallBPadding,
              { color: Colors.white },
            ]}
          >
            Account
          </Text>
          {listTitle.map((item) => (
            <TouchableOpacity
              style={[
                Layout.rowHCenter,
                Layout.justifyContentBetween,
                styles.borderBottom,
                Gutters.middleVPadding,
              ]}
              onPress={() => navigation.navigate("USER", item)}
              key={item.type}
            >
              <View style={Layout.rowHCenter}>
                <IconFeather
                  name={item.icon}
                  size={20}
                  style={[styles.orangeIcon, Gutters.middleRMargin]}
                />
                <Text
                  style={[
                    ColorText.fontWeight700,
                    {
                      color: Colors.white,
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              <IconFeather
                name="chevron-right"
                size={20}
                style={{
                  color:
                    userType !== "WEBAPP" && item.type === "changePasswordModal"
                      ? "#ccc"
                      : Colors.white,
                }}
              />
            </TouchableOpacity>
          ))}
          {/* Đăng nhập với biometrics / faceId / touchId */}
          {/* {getSupportedBiometryType() && (
            <View>
              <TouchableOpacity
                // onPress={() => handlePromptBio()}
                style={[
                  Layout.rowHCenter,
                  Layout.justifyContentBetween,
                  styles.borderBottom,
                  Gutters.middleVPadding,
                ]}
              >
                <View style={{ ...Layout.rowHCenter, ...styles.boxBiometrics }}>
                  <View style={styles.boxBiometricsLeft}>
                    <Image
                      style={{ ...styles.faceId, ...Gutters.middleRMargin }}
                      source={getIconBio()}
                    />
                    <Text
                      style={[ColorText.fontWeight700, { color: Colors.text }]}
                    >
                      Đăng nhập với {getSupportedBiometryType()}
                    </Text>
                  </View>
                  <Switch
                    value={isCheckedBio}
                    onChange={(value) => handlePromptBio(value)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )} */}
          {/* Vô hiệu hoá */}
          <View>
            <TouchableOpacity
              onPress={() => {
                handleDisableAccount();
              }}
              style={[
                Layout.rowHCenter,
                Layout.justifyContentBetween,
                styles.borderBottom,
                Gutters.middleVPadding,
              ]}
            >
              <View style={Layout.rowHCenter}>
                <IconFeather
                  name="user-x"
                  size={20}
                  style={[styles.orangeIcon, Gutters.middleRMargin]}
                />
                <Text
                  style={[ColorText.fontWeight700, { color: Colors.white }]}
                >
                  Disable Account
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[Gutters.regularHPadding, Gutters.largeTMargin]}>
          <Text
            style={[
              styles.borderBottom,
              Gutters.smallBPadding,
              { color: Colors.white },
            ]}
          >
            Support information
          </Text>
          {listSupport.map((item) => (
            <TouchableOpacity
              style={[
                Layout.rowHCenter,
                Layout.justifyContentBetween,
                styles.borderBottom,
                Gutters.middleVPadding,
              ]}
              onPress={() => navigation.navigate("POLICY", item)}
              key={item.type}
            >
              <View style={Layout.rowHCenter}>
                <IconFeather
                  name={item.icon}
                  size={20}
                  style={[styles.orangeIcon, Gutters.middleRMargin]}
                />
                <Text
                  style={[ColorText.fontWeight700, { color: Colors.white }]}
                >
                  {item.title}
                </Text>
              </View>
              <IconFeather
                name="chevron-right"
                size={20}
                style={{ color: Colors.white }}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            Layout.rowHCenter,
            Gutters.regularLPadding,
            Gutters.largeTMargin,
          ]}
          onPress={() => handlePressLogout()}
        >
          <Text style={[ColorText.textPrimary, Fonts.textBold]}>Logout</Text>
          <IconFeather
            name="chevron-right"
            size={18}
            style={[styles.orangeIcon, Gutters.tinyLMargin]}
          />
        </TouchableOpacity>

        {isShowModalDisable && (
          <DisableAccount
            onOpen={isShowModalDisable}
            onClose={() => setIsShowModalDisable(false)}
            setIsShowAlert={setIsShowAlert}
            isShowAlert={isShowAlert}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Setting;
