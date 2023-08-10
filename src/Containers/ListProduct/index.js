import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/Hooks";
import { listProductActions, makeSelectListProduct } from "./listProductSlice";
import { useNavigation } from "@react-navigation/native";

const ListProduct = () => {
  const navigation = useNavigation();

  const { Common, Fonts, Gutters, Layout, Colors } = useTheme();
  const dispatch = useDispatch();
  const globalDataProvinder = useSelector(makeSelectListProduct);
  const dataProvinder = globalDataProvinder?.dataProvinder;

  const refReleased = useRef(null);

  useEffect(() => {
    // dispatch(listProductActions.getListProvinder());
  }, []);

  const handleChangeDetails = () => {
    navigation.navigate("DETAILS_PRODUCT");
  };

  return (
    <ScrollView
      style={Layout.fill}
      // contentContainerStyle={[
      //   Layout.fill,
      //   Layout.colCenter,
      //   Gutters.smallHPadding,
      // ]}
    >
      <View style={[Layout.fill, Gutters.regularTMargin]}>
        {/* Banner */}
        <View style={[Layout.colCenter]}>
          <Image
            style={{ height: 400, width: 350 }}
            source={require("@/Components/img/banner.webp")}
          />
        </View>
        <ImageBackground
          style={[Gutters.smallHPadding, { backgroundColor: "#000" }]}
        >
          <View style={[Gutters.regularTMargin]}>
            <Text style={{ color: Colors.white }}>Phát hành trong năm qua</Text>
            <ScrollView horizontal ref={refReleased}>
              <TouchableOpacity onPress={() => handleChangeDetails()}>
                <Image
                  style={{ height: 200, width: 150, borderRadius: 8 }}
                  source={require("@/Components/img/banner.webp")}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default ListProduct;
