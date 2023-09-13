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
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@/Hooks";
import moment from "moment";

import {
  loginActions,
  makeSelectLogin,
} from "@/Containers/LoginPage/loginSlice";
import IconFeather from "react-native-vector-icons/Feather";

import { Divider, useToast } from "native-base";
import Clipboard from "@react-native-clipboard/clipboard";
import EncryptedStorage from "react-native-encrypted-storage";
import { useFocusEffect } from "@react-navigation/native";
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
// import ActionSheet from 'react-native-actions-sheet';
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { userActions, makeSelectUser } from "../User/userSlice";
import { accountActions, makeSelectAccount } from "./accountSlice";
import { baseApiUrlGetImage } from "@/utils/constants";

const Account = ({ route }) => {
  // const { t } = useTranslation();
  const navigation = useNavigation();
  const { Fonts, Gutters, Layout, Colors, ColorText, FontSizeResponsive } =
    useTheme();
  const dispatch = useDispatch();
  const toast = useToast();

  const userData = useSelector(makeSelectUser);
  const loginPageData = useSelector(makeSelectLogin);
  const getGlobalData = useSelector(makeSelectAccount);

  const globalData = getGlobalData?.dataListProviderByUser || [];
  const userInfo = loginPageData?.userInfo;

  const isLoading = loginPageData?.isLoading;
  const isUpdateUserSuccess = userData?.isUpdateUserSuccess;
  const isChangePasswordSuccess = userData?.isChangePasswordSuccess;
  const errorMessage = userData?.errorMessage;

  const widthDimensions = Dimensions.get("window").width;

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
      dispatch(accountActions.getListProviderByUser());
    }, [])
  );

  const handleChangeDetails = (data) => {
    navigation.navigate("DETAILS_PRODUCT", { itemProvinder: data });
  };

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
                // Gutters.middleBMargin,
                // Gutters.largeTMargin,
                Gutters.middleLMargin,
                styles.backButton,
              ]}
              hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }} // expand pham vi cua button
            />
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
                    // Gutters.regularBPadding,
                  ]}
                >
                  <Image
                    source={require("@/Components/img/blankProfile.webp")}
                    style={styles.avatar}
                    alt="avatar"
                  />

                  <View>
                    <View
                      style={[Layout.row, { justifyContent: "space-between" }]}
                    >
                      <Text
                        style={[
                          ColorText.white,
                          ColorText.fontWeight700,
                          Gutters.largeRMargin,
                        ]}
                      >
                        {userInfo?.email}
                      </Text>
                      <View style={{ width: "100%" }}>
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
                          ellipsizeMode="tail"
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
              <View style={[Gutters.regularTMargin]}>
                <Text
                  style={[
                    FontSizeResponsive.textSmall,
                    ColorText.fontWeight700,
                    { color: Colors.white },
                  ]}
                >
                  List Subcribe
                </Text>
              </View>
            </View>
            <ScrollView style={styles.scrollView}>
              {Array.isArray(globalData?.data) &&
                globalData?.data?.length > 0 &&
                globalData?.data.map((item) => {
                  const startAt = item?.startAt?.format("DD/MM/YYYY");
                  const expDate = item?.expDate?.format("DD/MM/YYYY");

                  return (
                    <TouchableOpacity
                      key={item?._id}
                      onPress={() => handleChangeDetails(item)}
                    >
                      <View
                        style={[
                          Layout.rowHCenter,
                          {
                            backgroundColor: Colors.secondaryBackground,
                            borderRadius: 8,
                            marginTop: 10,
                            justifyContent: "space-between",
                          },
                        ]}
                      >
                        <View>
                          <Image
                            source={{
                              uri: `${baseApiUrlGetImage}${item?.thumbnail}`,
                            }}
                            style={{
                              width: widthDimensions / 3,
                              height: 150,
                              borderRadius: 8,
                            }}
                            alt="avatar"
                          />
                        </View>
                        <View
                          style={[
                            Gutters.regularLPadding,
                            Gutters.smallVPadding,
                            Layout.fill,
                          ]}
                        >
                          <Text
                            style={[
                              FontSizeResponsive.textSmall,
                              { color: Colors.white },
                            ]}
                          >
                            {item?.namePackage}
                          </Text>
                          <Text
                            style={{ color: Colors.white }}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                          >
                            {item?.description}
                          </Text>
                          <View
                            style={[
                              Layout.rowHCenter,
                              { justifyContent: "space-between" },
                            ]}
                          >
                            <Text
                              style={[
                                FontSizeResponsive.textSmall,
                                ColorText.fontWeight700,
                                { color: Colors.primary },
                              ]}
                              numberOfLines={2}
                              ellipsizeMode="tail"
                            >
                              {item?.name}
                            </Text>
                            <Text
                              style={[
                                FontSizeResponsive.textSmall,
                                ColorText.fontWeight500,
                                { color: Colors.white },
                              ]}
                              numberOfLines={2}
                              ellipsizeMode="tail"
                            >
                              {`$ ${item?.price || 0} `}
                            </Text>
                          </View>
                          <Divider my={2} />
                          <View>
                            <View style={[Layout.rowHCenter]}>
                              <Text style={{ color: Colors.white }}>
                                {`Start At: ${startAt || "-"}`}
                              </Text>
                            </View>
                            <View style={[Layout.rowHCenter]}>
                              <Text style={{ color: Colors.white }}>
                                {`Expired At: ${expDate || "-"}`}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Account;
