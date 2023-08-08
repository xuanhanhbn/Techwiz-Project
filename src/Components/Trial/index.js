import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/Hooks';
import { Pressable, Actionsheet, Button, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import IconIonic from 'react-native-vector-icons/Ionicons';
// import { Colors as CommonColor } from '@/Theme/Variables'

const Trial = () => {
  // const { t } = useTranslation();
  const { Gutters, Layout, Colors, FontSize } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const handleRedirectLogin = () => {
    navigation.navigate('LOGIN');
    setIsOpen(false);
  };

  const handleRedirectRegister = () => {
    navigation.navigate('REGISTER_ACCOUNT');
    setIsOpen(false);
  };
  const handleChangeLogin = () => {
    navigation.navigate('LOGIN');
  };

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        top: '50%',
      }}
    >
      <View>
        <View>
          <Text style={{ color: Colors.text, fontSize: FontSize.small }}>
            Tính năng cần đăng nhập để sử dụng
          </Text>
          <View style={[Layout.rowCenter, Gutters.smallTMargin]}>
            <TouchableOpacity onPress={() => handleChangeLogin()}>
              <View style={[Layout.rowCenter]}>
                <Text
                  style={{ color: Colors.primary, fontSize: FontSize.small }}
                >
                  Đăng nhập ngay
                </Text>
                <IconIonic
                  color={Colors.primary}
                  name="chevron-forward-outline"
                  style={{ fontSize: FontSize.small }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Button
          onPress={() => handleOpen()}
          variant="solid"
          style={{
            backgroundColor: Colors.primary,
            color: Colors.white,
            borderRadius: 8,
          }}
        >
          Trải nghiệm ngay
        </Button> */}
      </View>

      {/* form save bookmark */}
      <Actionsheet isOpen={isOpen} onClose={() => handleClose()}>
        <Actionsheet.Content>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: FontSize.normal,
                textAlign: 'center',
                color: Colors.primaryBlack,
              }}
            >
              Vui lòng đăng nhập để xem thêm
            </Text>
          </View>
          <Divider
            my="2"
            _light={{
              bg: Colors.divider,
            }}
            _dark={{
              bg: Colors.divider,
            }}
          />
          <View style={styles.boxButton.box}>
            <Button
              onPress={() => handleRedirectLogin()}
              variant="solid"
              style={{
                backgroundColor: Colors.primary,
                ...styles.boxButton.button,
              }}
            >
              Đăng nhập
            </Button>
            <Button
              onPress={() => handleRedirectRegister()}
              variant="solid"
              style={{
                backgroundColor: Colors.primaryBackground,
                ...styles.boxButton.button,
              }}
              _text={{ color: Colors.primary }}
            >
              Đăng ký
            </Button>
          </View>
          <Divider
            my="4"
            _light={{
              bg: Colors.divider,
            }}
            _dark={{
              bg: Colors.divider,
            }}
          />
          <View>
            <Pressable onPress={() => handleClose()}>
              <Text style={styles.continue}>
                Tiếp tục mà không đăng nhập{' '}
                <IconIonic name="chevron-forward-outline" />
              </Text>
            </Pressable>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 10,
  },
  boxContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxTag: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: 10,
  },

  boxButton: {
    box: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 15,
      paddingRight: 15,
      width: '100%',
    },
    button: {
      borderRadius: 8,
      width: '100%',
      marginTop: 15,
      height: 56,
    },
  },
  continue: {
    textAlign: 'center',
    // color: CommonColor.primary,
  },
});

export default Trial;
