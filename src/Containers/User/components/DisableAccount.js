/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/Hooks";
import { Dialog } from "@rneui/themed";
import { useToast } from "native-base";
import { inputDisableAccount } from "../constants";
import { Controller, useForm } from "react-hook-form";
import { Colors as CommonColor } from "@/Theme/Variables";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectUser, userActions } from "../userSlice";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Colors } from "@/Theme/Variables";
import { useNavigation } from "@react-navigation/native";
import EncryptedStorage from "react-native-encrypted-storage";
import {
  loginActions,
  makeSelectLogin,
} from "@/Containers/LoginPage/loginSlice";
import analytics from "@react-native-firebase/analytics";

const schema = yup.object({
  password: yup.string().required("Please Enter Your Password"),
});
const DisableAccount = (props) => {
  const { onOpen, onClose, setIsShowAlert, isShowAlert } = props;
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const baseDataRequest = {
    name: "",
    password: "",
  };

  const dispatch = useDispatch();
  const toast = useToast();
  const { Fonts, Gutters, Layout, ColorText, FontSize, Border } = useTheme();
  const [dataRequest, setDataRequest] = useState(baseDataRequest);
  const [isShowPassWord, setIsShowPassWord] = useState(true);

  const userPage = useSelector(makeSelectUser);
  const { isErrorDisableAccount, isDisableAccount } = userPage;
  console.log("userPage: ", userPage);
  const isLoading = userPage?.isLoading;
  const loginData = useSelector(makeSelectLogin);
  const { userInfo } = loginData;

  // Close Modal
  const handleClose = () => onClose();

  // Submit modal
  const onSubmit = (data) => {
    const newDataRequest = {
      password: data.password,
    };
    dispatch(userActions.disableAccount(newDataRequest));
    // reset();
  };

  // Xử lí khi ấn đồng ý trên Alert
  const handleDisableAccount = () => {
    setIsShowAlert(false);
    const newDataRequest = {
      ...dataRequest,
      name: "",
      password: "",
    };
    dispatch(userActions.disableAccount(newDataRequest));
  };

  // Show/Hide Icon
  const handleShowPasswordIcon = () => {
    setIsShowPassWord(!isShowPassWord);
  };

  // Xử lý khi người dùng click icon show/hide password
  const handleShowPassWordInput = (item) => {
    if (item.field === "password") {
      return isShowPassWord;
    }
    return false;
  };

  const handleNavigateLogin = () => {
    navigation.replace("LOGIN");
  };

  const handleOpenConfirmRemove = () => {
    Alert.alert(
      "Delete profile success",
      "Thank you for using Stream Master's services!",
      [
        {
          text: "OK",
          // onPress: () => handleNavigateLogin(),
        },
      ]
    );
  };

  const handleShowAlertRemove = () => {
    if (isShowAlert) {
      return Alert.alert(
        "Delete Profile",
        "Are you sure you want to delete your account? Upon deletion, your account will no longer have access to Stream Master services",
        [
          {
            text: "Delete",
            onPress: () => {
              handleDisableAccount();
            },
          },
          {
            text: "Cancel",
            onPress: () => handleClose(),
          },
        ]
      );
    }
  };

  // Xử lí khi nhập sai mật khẩu
  useEffect(() => {
    if (isErrorDisableAccount) {
      dispatch(userActions.clear());
      setError("password", {
        type: "password",
        message: "Incorrect password",
      });
    }
  }, [isErrorDisableAccount]);

  const handleRedirect = async () => {
    await EncryptedStorage.removeItem("loginData");
    await EncryptedStorage.removeItem("userInfo");
    handleOpenConfirmRemove();
    dispatch(loginActions.cleanup());
    setTimeout(() => {
      handleNavigateLogin();
    }, 500);
  };

  // Xử lí khi xoá thành công
  useEffect(() => {
    if (isDisableAccount) {
      dispatch(userActions.clear());
      handleRedirect();
    }
  }, [isDisableAccount]);

  return (
    <>
      <Dialog
        isVisible={onOpen}
        onBackdropPress={() => handleClose()}
        overlayStyle={[
          {
            backgroundColor: Colors.secondaryBackground,
            width: "90%",
            borderRadius: 12,
          },
        ]}
      >
        <Text
          style={[
            Layout.textAlignCenter,
            ColorText.fontWeight700,
            {
              color: Colors.white,
              textTransform: "uppercase",
              fontSize: FontSize.small,
            },
          ]}
        >
          delete profile
        </Text>
        <Text style={[Gutters.tinyTMargin, { color: Colors.white }]}>
          Are you sure you want to delete your account? Upon deletion, your
          account will no longer have access to Stream Master services
        </Text>
        <View style={[Gutters.regularTMargin]}>
          {inputDisableAccount.map((itemInput) => {
            const { field } = itemInput;
            const message = errors[field] && errors[field].message;

            return (
              <View key={itemInput.field} style={[Gutters.tinyVMargin]}>
                <View>
                  {/* <Text style={[Gutters.smallBMargin]}>{itemInput.label}</Text> */}
                </View>
                <View style={styles.inputContainer}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          styles.inputDisable,
                          {
                            color:
                              itemInput.field === "name"
                                ? Colors.gray
                                : Colors.white,
                            fontSize: FontSize.small,
                            backgroundColor:
                              itemInput.field === "name"
                                ? "#eee"
                                : Colors.inputBackground,
                          },
                        ]}
                        onChangeText={onChange}
                        value={
                          itemInput.field === "name" ? userInfo?.email : value
                        }
                        autoCapitalize="none"
                        placeholder={itemInput.label}
                        placeholderTextColor={
                          itemInput.field === "name"
                            ? CommonColor.gray
                            : CommonColor.white
                        }
                        editable={itemInput.field === "name" ? false : true}
                        secureTextEntry={handleShowPassWordInput(itemInput)}
                      />
                    )}
                    name={itemInput.field}
                  />
                  {itemInput.field === "password" && (
                    <TouchableOpacity
                      style={styles.iconShowPass}
                      onPress={() => handleShowPasswordIcon()}
                    >
                      <IonIcons
                        style={{ fontSize: FontSize.small }}
                        name={
                          isShowPassWord ? "eye-outline" : "eye-off-outline"
                        }
                        color={Colors.primary}
                        size={20}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <Text
                  style={[
                    ColorText.textDanger,
                    Gutters.tinyVMargin,
                    { fontSize: FontSize.small },
                  ]}
                >
                  {message}
                </Text>
              </View>
            );
          })}
        </View>
        <View
          style={[
            Layout.row,
            Layout.justifyContentAround,
            // Gutters.largeTMargin,
            Gutters.regularHPadding,
          ]}
        >
          <TouchableOpacity
            style={[
              Gutters.smallVPadding,
              Gutters.regularHPadding,
              Border.smallRadius,
              {
                backgroundColor: Colors.inputBackground,
                overflow: "hidden",
                width: "50%",
                alignItems: "center",
              },
            ]}
            onPress={() => handleClose()}
          >
            <Text style={[Fonts.textBold, { color: Colors.primary }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            style={[
              Gutters.smallVPadding,
              Gutters.regularHPadding,
              Border.smallRadius,
              Gutters.regularLMargin,
              {
                backgroundColor: Colors.primary,
                overflow: "hidden",
                width: "50%",
                alignItems: "center",
              },
            ]}
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.primary} size="large" />
            ) : (
              <Text style={[ColorText.white, Fonts.textBold]}>Delete</Text>
            )}
          </TouchableOpacity>
        </View>
      </Dialog>
    </>
  );
};

export default DisableAccount;

const styles = StyleSheet.create({
  inputDisable: {
    // backgroundColor: '#FFF7F5',
    borderRadius: 8,
    height: 50,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    flex: 1,
  },
  inputContainer: {
    // backgroundColor: '#FFF7F5',
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
  },
  iconShowPass: {
    position: "absolute",
    right: 0,
    // top: '50%',
    color: Colors.primary,
    padding: 15,
    backgroundColor: "transparent",
    borderRadius: 8,
    overflow: "hidden",
  },
});
