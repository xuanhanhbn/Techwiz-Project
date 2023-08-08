/* eslint-disable react-hooks/exhaustive-deps */
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { updateInfo } from './constant';
import { Controller, useForm } from 'react-hook-form';
import { makeSelectLayout, updateInfoActions } from './updateInfoSlice';

import DatePicker from 'react-native-date-picker';
import IconFeather from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { useState, memo } from 'react';
import moment from 'moment/moment';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useTheme } from '@/Hooks';

import { styles } from './style';
import { Divider, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import {
  loginActions,
  makeSelectLogin,
} from '@/Containers/LoginPage/loginSlice';

const schema = yup.object({
  displayName: yup
    .string()
    .max(70, 'Tên đăng nhập không quá 40 kí tự')
    .required('Vui lòng nhập tên người dùng'),
  phoneNumber: yup
    .string()
    .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/, 'Sai định dạng')
    // .max(10, "Tối đa 10 số")
    .required('Vui lòng nhập số điện thoại'),
  email: yup
    .string()
    .matches(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      'Email sai định dạng',
    )
    .required('Vui lòng nhập email'),
  birthday: yup.string().required('Vui lòng chọn ngày sinh'),
});

const UpdateInfoRegister = ({ route }) => {
  const { dataRegister } = route.params;
  const globalData = useSelector(makeSelectLayout);
  const { isLoading } = globalData;
  const loginPageData = useSelector(makeSelectLogin);
  const { userInfo } = loginPageData;
  const { Gutters, Layout, Fonts, FontSize, ColorText, Border, Colors } =
    useTheme();
  const navigation = useNavigation();
  const [chooseDate, setChooseDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [valueBirthDay, setValueBirthDay] = useState(false);
  const dispatch = useDispatch();
  const [emailUser, setEmailUser] = useState('');
  const toast = useToast();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: userInfo?.email || '',
      displayName: userInfo?.displayName || '',
      phoneNumber: userInfo?.phoneNumber || '',
      birthday: userInfo?.birthday || '',
    },
  });

  // Kiểm tra nếu có defaultValue thì sẽ set mặc định ( khi login bằng fb or google)
  useEffect(() => {
    if (userInfo?.birthday) {
      setValueBirthDay(moment(userInfo?.birthday).format('DD/MM/YYYY'));
    }
    if (userInfo?.email) {
      setValue('email', userInfo?.email);
    }
    if (userInfo?.displayName) {
      setValue('displayName', userInfo?.displayName);
    }
    if (userInfo?.phoneNumber) {
      setValue('phoneNumber', userInfo?.phoneNumber);
    }
  }, [userInfo]);

  useEffect(() => navigation.addListener('beforeRemove', (event) => {
    // console.log('aaaaaaa');
    // trường hợp step active ! === 2 và muốn back lại thì sẽ chặn
    if (userInfo?.stepActive !== '2' && (event?.data?.action?.type === 'POP' || event?.data?.action?.type === 'GO_BACK')){
      event.preventDefault();
    }
    return () => {
    // console.log('bbbbbbb');
      navigation.removeListener('beforeRemove');
    };
  }), [navigation, userInfo]);

  // Xử lý khi ấn submit
  const onSubmit = data => {
    const idUser = dataRegister ? dataRegister.id : userInfo.id;
    const parseData = { data, idUser };
    setEmailUser(data ? data.email : '');
    dispatch(updateInfoActions.updateInfomation(parseData));
  };

  // Xử lí chọn ngày
  const showChooseDate = date => {
    let fDate = moment(date).format('YYYY-MM-DD');
    setValue('birthday', fDate);
    setShow(false);
    setChooseDate(date);
    setValueBirthDay(moment(date).format('DD/MM/YYYY'));
  };

  // Xử lí khi cập nhật thành công thì chuyển sang component active
  useEffect(() => {
    if (globalData.isSuccess && !userInfo?.verifiedEmail) {
      dispatch(updateInfoActions.clear());
      navigation.replace('ACTIVE_ACCOUNT', {
        emailUser: emailUser,
      });
      toast.closeAll();
      toast.show({
        description: 'Thành công, mã kích hoạt đã được gửi về email của bạn',
      });
    }
    if (globalData.isSuccess && userInfo?.verifiedEmail) {
      dispatch(updateInfoActions.clear());
      navigation.replace('Main');
      toast.closeAll();
      toast.show({
        description: 'Thành công',
      });
    }
    reset();
  }, [globalData.isSuccess]);

  useEffect(() => {
    const isErrorMessage = globalData.isError;
    const checkError = globalData.dataError || '';
    if (isErrorMessage && checkError === 'email') {
      dispatch(updateInfoActions.clear());
      setError('email', { type: 'email', message: 'Email đã được sử dụng' });
    }
    if (isErrorMessage && checkError.email) {
      dispatch(updateInfoActions.clear());
      setError('email', {
        type: 'email',
        message: 'Email không đúng định dạng',
      });
    }
    if (isErrorMessage && checkError === 'internet') {
      dispatch(updateInfoActions.clear());
      toast.closeAll();
      toast.show({
        description: 'Có lỗi xảy ra, vui lòng kiểm tra kết nối và thử lại',
      });
    }
  }, [globalData.isError]);

  // Xử lí chuyển page login
  const handleChangeLogin = () => {
    dispatch(loginActions.cleanup());
    setTimeout(() => {
      navigation.replace('LOGIN', { type: 'UPDATE_INFO_ACCOUNT' });
    }, 500);
    reset();
  };

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
          <View
            style={[
              styles.registerContainer,
              // { backgroundColor: Colors.modalBackground },
            ]}
          >
            {isLoading && (
              <ActivityIndicator size="small" color={Colors.primary} />
            )}

            <View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <Text
                    style={[
                      Fonts.textRegular,
                      ColorText.fontWeight800,
                      Gutters.regularBMargin,
                      { color: Colors.black },
                    ]}
                  >
                    Cập nhật thông tin
                  </Text>
                </View>
                {updateInfo.map(item => {
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
                      <View style={[Layout.row, styles.inputContainer]}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <TextInput
                                editable={
                                  userInfo?.verifiedEmail &&
                                  item.field === 'email'
                                    ? false
                                    : true
                                }
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={
                                  item.field === 'birthday'
                                    ? valueBirthDay
                                    : value
                                }
                                style={[
                                  styles.inputValue,
                                  // eslint-disable-next-line react-native/no-inline-styles
                                  {
                                    fontSize: FontSize.small,
                                    color: Colors.gray,
                                    backgroundColor:
                                      userInfo?.verifiedEmail &&
                                      item.field === 'email'
                                        ? '#eee'
                                        : '#FFF7F5',
                                  },
                                ]}
                                placeholder={item.placeholder}
                                placeholderTextColor={Colors.gray}
                                keyboardType={
                                  field === 'phoneNumber'
                                    ? 'numeric'
                                    : 'default'
                                }
                                onPressIn={
                                  item.field === 'birthday'
                                    ? () => setShow(true)
                                    : null
                                }
                              />
                            );
                          }}
                          name={item.field}
                        />

                        {item.field === 'birthday' && (
                          <IconFeather
                            // size={20}
                            style={[
                              styles.iconShowPass,
                              { fontSize: FontSize.small },
                            ]}
                            name="calendar"
                            onPress={() => setShow(true)}
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
                    Cập nhật
                  </Text>
                </TouchableOpacity>
                {show && (
                  <DatePicker
                    modal
                    mode="date"
                    open={show}
                    date={chooseDate}
                    onConfirm={date => showChooseDate(date)}
                    onCancel={() => {
                      setShow(false);
                    }}
                    maximumDate={new Date()}
                  />
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

UpdateInfoRegister.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // dataList: PropTypes.array.isRequired,
};

// const mapStateToProps = {
//   UpdateInfoRegister: makeSelectLayout(),
// };

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapDispatchToProps);

export default compose(withConnect, memo)(UpdateInfoRegister);
