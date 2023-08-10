/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { memo, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import * as yup from "yup";
import IonIcons from "react-native-vector-icons/Ionicons";

import { Controller, useForm } from "react-hook-form";
import { compose } from "@reduxjs/toolkit";
import { connect, useDispatch, useSelector } from "react-redux";
import { useCountdown, useTheme } from "@/Hooks";

import { activeAccountActions, makeSelectLayout } from "./activeAccountSlice";
import { styles } from "./style";
import { activeAccountList } from "./constant";
import { useNavigation } from "@react-navigation/native";
import { Divider, useToast } from "native-base";
import {
  loginActions,
  makeSelectLogin,
} from "@/Containers/LoginPage/loginSlice";

const schema = yup.object({
  activeCode: yup.string().required("Plesae enter your Active Code"),
});

const ActiveAccount = ({ route }) => {
  const { Gutters, Layout, Fonts, FontSize, ColorText, Border, Colors } =
    useTheme();
  const { dataRequestUpdate } = route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const { countdown, startCountdown, stopCountdown, resetCountdown } =
    useCountdown(60);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Đếm ngược thời gian gửi lại mã
  useEffect(() => {
    resetCountdown(60);
    startCountdown();
  }, []);

  // Xử lý khi ấn submit
  const onSubmit = (data) => {
    dispatch(activeAccountActions.activeAccount(data));
  };

  // Nhận data từ api trả về
  const globalData = useSelector(makeSelectLayout);
  const { isLoading } = globalData;
  const getDataLogin = useSelector(makeSelectLogin);
  const { loginData, userInfo } = getDataLogin;

  // Check nếu active thành công thì chuyển đến trang LOGIN
  useEffect(() => {
    if (globalData.isSuccess) {
      if (loginData.access_token) {
        dispatch(activeAccountActions.clear());
        navigation.navigate("Main");
        toast.closeAll();
        toast.show({
          description: "Thành công",
        });
      } else {
        dispatch(activeAccountActions.clear());
        navigation.navigate("LOGIN");
        toast.closeAll();
        toast.show({
          description: "Thành công",
        });
      }

      // reset();
    }
  }, [globalData.isSuccess]);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (event) => {
        // console.log('aaaaaaa');
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

  // Check nếu mã không chính xác thì sẽ báo lỗi
  useEffect(() => {
    const isErrorMessage = globalData.isError;
    const checkError = globalData.dataError || "";
    if (isErrorMessage) {
      dispatch(activeAccountActions.clear());
      setError("activeCode", {
        type: "activeCode",
        message: "Mã kích hoạt không chính xác",
      });
    }
    if (isErrorMessage && checkError === "Mã kích hoạt đã hết hạn!") {
      dispatch(activeAccountActions.clear());
      setError("activeCode", {
        type: "activeCode",
        message: "Mã kích hoạt đã hết hạn!",
      });
    }

    if (isErrorMessage && checkError === "internet") {
      dispatch(activeAccountActions.clear());
      toast.closeAll();
      toast.show({
        description: "Có lỗi xảy ra, vui lòng kiểm tra kết nối và thử lại",
      });
    }
  }, [globalData.isError]);

  // Xử lí chuyển page login
  const handleRedirectChangeLogin = () => {
    dispatch(loginActions.cleanup());
    setTimeout(() => {
      navigation.replace("LOGIN", {
        type: "ACTIVE_ACCOUNT",
      });
    }, 500);
  };

  // Xử lí khi người dùng click vào gửi lại mã
  const handleResendCode = () => {
    const idResend = userInfo?.id;
    dispatch(activeAccountActions.reActiveAccount(idResend));
    resetCountdown(60);
    startCountdown();
  };

  useEffect(() => {
    if (countdown === 0) {
      stopCountdown();
    }
  }, [countdown]);

  return (
    <KeyboardAvoidingView
      style={Layout.fill}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require("@/Components/img/backgroundHome.jpg")}
      >
        {/* Header */}
        <View>
          <View style={[Layout.rowHCenter]}>
            <Image
              style={[{ width: 170, height: 90 }]}
              source={require("@/Components/img/logo.png")}
            />

            <View style={styles.rightHeader}>
              <TouchableOpacity onPress={() => handleRedirectChangeLogin()}>
                <Text
                  style={[
                    ColorText.white,
                    Gutters.regularLMargin,
                    ColorText.fontWeight700,
                    { fontSize: FontSize.small },
                  ]}
                >
                  LOGIN
                  <IonIcons size={16} name="chevron-forward-outline" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Divider
          style={[Gutters.regularHMargin, Gutters.regularBMargin]}
          color="white"
        />
        <View style={styles.homeContainer}>
          <View style={[styles.registerContainer]}>
            {isLoading && (
              <ActivityIndicator size="small" color={Colors.primary} />
            )}

            <View style={[Gutters.smallVMargin, Layout.rowHCenter]}>
              <Text
                style={[
                  ColorText.fontWeight700,
                  { color: Colors.white, fontSize: FontSize.normal },
                ]}
              >
                The activation code has been sent to your email.
              </Text>
            </View>

            {activeAccountList.map((item) => {
              const { field } = item;
              const message = errors[field] && errors[field].message;
              return (
                <View key={field}>
                  <View style={[Layout.row, styles.inputContainer]}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          autoCapitalize="none"
                          onChangeText={onChange}
                          value={value}
                          style={[
                            styles.inputValue,
                            { fontSize: FontSize.small, color: Colors.white },
                          ]}
                          placeholder={item.placeholder}
                          placeholderTextColor={Colors.white}
                        />
                      )}
                      name={item.field}
                    />
                  </View>
                  <Text
                    style={[
                      Gutters.tinyVMargin,
                      Gutters.regularHMargin,
                      ColorText.fontWeight700,
                      { fontSize: FontSize.small, color: "#eee" },
                    ]}
                  >
                    {message}
                  </Text>
                </View>
              );
            })}
            <TouchableOpacity
              style={[ColorText.backgroundPrimary, Border.smallRadius]}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={[
                  ColorText.fontWeight700,
                  Layout.alignItemsCenter,
                  Layout.textAlignCenter,
                  ColorText.white,
                  Gutters.regularVPadding,
                  { fontSize: FontSize.small },
                ]}
              >
                ACTIVE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

ActiveAccount.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // dataList: PropTypes.objectOf(PropTypes.array),
};

// const mapStateToProps = {
//   ActiveAccount: makeSelectLayout(),
// };

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapDispatchToProps);

export default compose(withConnect, memo)(ActiveAccount);
