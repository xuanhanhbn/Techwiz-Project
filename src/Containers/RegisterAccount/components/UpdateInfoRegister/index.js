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
} from "react-native";
import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IonIcons from "react-native-vector-icons/Ionicons";
import { updateInfo } from "./constant";
import { Controller, useForm } from "react-hook-form";
import { makeSelectLayout, updateInfoActions } from "./updateInfoSlice";

import DatePicker from "react-native-date-picker";
import IconFeather from "react-native-vector-icons/Feather";
import PropTypes from "prop-types";
import { compose } from "redux";

import { useState, memo } from "react";
import moment from "moment/moment";
import { useDispatch, connect, useSelector } from "react-redux";
import { useTheme } from "@/Hooks";

import { styles } from "./style";
import { Divider, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import {
  loginActions,
  makeSelectLogin,
} from "@/Containers/LoginPage/loginSlice";

const schema = yup.object({
  name: yup
    .string()
    .min(6, "At least 6 characters")
    .max(40, "UserName is max 40 characters")
    .required("Please enter your UserName"),
  city: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Please enter your City"),
  country: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Please enter your Country"),
  address: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Please enter your Address"),

  birthday: yup.string().required("Please choose birth day"),
});

const UpdateInfoRegister = ({ route }) => {
  const { dataRequest } = route.params;
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
  const [dataRequestUpdate, setDataRequestUpdate] = useState({});
  const dispatch = useDispatch();
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
    defaultValues: {},
  });

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

  // Xử lý khi ấn submit
  const onSubmit = (data) => {
    setDataRequestUpdate({ ...data, ...dataRequest });
    // dispatch(updateInfoActions.updateInfomation(newDataRequest));
  };

  useEffect(() => {
    if (Object.keys(dataRequestUpdate).length) {
      showMessage({
        message: "Success, the activation code has been sent to your email.",
        type: "success",
      });

      navigation.navigate("ACTIVE_ACCOUNT", {
        dataRequestUpdate,
      });
    }
  }, [dataRequestUpdate]);

  // Xử lí chọn ngày
  const showChooseDate = (date) => {
    let fDate = moment(date).format("YYYY-MM-DD");
    setValue("birthday", fDate);
    setShow(false);
    setChooseDate(date);
    setValueBirthDay(moment(date).format("DD/MM/YYYY"));
  };

  useEffect(() => {
    const isErrorMessage = globalData.isError;
    const checkError = globalData.dataError || "";
    if (isErrorMessage && checkError === "email") {
      dispatch(updateInfoActions.clear());
      setError("email", { type: "email", message: "Email đã được sử dụng" });
    }
    if (isErrorMessage && checkError.email) {
      dispatch(updateInfoActions.clear());
      setError("email", {
        type: "email",
        message: "Email không đúng định dạng",
      });
    }
    if (isErrorMessage && checkError === "internet") {
      dispatch(updateInfoActions.clear());
      toast.closeAll();
      toast.show({
        description: "Có lỗi xảy ra, vui lòng kiểm tra kết nối và thử lại",
      });
    }
  }, [globalData.isError]);

  // Xử lí chuyển page login
  const handleChangeLogin = () => {
    dispatch(loginActions.cleanup());
    setTimeout(() => {
      navigation.replace("LOGIN", { type: "UPDATE_INFO_ACCOUNT" });
    }, 500);
    reset();
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
        <FlashMessage position="top" />

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
                {updateInfo.map((item) => {
                  const { field } = item;
                  const message = errors[field] && errors[field].message;
                  return (
                    <View key={field}>
                      <View style={[Layout.row, styles.inputContainer]}>
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <TextInput
                                editable={
                                  userInfo?.verifiedEmail &&
                                  item.field === "email"
                                    ? false
                                    : true
                                }
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={
                                  item.field === "birthday"
                                    ? valueBirthDay
                                    : value
                                }
                                style={[
                                  styles.inputValue,
                                  // eslint-disable-next-line react-native/no-inline-styles
                                  {
                                    fontSize: FontSize.small,
                                    color: Colors.white,
                                  },
                                ]}
                                placeholder={item.placeholder}
                                placeholderTextColor={Colors.white}
                                keyboardType={
                                  field === "phoneNumber"
                                    ? "numeric"
                                    : "default"
                                }
                                onPressIn={
                                  item.field === "birthday"
                                    ? () => setShow(true)
                                    : null
                                }
                              />
                            );
                          }}
                          name={item.field}
                        />

                        {item.field === "birthday" && (
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
                    UPDATE
                  </Text>
                </TouchableOpacity>
                {show && (
                  <DatePicker
                    modal
                    mode="date"
                    open={show}
                    date={chooseDate}
                    onConfirm={(date) => showChooseDate(date)}
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
