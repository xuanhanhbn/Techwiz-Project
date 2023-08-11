import { useTheme } from "@/Hooks";
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

function TwoScreen() {
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
          source={require("@/Components/img/2.png")}
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
            Download and watch offline
          </Text>
          <Text
            style={[
              ColorText.white,
              Gutters.regularTMargin,
              FontSizeResponsive.textSmall,
              { textAlign: "center" },
            ]}
          >
            Save data, watch offline on airplanes, trains, or subways...
          </Text>
        </View>
      </View>
    </View>
  );
}

export default TwoScreen;
