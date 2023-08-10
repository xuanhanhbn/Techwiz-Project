/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { styles } from "./style";
import { registerAccount } from "./constant";
import { useDispatch, useSelector, connect } from "react-redux";
import { registerActions, makeSelectLayout } from "./registerSlice";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Divider } from "@rneui/base";
import { useTheme } from "@/Hooks";
import { useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
// import { loginActions } from '../LoginPage/loginSlice';
import analytics from "@react-native-firebase/analytics";

const schema = yup.object({
  email: yup
    .string()
    .matches(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      "Email isvalid"
    )
    .required("Please enter your Email"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()?-_+={}[]|:;""''><,.\/])[A-Za-z\d`~!@#$%^&*()?-_+={}[]|:;""''><,.\/&]{8,}$/,
      "Minimum 8 characters, must include at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .required("Please enter your Email"),
  confirmPassword: yup
    .string()
    .required("Please re-enter your password")
    .oneOf(
      [yup.ref("password"), null],
      "The passwords do not match, please re-enter"
    ),
});

const RegisterAccount = () => {
  const { Gutters, Layout, Fonts, FontSize, ColorText, Border, Colors } =
    useTheme();
  const dispatch = useDispatch();
  const [isShowPassWord, setIsShowPassWord] = useState({
    password: true,
    rePassWord: true,
  });
  const [dataRequest, setDataRequest] = useState({});
  const toast = useToast();
  const navigation = useNavigation();
  const globalData = useSelector(makeSelectLayout);
  const dataRegister = globalData.dataRegister || [];
  const { isLoading } = globalData;
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Xử lý khi ấn submit
  const onSubmit = (data) => {
    const newDataRequest = {
      ...data,
    };
    setDataRequest(newDataRequest);
    // dispatch(registerActions.registerAccount(data));
  };
  useEffect(() => {
    if (Object.keys(dataRequest).length) {
      navigation.replace("UPDATE_INFO_ACCOUNT", { dataRequest });
    }
  }, [dataRequest]);

  // Xử lý khi người dùng click icon show/hide password
  const handleShowPasswordIcon = (type) => {
    if (type === "password") {
      setIsShowPassWord({
        ...isShowPassWord,
        password: !isShowPassWord.password,
      });
    }
    if (type === "rePassword") {
      setIsShowPassWord({
        ...isShowPassWord,
        rePassWord: !isShowPassWord.rePassWord,
      });
    }
  };

  // Xử lý khi người dùng click icon show/hide password
  const handleShowPassWordInput = (item) => {
    if (item.type === "password") {
      return isShowPassWord.password;
    }
    if (item.type === "rePassword") {
      return isShowPassWord.rePassWord;
    }
    return false;
  };

  // Xử lý khi đăng kí thành công thì chuyển form cập nhật
  // useEffect(() => {
  //   if (globalData.isSuccess) {
  //     dispatch(registerActions.clear());
  //     navigation.replace("UPDATE_INFO_ACCOUNT", {
  //       dataRegister,
  //     });
  //     toast.closeAll();
  //     toast.show({
  //       description: "Thành công",
  //     });
  //     reset();
  //   }
  // }, [globalData.isSuccess]);

  // Xử lí check trùng tên đăng nhập
  useEffect(() => {
    const isErrorMessage = globalData.isError;
    const checkError = globalData.dataError || "";
    if (isErrorMessage && checkError === "name") {
      dispatch(registerActions.clear());
      setError("name", {
        type: "name",
        message: "Tên đăng nhập đã được sử dụng",
      });
    }

    if (isErrorMessage && checkError === "internet") {
      dispatch(registerActions.clear());
      toast.closeAll();
      toast.show({
        description:
          "An error occurred, please check your connection and try again",
      });
    }
  }, [globalData.isError]);

  const handleChangeLogin = () => {
    navigation.push("LOGIN");
  };

  return (
    <KeyboardAvoidingView
      style={Layout.fill}
      behavior={Platform.OS === "ios" ? "padding" : null}
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
              <TouchableOpacity onPress={() => handleChangeLogin()}>
                <Text
                  style={[
                    ColorText.white,
                    Gutters.largeLMargin,
                    ColorText.fontWeight700,
                    { fontSize: FontSize.small },
                  ]}
                >
                  Login
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

            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {registerAccount.map((item) => {
                  const { field } = item;
                  const message = errors[field] && errors[field].message;
                  return (
                    <View key={field}>
                      <View style={styles.inputContainer}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <TextInput
                              autoCapitalize="none"
                              onChangeText={onChange}
                              value={value}
                              style={[
                                styles.inputValue,
                                {
                                  fontSize: FontSize.small,
                                  color: Colors.white,
                                },
                              ]}
                              placeholder={item.placeholder}
                              placeholderTextColor={Colors.white}
                              secureTextEntry={handleShowPassWordInput(item)}
                            />
                          )}
                          name={item.field}
                        />

                        {item.type === "password" && (
                          <IonIcons
                            style={[
                              styles.iconShowPass,
                              { fontSize: FontSize.small },
                            ]}
                            name={
                              isShowPassWord.password
                                ? "eye-off-outline"
                                : "eye-outline"
                            }
                            size={20}
                            onPress={() => handleShowPasswordIcon(item.type)}
                          />
                        )}
                        {item.type === "rePassword" && (
                          <IonIcons
                            style={[
                              styles.iconShowPass,
                              { fontSize: FontSize.small },
                            ]}
                            name={
                              isShowPassWord.rePassWord
                                ? "eye-off-outline"
                                : "eye-outline"
                            }
                            size={20}
                            onPress={() => handleShowPasswordIcon(item.type)}
                          />
                        )}
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
                    REGISTER
                  </Text>
                </TouchableOpacity>

                <View style={[Gutters.regularVPadding, Layout.center]}>
                  <View>
                    <Text
                      style={[
                        Layout.textAlignCenter,
                        ColorText.fontWeight500,
                        // ColorText.textDiscription,
                        { fontSize: FontSize.small, color: Colors.white },
                      ]}
                    >
                      When you click Register, you agree to our Terms of Service
                      and Privacy Policy
                    </Text>
                  </View>
                  {/* <View style={[Layout.rowHCenter]}>
                    <TouchableOpacity onPress={() => handleConfirm("rules")}>
                      <Text
                        style={[
                          ColorText.textPrimary,
                          { fontSize: FontSize.small },
                        ]}
                      >
                        Điều khoản,{" "}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleConfirm("regulation")}
                    >
                      <Text
                        style={[
                          ColorText.textPrimary,
                          { fontSize: FontSize.small },
                        ]}
                      >
                        Quy chế
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={[
                        ColorText.textDiscription,
                        { fontSize: FontSize.small },
                      ]}
                    >
                      {" "}
                      &{" "}
                    </Text>
                    <TouchableOpacity onPress={() => handleConfirm("privacy")}>
                      <Text
                        style={[
                          ColorText.textPrimary,
                          { fontSize: FontSize.small },
                        ]}
                      >
                        Chính sách bảo mật
                      </Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

RegisterAccount.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapDispatchToProps);

export default compose(withConnect, memo)(RegisterAccount);
