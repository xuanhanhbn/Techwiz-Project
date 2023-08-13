import { useTheme } from "@/Hooks";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import VideoPlayer from "react-native-video-player";
import IconIonic from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import FlashMessage, { showMessage } from "react-native-flash-message";

import {
  listProductActions,
  makeSelectListProduct,
} from "../../listProductSlice";
import { baseApiUrlGetImage } from "@/utils/constants";
import { useNavigation } from "@react-navigation/native";

function MovieDetails(route) {
  const productByProvider = route?.route?.params?.productByProvider;

  const dispatch = useDispatch();
  const widthDimensions = Dimensions.get("window").width;
  const navigation = useNavigation();

  const { Layout, Colors, FontSizeResponsive, ColorText, Gutters } = useTheme();
  const [isShowMore, setIsShowMore] = useState(false);

  const getDataMovie = useSelector(makeSelectListProduct);
  const dataMovie = getDataMovie?.dataListMovie?.product || {};
  const dataProvider = getDataMovie?.dataListMovie?.provider || [];
  const populateProduct = getDataMovie?.dataListMovie?.populateProduct || [];
  const onSaveProduct = getDataMovie?.isSaveProduct;
  const isLoading = getDataMovie?.isLoading;

  const handleSaveProduct = () => {
    dispatch(listProductActions.onSaveProduct(dataMovie));
  };

  useEffect(() => {
    if (productByProvider) {
      dispatch(listProductActions.getListMoive(productByProvider));
    }
  }, [productByProvider]);

  useEffect(() => {
    if (onSaveProduct) {
      dispatch(listProductActions.cleanup());
      dispatch(listProductActions.getListMoive(productByProvider));
      showMessage({
        message: "Success",
        type: "success",
      });
    }
  }, [onSaveProduct]);

  return (
    <ScrollView style={[Layout.fill]}>
      <FlashMessage position="top" />
      {isLoading ? (
        <ActivityIndicator color={Colors.primary} size="large" />
      ) : (
        <View>
          <VideoPlayer
            video={{
              uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            autoplay
            // showDuration
            videoWidth={1600}
            videoHeight={900}
            thumbnail={{
              uri: "@/Components/img/blankImage.png",
            }}
          />
          <View style={[Gutters.regularTMargin]}>
            <Text
              style={[
                FontSizeResponsive.textSmall,
                ColorText.fontWeight700,
                { color: Colors.white },
              ]}
            >
              {dataMovie?.name}
            </Text>
          </View>

          <View style={[Gutters.regularTMargin]}>
            <Text
              numberOfLines={isShowMore ? null : 3}
              ellipsizeMode="tail"
              style={[
                FontSizeResponsive.textNormal,
                ColorText.fontWeight500,
                { color: Colors.white },
              ]}
            >
              {dataMovie?.description}
            </Text>
            <TouchableOpacity
              onPress={() => setIsShowMore(!isShowMore)}
              style={[Layout.rowHCenter]}
            >
              <Text
                style={[
                  FontSizeResponsive.textSmall,
                  { color: Colors.primary },
                ]}
              >
                {isShowMore ? "Collapse" : "Show more"}
              </Text>
              <IconIonic
                name={isShowMore ? "chevron-up" : "chevron-down"}
                color={Colors.primary}
                size={20}
              />
            </TouchableOpacity>
          </View>

          <View style={[Gutters.regularTMargin]}>
            <View style={[Layout.rowHCenter]}>
              <Text
                style={[
                  FontSizeResponsive.textNormal,
                  ColorText.fontWeight500,
                  Gutters.smallRMargin,
                  { color: Colors.white },
                ]}
              >
                Category:
              </Text>
              <Text
                style={[
                  FontSizeResponsive.textNormal,
                  ColorText.fontWeight500,
                  { color: Colors.white },
                ]}
              >
                {dataMovie?.category}
              </Text>
            </View>
          </View>

          <View style={[Gutters.regularTMargin]}>
            <View style={[Layout.rowHCenter]}>
              <Text
                style={[
                  FontSizeResponsive.textNormal,
                  ColorText.fontWeight500,
                  { color: Colors.white },
                ]}
              >
                Author:
              </Text>
              <Text
                style={[
                  FontSizeResponsive.textNormal,
                  ColorText.fontWeight500,
                  Gutters.smallLMargin,
                  { color: Colors.white },
                ]}
              >
                {dataMovie?.actor}
              </Text>
            </View>
          </View>

          <View style={[Gutters.regularTMargin]}>
            <TouchableOpacity onPress={() => handleSaveProduct()}>
              <View>
                <IconIonic
                  name={
                    dataMovie?.isSave ? "bookmark-sharp" : "bookmark-outline"
                  }
                  size={35}
                  color={Colors.primary}
                />

                <Text
                  style={[
                    FontSizeResponsive.textSmall,
                    ColorText.fontWeight500,
                    { color: Colors.white },
                  ]}
                >
                  Save
                </Text>
              </View>
            </TouchableOpacity>
          </View>

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
                A few related movies
              </Text>
            </View>
            <ScrollView horizontal>
              {Array.isArray(populateProduct) &&
                populateProduct.length > 0 &&
                populateProduct.map((itemProvinder) => (
                  <View
                    style={styles.container}
                    key={`listProvinder_${itemProvinder?._id}`}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("MOVIE_DETAILS", {
                          productByProvider: itemProvinder,
                        })
                      }
                    >
                      <Image
                        style={[
                          {
                            height: 150,
                            width: widthDimensions / 1.5,
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
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          ColorText.fontWeight700,
                          FontSizeResponsive.textSmall,
                          {
                            color: Colors.white,
                            maxWidth: widthDimensions / 1.5,
                          },
                        ]}
                      >
                        {itemProvinder?.name}
                      </Text>
                    </View>
                    <View style={[Gutters.smallTMargin]}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          ColorText.fontWeight500,
                          FontSizeResponsive.textSmall,
                          {
                            color: Colors.white,
                            maxWidth: widthDimensions / 1.5,
                          },
                        ]}
                      >
                        {itemProvinder?.description}
                      </Text>
                    </View>
                    <View style={[Gutters.smallTMargin]}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          ColorText.fontWeight500,
                          FontSizeResponsive.textSmall,
                          {
                            color: Colors.primary,
                            maxWidth: widthDimensions / 1.5,
                          },
                        ]}
                      >
                        {itemProvinder?.actor}
                      </Text>
                    </View>
                    <View style={[Gutters.smallTMargin]}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          ColorText.fontWeight500,
                          FontSizeResponsive.textSmall,
                          {
                            color: Colors.white,
                            maxWidth: widthDimensions / 1.5,
                          },
                        ]}
                      >
                        {itemProvinder?.category}
                      </Text>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>

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
                Similar providers
              </Text>
            </View>
            <ScrollView horizontal>
              {Array.isArray(dataProvider) &&
                dataProvider.length > 0 &&
                dataProvider.map((itemProvinder) => (
                  <TouchableOpacity
                    key={`listProvinder_${itemProvinder?._id}`}
                    onPress={() =>
                      navigation.navigate("DETAILS_PRODUCT", {
                        itemProvinder: itemProvinder,
                      })
                    }
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
                    <View style={[Gutters.smallTMargin]}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                          ColorText.fontWeight500,
                          FontSizeResponsive.textSmall,
                          {
                            color: Colors.white,
                            maxWidth: widthDimensions / 3,
                          },
                        ]}
                      >
                        {itemProvinder?.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

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

export default MovieDetails;
