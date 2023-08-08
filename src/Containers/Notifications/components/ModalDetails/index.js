import { useTheme } from '@/Hooks';
import { AlertDialog } from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';

import React, { useEffect, useState } from 'react';
import { styles } from './style';

import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectNotification, notificationActions } from '../../slice';

function ModalNotificationDetails(props) {
  const { isOpenModalDetails, setIsOpenModalDetails, cancelRef } = props;
  const { Fonts, Gutters, Layout, FontSize, Colors } = useTheme();
  const notificationDetails = useSelector(makeSelectNotification);
  const valueDetails = notificationDetails?.isViewSuccess;

  // Xử lí đóng modal
  const handleCloseModal = () => {
    setIsOpenModalDetails(false);
  };
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpenModalDetails}
      onClose={() => handleCloseModal()}
      // style={{ backgroundColor: Colors.modalBackground }}
    >
      <AlertDialog.Content style={{ backgroundColor: Colors.modalBackground }}>
        <AlertDialog.CloseButton />
        <View style={[Layout.center, Gutters.regularHPadding]}>
          {/* Title */}
          <View>
            <Text
              style={[
                Fonts.textBold,
                { color: Colors.text, fontSize: FontSize.small },
              ]}
            >
              {valueDetails?.notificationTitle}
            </Text>
          </View>

          {/* Discription */}
          <View style={[Gutters.regularVMargin]}>
            <Text
              style={[
                Fonts.textSmall,
                {
                  color: Colors.text,
                  fontSize: FontSize.small,
                },
              ]}
            >
              {valueDetails?.notificationContent}
            </Text>
          </View>

          {/* Button */}
          {/* <View style={[Layout.fullWidth]}>
            <View>
              <TouchableOpacity
              // onPress={() => handleDeleteAlbum(listDetails)}
              >
                <Text style={[styles.btnDelete, { fontSize: FontSize.small }]}>
                  Xoá bộ sưu tập
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text style={[styles.btnCancel, { fontSize: FontSize.small }]}>
                Huỷ
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

export default ModalNotificationDetails;
