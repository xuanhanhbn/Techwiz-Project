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

const DetailsProduct = () => {
  const { t } = useTranslation();
  const { Common, Fonts, Gutters, Layout, Colors, ColorText, FontSize } =
    useTheme();
  const dispatch = useDispatch();

  const refReleased = useRef(null);

  useEffect(() => {
    // dispatch(listProductActions.getListProvinder());
  }, []);

  const handleShowListPackage = () => {
    console.log("list");
  };
  return (
    <ScrollView style={Layout.fill}>
      <View style={[Layout.fill, { backgroundColor: "#000" }]}>
        {/* Banner */}
        <View style={[Layout.colCenter]}>
          <Image
            style={{ height: 400 }}
            source={require("@/Components/img/banner.webp")}
          />
        </View>
        <View style={[Gutters.smallHPadding]}>
          {/* Title */}
          <View style={[Gutters.smallTMargin]}>
            <Text
              style={[
                ColorText.white,
                ColorText.fontWeight500,
                { fontSize: FontSize.normal },
              ]}
            >
              Title
            </Text>
          </View>

          {/* Description */}
          <View style={[Gutters.smallTMargin]}>
            <Text
              style={[
                ColorText.white,
                ColorText.fontWeight500,
                { fontSize: FontSize.normal },
              ]}
            >
              Description
            </Text>
          </View>

          {/* Price */}
          <View style={[Gutters.smallTMargin]}>
            <Text
              style={[
                ColorText.white,
                ColorText.fontWeight500,
                { fontSize: FontSize.normal },
              ]}
            >
              Price
            </Text>
          </View>

          <View style={[Gutters.smallTMargin]}>
            <Text
              style={[
                ColorText.white,
                ColorText.fontWeight500,
                { fontSize: FontSize.normal },
              ]}
            >
              Package
            </Text>
            <View style={[Gutters.regularTMargin]}>
              <ScrollView horizontal ref={refReleased}>
                <TouchableOpacity onPress={() => handleShowListPackage()}>
                  <Image
                    style={{ height: 200, width: 150, borderRadius: 8 }}
                    source={require("@/Components/img/banner.webp")}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>

          <View
            style={[
              Gutters.smallTMargin,
              Layout.rowHCenter,
              { justifyContent: "space-around" },
            ]}
          >
            {/* Package */}
            {/* NORMAL */}
            <View>
              <Text style={{ color: Colors.white }}>NORMAL</Text>
              <View style={[Layout.rowHCenter]}>
                <Text style={{ color: Colors.white }}>Options1</Text>
                <Text style={[Gutters.regularLMargin, { color: Colors.white }]}>
                  OK
                </Text>
              </View>
              <View>
                <TouchableOpacity style={{ backgroundColor: "#fff" }}>
                  <Text
                    style={[
                      Gutters.regularHPadding,
                      Gutters.regularVPadding,

                      { textAlign: "center" },
                    ]}
                  >
                    BUY
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* PRENIUM */}
            <View>
              <Text style={{ color: Colors.white }}>PRENIUM</Text>
              <View style={[Layout.rowHCenter]}>
                <Text style={{ color: Colors.white }}>Options1</Text>
                <Text style={[Gutters.regularLMargin, { color: Colors.white }]}>
                  OK
                </Text>
              </View>
              <View>
                <TouchableOpacity style={{ backgroundColor: "#fff" }}>
                  <Text
                    style={[
                      Gutters.regularHPadding,
                      Gutters.regularVPadding,

                      { textAlign: "center" },
                    ]}
                  >
                    BUY
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsProduct;
