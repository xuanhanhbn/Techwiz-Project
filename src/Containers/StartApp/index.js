import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";
// import { useTranslation } from 'react-i18next'
// import { useTheme } from '@/Hooks';
import backgroundHome from "@/Components/img/backgroundHome.jpg";
import { Colors, FontSize } from "@/Theme/Variables";
// import { Button, Pressable } from 'native-base';
import IconIonic from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { navigateAndSimpleReset } from "@/Navigators/utils";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import FirstScreen from "./components/FirstScreen";
import TwoScreen from "./components/TwoScreen";
import ThreeScreen from "./components/ThreeScreen";
import { useTheme } from "@/Hooks";
import FourScreen from "./components/FourScreen";

// const width = Dimensions.get('window').width;
const height = Dimensions.get("window").height;

const StartAppContainer = () => {
  const layout = useWindowDimensions();
  const { Layout, ColorText, Gutters, Border } = useTheme();
  // console.log("useTheme: ", useTheme());
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "three", title: "Three" },
    { key: "four", title: "Four" },
  ]);

  const handleRedirectLogin = () => navigation.navigate("LOGIN");

  const handleRedirectRegister = () => navigation.navigate("REGISTER_ACCOUNT");

  const handleContinue = () => navigateAndSimpleReset("Main");

  const renderScene = SceneMap({
    first: FirstScreen,
    second: TwoScreen,
    three: ThreeScreen,
    four: FourScreen,
  });

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        renderLabel={() => null}
        renderIndicator={() => null}
        indicatorContainerStyle={{
          backgroundColor: "transparent",
        }}
        style={{
          backgroundColor: "transparent",
          marginHorizontal: 60,
        }}
        renderIcon={({ route, focused, color }) => {
          return (
            <IconIonic
              name={focused ? "ellipse-sharp" : "ellipse-outline"}
              color="red"
            />
          );
        }}
      />
    );
  };
  return (
    <View style={[styles.container]}>
      <ImageBackground
        source={backgroundHome}
        style={[styles.imageBackground]}
        blurRadius={5}
      >
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
          tabBarPosition="bottom"
        />
        <View
          style={[Gutters.smallHPadding, { marginBottom: 30, marginTop: 20 }]}
        >
          <TouchableOpacity
            style={[ColorText.backgroundPrimary, Border.smallRadius]}
            onPress={() => handleRedirectLogin()}
          >
            <Text
              style={[
                ColorText.white,
                Layout.textAlignCenter,
                Gutters.regularVPadding,
                FontSize.large,
                ColorText.fontWeight700,
              ]}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
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

export default StartAppContainer;
