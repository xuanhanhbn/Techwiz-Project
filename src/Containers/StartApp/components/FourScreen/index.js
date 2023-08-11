import { useTheme } from "@/Hooks";
import { Colors } from "@/Theme/Variables";
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

function FourScreen() {
  const { ColorText, Layout, Gutters, FontSize, FontSizeResponsive } =
    useTheme();
  const widthDimensions = Dimensions.get("window").width;
  const heightDimensions = Dimensions.get("window").height;

  return (
    <View style={[Layout.fill, { backgroundColor: "#000", opacity: 0.5 }]}>
      <Image
        style={[{ width: "60%", height: 90, zIndex: 9 }]}
        source={require("@/Components/img/logo.png")}
      />
      <View
        style={[
          Layout.fill,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Image
          style={[
            Gutters.regularBMargin,
            { width: widthDimensions, height: heightDimensions },
          ]}
          source={require("@/Components/img/4.png")}
        />
        <View style={{ zIndex: 99 }}>
          <Text style={[Colors.white, { zIndex: 99 }]}>Trai nghiem ngay</Text>
        </View>
      </View>
    </View>
  );
}

export default FourScreen;
