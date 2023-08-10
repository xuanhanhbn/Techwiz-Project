import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
// import { useTranslation } from 'react-i18next'
// import { useTheme } from '@/Hooks';
import backgroundHome from "@/Components/img/backgroundHome.jgp";
import { Colors, FontSize } from "@/Theme/Variables";
// import { Button, Pressable } from 'native-base';
import IconIonic from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { navigateAndSimpleReset } from "@/Navigators/utils";

// const width = Dimensions.get('window').width;
const height = Dimensions.get("window").height;

const StartupContainer = () => {
  const navigation = useNavigation();

  const handleRedirectLogin = () => navigation.navigate("LOGIN");

  const handleRedirectRegister = () => navigation.navigate("REGISTER_ACCOUNT");

  const handleContinue = () => navigateAndSimpleReset("Main");

  return (
    <View style={[styles.container]}>
      <ImageBackground
        source={backgroundHome}
        style={[styles.imageBackground]}
        blurRadius={5}
      >
        <View style={styles.box}>
          <View style={styles.bodyBox}>
            <View style={styles.header}>
              <Text style={styles.welcome}>Chào mừng đến với Star</Text>
            </View>
            <View style={styles.boxButton.box}>
              <TouchableOpacity
                onPress={() => handleRedirectLogin()}
                variant="solid"
                style={{
                  backgroundColor: Colors.primary,
                  ...styles.boxButton.button,
                }}
              >
                <Text style={{ color: Colors.white, fontSize: FontSize.small }}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleRedirectRegister()}
                variant="solid"
                style={{
                  backgroundColor: Colors.white,
                  ...styles.boxButton.button,
                }}
              >
                <Text
                  style={{ color: Colors.primary, fontSize: FontSize.small }}
                >
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => handleContinue()}>
                <Text style={styles.continue}>
                  Tiếp tục mà không đăng nhập{" "}
                  <IconIonic name="chevron-forward-outline" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyBox: {
    width: "100%",
    bottom: 0,
    paddingBottom: 70,
    maxWidth: "85%",
  },
  welcome: {
    fontSize: FontSize.regular,
    textAlign: "center",
    color: Colors.white,
    fontWeight: "bold",
  },
  header: {
    width: "100%",
    padding: 10,
  },
  boxButton: {
    box: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: 15,
      paddingRight: 15,
      width: "100%",
    },
    button: {
      borderRadius: 8,
      width: "100%",
      marginTop: 15,
      height: height * 0.06,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  continue: {
    textAlign: "center",
    // color: Colors.primary,
    color: Colors.white,
    paddingVertical: 24,
    fontSize: FontSize.small,
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover", // Chỉnh ảnh nền cho phù hợp với kích thước màn hình
  },
  welcomeText: {
    color: Colors.white,
    fontSize: FontSize.regular,
  },
});

export default StartupContainer;
