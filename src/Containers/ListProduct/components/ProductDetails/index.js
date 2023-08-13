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
import { Tooltip } from "@rneui/themed";
import { baseApiUrlGetImage } from "@/utils/constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EncryptedStorage from "react-native-encrypted-storage";
import { Divider } from "native-base";

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
  useFocusEffect(
    React.useCallback(() => {
      handleGetData();
      handleGetProductByProvider();
    }, [])
  );

  const handleShowListPackage = () => {
    console.log("list");
  };

  const handleFeedbackProvider = (config) => {
    const providerId = itemProvinder?._id;

    if (config.field === "not") {
      const newDataRequest = {
        providerId: providerId,
        content: "1",
      };
      return dispatch(listProductActions.onFeedBackProvider(newDataRequest));
    }
    if (config.field === "like") {
      const newDataRequest = {
        providerId: providerId,
        content: "2",
      };
      return dispatch(listProductActions.onFeedBackProvider(newDataRequest));
    }
    if (config.field === "veryMuch") {
      const newDataRequest = {
        providerId: providerId,
        content: "3",
      };
      return dispatch(listProductActions.onFeedBackProvider(newDataRequest));
    }
  };

  const renderPopover = () => {
    return (
      <View style={[Layout.rowHCenter]}>
        <TouchableOpacity
          onPress={() => handleFeedbackProvider({ field: "not" })}
        >
          <View style={{ alignItems: "center" }}>
            <IconFeather name="thumbs-down" color={Colors.white} size={20} />
            <Text
              style={[FontSizeResponsive.textSmall, { color: Colors.white }]}
            >
              Don't like it
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFeedbackProvider({ field: "like" })}
        >
          <View style={{ alignItems: "center", paddingHorizontal: 25 }}>
            <IconFeather name="thumbs-up" color={Colors.white} size={20} />
            <Text
              style={[FontSizeResponsive.textSmall, { color: Colors.white }]}
            >
              Like
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFeedbackProvider({ field: "veryMuch" })}
        >
          <View style={{ alignItems: "center" }}>
            <IconFeather name="heart" color={Colors.white} size={20} />
            <Text
              style={[FontSizeResponsive.textSmall, { color: Colors.white }]}
            >
              Great!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleBuyPackage = async (data) => {
    const tokenUser = await EncryptedStorage.getItem("loginData");
    const trimToken = tokenUser ? tokenUser.slice(1, -1) : "";
    const url = `${baseApiUrlGetImage}/paypal?providerId=${itemProvinder?._id}&code=${data?.code}&token=${trimToken}`;

    Linking.openURL(url);
  };

  return (
    <ScrollView style={Layout.fill}>
      <View style={[Layout.fill, { backgroundColor: "#000" }]}>
        <View>
          {/* <IconIonic
            name="chevron-back-outline"
            size={20}
            color={Colors.white}
            style={[Gutters.regularTPadding]}
          /> */}
          <Image
            style={{ height: 300, width: widthDimensions }}
            source={{ uri: `${baseApiUrlGetImage}${itemProvinder?.thumbnail}` }}
          />
        </View>
        {/* Banner */}
        <View style={[Layout.colCenter]} />
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
              visible={isOpenToolTip}
              onOpen={() => {
                setIsOpenToolTip(true);
              }}
              onClose={() => {
                setIsOpenToolTip(false);
              }}
              popover={renderPopover()}
              height={60}
              width={250}
              withPointer={false}
            >
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
            </Tooltip>
          </View>

          <View style={[Gutters.smallTMargin]}>
            <Text
              style={[
                ColorText.white,
                ColorText.fontWeight700,
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
                            ColorText.fontWeight700,
                            { color: Colors.white, textAlign: "center" },
                          ]}
                        >
                          {itemPackge?.name}
                        </Text>
                        <Divider my={2} />

                        <View
                          style={[
                            Layout.rowHCenter,
                            Gutters.regularHPadding,

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
                        <Divider my={2} />

                        <View
                          style={[
                            Layout.rowHCenter,
                            Gutters.regularHPadding,

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
                        <Divider my={2} />

                        <View
                          style={[
                            Layout.rowHCenter,
                            Gutters.regularHPadding,

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
                        <Divider my={2} />

                        <View
                          style={[
                            Layout.rowHCenter,
                            Gutters.regularHPadding,

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
                              ColorText.fontWeight700,
                              { color: "yellow" },
                            ]}
                          >
                            {itemPackge?.price} $
                          </Text>
                        </View>
                        <Divider my={2} />

                        <View
                          style={[
                            Gutters.smallTMargin,
                            { justifyContent: "center", alignItems: "center" },
                          ]}
                        >
                          <TouchableOpacity
                            style={{
                              backgroundColor: Colors.primary,
                              marginTop: 5,
                              borderRadius: 8,
                              width: "60%",
                            }}
                            onPress={() => handleBuyPackage(itemPackge)}
                          >
                            <Text
                              style={[
                                Gutters.tinyVPadding,
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
                        onPress={() =>
                          navigation.navigate("MOVIE_DETAILS", {
                            productByProvider,
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
