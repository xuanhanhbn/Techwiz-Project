/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import { changePasswordSchema } from '../constants';
import { userActions } from '../userSlice';
import { useDispatch } from 'react-redux';
import IconFeather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@/Hooks';
import styles from '../style';

const ChangePasswordModal = props => {
  const { handleShowModal, isLoading } = props;
  const { Fonts, Gutters, Layout, ColorText, Colors } = useTheme();
  const dispatch = useDispatch();

  // const [isShowPassword, setIsShowPassword] = useState({
  //   currentPassword: true,
  //   newPassword: true,
  //   confirmNewPassword: true,
  // });

  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(true);
  const [isShowNewPassword, setIsShowNewPassword] = useState(true);
  const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] =
    useState(true);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all', // validate các lỗi cùng lúc
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(changePasswordSchema),
  });

  // const togglePassword = (inputName) => {
  //   const newShowPassword = { ...isShowPassword };
  //   console.log(newShowPassword)
  //   // Object.keys(newShowPassword).forEach((key) => {
  //   //   newShowPassword[key] = true;
  //   // });
  //   setIsShowPassword({
  //     ...newShowPassword,
  //     [inputName]: isShowPassword.inputName,
  //   });
  //   console.log(isShowPassword)
  // };

  // const togglePassword = (inputName) => {
  //   setIsShowPassword({...isShowPassword, [inputName]: !isShowPassword.inputName})
  // }

  // const [errorMsg, setErrorMsg] = useState({
  //   matches: true,
  //   max: true,
  // });

  useEffect(() => {
    trigger('newPassword');
  }, []);

  const onSubmit = data => {
    dispatch(userActions.changePassword(data));
  };

  const getValidateIcon = errorText => {
    const isErrorMatches =
      errors.newPassword?.types.matches?.includes(errorText);
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

  return (
    <View>
      <View
        style={[styles.container, { backgroundColor: Colors.modalBackground }]}
      >
        <View
          style={[
            Gutters.largeBPadding,
            styles.borderBottom,
            Gutters.smallTMargin,
          ]}
        >
          <Text style={[styles.title, { color: Colors.text }]}>
            Thay đổi mật khẩu
          </Text>
        </View>
        <View style={Gutters.regularTMargin}>
          <View style={[Gutters.regularBPadding, styles.borderBottom]}>
            <Text style={[Fonts.textBold, { color: Colors.text }]}>
              Xác thực
            </Text>
            <Text style={[Gutters.regularTMargin, { color: Colors.text }]}>
              Mật khẩu hiện tại
            </Text>
            <View
              style={[
                styles.inputContainer,
                Gutters.middleTMargin,
                { backgroundColor: Colors.inputBackground, borderRadius: 8 },
              ]}
            >
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, { color: Colors.text }]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={isShowCurrentPassword}
                    autoCapitalize="none"
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor={Colors.gray}
                  />
                )}
                name="currentPassword"
                style={styles.controller}
              />
              <Pressable
                onPress={() => setIsShowCurrentPassword(!isShowCurrentPassword)}
              >
                {isShowCurrentPassword ? (
                  <IconFeather
                    name="eye-off"
                    size={15}
                    style={styles.orangeIcon}
                  />
                ) : (
                  <IconFeather name="eye" size={15} style={styles.orangeIcon} />
                )}
              </Pressable>
            </View>
            {errors.currentPassword && (
              <Text style={[ColorText.textDanger, Gutters.tinyTMargin]}>
                {errors.currentPassword.message}
              </Text>
            )}
          </View>
          <View
            style={[
              Gutters.regularTPadding,
              Gutters.largeBPadding,
              styles.borderBottom,
            ]}
          >
            <Text style={[Fonts.textBold, { color: Colors.text }]}>
              Cập nhật mật khẩu mới
            </Text>
            <Text style={[Gutters.regularTMargin, { color: Colors.text }]}>
              Mật khẩu mới
            </Text>
            <View
              style={[
                styles.inputContainer,
                Gutters.middleTMargin,
                { backgroundColor: Colors.inputBackground, borderRadius: 8 },
              ]}
            >
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, { color: Colors.text }]}
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
              <Pressable
                onPress={() => setIsShowNewPassword(!isShowNewPassword)}
              >
                {isShowNewPassword ? (
                  <IconFeather
                    name="eye-off"
                    size={15}
                    style={styles.orangeIcon}
                  />
                ) : (
                  <IconFeather name="eye" size={15} style={styles.orangeIcon} />
                )}
              </Pressable>
            </View>
            <View style={[Gutters.middleTMargin]}>
              <View style={[Gutters.smallBMargin, Layout.rowHCenter]}>
                {!errors.newPassword?.types.min ? (
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

                <Text style={{ color: Colors.text }}>
                  Mật khẩu có ít nhất 8 ký tự
                </Text>
              </View>
              <View style={[Gutters.smallBMargin, Layout.rowHCenter]}>
                {getValidateIcon('Mật khẩu phải bắt đầu bằng chữ in hoa')}
                <Text style={{ color: Colors.text }}>
                  Chứa ít nhất 1 ký tự viết hoa
                </Text>
              </View>
              <View style={[Gutters.smallBMargin, Layout.rowHCenter]}>
                {getValidateIcon('Chứa ít nhất 1 ký tự viết thường')}
                <Text style={{ color: Colors.text }}>
                  Chứa ít nhất 1 ký tự viết thường
                </Text>
              </View>
              <View style={[Gutters.smallBMargin, Layout.rowHCenter]}>
                {getValidateIcon('Chứa ít nhất 1 ký tự đặc biệt')}
                <Text style={{ color: Colors.text }}>
                  Chứa ít nhất 1 ký tự đặc biệt
                </Text>
              </View>
              <View style={[Layout.rowHCenter]}>
                {getValidateIcon('Chứa ít nhất 1 ký tự số')}
                <Text style={{ color: Colors.text }}>
                  Chứa ít nhất 1 ký tự số
                </Text>
              </View>
            </View>
            <Text style={[Gutters.regularTMargin, { color: Colors.text }]}>
              Nhập lại mật khẩu
            </Text>
            <View
              style={[
                styles.inputContainer,
                Gutters.middleTMargin,
                { backgroundColor: Colors.inputBackground, borderRadius: 8 },
              ]}
            >
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, { color: Colors.text }]}
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
                  <IconFeather
                    name="eye-off"
                    size={15}
                    style={styles.orangeIcon}
                  />
                ) : (
                  <IconFeather name="eye" size={15} style={styles.orangeIcon} />
                )}
              </Pressable>
            </View>
            {errors.confirmNewPassword && (
              <Text style={[ColorText.textDanger, Gutters.tinyTMargin]}>
                {errors.confirmNewPassword.message}
              </Text>
            )}
          </View>
        </View>
        <View style={[Layout.row, Gutters.regularTPadding]}>
          <Pressable
            style={[
              Layout.fill,
              Layout.center,
              Gutters.tinyLMargin,
              Gutters.middleVPadding,
              styles.buttonSecondary,
            ]}
            onPress={() => handleShowModal('generalAccountModal')}
          >
            <Text style={[ColorText.textPrimary, ColorText.fontWeight700]}>
              Huỷ
            </Text>
          </Pressable>
          <Pressable
            style={[
              Layout.fill,
              Layout.center,
              Gutters.middleVPadding,
              Gutters.smallLMargin,
              styles.buttonPrimary,
            ]}
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={[ColorText.white, ColorText.fontWeight700]}>
                Cập nhật
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ChangePasswordModal;
