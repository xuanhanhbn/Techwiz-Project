import { useTheme } from "@/Hooks";
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

function FirstScreen() {
  const { ColorText, Layout, Gutters, FontSize, FontSizeResponsive } =
    useTheme();
  const widthDimensions = Dimensions.get("window").width;

  return (
    // <View>
    <View style={[Layout.fill]}>
      <Image
        style={[{ width: "60%", height: 90 }]}
        source={require("@/Components/img/logo.png")}
      />
      <View style={[Layout.fill, { justifyContent: "center" }]}>
        <Image
          style={[
            Gutters.regularBMargin,
            {
              width: widthDimensions,
            },
          ]}
          source={require("@/Components/img/1.png")}
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
            View on any device
          </Text>
          <Text
            style={[
              ColorText.white,
              Gutters.regularTMargin,
              FontSizeResponsive.textSmall,
              { textAlign: "center" },
            ]}
          >
            Stream live on your phone, tablet, laptop, and TV without any
            additional fees.
          </Text>
        </View>
      </View>
    </View>
  );
}

export default FirstScreen;
