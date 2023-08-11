import React  from 'react';
import {
  View,
  // ActivityIndicator,
  Text,
  // TextInput,
  TouchableOpacity,
  // Button,
  // SafeAreaView,
  // Modal,
  // Pressable,
} from 'react-native';
// import { userActions } from '../userSlice';
// import { useDispatch } from 'react-redux';
import IconFeather from 'react-native-vector-icons/Feather';
import { useTheme } from '@/Hooks';
import moment from 'moment';
import styles from '../style';

const GeneralAccountModal = props => {
  const { userInfo, handleShowModal } = props;

  const { Gutters, Colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.modalBackground }]}
    >
      <Text style={[styles.title, Gutters.largeBMargin, Gutters.smallTMargin, { color: Colors.text }]}>
        Tổng quan tài khoản
      </Text>
      {/* <View style={[styles.borderBottom, Gutters.middleBPadding]}>
        <Text style={styles.greyText}>SỐ DƯ TÀI KHOẢN</Text>

        <View style={styles.flexBox}>
          <Text style={[styles.subTitle]}>
            {formatNumber(accountBalance?.balance)} VNĐ
          </Text>
          <TouchableOpacity style={styles.touchable}>
            <Text style={styles.touchableText}>Nạp tiền</Text>
            <IconFeather
              name="chevron-right"
              size={18}
              style={styles.touchableText}
            />
          </TouchableOpacity>
        </View>
      </View> */}
      <View
        style={[styles.flexBox, styles.borderBottom, Gutters.middleBPadding]}
      >
        <View>
          <Text style={[styles.subTitle, { color: Colors.text }]}>Hồ sơ</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleShowModal('updateUserModal');
          }}
          style={styles.touchable}
        >
          <Text style={styles.touchableText}>Chỉnh sửa hồ sơ</Text>
          <IconFeather
            name="chevron-right"
            size={18}
            style={styles.touchableText}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={Gutters.regularTMargin}>
          <Text style={styles.greyText}>TÊN TÀI KHOẢN</Text>
          <Text style={{ color: Colors.text }}>{userInfo?.username}</Text>
        </View>
        <View style={Gutters.regularTMargin}>
          <Text style={styles.greyText}>SỐ ĐIỆN THOẠI</Text>
          <Text style={{ color: Colors.text }}>{userInfo?.phoneNumber}</Text>
        </View>
        <View style={Gutters.regularTMargin}>
          <Text style={styles.greyText}>NGÀY SINH</Text>
          <Text style={{ color: Colors.text }}>
            {userInfo.birthday
              ? moment(userInfo.birthday).format('DD/MM/YYYY')
              : ''}
          </Text>
        </View>
        <View style={Gutters.regularTMargin}>
          <Text style={styles.greyText}>EMAIL</Text>
          <Text style={{ color: Colors.text }}>{userInfo?.email}</Text>
        </View>
      </View>
      {/* <View style={[styles.flexBox, styles.borderBottom, Gutters.largeTMargin, Gutters.middleBPadding]}>
        <View>
          <Text style={styles.subTitle}>Gói sản phẩm</Text>
        </View>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.touchableText}>Tất cả gói sản phẩm</Text>
          <IconFeather
            name="chevron-right"
            size={18}
            style={styles.touchableText}
          />
        </TouchableOpacity>
      </View> */}
      {/* <View style={styles.flexBox}>
        <View style={styles.packageBox}>
          <Text style={styles.greyText}>GÓI ĐÃ MUA</Text>
          <Text style={styles.bigNumber}>10</Text>
        </View>
        <View style={styles.packageBox}>
          <Text style={styles.greyText}>GÓI ĐƯỢC CHIA SẺ</Text>
          <Text style={styles.bigNumber}>10</Text>
        </View>
      </View> */}
    </View>
  );
};

export default GeneralAccountModal;
