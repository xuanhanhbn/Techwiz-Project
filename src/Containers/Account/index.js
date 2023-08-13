/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@/Hooks";
import {
  loginActions,
  makeSelectLogin,
} from "@/Containers/LoginPage/loginSlice";
import IconFeather from "react-native-vector-icons/Feather";

import { useToast } from "native-base";
import Clipboard from "@react-native-clipboard/clipboard";
import EncryptedStorage from "react-native-encrypted-storage";
import { useFocusEffect } from "@react-navigation/native";
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
// import ActionSheet from 'react-native-actions-sheet';
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { userActions, makeSelectUser } from "../User/userSlice";

const Account = ({ route }) => {
  // const { t } = useTranslation();
  const navigation = useNavigation();
  const { Fonts, Gutters, Layout, Colors, ColorText } = useTheme();
  const dispatch = useDispatch();
  const toast = useToast();

  const userData = useSelector(makeSelectUser);
  const loginPageData = useSelector(makeSelectLogin);
  const userInfo = loginPageData?.userInfo;

  const isLoading = loginPageData?.isLoading;
  const isUpdateUserSuccess = userData?.isUpdateUserSuccess;
  const isChangePasswordSuccess = userData?.isChangePasswordSuccess;
  const errorMessage = userData?.errorMessage;

  const handleShowToast = (text) => {
    toast.closeAll();
    return toast.show({
      duration: 2000,
      placement: "top",
      description: text,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(loginActions.getUserInfo());
    }, [])
  );

  useEffect(() => {
    if (errorMessage) {
      handleShowToast(errorMessage);
    }
  }, [errorMessage]);

  return (
    <SafeAreaView style={Layout.fill}>
      <View style={styles.wrapper}>
        {isLoading ? (
          <ActivityIndicator color={Colors.primary} size="large" />
        ) : (
          <View>
            <View
              style={[styles.topBackground, { backgroundColor: Colors.black }]}
            />
            <Pressable
              onPress={() => navigation.goBack()}
              style={[
                Gutters.middleBMargin,
                Gutters.largeTMargin,
                Gutters.middleLMargin,
                styles.backButton,
              ]}
              hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }} // expand pham vi cua button
            ></Pressable>
            <View style={[Gutters.regularHPadding]}>
              <View
                style={[
                  styles.container,
                  styles.zIndex1,
                  { backgroundColor: Colors.secondaryBackground },
                ]}
              >
                <View
                  style={[
                    styles.topElements,
                    // styles.borderBottom,
                    Gutters.regularBPadding,
                  ]}
                >
                  <Image
                    source={require("@/Components/img/blankProfile.webp")}
                    style={styles.avatar}
                    alt="avatar"
                  />

                  <View>
                    <View
                      style={[
                        Layout.row,
                        { justifyContent: "space-between", width: "75%" },
                      ]}
                    >
                      <View>
                        <Text
                          style={[ColorText.white, ColorText.fontWeight700]}
                        >
                          {userInfo?.email}
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("SETTING")}
                        >
                          <IconFeather
                            name="settings"
                            size={20}
                            color={Colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* <TouchableOpacity
                  onPress={() =>
                    copyToClipboard(userInfo?.profile?.userId?.email)
                  }
                > */}
                    <View style={styles.boxUserName}>
                      <View style={styles.userName}>
                        <Text
                          numberOfLines={1}
                          style={[
                            Gutters.tinyTMargin,
                            {
                              color: Colors.primary,
                              fontSize: 18,
                              fontWeight: "600",
                            },
                          ]}
                        >
                          {userInfo?.name}
                        </Text>
                      </View>
                    </View>
                    {/* <Text style={[styles.greyText, Gutters.tinyTMargin]}>
                    {userInfo?.username} <Icon name="copy-outline" />
                  </Text> */}
                    {/* </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </View>
            <ScrollView style={styles.scrollView}>
              <View
                style={[
                  Layout.rowHCenter,
                  Gutters.regularHPadding,
                  {
                    backgroundColor: Colors.secondaryBackground,
                    borderRadius: 8,
                    marginTop: 10,
                    justifyContent: "space-between",
                  },
                ]}
              >
                <View>
                  <Text style={{ color: Colors.white }}>IMG</Text>
                </View>
                <View>
                  <Text style={{ color: Colors.white }}>Title</Text>
                  <Text style={{ color: Colors.white }}>Description</Text>
                  <Text style={{ color: Colors.white }}>Author</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Account;
