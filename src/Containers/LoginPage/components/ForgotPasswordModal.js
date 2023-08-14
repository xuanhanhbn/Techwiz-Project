/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme, useCountdown } from "@/Hooks";
import { changeTheme } from "@/Store/Theme";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/Ionicons";
import IconFeather from "react-native-vector-icons/Feather";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginActions, makeSelectLogin } from "../loginSlice";
import FlashMessage, { showMessage } from "react-native-flash-message";

import styles from "../style";
import {
  confirmEmailSchema,
  confirmCodeSchema,
  resetPasswordSchema,
} from "../constants";

const ForgotPasswordModal = (props) => {
  const { t } = useTranslation();
  const { handleShowModal } = props;
  const { Common, Fonts, Gutters, Layout, ColorText, Colors } = useTheme();
  const { width, height } = Dimensions.get("window");
  const { countdown, startCountdown, stopCountdown, resetCountdown } =
    useCountdown(60);
  const dispatch = useDispatch();
  const loginData = useSelector(makeSelectLogin);
  const { isLoading, errorMessage, forgotPassword, checkCode, resetPassword } =
    loginData;

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isShowNewPassword, setIsShowNewPassword] = useState(true);
  const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] =
    useState(true);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(confirmEmailSchema),
  });

  const {
    control: controlCode,
    handleSubmit: handleSubmitConfirmCode,
    formState: { errors: errorConfirmCode },
    setError: setErrorStepTwo,
    reset: resetConfirmCode,
  } = useForm({
    defaultValues: {
      token: "",
    },
    resolver: yupResolver(confirmCodeSchema),
  });

  const {
    control: controlResetPassword,
    handleSubmit: handleSubmitResetPassword,
    formState: { errors: errorResetPassword },
    trigger,
  } = useForm({
    mode: "all",
    criteriaMode: "all", // validate các lỗi cùng lúc
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (step === 1 && errorMessage?.length > 0) {
      setError("email", { type: "email", message: "Email address not found." });

      return showMessage({
        message: "Email address not found.",
        type: "danger",
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    dispatch(loginActions.cleanup());
    trigger("newPassword");
  }, []);

  useEffect(() => {
    if (forgotPassword.data && forgotPassword.status === "success") {
      setStep(2);
      // resetCountdown(60);
      // startCountdown();
      resetConfirmCode();
    }
  }, [forgotPassword]);

  useEffect(() => {
    if (checkCode.status === 1) {
      setStep(3);
    }
  }, [checkCode]);

  useEffect(() => {
    if (resetPassword.status === "success") {
      setStep(4);
    }
  }, [resetPassword]);

  // useEffect(() => {
  //   if (countdown === 0) {
  //     stopCountdown();
  //   }
  // }, [countdown]);

  const onSubmit = (data) => {
    if (step === 1) {
      setEmail(data.email);
      dispatch(loginActions.forgotPassword(data));
    } else if (step === 2) {
      if (Number(data?.token) !== loginData?.forgotPassword?.data?.resetToken) {
        setErrorStepTwo("token", {
          type: "value",
          message: "Active code is valid.",
        });
        return;
      }
      setStep(3);
      // dispatch(loginActions.checkCode({ email: email, ...data }));
      setCode(data?.token);
    } else if (step === 3) {
      dispatch(loginActions.resetPassword({ code: code, ...data }));
    }
  };

  // gửi lại mã xác nhận
  const handleResendCode = () => {
    dispatch(loginActions.forgotPassword({ email: email }));
    resetCountdown(60);
    startCountdown();
  };

  // xử lý hiển thị icon validate mật khẩu
  const getValidateIcon = (errorText) => {
    const isErrorMatches =
      errorResetPassword.newPassword?.types.matches?.includes(errorText);

    if (isErrorMatches) {
      return (
        <Icon
          name="checkmark-circle-outline"
          size={20}
          style={[styles.orangeIcon, Gutters.tinyRMargin]}
        />
      );
    }
    return (
      <Icon
        name="checkmark-circle"
        size={20}
        style={[styles.orangeIcon, Gutters.tinyRMargin]}
      />
    );
  };

  const firstStep = () => {
    return (
      <View style={width > 800 ? styles.modalTablet : styles.modal}>
        <FlashMessage position="top" />

        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, { color: Colors.white }]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    placeholder="Enter your email."
                    placeholderTextColor={Colors.white}
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                )}
                name="email"
              />
            </View>
            {errors.email && (
              <Text style={styles.textError}>{errors.email.message}</Text>
            )}

            <TouchableOpacity
              style={[styles.touchableBackground, Gutters.regularTMargin]}
              onPress={handleSubmit(onSubmit)}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.touchableBackgroundText}>Confirm</Text>
              )}
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  };

  const secondStep = () => {
    return (
      <View style={width > 800 ? styles.modalTablet : styles.modal}>
        {/* <Text
          style={[
            styles.title,
            Gutters.regularTMargin,
            { color: Colors.black },
          ]}
        >
          Nhập mã xác nhận
        </Text> */}
        <View style={[Gutters.regularTMargin, styles.borderBottom]}>
          <Text style={[ColorText.fontWeight700, { color: Colors.white }]}>
            Confirmation code has been sent via email:
          </Text>
          <Text style={[ColorText.fontWeight700, { color: Colors.white }]}>
            <Text
              style={[
                ColorText.fontWeight700,
                { color: Colors.primary, fontSize: 16 },
              ]}
            >
              {email}
            </Text>
            . Please check your email inbox and enter the confirmation code.
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View style={styles.inputContainer}>
            <Controller
              control={controlCode}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: Colors.white }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  placeholder="Enter your code"
                  placeholderTextColor={Colors.white}
                  onSubmitEditing={handleSubmitConfirmCode(onSubmit)}
                />
              )}
              name="token"
            />
          </View>
          {errorConfirmCode.token && (
            <Text style={styles.textError}>
              {errorConfirmCode.token.message}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.touchableBackground, { marginTop: 5 }]}
            onPress={handleSubmitConfirmCode(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.touchableBackgroundText}>Confirm</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>

        {/* {countdown > 0 ? (
          <View style={[Layout.rowHCenter, Gutters.largeTMargin]}>
            <Text style={{ color: Colors.black }}>Gửi lại mã sau</Text>
            <Text style={[ColorText.textPrimary, Gutters.tinyLMargin]}>
              {countdown} giây
            </Text>
          </View>
        ) : (
          <View style={[Layout.rowHCenter, Gutters.largeTMargin]}>
            <Text style={{ color: Colors.black }}>
              Chưa nhận được mã xác nhận?
            </Text>
            <Pressable
              onPress={() => handleResendCode()}
              style={Layout.rowHCenter}
            >
              <Text style={[ColorText.textPrimary, Gutters.tinyLMargin]}>
                Gửi lại mã
              </Text>
              <IconFeather
                name="chevron-right"
                size={15}
                style={ColorText.textPrimary}
              />
            </Pressable>
          </View>
        )} */}
      </View>
    );
  };

  const thirdStep = () => {
    return (
      <View style={width > 800 ? styles.modalTablet : styles.modal}>
        <ScrollView>
          {/* <Text style={[styles.title, { color: Colors.black }]}>
            Cập nhật mật khẩu
          </Text> */}
          {/* <View
          style={[
            Layout.rowHCenter,
            styles.borderBottom,
            Gutters.regularBPadding,
            Gutters.regularTMargin,
          ]}
        >
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
            }}
            style={styles.avatar}
          />

          <View>
            <Text style={ColorText.fontWeight700}>Display Name</Text>
            <Text style={[styles.greyText, Gutters.tinyTMargin]}>Email</Text>
          </View>
        </View> */}
          {/* <Text style={[Gutters.regularTMargin, { color: Colors.black }]}>
            Mật khẩu mới
          </Text> */}
          <View style={[styles.inputContainer, Gutters.middleTMargin]}>
            <Controller
              control={controlResetPassword}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: Colors.white }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={isShowNewPassword}
                  autoCapitalize="none"
                  placeholder="New Password"
                  placeholderTextColor={Colors.white}
                />
              )}
              name="newPassword"
              style={styles.controller}
            />
            <Pressable onPress={() => setIsShowNewPassword(!isShowNewPassword)}>
              {isShowNewPassword ? (
                <IconFeather name="eye" size={15} color="white" />
              ) : (
                <IconFeather name="eye-off" size={15} color="white" />
              )}
            </Pressable>
          </View>
          <View style={[Gutters.middleTMargin]}>
            <View style={[Gutters.smallBMargin, Layout.rowHCenter]}>
              {!errorResetPassword.newPassword?.types.min ? (
                <Icon
                  name="checkmark-circle"
                  size={20}
                  style={[styles.orangeIcon, Gutters.tinyRMargin]}
                />
              ) : (
                <Icon
                  name="checkmark-circle-outline"
                  size={20}
                  style={[styles.orangeIcon, Gutters.tinyRMargin]}
                />
              )}

              <Text style={{ color: Colors.white }}>
                The password must be at least 8 characters
              </Text>
            </View>
            <View style={[Gutters.smallBMargin, Layout.rowHCenter]}>
              {getValidateIcon(
                "The password must start with an uppercase letter"
              )}
              <Text style={{ color: Colors.white }}>
                The password must start with an uppercase letter
              </Text>
            </View>
            <View style={[Gutters.smallBMargin, Layout.rowHCenter]}>
              {getValidateIcon("Must contain at least 1 lowercase character")}
              <Text style={{ color: Colors.white }}>
                Must contain at least 1 lowercase character
              </Text>
            </View>
            <View style={[Gutters.smallBMargin, Layout.rowHCenter]}>
              {getValidateIcon("Must contain at least 1 special character")}
              <Text style={{ color: Colors.white }}>
                Must contain at least 1 special character
              </Text>
            </View>
            <View style={[Layout.rowHCenter]}>
              {getValidateIcon("Must contain at least 1 digit")}
              <Text style={{ color: Colors.white }}>
                Must contain at least 1 digit
              </Text>
            </View>
          </View>
          {/* <Text style={[Gutters.regularTMargin, { color: Colors.black }]}>
            Nhập lại mật khẩu
          </Text> */}
          <View style={[styles.inputContainer, Gutters.middleTMargin]}>
            <Controller
              control={controlResetPassword}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: Colors.white }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={isShowConfirmNewPassword}
                  autoCapitalize="none"
                  placeholder="Re-New Password"
                  placeholderTextColor={Colors.white}
                />
              )}
              name="confirmPassword"
              style={styles.controller}
            />
            <Pressable
              onPress={() =>
                setIsShowConfirmNewPassword(!isShowConfirmNewPassword)
              }
            >
              {isShowConfirmNewPassword ? (
                // style={styles.orangeIcon}
                // style={styles.orangeIcon}
                <IconFeather name="eye" size={15} color="white" />
              ) : (
                <IconFeather name="eye-off" size={15} color="white" />
              )}
            </Pressable>
          </View>
          {errorResetPassword.confirmPassword && (
            <Text
              style={[
                ColorText.fontWeight700,
                Gutters.tinyTMargin,
                { color: "#eee" },
              ]}
            >
              {errorResetPassword.confirmPassword.message}
            </Text>
          )}
          <TouchableOpacity
            style={[Gutters.smallTMargin, styles.touchableBackground]}
            onPress={handleSubmitResetPassword(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.touchableBackgroundText}>Confirm</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const fourthStep = () => {
    return (
      <View style={width > 800 ? styles.modalTablet : styles.modal}>
        <Image
          style={Gutters.smallTMargin}
          source={require("@/Components/img/success.png")}
        />
        <Text
          style={[
            styles.title,
            Gutters.regularTMargin,
            { color: Colors.white },
          ]}
        >
          Update Password
        </Text>
        <Text style={[styles.title, { color: Colors.white }]}>success</Text>
        <TouchableOpacity
          style={[
            ColorText.backgroundPrimary,
            ,
            {
              paddingVertical: 15,
              borderRadius: 8,
              marginTop: 20,
            },
          ]}
          onPress={() => handleShowModal("loginModal")}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.touchableBackgroundText}>LOGIN</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  switch (step) {
    case 1:
      return firstStep();
    case 2:
      return secondStep();
    case 3:
      return thirdStep();
    case 4:
      return fourthStep();
    default:
      return <Text>Loi he thong</Text>;
  }
};
export default ForgotPasswordModal;
