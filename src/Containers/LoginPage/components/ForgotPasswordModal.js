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
// import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme, useCountdown } from "@/Hooks";
import { changeTheme } from "@/Store/Theme";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/Ionicons";
import IconFeather from "react-native-vector-icons/Feather";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { loginActions, makeSelectLogin } from "../loginSlice";
import styles from "../style";
import {
  confirmEmailSchema,
  confirmCodeSchema,
  resetPasswordSchema,
} from "../constants";
import { postApiLogin, getApiUser, postApi } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ForgotPasswordModal = (props) => {
  const { t } = useTranslation();
  const { handleShowModal } = props;
  const { Common, Fonts, Gutters, Layout, ColorText, Colors } = useTheme();
  const { width, height } = Dimensions.get("window");
  const { countdown, startCountdown, stopCountdown, resetCountdown } =
    useCountdown(60);
  // const dispatch = useDispatch();
  // const loginData = useSelector(makeSelectLogin);
  // const { isLoading, errorMessage, forgotPassword, checkCode, resetPassword } =
  //   loginData;

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isShowNewPassword, setIsShowNewPassword] = useState(true);
  const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] =
    useState(true);

  const {
    control,
    handleSubmit,
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
      confirmNewPassword: "",
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  useEffect(() => {
    // dispatch(loginActions.cleanup());
    trigger("newPassword");
  }, []);

  // useEffect(() => {
  //   if (forgotPassword.status === 1) {
  //     setStep(2);
  //     resetCountdown(60);
  //     startCountdown();
  //     resetConfirmCode();
  //   }
  // }, [forgotPassword]);

  // useEffect(() => {
  //   if (checkCode.status === 1) {
  //     setStep(3);
  //   }
  // }, [checkCode]);

  // useEffect(() => {
  //   if (resetPassword.status === 1) {
  //     setStep(4);
  //   }
  // }, [resetPassword]);

  // useEffect(() => {
  //   if (countdown === 0) {
  //     stopCountdown();
  //   }
  // }, [countdown]);

  const confirmEmailMutation = useMutation(
    (data) => {
      return postApi("api/v1/users/forgot-password", data);
    },
    {
      onSuccess: async (data, variables, context) => {
        if (data.data?.status === 1) {
          setStep(2);
          resetCountdown(60);
          startCountdown();
          resetConfirmCode();
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

  const checkCodeMutation = useMutation(
    (data) => {
      return postApi("api/v1/users/check/reset-password-token", data);
    },
    {
      onSuccess: async (data, variables, context) => {
        if (data.data?.status === 1) {
          setStep(3);
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

  const resetPasswordMutation = useMutation(
    (data) => {
      return postApi(`api/v1/users/reset-password/${code.token}`, data);
    },
    {
      onSuccess: async (data, variables, context) => {
        if (data.data?.status === 1) {
          setStep(4);
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

  const onSubmit = (data) => {
    if (step === 1) {
      setEmail(data.email);
      confirmEmailMutation.mutate(data)
    } else if (step === 2) {
      // dispatch(loginActions.checkCode({ email: email, ...data }));
      checkCodeMutation.mutate({ email: email, ...data })
      setCode(data);
    } else if (step === 3) {
      resetPasswordMutation.mutate({ code: code, ...data })
      // dispatch(loginActions.resetPassword({ code: code, ...data }));
    }
  };

  // gửi lại mã xác nhận
  const handleResendCode = () => {
    confirmEmailMutation.mutate({ email: email });
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
        <View style={styles.borderBottom}>
          <Text style={[styles.title, { color: Colors.black }]}>
            Quên mật khẩu
          </Text>
        </View>
        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Text style={[styles.label, { color: Colors.black }]}>Email</Text>
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
                    placeholder="Nhập email của bạn"
                    placeholderTextColor={Colors.gray}
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
              {confirmEmailMutation.isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.touchableBackgroundText}>Xác nhận</Text>
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
        <Pressable style={Layout.rowHCenter} onPress={() => setStep(1)}>
          <Icon
            name="arrow-back-outline"
            size={20}
            style={[Gutters.tinyRMargin, { color: Colors.black }]}
          />
          <Text style={{ color: Colors.black }}>Quên mật khẩu</Text>
        </Pressable>
        <Text
          style={[
            styles.title,
            Gutters.regularTMargin,
            { color: Colors.black },
          ]}
        >
          Nhập mã xác nhận
        </Text>
        <View style={[Gutters.regularTMargin, styles.borderBottom]}>
          <Text style={{ color: Colors.black }}>
            Mã xác nhận đã được gửi qua email
          </Text>
          <Text style={{ color: Colors.black }}>
            <Text style={[ColorText.fontWeight700, { color: Colors.black }]}>
              {email}
            </Text>
            . Vui lòng kiểm tra lại hòm thư và nhập mã xác nhận
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <Text style={[styles.label, { color: Colors.black }]}>
            Mã xác nhận
          </Text>
          <View style={styles.inputContainer}>
            <Controller
              control={controlCode}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: Colors.gray }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  placeholder="Nhập mã xác nhận"
                  placeholderTextColor={Colors.gray}
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
            style={styles.touchableBackground}
            onPress={handleSubmitConfirmCode(onSubmit)}
          >
            {checkCodeMutation.isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.touchableBackgroundText}>Xác nhận</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>

        {countdown > 0 ? (
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
        )}
      </View>
    );
  };
  const thirdStep = () => {
    return (
      <View style={width > 800 ? styles.modalTablet : styles.modal}>
        <ScrollView>
          <Text style={[styles.title, { color: Colors.black }]}>
            Cập nhật mật khẩu
          </Text>
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
          <Text style={[Gutters.regularTMargin, { color: Colors.black }]}>
            Mật khẩu mới
          </Text>
          <View style={[styles.inputContainer, Gutters.middleTMargin]}>
            <Controller
              control={controlResetPassword}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: Colors.gray }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={isShowNewPassword}
                  autoCapitalize="none"
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor={Colors.gray}
                />
              )}
              name="newPassword"
              style={styles.controller}
            />
            <Pressable onPress={() => setIsShowNewPassword(!isShowNewPassword)}>
              {isShowNewPassword ? (
                <IconFeather name="eye" size={15} style={styles.orangeIcon} />
              ) : (
                <IconFeather
                  name="eye-off"
                  size={15}
                  style={styles.orangeIcon}
                />
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

              <Text style={{ color: Colors.black }}>
                Mật khẩu có ít nhất 8 ký tự
              </Text>
            </View>
            <View style={[Gutters.smallBMargin, Layout.rowHCenter]}>
              {getValidateIcon("Mật khẩu phải bắt đầu bằng chữ in hoa")}
              <Text style={{ color: Colors.black }}>
                Chứa ít nhất 1 ký tự viết hoa
              </Text>
            </View>
            <View style={[Gutters.smallBMargin, Layout.rowHCenter]}>
              {getValidateIcon("Chứa ít nhất 1 ký tự viết thường")}
              <Text style={{ color: Colors.black }}>
                Chứa ít nhất 1 ký tự viết thường
              </Text>
            </View>
            <View style={[Gutters.smallBMargin, Layout.rowHCenter]}>
              {getValidateIcon("Chứa ít nhất 1 ký tự đặc biệt")}
              <Text style={{ color: Colors.black }}>
                Chứa ít nhất 1 ký tự đặc biệt
              </Text>
            </View>
            <View style={[Layout.rowHCenter]}>
              {getValidateIcon("Chứa ít nhất 1 ký tự số")}
              <Text style={{ color: Colors.black }}>
                Chứa ít nhất 1 ký tự số
              </Text>
            </View>
          </View>
          <Text style={[Gutters.regularTMargin, { color: Colors.black }]}>
            Nhập lại mật khẩu
          </Text>
          <View style={[styles.inputContainer, Gutters.middleTMargin]}>
            <Controller
              control={controlResetPassword}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: Colors.gray }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={isShowConfirmNewPassword}
                  autoCapitalize="none"
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor={Colors.gray}
                />
              )}
              name="confirmNewPassword"
              style={styles.controller}
            />
            <Pressable
              onPress={() =>
                setIsShowConfirmNewPassword(!isShowConfirmNewPassword)
              }
            >
              {isShowConfirmNewPassword ? (
                <IconFeather name="eye" size={15} style={styles.orangeIcon} />
              ) : (
                <IconFeather
                  name="eye-off"
                  size={15}
                  style={styles.orangeIcon}
                />
              )}
            </Pressable>
          </View>
          {errorResetPassword.confirmNewPassword && (
            <Text style={[ColorText.textDanger, Gutters.tinyTMargin]}>
              {errorResetPassword.confirmNewPassword.message}
            </Text>
          )}
          <TouchableOpacity
            style={styles.touchableBackground}
            onPress={handleSubmitResetPassword(onSubmit)}
          >
            {resetPasswordMutation.isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.touchableBackgroundText}>Xác nhận</Text>
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
            { color: Colors.black },
          ]}
        >
          Cập nhật mật khẩu
        </Text>
        <Text style={[styles.title, { color: Colors.black }]}>thành công</Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            paddingVertical: 15,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={() => handleShowModal("loginModal")}
        >
            <Text style={styles.touchableBackgroundText}>Đăng nhập ngay</Text>
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
