import { useTheme } from "@/Hooks";
import React from "react";
import { View, Text, Image } from "react-native";

function FirstScreen() {
  const { ColorText, Layout, Gutters } = useTheme();
  return (
    <View
      style={[Layout.fill, { justifyContent: "center", alignItems: "center" }]}
    >
      <Image
        style={{ width: "60%" }}
        source={require("./components/Image/movie.jpeg")}
      />
      <View>
        <Text style={[ColorText.white]}>AAAA</Text>
      </View>
    </View>
  );
}

export default FirstScreen;
