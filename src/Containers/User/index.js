/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  View,
  // ActivityIndicator,
  Text,
  // TextInput,
  TouchableOpacity,
  ScrollView,
  // Button,
  Image,
  // Modal,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from 'react-i18next';
import { useTheme } from "@/Hooks";
// import { changeTheme } from '@/Store/Theme';
import { userActions, makeSelectUser } from "./userSlice";
import {
  loginActions,
  makeSelectLogin,
} from "@/Containers/LoginPage/loginSlice";
import Icon from "react-native-vector-icons/Ionicons";
import IconFeather from "react-native-vector-icons/Feather";
// import FontAweSoweIcons from 'react-native-vector-icons/FontAwesome';
import { ListItem, Dialog } from "@rneui/themed";
import { listTitle } from "./constants";
import UpdateUserModal from "./components/UpdateUserModal";
import ChangePassword from "./components/ChangePassword";
import GeneralAccountModal from "./components/GeneralAccountModal";
import { useToast } from "native-base";
import Clipboard from "@react-native-clipboard/clipboard";
import EncryptedStorage from "react-native-encrypted-storage";
import { useFocusEffect } from "@react-navigation/native";
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
// import ActionSheet from 'react-native-actions-sheet';
import styles from "./style";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

const User = ({ route }) => {
  // const { t } = useTranslation();
  const navigation = useNavigation();
  const { Fonts, Gutters, Layout, Colors, ColorText } = useTheme();
  const dispatch = useDispatch();
  const toast = useToast();

  const userData = useSelector(makeSelectUser);
  const loginPageData = useSelector(makeSelectLogin);
  const userInfo = loginPageData?.userInfo;

  const isLoading = userData?.isLoading;
  const isUpdateUserSuccess = userData?.isUpdateUserSuccess;
  const isChangePasswordSuccess = userData?.isChangePasswordSuccess;
  const errorMessage = userData?.errorMessage;

  const { type } = route.params;

  const [expanded, setExpanded] = useState(false);
  // const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(listTitle[0]);
  const [isShowModal, setIsShowModal] = useState({
    generalAccountModal: false,
    changePasswordModal: false,
    updateUserModal: false,
    logoutModal: false,
  });

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
    handleShowModal(type);
  }, [type]);

  // )

  useEffect(() => {
    if (isUpdateUserSuccess) {
      console.log("2");
      dispatch(userActions.cleanup());
      dispatch(loginActions.getUserInfo());
      handleShowModal("generalAccountModal");
      showMessage({
        message: "Update info success",
        type: "success",
      });
    }
  }, [isUpdateUserSuccess]);

  useEffect(() => {
    if (isChangePasswordSuccess) {
      dispatch(userActions.cleanup());
      dispatch(loginActions.getUserInfo());
      // dispatch(userActions.getAccountBalance());
      handleShowModal("generalAccountModal");
      showMessage({
        message: "Change password success",
        type: "success",
      });
    }
  }, [isChangePasswordSuccess]);

  useEffect(() => {
    if (errorMessage) {
      handleShowToast(errorMessage);
    }
  }, [errorMessage]);

  // Set title cho list dropdown
  const getTitle = (modalType) => {
    const indexTitle = listTitle.findIndex((item) => item.type === modalType);
    setTitle(listTitle[indexTitle]);
  };

  // Thay đổi các modal hiển thị bên dưới
  const handleShowModal = (modalType) => {
    const newShowModal = { ...isShowModal };
    if (modalType !== "logoutModal") {
      Object.keys(newShowModal).forEach((key) => {
        newShowModal[key] = false;
      });
      getTitle(modalType);
      setIsShowModal({
        ...newShowModal,
        [modalType]: true,
      });
    } else {
      // actionSheetRef.current?.show()
      setIsShowModal({
        ...newShowModal,
        [modalType]: true,
      });
    }
    setExpanded(false);
  };

  // Xử lý đóng logout modal
  const handleCloseLogoutModal = () => {
    const newShowModal = { ...isShowModal };
    setIsShowModal({
      ...newShowModal,
      logoutModal: false,
    });
  };

  //  Đăng xuất
  const handleLogout = async () => {
    await EncryptedStorage.removeItem("loginData");
    dispatch(userActions.logout());
    handleCloseLogoutModal();
    dispatch(loginActions.cleanup()); // clear dữ liệu của login store
    dispatch(userActions.cleanup());
    navigation.navigate("LOGIN"); // luôn navigate khi người dùng ấn đăng xuất mặc dù api có thành công hay không
    handleShowToast("Đăng xuất thành công");
  };

  // copy
  const copyToClipboard = async (text) => {
    Clipboard.setString(text);
    handleShowToast("Đã sao chép");
  };

  return (
    <KeyboardAvoidingView
      style={Layout.fill}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <FlashMessage position="top" />
      <View style={styles.wrapper}>
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
        >
          <IconFeather
            name="chevron-left"
            size={20}
            style={{ color: Colors.white }}
          />
        </Pressable>
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
                styles.borderBottom,
                Gutters.regularBPadding,
              ]}
            >
              <Image
                source={require("@/Components/img/blankProfile.webp")}
                style={styles.avatar}
                alt="avatar"
              />

              <View>
                <Text style={[ColorText.white, ColorText.fontWeight700]}>
                  {userInfo?.email}
                </Text>
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
            <ListItem.Accordion
              content={
                <>
                  <ListItem
                    containerStyle={[
                      Gutters.noneHPadding,
                      Gutters.noneVPadding,
                      { backgroundColor: Colors.secondaryBackground },
                    ]}
                  >
                    <IconFeather
                      name={title.icon}
                      size={20}
                      style={styles.orangeIcon}
                    />
                    <ListItem.Subtitle style={{ color: Colors.white }}>
                      {title.title}
                    </ListItem.Subtitle>
                  </ListItem>
                </>
              }
              isExpanded={expanded}
              onPress={() => {
                setExpanded(!expanded);
              }}
              containerStyle={[
                Gutters.noneHPadding,
                Gutters.noneVPadding,
                Gutters.regularTMargin,
                Layout.justifyContentBetween,
                { backgroundColor: Colors.secondaryBackground },
              ]}
              icon={
                <IconFeather
                  name="chevron-down"
                  color={Colors.white}
                  size={20}
                />
              }
            >
              {listTitle
                .filter((item) => item.title !== title.title)
                .map((item) => (
                  <ListItem
                    onPress={() => {
                      setExpanded(false);
                      handleShowModal(item.type);
                    }}
                    containerStyle={[
                      Gutters.noneHPadding,
                      Gutters.noneBPadding,
                      Gutters.smallTMargin,
                      { backgroundColor: Colors.secondaryBackground },
                    ]}
                    key={item.type}
                  >
                    <IconFeather
                      name={item.icon}
                      size={20}
                      style={styles.orangeIcon}
                    />
                    <ListItem.Subtitle
                      style={{
                        color: Colors.white,
                      }}
                    >
                      {item.title}
                    </ListItem.Subtitle>
                  </ListItem>
                ))}
            </ListItem.Accordion>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          {isShowModal.generalAccountModal && (
            <GeneralAccountModal
              userInfo={userInfo}
              handleShowModal={handleShowModal}
            />
          )}
          {isShowModal.updateUserModal && (
            <UpdateUserModal
              userInfo={userInfo}
              handleShowModal={handleShowModal}
              isLoading={isLoading}
            />
          )}
          {isShowModal.changePasswordModal && (
            <ChangePassword
              handleShowModal={handleShowModal}
              isLoading={isLoading}
            />
          )}
        </ScrollView>
        {/* <Dialog
          isVisible={isShowModal.logoutModal}
          onBackdropPress={() => handleCloseLogoutModal()}
        >
          <Text>Are you sure you want to log out?</Text>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.largeTMargin,
              Gutters.regularHPadding,
            ]}
          >
            <Pressable
              style={[
                Gutters.smallVPadding,
                Gutters.tinyHPadding,
                Layout.center,
              ]}
              onPress={() => handleCloseLogoutModal()}
            >
              <Text style={[Fonts.textBold]}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[
                styles.buttonDanger,
                Gutters.smallVPadding,
                Gutters.regularHPadding,
              ]}
              onPress={() => handleLogout()}
            >
              <Text style={[ColorText.white, Fonts.textBold]}>Logout</Text>
            </Pressable>
          </View>
        </Dialog> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default User;
