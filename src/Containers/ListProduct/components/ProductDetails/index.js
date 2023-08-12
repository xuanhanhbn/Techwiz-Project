import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconIonic from "react-native-vector-icons/Ionicons";
import IconFeather from "react-native-vector-icons/Feather";
import { useTheme } from "@/Hooks";
import {
  listProductActions,
  makeSelectListProduct,
} from "../../listProductSlice";
import { Tooltip } from "native-base";
import { baseApiUrlGetImage } from "@/utils/constants";
import { useNavigation } from "@react-navigation/native";

const DetailsProduct = (route) => {
  const itemProvinder = route?.route?.params?.itemProvinder;
  const getDataDetailProvinder = useSelector(makeSelectListProduct);
  const dataListProductByProvinder =
    getDataDetailProvinder?.dataListProductByProvinder || [];
  const {
    Common,
    Fonts,
    Gutters,
    Layout,
    Colors,
    ColorText,
    FontSize,
    FontSizeResponsive,
    Border,
  } = useTheme();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isOpenToolTip, setIsOpenToolTip] = useState(false);
  const widthDimensions = Dimensions.get("window").width;

  const refReleased = useRef(null);

  const handleGetData = () => {
    const idProvinder = itemProvinder?._id;
    dispatch(listProductActions.getDetailsProvinder(idProvinder));
  };

  const handleGetProductByProvider = () => {
    const idProvinder = itemProvinder?._id;
    dispatch(listProductActions.getListProductByProvider(idProvinder));
  };

  useEffect(() => {
    handleGetData();
    handleGetProductByProvider();
  }, []);

  const handleShowListPackage = () => {
    console.log("list");
  };
  const handleFeedbackProvider = () => {
    console.log("feedback");
    setIsOpenToolTip(!isOpenToolTip);
  };

  const handleBuyPackage = (data) => {
    const url = `${baseApiUrlGetImage}/paypal?providerId=${itemProvinder?._id}&code=${data?.code}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={Layout.fill}>
      <View style={[Layout.fill, { backgroundColor: "#000" }]}>
        {/* Banner */}
        <View style={[Layout.colCenter]}>
          <Image
            style={{ height: 300, width: widthDimensions }}
            source={{ uri: `${baseApiUrlGetImage}${itemProvinder?.thumbnail}` }}
          />
        </View>
        <View style={[Gutters.smallHPadding]}>
          {/* Title */}
          <View style={[Gutters.smallTMargin]}>
            <Text
              style={[
                ColorText.white,
                ColorText.fontWeight700,
                FontSizeResponsive.textSmall,
              ]}
            >
              {itemProvinder?.name}
            </Text>
          </View>

          {/* Description */}
          <View style={[Gutters.smallTMargin]}>
            <Text
              style={[
                ColorText.white,
                ColorText.fontWeight500,
                FontSizeResponsive.textSmall,
              ]}
            >
              {itemProvinder?.description}
            </Text>
          </View>

          {/* Feedback */}
          <View style={[Gutters.smallTMargin]}>
            <Tooltip
              label="Click here to read more"
              openDelay={500}
              placement="top"
            >
              <TouchableOpacity onPress={() => handleFeedbackProvider()}>
                <IconFeather name="thumbs-up" color={Colors.white} size={20} />
                <Text
                  style={[
                    ColorText.fontWeight500,
                    FontSizeResponsive.textSmall,
                    { color: Colors.white },
                  ]}
                >
                  Feed back
                </Text>
              </TouchableOpacity>
            </Tooltip>
          </View>

          <View style={[Gutters.smallTMargin]}>
            <Text
              style={[
                ColorText.white,
                ColorText.fontWeight500,
                FontSizeResponsive.textSmall,
                { fontSize: FontSize.normal },
              ]}
            >
              Package
            </Text>
            <View style={[Gutters.smallTMargin]}>
              <ScrollView
                horizontal
                ref={refReleased}
                showsHorizontalScrollIndicator={false}
              >
                {itemProvinder?.packages?.length > 0 &&
                  itemProvinder?.packages.map((itemPackge) => (
                    <View>
                      <View
                        style={{
                          height: 300,
                          width: widthDimensions / 2,
                          borderRadius: 8,
                          backgroundColor: Colors.secondaryBackground,
                          marginRight: 3,
                        }}
                      >
                        <Text
                          style={[
                            Gutters.smallTMargin,
                            FontSizeResponsive.textSmall,
                            { color: Colors.white, textAlign: "center" },
                          ]}
                        >
                          {itemPackge?.name}
                        </Text>

                        <View
                          style={[
                            Layout.rowHCenter,
                            Gutters.regularHPadding,
                            Gutters.regularTMargin,
                            { justifyContent: "space-between" },
                          ]}
                        >
                          <Text
                            style={[
                              FontSizeResponsive.textSmall,
                              ColorText.fontWeight500,
                              { color: Colors.white },
                            ]}
                          >
                            {itemPackge?.equipment}
                          </Text>
                          <IconIonic
                            name="checkmark-circle"
                            color={Colors.primary}
                            size={18}
                          />
                        </View>

                        <View
                          style={[
                            Layout.rowHCenter,
                            Gutters.regularHPadding,
                            Gutters.regularTMargin,
                            ColorText.fontWeight500,
                            { justifyContent: "space-between" },
                          ]}
                        >
                          <Text
                            style={[
                              FontSizeResponsive.textSmall,
                              { color: Colors.white },
                            ]}
                          >
                            {itemPackge?.resolution}
                          </Text>
                          <IconIonic
                            name="checkmark-circle"
                            color={Colors.primary}
                            size={18}
                          />
                        </View>

                        <View
                          style={[
                            Layout.rowHCenter,
                            Gutters.regularHPadding,
                            Gutters.regularTMargin,
                            ColorText.fontWeight500,
                            { justifyContent: "space-between" },
                          ]}
                        >
                          <Text
                            style={[
                              FontSizeResponsive.textSmall,
                              { color: Colors.white },
                            ]}
                          >
                            Number Of Equipment
                          </Text>
                          <Text
                            style={[
                              FontSizeResponsive.textSmall,
                              ColorText.fontWeight500,
                              { color: Colors.primary },
                            ]}
                          >
                            {itemPackge?.numberOfEquipment}
                          </Text>
                        </View>

                        <View
                          style={[
                            Layout.rowHCenter,
                            Gutters.regularHPadding,
                            Gutters.regularTMargin,
                            { justifyContent: "space-between" },
                          ]}
                        >
                          <Text
                            style={[
                              FontSizeResponsive.textSmall,
                              ColorText.fontWeight500,
                              { color: Colors.white },
                            ]}
                          >
                            Price
                          </Text>
                          <Text
                            style={[
                              FontSizeResponsive.textSmall,
                              ColorText.fontWeight500,
                              { color: Colors.primary },
                            ]}
                          >
                            {itemPackge?.price} $
                          </Text>
                        </View>

                        <View style={{ marginTop: 3 }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: Colors.primary,
                              marginRight: 3,
                              marginTop: 5,
                              borderRadius: 8,
                            }}
                            onPress={() => handleBuyPackage(itemPackge)}
                          >
                            <Text
                              style={[
                                Gutters.regularHPadding,
                                Gutters.smallVPadding,
                                FontSizeResponsive.textSmall,
                                ColorText.fontWeight500,
                                { textAlign: "center", color: Colors.white },
                              ]}
                            >
                              BUY
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
              </ScrollView>
            </View>
          </View>

          <View style={[Gutters.smallTMargin]}>
            <Text
              style={[
                ColorText.white,
                ColorText.fontWeight500,
                Gutters.smallBMargin,
                FontSizeResponsive.textSmall,
              ]}
            >
              List Movie
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicato={false}>
              {Array.isArray(dataListProductByProvinder) &&
                dataListProductByProvinder.map((productByProvider) => {
                  return (
                    <View
                      style={styles.container}
                      key={`listProvinder_${productByProvider?._id}`}
                    >
                      <TouchableOpacity
                        onPress={() => navigation.navigate("MOVIE_DETAILS")}
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
                            uri: `${baseApiUrlGetImage}${productByProvider.thumbnail}`,
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
                          {productByProvider?.name}
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
                          {productByProvider?.description}
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
                          {productByProvider?.actor}
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
                          {productByProvider?.category}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </View>
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

export default DetailsProduct;
