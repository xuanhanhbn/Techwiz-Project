import {
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import IconIonic from "react-native-vector-icons/Ionicons";

import React, { memo, forwardRef, useState } from "react";
import { Card } from "@rneui/themed";
import { useTheme } from "@/Hooks";
import { useNavigation } from "@react-navigation/native";
import imageBlank from "@/Components/img/blankImage.png";
import { baseApiUrlGetImage } from "@/utils/constants";
import VideoPlayer from "react-native-video-player";

const width = Dimensions.get("window").width;
const DisplayTypeMenu = forwardRef((props, ref) => {
  const { value, handleRefresh, onLoadMoreData, type } = props;
  const [isShowMore, setIsShowMore] = useState(false);
  const navigation = useNavigation();
  const {
    Fonts,
    Gutters,
    Layout,
    ColorText,
    darkMode,
    FontSize,
    Colors,
    FontSizeResponsive,
  } = useTheme();

  const handleDetail = (item) => {
    navigation.navigate("POSTDETAIL", { item });
  };

  const handleCustomStyle = (data) => {
    console.log("dat:A", data);
  };

  const getPaddingBottom = () => (Platform.OS === "ios" ? 260 : 260);
  return (
    <View>
      {Array.isArray(value) && value.length > 0 ? (
        <FlatList
          data={value}
          onRefresh={handleRefresh}
          ref={ref}
          refreshing={false}
          keyExtractor={(item) => item.id}
          onEndReached={onLoadMoreData}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: getPaddingBottom() }}
          renderItem={({ item }) => (
            <View
              key={item.id}
              style={[Gutters.smallVMargin, Gutters.regularHPadding]}
            >
              <View>
                <VideoPlayer
                  video={{
                    uri: `${baseApiUrlGetImage}${item?.thumbnail}`,
                  }}
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
                    {item?.name}
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
                    {item?.description}
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
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={{ fontSize: FontSize.small, color: Colors.white }}>
          No suitable search results.
        </Text>
      )}
    </View>
  );
});

export default memo(DisplayTypeMenu);
