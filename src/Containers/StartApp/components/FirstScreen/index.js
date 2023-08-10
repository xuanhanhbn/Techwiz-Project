import { useTheme } from "@/Hooks";
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

function FirstScreen() {
  const { ColorText, Layout, Gutters, FontSize } = useTheme();
  const widthDimensions = Dimensions.get("window").width;

  return (
    <View
      style={[Layout.fill, { justifyContent: "center", alignItems: "center" }]}
    >
      <Image
        style={{ width: widthDimensions }}
        source={require("@/Components/img/1.png")}
      />
      <View>
        <Text
          style={[
            ColorText.white,
            ColorText.fontWeight700,
            { fontSize: FontSize.large },
          ]}
        >
          View on any device
        </Text>
        <Text
          style={[
            ColorText.white,
            Gutters.regularTMargin,
            { fontSize: FontSize.normal },
          ]}
        >
          Stream live on your phone, tablet, laptop, and TV without any
          additional fees.
        </Text>
      </View>
    </View>
  );
}

export default FirstScreen;
