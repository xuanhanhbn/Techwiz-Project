/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useTheme } from "@/Hooks";
import LoginModal from "./components/LoginModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import EncryptedStorage from "react-native-encrypted-storage";
import IconFeather from "react-native-vector-icons/Feather";
import { useToast } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "./style";
import { isLogin } from "@/Navigators/utils";

import { postApiLogin, getApiUser } from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeviceInfo from "react-native-device-info";

const LoginPage = ({ route }) => {
  const { Fonts, Gutters, Layout } = useTheme();
  // const dispatch = useDispatch();
  const navigation = useNavigation();
  // const loginPageData = useSelector(makeSelectLogin);
  // const { errorMessage, loginData } = loginPageData;
  const [isShowModal, setIsShowModal] = useState({
    loginModal: true,
    forgotPasswordModal: false,
  });
  const [accessToken, setAccessToken] = useState();
  const [deviceId, setDeviceId] = useState();
  const [userInfo, setUserInfo] = useState(null);

  const toast = useToast();
  // console.log('sensorAvailable', sensorAvailable);
  const getDeviceId = async () => {
    let uniqueId = await DeviceInfo.getUniqueId();
    setDeviceId(uniqueId);
  };

  useFocusEffect(
    React.useCallback(() => {
      // dispatch(loginActions.cleanup());
      EncryptedStorage.removeItem("loginData");
      getDeviceId();
    }, [])
  );

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (event) => {
        // console.log('aaaaaa');
        // trường hợp step active ! === 2 và muốn back lại thì sẽ chặn
        if (
          userInfo?.stepActive !== "2" &&
          (event?.data?.action?.type === "POP" ||
            event?.data?.action?.type === "GO_BACK")
        ) {
          event.preventDefault();
        }
        return () => {
          // console.log('bbbbbbb');
          navigation.removeListener("beforeRemove");
        };
      }),
    [navigation, userInfo]
  );

  // const handleGetUserInfo = async () => {
  //   const data = await isLogin();
  //   // nếu accessToken có đồng thời trong store và storage thì mới call appi
  //   // tránh trường hợp redirect từ logout bị call api này
  //   // trước khi đẩy từ màn logout sang đây phải clear đi storage
  //   if (loginData.access_token && data.access_token) {
  //     dispatch(loginActions.getUserInfo());
  //   }
  // };

  // useEffect(() => {
  //   if (loginData?.access_token) {
  //     handleGetUserInfo();
  //   }
  // }, [isLoginSuccess]);

  const fromScreen = () => route?.params?.type || "";

  const { isError, error, refetch } = useQuery({
    queryKey: ["getMe", accessToken],
    queryFn: async () => {
      const data = await getApiUser("users/me");
      if (data) {
        setUserInfo(data.data);
        await EncryptedStorage.setItem("userInfo", JSON.stringify(data.data));
      }
    },
    enabled: false,
  });

  // Xử lý chuyển màn sau khi đăng nhập thành công
  useEffect(() => {
    // console.log('userInfo', userInfo);
    // debugger
    if (accessToken) {
      // debugger
      // (fromScreen() !== 'UPDATE_INFO_ACCOUNT') khi đẩy từ màn cập nhật thông tin sang mà chưa chưa clear store sẽ không đẩy về màn trước
      if (userInfo?.stepActive === "0") {
        navigation.replace("UPDATE_INFO_ACCOUNT");
      } else if (userInfo?.stepActive === "1") {
        navigation.replace("ACTIVE_ACCOUNT");
      } else if (userInfo?.stepActive === "2") {
        // đây là trường hợp người dùng đã đủ thông tin
        // từ màn start
        if (fromScreen() === "FROM_START") {
          navigation.replace("Main");
        } else {
          navigation.goBack();
        }
      }
    }
  }, [userInfo]);

  const handleShowMessage = (data) => {
    toast.closeAll();
    toast.show({ description: data?.message });
  };

  // useEffect(() => {
  //   if (errorMessage) {
  //     // handleShowToast(errorMessage);
  //     handleShowMessage({
  //       message: errorMessage,
  //       type: "danger",
  //     });
  //   }
  //   dispatch(loginActions.cleanup());
  // }, [errorMessage]);

  // const onChangeTheme = ({ theme, darkMode }) => {
  //   dispatch(changeTheme({ theme, darkMode }));
  // };

  const handleShowModal = (modal) => {
    const newShowModal = { ...isShowModal };
    Object.keys(newShowModal).forEach((key) => {
      newShowModal[key] = false;
    });
    setIsShowModal({
      ...newShowModal,
      [modal]: true,
    });
  };

  const handleLoginByAnotherEmail = () => {
    handleShowModal("loginModal");
    // dispatch(loginActions.cleanup());
  };

  const loginMutation = useMutation(
    (data) => {
      return postApiLogin("oauth/token", data, {
        "Device-Id": deviceId,
      });
    },
    {
      onSuccess: async (data, variables, context) => {
        if (data.data?.access_token) {
          await EncryptedStorage.setItem(
            "loginData",
            JSON.stringify(data.data)
          );
          setAccessToken(data.data.access_token);
          refetch();
        } else {
          handleShowMessage({
            message: data.data.errorMsg,
            type: "danger",
          });
        }
      },
      onError: async (data) => {
        handleShowMessage({
          message: data.message,
          type: "danger",
        });
      },
    }
  );

  const loginWithBiometricsMutation = useMutation(
    (data) => {
      return postApiLogin("oauth/token", data, {
        "Login-Type": "Biometric",
        "Device-Id": deviceId,
      });
    },
    {
      onSuccess: async (data, variables, context) => {
        if (data.data?.access_token) {
          await EncryptedStorage.setItem(
            "loginData",
            JSON.stringify(data.data)
          );
          setAccessToken(data.data.access_token);
          refetch();
        } else {
          handleShowMessage({
            message: "Vui lòng nhập mật khẩu và đăng ký lại",
            type: "danger",
          });
        }
      },
      onError: (data) => {
        handleShowMessage({
          message: data.message,
          type: "danger",
        });
      },
    }
  );

  const loginWithFacebookMutation = useMutation(
    (data) => {
      return postApiLogin("oauth/token", data, {
        "Login-Type": "Facebook",
        "Device-Id": deviceId,
      });
    },
    {
      onSuccess: async (data, variables, context) => {
        if (data.data?.access_token) {
          await EncryptedStorage.setItem(
            "loginData",
            JSON.stringify(data.data)
          );
          setAccessToken(data.data.access_token);
          refetch();
        } else {
          handleShowMessage({
            message: "Vui lòng nhập mật khẩu và đăng ký lại",
            type: "danger",
          });
        }
      },
      onError: (data) => {
        handleShowMessage({
          message: data.message,
          type: "danger",
        });
      },
    }
  );

  const loginWithAppleMutation = useMutation(
    (data) => {
      return postApiLogin("oauth/token", data, {
        "Login-Type": "Apple",
        "Device-Id": deviceId,
        "User-Display-Name": data?.displayName || "",
      });
    },
    {
      onSuccess: async (data, variables, context) => {
        if (data.data?.access_token) {
          await EncryptedStorage.setItem(
            "loginData",
            JSON.stringify(data.data)
          );
          setAccessToken(data.data.access_token);
          refetch();
        } else {
          handleShowMessage({
            message: "Vui lòng nhập mật khẩu và đăng ký lại",
            type: "danger",
          });
        }
      },
      onError: (data) => {
        handleShowMessage({
          message: data.message,
          type: "danger",
        });
      },
    }
  );

  const loginWithGoogleMutation = useMutation(
    (data) => {
      return postApiLogin("oauth/token", data, {
        "Login-Type": "Google",
        "Device-Id": deviceId,
      });
    },
    {
      onSuccess: async (data, variables, context) => {
        if (data.data?.access_token) {
          await EncryptedStorage.setItem(
            "loginData",
            JSON.stringify(data.data)
          );
          setAccessToken(data.data.access_token);
          refetch();
        } else {
          handleShowMessage({
            message: "Vui lòng nhập mật khẩu và đăng ký lại",
            type: "danger",
          });
        }
      },
      onError: (data) => {
        handleShowMessage({
          message: data.message,
          type: "danger",
        });
      },
    }
  );

  return (
    <KeyboardAvoidingView
      style={Layout.fill}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ImageBackground
        source={require("@/Components/img/backgroundHome.png")}
        resizeMode="cover"
        style={[Layout.fill, styles.wrapper, Gutters.largeBPadding]}
      >
        <View
          style={[
            Layout.rowHCenter,
            Gutters.smallVPadding,
            styles.borderBottomHeader,
          ]}
        >
          <View
            style={[
              styles.borderRightHeader,
              Gutters.smallRPadding,
              Gutters.smallRMargin,
            ]}
          >
            <Image source={require("@/Components/img/logo.png")} />
          </View>
          {isShowModal.loginModal ? (
            <View
              style={[
                Layout.fill,
                Layout.rowHCenter,
                Layout.justifyContentBetween,
              ]}
            >
              <Text style={[styles.textWhite, styles.textBold]}>Đăng nhập</Text>
              <View>
                <Text style={[styles.textWhite, Gutters.tinyBMargin]}>
                  Bạn chưa là thành viên?
                </Text>
                <TouchableOpacity
                  style={[Layout.rowHCenter, styles.justifyContentEnd]}
                  onPress={() => navigation.push("REGISTER_ACCOUNT")}
                >
                  <Text style={[styles.textWhite, styles.textBold]}>
                    Đăng ký ngay
                  </Text>
                  <IconFeather
                    name="chevron-right"
                    size={18}
                    style={styles.textWhite}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={[
                Layout.fill,
                Layout.rowHCenter,
                Layout.justifyContentBetween,
              ]}
            >
              <Text style={[styles.textWhite, styles.textBold]}>
                Quên mật khẩu
              </Text>
              <TouchableOpacity
                style={[Layout.rowHCenter]}
                onPress={() => handleLoginByAnotherEmail()}
              >
                <View>
                  <Text
                    style={[styles.textWhite, styles.textBold, Fonts.textRight]}
                  >
                    Đăng nhập
                  </Text>
                  <Text style={[styles.textWhite, styles.textBold]}>
                    bằng email khác
                  </Text>
                </View>
                <IconFeather
                  name="chevron-right"
                  size={18}
                  style={styles.textWhite}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={[Layout.fill, Layout.colCenter]}>
          {isShowModal.loginModal && (
            <LoginModal
              showMessage={handleShowMessage}
              handleShowModal={handleShowModal}
              loginMutateFunction={loginMutation}
              loginWithBiometricsFunction={loginWithBiometricsMutation.mutate}
              loginWithFacebookFunction={loginWithFacebookMutation.mutate}
              loginWithAppleFunction={loginWithAppleMutation.mutate}
              loginWithGoogleFunction={loginWithGoogleMutation.mutate}
            />
          )}
          {isShowModal.forgotPasswordModal && (
            <ForgotPasswordModal handleShowModal={handleShowModal} />
          )}
        </View>
        {/* <FlashMessage position="bottom" style={styles.boxFlashMessage} /> */}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
