/* eslint-disable react-native/no-inline-styles */
import React, { memo, forwardRef } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { useTheme } from "@/Hooks";
import { styles } from "./style";
import { Divider } from "@rneui/base";
import IonIcons from "react-native-vector-icons/Ionicons";
// import MenuSelect from "@/Containers/AlbumListBDS/components/menu";
import { useNavigation } from "@react-navigation/native";
import FontAweSoweIcons from "react-native-vector-icons/FontAwesome";
import DisplayRealTime from "@/Components/RealTime";
import imageBlank from "@/Components/img/blankImage.png";
import { baseApiUrlGetImage } from "@/utils/constants";

const width = Dimensions.get("window").width;
const ViewTypeGrid = forwardRef((props, ref) => {
  const { value, handleRefresh, onLoadMoreData, isLoading } = props;
  console.log("value: ", value);
  const navigation = useNavigation();

  const { Gutters, Layout, ColorText, Border, FontSize, Colors } = useTheme();

  const getPaddingBottom = () => (Platform.OS === "ios" ? 260 : 260);

  // Xử lý chi tiết
  const handleDetail = (item) => {
    navigation.navigate("DETAILS_PRODUCT", { itemProvinder: item });
  };

  const handleShowNumberColumns = () => {
    if (width >= 768) {
      return 2;
    }
    if (width < 768) {
      return 1;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {Array.isArray(value) && value.length > 0 ? (
        <FlatList
          data={value}
          ref={ref}
          onRefresh={handleRefresh}
          refreshing={isLoading}
          onEndReached={onLoadMoreData}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: getPaddingBottom() }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={handleShowNumberColumns()}
          renderItem={({ item }) => {
            return (
              <>
                {/* Hiển thị dạng mobile */}
                {width <= 768 && (
                  <View key={item.id} style={[Gutters.largeBMargin]}>
                    <View style={[styles.postDateContainer]}>
                      <Text
                        style={[
                          ColorText.white,
                          Gutters.smallHPadding,
                          { fontSize: FontSize.small },
                        ]}
                      ></Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDetail(item)}>
                      <Image
                        style={[
                          Border.smallRadius,
                          {
                            width: "100%",
                            height: width * 0.6,
                            borderColor: "#fff",
                            borderWidth: 1,
                          },
                        ]}
                        source={
                          item.thumbnail
                            ? {
                                uri: `${baseApiUrlGetImage}${item.thumbnail}`,
                              }
                            : imageBlank
                        }
                        alt="image"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    <View style={[Gutters.smallHMargin]}>
                      <View>
                        <TouchableOpacity onPress={() => handleDetail(item)}>
                          {/* Title */}
                          <Text
                            style={[
                              Gutters.regularVMargin,
                              ColorText.fontWeight800,
                              {
                                fontSize: FontSize.small,
                                color: Colors.white,
                              },
                            ]}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* Description */}
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={[
                          Gutters.smallBMargin,

                          { fontSize: FontSize.small, color: Colors.white },
                        ]}
                      >
                        {item?.description}
                      </Text>

                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={[
                          Gutters.smallBMargin,
                          ColorText.fontWeight700,
                          { fontSize: FontSize.small, color: Colors.primary },
                        ]}
                      >
                        {item?.priceRange}
                      </Text>

                      <Divider />
                      {/* <View style={[Layout.row]}>
                        <View style={[Layout.rowHCenter]}>
                          <IonIcons
                            style={[ColorText.colorIcon]}
                            name="bed-outline"
                            size={30}
                          />
                          <Text
                            style={[
                              Fonts.textSmall,
                              ColorText.fontWeight500,
                              Gutters.smallLMargin,
                              ColorText.colorIcon,
                            ]}
                          >
                            {item.bedRoomNum || "--"}
                          </Text>
                        </View>
                        <View
                          style={[Gutters.regularLMargin, Layout.rowHCenter]}
                        >
                          <FontAweSoweIcons
                            name="bath"
                            style={[ColorText.colorIcon]}
                            size={24}
                          />

                          <Text
                            style={[
                              Fonts.textSmall,
                              ColorText.fontWeight500,
                              Gutters.smallLMargin,
                              ColorText.colorIcon,
                            ]}
                          >
                            {item.toiletRoomNum || "--"}
                          </Text>
                        </View>
                        <View
                          style={[Gutters.regularLMargin, Layout.rowHCenter]}
                        >
                          <IonIcons
                            style={[ColorText.colorIcon]}
                            size={30}
                            name="compass-outline"
                          />

                          <Text
                            style={[
                              Fonts.textSmall,
                              ColorText.fontWeight500,
                              Gutters.smallLMargin,
                              ColorText.colorIcon,
                            ]}
                          >
                            {item.houseDirection || "--"}
                          </Text>
                        </View>
                      </View> */}
                    </View>
                  </View>
                )}

                {/* Hiển thị dạng tablet */}
                {width >= 768 && (
                  <View
                    key={item.id}
                    style={[Layout.fill, Gutters.smallHMargin]}
                  >
                    <View style={styles.item}>
                      {/* Menu */}
                      {/* <View style={[styles.bookMark]}>
                        <MenuSelect
                          value={value}
                          listDetails={listDetails}
                          item={item}
                          dataRequest={dataRequest}
                          typeMenu="grid"
                        />
                      </View> */}
                      {/* Date */}
                      <View style={styles.postDateContainer}>
                        <Text
                          style={[
                            ColorText.white,
                            Gutters.smallHPadding,
                            { fontSize: FontSize.small },
                          ]}
                        >
                          {/* <DisplayRealTime time={apiTime} /> */}
                        </Text>
                      </View>
                      {/* Image */}
                      <TouchableOpacity onPress={() => handleDetail(item)}>
                        <Image
                          style={styles.imgItem}
                          source={
                            item.thumbnail
                              ? {
                                  uri: `${baseApiUrlGetImage}${item.thumbnail}`,
                                }
                              : imageBlank
                          }
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={[Gutters.smallHMargin, Gutters.largeBMargin]}>
                      <View>
                        <TouchableOpacity onPress={() => handleDetail(item)}>
                          {/* Title */}
                          <Text
                            style={[
                              Gutters.regularVMargin,
                              ColorText.fontWeight800,
                              { fontSize: FontSize.small, color: Colors.white },
                            ]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* Location */}
                      <Text
                        style={[
                          Gutters.smallBMargin,
                          { fontSize: FontSize.small, color: Colors.white },
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.description}
                      </Text>
                      <Divider />
                    </View>
                  </View>
                )}
              </>
            );
          }}
        />
      ) : (
        <Text style={[{ fontSize: FontSize.small, color: Colors.white }]}>
          No matching search results.
        </Text>
      )}
    </View>
  );
});

export default ViewTypeGrid;
