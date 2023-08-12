import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Dimensions,
  StyleSheet,
} from "react-native";
import IconIonic from "react-native-vector-icons/Ionicons";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/Hooks";
import { listProductActions, makeSelectListProduct } from "./listProductSlice";
import { useNavigation } from "@react-navigation/native";
import { baseApiUrlGetImage } from "@/utils/constants";

const ListProduct = () => {
  const navigation = useNavigation();

  const { Gutters, Layout, Colors, ColorText, FontSizeResponsive } = useTheme();
  const dispatch = useDispatch();

  const globalDataProvinder = useSelector(makeSelectListProduct);
  const dataProvinder = globalDataProvinder?.dataProvinder;
  const isLoading = globalDataProvinder?.isLoading;
  const widthDimensions = Dimensions.get("window").width;

  const refReleased = useRef(null);
  const refListProvinde = useRef();

  const handleGetListProvinder = () => {
    const newDataRequest = {
      page: 0,
      limit: 8,
    };
    dispatch(listProductActions.getListProvinder(newDataRequest));
  };

  const handleGetListProgram = () => {
    const newDataRequest = {
      page: 0,
      limit: 8,
    };
    dispatch(listProductActions.getListProgram());
  };

  const handleGetListFavorites = () => {
    dispatch(listProductActions.getListFavorites());
  };

  useEffect(() => {
    handleGetListProvinder();
    handleGetListFavorites();
    handleGetListProgram();
  }, []);

  const handleChangeDetails = (itemProvinder) => {
    navigation.navigate("DETAILS_PRODUCT", { itemProvinder: itemProvinder });
  };
  return (
    <ScrollView
      ref={refListProvinde}
      refreshControl={() => handleGetListProvinder()}
      style={Layout.fill}
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.primary} size="large" />
      ) : (
        <View style={[Layout.fill, Gutters.regularTMargin]}>
          {/* Banner */}
          <View style={[Layout.colCenter]}>
            <Image
              style={{ height: 400, width: widthDimensions }}
              source={require("@/Components/img/banner.webp")}
            />
          </View>
          <ImageBackground
            style={[Gutters.smallHPadding, { backgroundColor: "#000" }]}
          >
            {/* List Provinder */}
            <View style={[Gutters.regularTMargin]}>
              <View
                style={[Layout.rowHCenter, { justifyContent: "space-between" }]}
              >
                <Text
                  style={[
                    ColorText.fontWeight700,
                    FontSizeResponsive.textSmall,
                    Gutters.regularBMargin,
                    { color: Colors.white },
                  ]}
                >
                  Featured provider list
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("LIST_PROVINDER")}
                >
                  <View style={[Layout.rowHCenter, Gutters.regularBMargin]}>
                    <Text
                      style={[
                        ColorText.fontWeight700,
                        FontSizeResponsive.textSmall,
                        Gutters.smallRMargin,
                        { color: Colors.primary },
                      ]}
                    >
                      View All
                    </Text>
                    <IconIonic
                      name="chevron-forward-outline"
                      size={18}
                      color={Colors.primary}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal ref={refReleased}>
                {Array.isArray(dataProvinder?.data) &&
                  dataProvinder?.data.length > 0 &&
                  dataProvinder?.data.map((itemProvinder) => (
                    <TouchableOpacity
                      key={`listProvinder_${itemProvinder?._id}`}
                      onPress={() => handleChangeDetails(itemProvinder)}
                    >
                      <Image
                        style={[
                          Gutters.smallRMargin,
                          {
                            height: 200,
                            width: widthDimensions / 3,
                            borderRadius: 8,
                          },
                        ]}
                        source={{
                          uri: `${baseApiUrlGetImage}${itemProvinder.thumbnail}`,
                        }}
                      />
                      <View style={[Gutters.smallTMargin]}>
                        <Text
                          style={[
                            ColorText.fontWeight700,
                            FontSizeResponsive.textSmall,
                            { color: Colors.white },
                          ]}
                        >
                          {itemProvinder?.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>

            {/* List Featured program */}
            <View style={[Gutters.regularTMargin]}>
              <View
                style={[Layout.rowHCenter, { justifyContent: "space-between" }]}
              >
                <Text
                  style={[
                    ColorText.fontWeight700,
                    FontSizeResponsive.textSmall,
                    Gutters.regularBMargin,
                    { color: Colors.white },
                  ]}
                >
                  Featured program list
                </Text>
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate("LIST_PROVINDER")}
                >
                  <View style={[Layout.rowHCenter, Gutters.regularBMargin]}>
                    <Text
                      style={[
                        ColorText.fontWeight700,
                        FontSizeResponsive.textSmall,
                        Gutters.smallRMargin,
                        { color: Colors.primary },
                      ]}
                    >
                      View All
                    </Text>
                    <IconIonic
                      name="chevron-forward-outline"
                      size={18}
                      color={Colors.primary}
                    />
                  </View>
                </TouchableOpacity> */}
              </View>
              <ScrollView horizontal ref={refReleased}>
                {Array.isArray(dataProvinder?.data) &&
                  dataProvinder?.data.length > 0 &&
                  dataProvinder?.data.map((itemProvinder) => (
                    <View
                      style={styles.container}
                      key={`listProvinder_${itemProvinder?._id}`}
                    >
                      <TouchableOpacity>
                        <Image
                          style={[
                            Gutters.smallRMargin,
                            {
                              height: 150,
                              width: widthDimensions / 2,
                              borderRadius: 8,
                            },
                          ]}
                          source={{
                            uri: `${baseApiUrlGetImage}${itemProvinder.thumbnail}`,
                          }}
                        />
                        <View style={styles.iconContainer}>
                          <IconIonic
                            name="play-circle-outline"
                            size={35}
                            color={Colors.white}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={[Gutters.smallTMargin]}>
                        <Text
                          style={[
                            ColorText.fontWeight700,
                            FontSizeResponsive.textSmall,
                            { color: Colors.white },
                          ]}
                        >
                          {itemProvinder?.name}
                        </Text>
                      </View>
                    </View>
                  ))}
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  iconContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    opacity: 0.5,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 99,
  },
});

export default ListProduct;
