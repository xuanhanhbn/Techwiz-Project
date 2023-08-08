/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Image,
  Platform,
} from "react-native";
// import { useToast } from 'native-base';
import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from 'react-i18next';
import { useTheme } from "@/Hooks";
import { useForm, Controller } from "react-hook-form";
import IconFeather from "react-native-vector-icons/Feather";
import IconIonic from "react-native-vector-icons/Ionicons";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginActions, makeSelectLogin } from "../loginSlice";
import { loginSchema } from "../constants";
import styles from "../style";
import { useNavigation } from "@react-navigation/native";
import FaceIDIcon from "../images/face-id.png";
import TouchIDIcon from "../images/touch_id.png";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
// import FlashMessage, { showMessage } from 'react-native-flash-message';
import EncryptedStorage from "react-native-encrypted-storage";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
// import { getUniqueId } from 'react-native-device-info';
// import * as Keychain from 'react-native-keychain';
// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import analytics from "@react-native-firebase/analytics";
// import notifee from '@notifee/react-native';

const LoginModal = (props) => {
  // const { t } = useTranslation();
  const { Colors, Gutters } = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    // defaultValues: {
    //   username: "",
    //   password: "",
    // },
    resolver: yupResolver(loginSchema),
  });
  const dispatch = useDispatch();
  // const toast = useToast();
  const navigation = useNavigation();
  const loginData = useSelector(makeSelectLogin);
  const { isLoading } = loginData;
  const {
    handleShowModal,
    showMessage,
    loginMutateFunction,
    loginWithBiometricsFunction,
    loginWithFaceBookFunction,
    loginWithAppleFunction,
    loginWithGoogleFunction,
  } = props;
  const { width } = Dimensions.get("window");
  // console.log('loginData login modal', loginData);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [sensorAvailable, setSensorAvailable] = useState(null);
  const [lastUserLogin, setLastUserLogin] = useState(null);
  const [isOpenFacebook, setIsOpenFacebook] = useState(false);
  const [isOpenGoogle, setIsOpenGoogle] = useState(false);
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  // const removePrevKeyBiometric = async () => {

  // };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("username", data.username.trim());
    formData.append("password", data.password);
    formData.append("grant_type", "password");
    formData.append("scope", "read");
    loginMutateFunction.mutate(formData);
    analytics().logLogin({ method: "Manual" });
  };

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
      // console.log('getSensorAvailableData', data);
      setSensorAvailable(data);
    } catch (error) {}
    // console.log('data', data);
  };

  const checkSensitiveData = async () => {
    try {
      // Kiểm tra xem đã có dữ liệu nhạy cảm được lưu trữ hay chưa
      const data = await EncryptedStorage.getItem("userInfo");
      const user = JSON.parse(data);
      if (user && user?.stepActive === "2") {
        setLastUserLogin(user);
        setValue("username", user?.username);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    // dispatch(loginActions.cleanup());
    // getDevice();

    getSensorAvailableData();
    getBiometricKeysExist();
    checkSensitiveData();
    reset();
  }, []);

  const handleRedirectMain = () => navigation.navigate("Main");

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

  const getIconBio = () => {
    if (getSupportedBiometryType() === "FaceID") {
      return FaceIDIcon;
    }
    return TouchIDIcon;
  };

  const handleLoginWithBiometric = async () => {
    // debugger;
    try {
      const isExist = await getBiometricKeysExist();
      if (isExist) {
        const { success, signature } = await rnBiometrics.createSignature({
          promptMessage: "Đăng nhập",
          payload: "",
        });
        if (success) {
          const formData = new FormData();
          formData.append("username", lastUserLogin?.username);
          formData.append("password", signature);
          formData.append("grant_type", "password");
          formData.append("scope", "read");
          loginWithBiometricsFunction(formData);
          return analytics().logLogin({ method: "Biometric" });
        }
        return showMessage({
          message: "Xác thực không thành công",
          type: "danger",
        });
      }
      return showMessage({
        message: "Vui đăng nhập và đăng ký sử dụng tính năng này",
        type: "warning",
      });
    } catch (error) {
      return showMessage({
        message: "Có lỗi xảy ra trong quá trình thực hiện",
        type: "danger",
      });
    }
  };

  const handleRemoveLastLogin = () => {
    setLastUserLogin(null);
    setValue("username", "");
    dispatch(loginActions.cleanup());
  };

  const loginWithSocial = (data, type, displayName) => {
    const formData = new FormData();
    formData.append("username", type);
    formData.append(
      "password",
      type === "Apple" ? data.identityToken : data.accessToken
    );
    formData.append("grant_type", "password");
    formData.append("scope", "read");
    analytics().logLogin({ method: type });
    if (type === "Facebook") {
      return loginWithFaceBookFunction(formData);
    }
    if (type === "Apple") {
      return loginWithAppleFunction({ formData, displayName });
    }
    return loginWithGoogleFunction(formData);
  };

  const getMainTitle = () => {
    if (lastUserLogin?.username) {
      return (
        <View style={{ ...styles.borderBottom, ...styles.boxUserName }}>
          <Text style={[styles.title, { color: Colors.black }]}>
            Chào mừng bạn,{" "}
            <Text style={[styles.title, { color: Colors.primary }]}>
              {lastUserLogin.displayName}
            </Text>
          </Text>
          <TouchableOpacity onPress={() => handleRemoveLastLogin()}>
            <View>
              <Text style={styles.changeAccount}>Đăng nhập dưới tên khác</Text>
            </View>
          </TouchableOpacity>
          {/* {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>} */}
        </View>
      );
    }
    return (
      <View style={styles.borderBottom}>
        <Text style={[styles.title, { color: Colors.black }]}>
          Chào mừng đến với Star
        </Text>
        {/* {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>} */}
      </View>
    );
  };

  const handleLoginWithFacebook = async () => {
    // console.log('handleLoginWithFacebook');
    if (!isOpenGoogle) {
      setIsOpenFacebook(true);
      try {
        await LoginManager.logOut();
        LoginManager.logInWithPermissions().then(
          async (result) => {
            setIsOpenFacebook(false);
            if (!result.isCancelled) {
              const data = await AccessToken.getCurrentAccessToken();
              // console.log('data', data);
              if (data?.accessToken) {
                return loginWithSocial(data, "Facebook");
              }
              return showMessage({
                message: "Có lỗi xảy ra trong quá trình thực hiện",
                type: "danger",
              });
            }
            return showMessage({
              message: "Đăng nhập không thành công",
              type: "danger",
            });
          },
          (error) => {
            // console.log('error', error);
            setIsOpenFacebook(false);
            if (error.code === "EUNSPECIFIED") {
              return showMessage({
                message: "Mất kết nối, xin vui lòng thử lại sau",
                type: "danger",
              });
            }
            return showMessage({
              message: "Có lỗi xảy ra trong quá trình thực hiện",
              type: "danger",
            });
          }
        );
      } catch (error) {
        // console.log('error', error);
        setIsOpenFacebook(false);
        return showMessage({
          message: "Đăng nhập không thành công",
          type: "danger",
        });
      }
    }
  };

  const handleLoginWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // console.log('appleAuthRequestResponse', appleAuthRequestResponse);
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );
      // console.log('appleAuthRequestResponse', appleAuthRequestResponse);
      // console.log('credentialState', credentialState);
      // console.log('credentialState === appleAuth.State.AUTHORIZED',);
      if (
        appleAuthRequestResponse?.fullName?.familyName ||
        appleAuthRequestResponse?.fullName?.givenName
      ) {
        // lưu lại thông tin người dùng khi đăng nhập bằng apple
        await EncryptedStorage.setItem(
          "loginWithAppleData",
          JSON.stringify(appleAuthRequestResponse)
        );
      }
      if (credentialState === appleAuth.State.AUTHORIZED) {
        if (
          appleAuthRequestResponse?.fullName?.familyName ||
          appleAuthRequestResponse?.fullName?.givenName
        ) {
          const displayName = `${
            appleAuthRequestResponse?.fullName?.familyName || ""
          } ${appleAuthRequestResponse?.fullName?.givenName || ""}`;
          return loginWithSocial(
            appleAuthRequestResponse,
            "Apple",
            displayName
          );
        }
        // lấy tên từ storage , vì login lại từ lần thứ 2 apple sẽ ko trả ra tên
        // xử lý cho trường hợp lần đầu call api cập nhật thông tin người dùng lỗi
        const dataStorage =
          (await EncryptedStorage.getItem("loginWithAppleData")) || "{}";
        const dataParsed = JSON.parse(dataStorage);
        // console.log('dataParsed', dataParsed);
        const displayName = `${dataParsed?.fullName?.familyName || ""} ${
          dataParsed?.fullName?.givenName || ""
        }`;
        return loginWithSocial(appleAuthRequestResponse, "Apple", displayName);
      }
    } catch (error) {
      // console.log('error', error);
      return showMessage({
        message: "Đăng nhập không thành công",
        type: "danger",
      });
    }
  };

  const handleLoginWithGoogle = async () => {
    if (!isOpenFacebook) {
      setIsOpenGoogle(true);
      try {
        await GoogleSignin.signOut();
        await GoogleSignin.signIn();
        const userInfo = await GoogleSignin.getTokens();
        setIsOpenGoogle(false);
        if (userInfo?.accessToken) {
          return loginWithSocial(userInfo, "Google");
        } else {
          return showMessage({
            message: "Có lỗi xảy ra trong quá trình thực hiện",
            type: "danger",
          });
        }
      } catch (error) {
        console.log(error);
        setIsOpenGoogle(false);
        if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          return showMessage({
            message:
              "Dịch bụ không có sẵn , vui lòng cập nhật hệ điều hành để sử dụng",
            type: "danger",
          });
        } else if (error.code === "7") {
          return showMessage({
            message: "Mất kết nối, xin vui lòng thử lại sau",
            type: "danger",
          });
        } else {
          // some other error happened
          return showMessage({
            message: "Đăng nhập không thành công",
            type: "danger",
          });
        }
      }
    }
  };

  return (
    <View style={width > 800 ? styles.modalTablet : styles.modal}>
      {getMainTitle()}
      <View>
        <View>
          {/* {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>} */}
          {!lastUserLogin?.username && (
            <View>
              <Text style={[styles.label, { color: Colors.black }]}>
                Tên đăng nhập
              </Text>
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, { color: Colors.gray }]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      placeholder="Nhập tên đăng nhập"
                      placeholderTextColor={Colors.gray}
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  )}
                  name="username"
                />
              </View>
              {errors.username && (
                <Text style={styles.textError}>{errors.username.message}</Text>
              )}
            </View>
          )}
        </View>
        <View style={[styles.label, styles.flexBox]}>
          <Text style={{ color: Colors.black }}>Mật khẩu</Text>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => handleShowModal("forgotPasswordModal")}
          >
            <Text style={styles.touchableText}>Quên mật khẩu</Text>
            <IconFeather
              name="chevron-right"
              size={18}
              style={styles.touchableText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: Colors.gray }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={isShowPassword}
                autoCapitalize="none"
                placeholder="Nhập mật khẩu"
                placeholderTextColor={Colors.gray}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="password"
            style={styles.controller}
          />
          <Pressable onPress={() => setIsShowPassword(!isShowPassword)}>
            {isShowPassword ? (
              <IconFeather name="eye-off" size={15} style={styles.orangeIcon} />
            ) : (
              <IconFeather name="eye" size={15} style={styles.orangeIcon} />
            )}
          </Pressable>
        </View>
        {errors.password && (
          <Text style={styles.textError}>{errors.password.message}</Text>
        )}

        <View style={styles.boxButton}>
          <TouchableOpacity
            style={[styles.touchableBackground, Gutters.middleRMargin]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {loginMutateFunction.isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <View>
                <Text style={styles.touchableBackgroundText}>Đăng nhập</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLoginWithBiometric()}>
            <Image style={{ ...styles.faceId }} source={getIconBio()} />
          </TouchableOpacity>
        </View>
        <View style={styles.boxHrSocial}>
          <View style={styles.hr} />
          <Text style={{ color: Colors.black }}>OR</Text>
          <View style={styles.hr} />
        </View>
        <View style={styles.boxSocial}>
          <View
            style={
              Platform.OS !== "ios"
                ? { ...styles.boxLeft, width: "50%" }
                : styles.boxLeft
            }
          >
            <TouchableOpacity onPress={handleLoginWithFacebook}>
              <View style={styles.boxFacebook}>
                <IconIonic name="logo-facebook" style={styles.facebookIcon} />
                <Text style={styles.facebookText}>Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>
          {Platform.OS === "ios" && (
            <View style={styles.boxCenter}>
              <TouchableOpacity onPress={handleLoginWithApple}>
                <View style={styles.boxApple}>
                  <IconIonic name="logo-apple" style={styles.appleIcon} />
                  <Text style={styles.appleText}>Apple</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={
              Platform.OS !== "ios"
                ? { ...styles.boxRight, width: "50%" }
                : styles.boxRight
            }
          >
            <TouchableOpacity onPress={handleLoginWithGoogle}>
              <View style={styles.boxGoogle}>
                <IconIonic name="logo-google" style={styles.googleIcon} />
                <Text style={styles.googleText}>Google</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleRedirectMain()}>
          <View style={styles.boxContinue}>
            <Text style={styles.continue}>
              Tiếp tục sử dụng mà không đăng nhập
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginModal;
