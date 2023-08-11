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
  const { Fonts, Gutters, Layout, ColorText } = useTheme();
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
  const getDeviceId = async () => {
    let uniqueId = await DeviceInfo.getUniqueId();
    setDeviceId(uniqueId);
  };

  useFocusEffect(
    React.useCallback(() => {
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

  const fromScreen = () => route?.params?.type || "";

  const { isError, error, refetch } = useQuery({
    queryKey: ["getMe", accessToken],
    queryFn: async () => {
      const data = await getApiUser("/profile");
      console.log("dataGetme: ", data);
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
      // if (userInfo?.stepActive === "0") {
      //   navigation.replace("UPDATE_INFO_ACCOUNT");
      // } else if (userInfo?.stepActive === "1") {
      //   navigation.replace("ACTIVE_ACCOUNT");
      // } else if (userInfo?.stepActive === "2") {
      //   // đây là trường hợp người dùng đã đủ thông tin
      //   // từ màn start
      // }
      navigation.replace("Main");
    }
  }, [userInfo]);

  const handleShowMessage = (data) => {
    toast.closeAll();
    toast.show({ description: data?.message });
  };

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
      return postApiLogin("/login", data, {
        "Device-Id": deviceId,
      });
    },
    {
      onSuccess: async (data, variables, context) => {
        if (data.data?.token) {
          await EncryptedStorage.setItem(
            "loginData",
            JSON.stringify(data?.data?.token)
          );
          setAccessToken(data.data.token);
          refetch();
        } else {
          handleShowMessage({
            message: "An error occurred, please try again",
            type: "danger",
          });
        }
      },
      onError: async (data) => {
        handleShowMessage({
          message: "An error occurred, please try again",
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
        source={require("@/Components/img/backgroundHome.jpg")}
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
          <View>
            <Image
              style={{ width: 170, height: 90 }}
              source={require("@/Components/img/logo.png")}
            />
          </View>
          {isShowModal.loginModal ? (
            <View
              style={[
                Layout.fill,
                // Layout.rowCenter,
                // Layout.justifyContentBetween,
              ]}
            >
              {/* <Text style={[styles.textWhite, styles.textBold]}>Login</Text> */}
              <View style={[Gutters.smallTMargin]}>
                <TouchableOpacity
                  style={[Layout.rowHCenter, styles.justifyContentEnd]}
                  onPress={() => navigation.push("REGISTER_ACCOUNT")}
                >
                  <Text style={[styles.textWhite, styles.textBold]}>
                    Register
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
                { justifyContent: "flex-end" },
              ]}
            >
              <TouchableOpacity
                style={[Layout.rowHCenter]}
                onPress={() => handleLoginByAnotherEmail()}
              >
                <View>
                  <Text
                    style={[
                      styles.textWhite,
                      styles.textBold,
                      ColorText.fontWeigth700,
                    ]}
                  >
                    Login
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
            />
          )}
          {isShowModal.forgotPasswordModal && (
            <ForgotPasswordModal handleShowModal={handleShowModal} />
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
