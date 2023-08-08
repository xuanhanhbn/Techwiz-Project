/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Divider, Menu } from 'native-base';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { makeSelectNotification, notificationActions } from './slice';
import { makeSelectLogin } from '@/Containers/LoginPage/loginSlice';
import { useTheme } from '@/Hooks';
// import { changeTheme } from '@/Store/Theme';
import DisplayRealTime from '@/Components/RealTime';
import { notificationsType, notificationOptions, settingOptions } from './constant';
import { styles } from './style';
import Trial from '@/Components/Trial';
import ModalNotificationDetails from './components/ModalDetails';

const Notifications = () => {
  const { Gutters, Layout, FontSize, Colors, ColorText, Fonts } = useTheme();
  const dispatch = useDispatch();
  const notificationData = useSelector(makeSelectNotification);
  const loginPageData = useSelector(makeSelectLogin);
  const loginData = loginPageData?.loginData;
  const { userInfo } = loginPageData;

  const {
    isLoading,
    errorMessage,
    notificationList,
    isViewSuccess,
    isMarkSuccess,
    isMarkAllSuccess,
    isDeleteSuccess,
    isDeleteAllSuccess,
  } = notificationData;

  const baseDataRequest = {
    notificationTitle: '',
    notificationContent: '',
    createdDate: {
      fromValue: '',
      toValue: '',
    },
    size: 20,
    page: 0,
    sort: 'createdDate',
    order: 'DESC',
  };
  const cancelRef = useRef(null);
  const navigation = useNavigation();

  const [isActiveNoti, setIsActiveNoti] = useState('newNotifi');
  const [dataRequest, setDataRequest] = useState(baseDataRequest);
  const [isOpenModalDetails, setIsOpenModalDetails] = useState(false);

  const isSeenStatus = notificationList?.content?.every(obj => obj.seenStatus);

  const notificationOption = triggerProps => (
    <TouchableOpacity {...triggerProps}>
      <IconFeather
        name="more-horizontal"
        size={20}
        style={{ color: Colors.text }}
      />
    </TouchableOpacity>
  );

  const settingOption = triggerProps => (
    <TouchableOpacity {...triggerProps}>
      <IconIonic
        name="settings-outline"
        size={20}
        style={{ color: Colors.text }}
      />
    </TouchableOpacity>
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(notificationActions.getNotificationList(dataRequest));
    }, []),
  );

  useEffect(() => {
    if (isMarkSuccess || isMarkAllSuccess || isDeleteSuccess || isDeleteAllSuccess) {
      dispatch(notificationActions.getNotificationList(dataRequest));
      dispatch(notificationActions.cleanup());
    }
  }, [isMarkSuccess, isMarkAllSuccess, isDeleteSuccess, isDeleteAllSuccess]);

  const handleChangeNotifi = itemNoti => {
    setIsActiveNoti(itemNoti.field);
  };

  // Xem chi tiết noti
  const handleViewNotification = notification => {
    navigation.navigate('ADVANCED_SEARCH');
    // setIsOpenModalDetails(true);
    dispatch(notificationActions.viewNotification({ id: notification.id }));
    if (!notification.seenStatus) {
      dispatch(notificationActions.markNotification({ id: notification.id }));
    }
  };

  // thực thi các option của từng noti
  const handleExcuteOptions = (optionName, notification) => {
    switch (optionName) {
      case 'Xoá':
        dispatch(
          notificationActions.deleteNotification({ id: notification.id }),
        );
        break;
      case 'Đánh dấu là đã đọc':
        dispatch(notificationActions.markNotification({ id: notification.id }));
        break;
      case 'Xoá tất cả':
        dispatch(notificationActions.deleteAllNotification({ userId: userInfo.id }));
        break;
      case 'Đánh dấu tất cả là đã đọc':
        dispatch(notificationActions.markAllNotification({ userId: userInfo.id }));
        break;
      default:
        return '';
    }
  };

  return (
    <View
      style={[Layout.fill, Gutters.regularHPadding, Gutters.regularVPadding]}
    >
      {!loginData.access_token && <Trial />}
      {loginData.access_token && (
        <>
          <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
            <Text
              style={[
                ColorText.fontWeight800,
                {
                  fontSize: 30,
                  color: Colors.text,
                },
              ]}
            >
              Thông báo
            </Text>
            {/* <TouchableOpacity>
              <IconIonic name="settings-outline" size={20} />
            </TouchableOpacity> */}
            <Menu
              w="230"
              mt={1}
              placement="bottom left"
              trigger={triggerProps => {
                return settingOption(triggerProps);
              }}

            >
              {settingOptions.map(option => (
                <Menu.Item key={option.name} px={1} py={2}>
                <TouchableOpacity
                  style={[
                    Layout.fill,
                    Layout.rowHCenter,
                    Layout.justifyContentBetween,
                  ]}
                  onPress={() =>
                    handleExcuteOptions(option.name)
                  }
                >
                  <Text
                    style={{
                      color:
                        option.name === 'Xoá tất cả'
                          ? Colors.error
                          : Colors.text,
                    }}
                  >
                    {option.name}
                  </Text>
                  <IconFeather
                    name={option.icon}
                    size={18}
                    style={{
                      color:
                        option.name === 'Xoá tất cả'
                          ? Colors.error
                          : Colors.text,
                    }}
                  />
                </TouchableOpacity>
              </Menu.Item>
              ))}
            </Menu>
          </View>

          {/* Danh sách chuyển đổi kiểu tin tức */}
          {/* <View
        style={[
          Layout.rowHCenter,
          Gutters.regularVMargin,
          { justifyContent: 'center' },
        ]}
      >
        {notifications.map(itemNoti => (
          <TouchableOpacity
            key={itemNoti.field}
            onPress={() => handleChangeNotifi(itemNoti)}
          >
            <View>
              <Text
                style={
                  isActiveNoti === itemNoti.field
                    ? styles.btnHeaderActive
                    : styles.btnHeader
                }
              >
                {itemNoti.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View> */}

          <ScrollView style={Gutters.largeTMargin}>
            {notificationsType.map(item => (
              <View key={item.name} style={Gutters.regularBMargin}>
                <View style={[Layout.row, Layout.justifyContentBetween]}>
                  <Text style={[Gutters.smallBMargin, styles.textDescription]}>
                    {item.name}
                  </Text>
                </View>
                {/* Khi xem hết tin tức ở mục chea xem */}
                {isSeenStatus && item.name === 'Chưa xem' && (
                  <Text style={[Fonts.textBold, { color: Colors.text }]}>
                    Hiện tại bạn không có thông báo mới nào
                  </Text>
                )}

                {notificationList &&
                  notificationList.content &&
                  notificationList.content
                    .filter(
                      notification =>
                        notification.seenStatus === item.seenStatus,
                    )
                    .map(noti => (
                      <View key={noti.id}>
                        <Divider />
                        <TouchableOpacity
                          style={[
                            Layout.rowHCenter,
                            Layout.justifyContentBetween,
                            Layout.fullWidth,
                            Gutters.middleVMargin,
                          ]}
                          onPress={() => handleViewNotification(noti)}
                        >
                          <View style={[Layout.rowHCenter, { width: '20%' }]}>
                            <View
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: Colors.coloredBackground,
                              }}
                            />
                          </View>
                          <View style={Layout.fill}>
                            <Text
                              style={[
                                Gutters.tinyBMargin,
                                Fonts.textBold,
                                { color: Colors.text },
                              ]}
                            >
                              {noti.notificationTitle}
                            </Text>
                            <Text
                              style={[
                                { fontWeight: 'bold', color: Colors.subBlack },
                              ]}
                            >
                              <DisplayRealTime time={noti.createdDate} />
                            </Text>
                          </View>
                          <Menu
                            w="190"
                            trigger={triggerProps => {
                              return notificationOption(triggerProps);
                            }}
                          >
                            {item.options.map(option => (
                              <Menu.Item key={option.name} px={1} py={2}>
                                <TouchableOpacity
                                  style={[
                                    Layout.fill,
                                    Layout.rowHCenter,
                                    Layout.justifyContentBetween,
                                  ]}
                                  onPress={() =>
                                    handleExcuteOptions(option.name, noti)
                                  }
                                >
                                  <Text
                                    style={{
                                      color:
                                        option.name === 'Xoá'
                                          ? Colors.error
                                          : Colors.text,
                                    }}
                                  >
                                    {option.name}
                                  </Text>
                                  <IconFeather
                                    name={option.icon}
                                    size={18}
                                    style={{
                                      color:
                                        option.name === 'Xoá'
                                          ? Colors.error
                                          : Colors.text,
                                    }}
                                  />
                                </TouchableOpacity>
                              </Menu.Item>
                            ))}
                          </Menu>
                        </TouchableOpacity>
                      </View>
                    ))}
              </View>
            ))}
          </ScrollView>
          {isOpenModalDetails && (
            <ModalNotificationDetails
              isOpenModalDetails={isOpenModalDetails}
              setIsOpenModalDetails={setIsOpenModalDetails}
              cancelRef={cancelRef}
            />
          )}
        </>
      )}
    </View>
    // <ScrollView
    //   style={Layout.fill}
    //   contentContainerStyle={[
    //     Layout.fill,
    //     Layout.colCenter,
    //     Gutters.smallHPadding,
    //   ]}
    // >
    //   <Text style={{ color: darkMode ? Colors.white : Colors.primary }}>Coming soon...</Text>
    // </ScrollView>
  );
};

export default Notifications;
