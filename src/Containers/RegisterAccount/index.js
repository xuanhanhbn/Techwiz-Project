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
} from 'react-native';
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { styles } from './style';
import { registerAccount } from './constant';
import { useDispatch, useSelector, connect } from 'react-redux';
import { registerActions, makeSelectLayout } from './registerSlice';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Divider } from '@rneui/base';
import { useTheme } from '@/Hooks';
import { useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
// import { loginActions } from '../LoginPage/loginSlice';
import analytics from '@react-native-firebase/analytics';

const schema = yup.object({
  name: yup
    .string()
    .min(6, 'Tối thiểu 6 kí tự và chỉ được nhập chữ, số')
    .max(40, 'Tên đăng nhập không quá 40 kí tự')
    .matches(/^[a-zA-Z0-9]{6,}$/, 'Tối thiểu 6 kí tự và chỉ được nhập chữ, số')
    .required('Vui lòng nhập Tên đăng nhập'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()?-_+={}[]|:;""''><,.\/])[A-Za-z\d`~!@#$%^&*()?-_+={}[]|:;""''><,.\/&]{8,}$/,
      'Mật khẩu tối thiểu 8 kí tự phải bao gồm chữ in hoa, chữ in thường, số và kí tự đặc biệt',
    )
    .required('Vui lòng nhập mật khẩu'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf(
      [yup.ref('password'), null],
      'Mật khẩu không trùng khớp, vui lòng nhập lại',
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
  const onSubmit = data => {
    dispatch(registerActions.registerAccount(data));
    analytics().logSignUp({ method: 'Manual' });
  };

  // Xử lý khi người dùng click vào 'Điều khoản dịch vụ' hoặc 'bảo mật'
  const handleConfirm = text => {
    let url = '';
    // Điều khoản
    if (text === 'rules') {
      url = 'https://star.vn/terms-of-agreement';
      Linking.openURL(url);
    }
    // Quy chế
    if (text === 'regulation') {
      url = 'https://star.vn/operating-regulations';
      Linking.openURL(url);
    }
    // Chính sách bảo mật
    if (text === 'privacy') {
      url = 'https://star.vn/privacy-policy';
      Linking.openURL(url);
    }
  };

  // Xử lý khi người dùng click icon show/hide password
  const handleShowPasswordIcon = type => {
    if (type === 'password') {
      setIsShowPassWord({
        ...isShowPassWord,
        password: !isShowPassWord.password,
      });
    }
    if (type === 'rePassword') {
      setIsShowPassWord({
        ...isShowPassWord,
        rePassWord: !isShowPassWord.rePassWord,
      });
    }
  };

  // Xử lý khi người dùng click icon show/hide password
  const handleShowPassWordInput = item => {
    if (item.type === 'password') {
      return isShowPassWord.password;
    }
    if (item.type === 'rePassword') {
      return isShowPassWord.rePassWord;
    }
    return false;
  };

  // Xử lý khi đăng kí thành công thì chuyển form cập nhật
  useEffect(() => {
    if (globalData.isSuccess) {
      dispatch(registerActions.clear());
      navigation.replace('UPDATE_INFO_ACCOUNT', {
        dataRegister,
      });
      toast.closeAll();
      toast.show({
        description: 'Thành công',
      });
      reset();
    }
  }, [globalData.isSuccess]);

  // Xử lí check trùng tên đăng nhập
  useEffect(() => {
    const isErrorMessage = globalData.isError;
    const checkError = globalData.dataError || '';
    if (isErrorMessage && checkError === 'name') {
      dispatch(registerActions.clear());
      setError('name', {
        type: 'name',
        message: 'Tên đăng nhập đã được sử dụng',
      });
    }

    if (isErrorMessage && checkError === 'internet') {
      dispatch(registerActions.clear());
      toast.closeAll();
      toast.show({
        description: 'Có lỗi xảy ra, vui lòng kiểm tra kết nối và thử lại',
      });
    }
  }, [globalData.isError]);

  const handleChangeLogin = () => {
    navigation.push('LOGIN');
  };

  const handleRedirectMain = () => navigation.navigate('Main');

  return (
    <KeyboardAvoidingView
      style={Layout.fill}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require('@/Components/img/backgroundHome.png')}
      >
        {/* Header */}
        <View>
          <View style={[Layout.rowHCenter]}>
            <Image
              style={[Gutters.regularVMargin, Gutters.regularHMargin]}
              source={require('@/Components/img/logo.png')}
            />
            <Divider
              style={[Gutters.regularVMargin]}
              orientation="vertical"
              // width={5}
              color="white"
            />
            <Text
              style={[
                Gutters.regularLMargin,
                ColorText.white,
                ColorText.fontWeight700,
                { fontSize: FontSize.small },
              ]}
            >
              Đăng ký
            </Text>

            <View style={styles.rightHeader}>
              <Text
                style={[
                  Gutters.regularLMargin,
                  ColorText.white,
                  { fontSize: FontSize.small },
                ]}
              >
                Bạn đã có tài khoản?
              </Text>
              <TouchableOpacity onPress={() => handleChangeLogin()}>
                <Text
                  style={[
                    ColorText.white,
                    Gutters.regularLMargin,
                    ColorText.fontWeight800,
                    { fontSize: FontSize.small },
                  ]}
                >
                  Đăng nhập
                  <IonIcons name="chevron-forward-outline" />
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
                <View>
                  <Text
                    style={[
                      Fonts.textRegular,
                      ColorText.fontWeight800,
                      Gutters.regularBMargin,
                      { color: Colors.black },
                    ]}
                  >
                    Tạo tài khoản ngay
                  </Text>
                </View>
                {registerAccount.map(item => {
                  const { field } = item;
                  const message = errors[field] && errors[field].message;
                  return (
                    <View key={field}>
                      <Text
                        style={[
                          ColorText.colorLabels,
                          ColorText.fontWeight700,
                          Gutters.smallVMargin,
                          { fontSize: FontSize.small },
                        ]}
                      >
                        {item.name}
                      </Text>

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
                                  color: Colors.gray,
                                },
                              ]}
                              placeholder={item.placeholder}
                              placeholderTextColor={Colors.gray}
                              secureTextEntry={handleShowPassWordInput(item)}
                            />
                          )}
                          name={item.field}
                        />

                        {item.type === 'password' && (
                          <IonIcons
                            style={[
                              styles.iconShowPass,
                              { fontSize: FontSize.small },
                            ]}
                            name={
                              isShowPassWord.password
                                ? 'eye-off-outline'
                                : 'eye-outline'
                            }
                            size={20}
                            onPress={() => handleShowPasswordIcon(item.type)}
                          />
                        )}
                        {item.type === 'rePassword' && (
                          <IonIcons
                            style={[
                              styles.iconShowPass,
                              { fontSize: FontSize.small },
                            ]}
                            name={
                              isShowPassWord.rePassWord
                                ? 'eye-off-outline'
                                : 'eye-outline'
                            }
                            size={20}
                            onPress={() => handleShowPasswordIcon(item.type)}
                          />
                        )}
                      </View>

                      <Text
                        style={[
                          ColorText.textDanger,
                          Gutters.tinyVMargin,
                          Gutters.regularHMargin,
                          { fontSize: FontSize.small },
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
                    Tạo tài khoản
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRedirectMain()}>
                  <View style={styles.boxContinue}>
                    <Text style={styles.continue}>
                      Tiếp tục sử dụng mà không đăng nhập
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={[Gutters.regularVPadding, Layout.center]}>
                  <View>
                    <Text
                      style={[
                        Layout.textAlignCenter,
                        ColorText.fontWeight500,
                        // ColorText.textDiscription,
                        { fontSize: FontSize.small, color: Colors.gray },
                      ]}
                    >
                      Khi nhấn đăng ký, bạn đồng ý với chúng tôi về{' '}
                    </Text>
                  </View>
                  <View style={[Layout.rowHCenter]}>
                    <TouchableOpacity onPress={() => handleConfirm('rules')}>
                      <Text
                        style={[
                          ColorText.textPrimary,
                          { fontSize: FontSize.small },
                        ]}
                      >
                        Điều khoản,{' '}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleConfirm('regulation')}
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
                      {' '}
                      &{' '}
                    </Text>
                    <TouchableOpacity onPress={() => handleConfirm('privacy')}>
                      <Text
                        style={[
                          ColorText.textPrimary,
                          { fontSize: FontSize.small },
                        ]}
                      >
                        Chính sách bảo mật
                      </Text>
                    </TouchableOpacity>
                  </View>
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
