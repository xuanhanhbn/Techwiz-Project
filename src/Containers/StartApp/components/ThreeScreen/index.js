import { useTheme } from "@/Hooks";
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

function ThreeScreen() {
  const { ColorText, Layout, Gutters, FontSize, FontSizeResponsive } =
    useTheme();
  const widthDimensions = Dimensions.get("window").width;

  return (
    <View style={[Layout.fill]}>
      <Image
        style={[{ width: "60%", height: 90 }]}
        source={require("@/Components/img/logo.png")}
      />
      <View
        style={[
          Layout.fill,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Image
          style={[Gutters.regularBMargin, { width: widthDimensions }]}
          source={require("@/Components/img/3.png")}
        />

        <View style={[Gutters.largeTMargin]}>
          <Text
            style={[
              ColorText.white,
              ColorText.fontWeight700,
              FontSizeResponsive.textDefault,
              { textAlign: "center" },
            ]}
          >
            No annoying contracts
          </Text>
          <Text
            style={[
              ColorText.white,
              Gutters.regularTMargin,
              FontSizeResponsive.textSmall,
              { textAlign: "center" },
            ]}
          >
            Join today, cancel anytime.
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ThreeScreen;
