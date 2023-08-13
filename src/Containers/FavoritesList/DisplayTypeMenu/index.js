import {
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { memo, forwardRef } from "react";
import { Card } from "@rneui/themed";
import { useTheme } from "@/Hooks";
import { useNavigation } from "@react-navigation/native";
import imageBlank from "@/Components/img/blankImage.png";

const width = Dimensions.get("window").width;
const DisplayTypeMenu = forwardRef((props, ref) => {
  const { value, handleRefresh, onLoadMoreData, type } = props;
  const navigation = useNavigation();
  const { Fonts, Gutters, Layout, ColorText, darkMode, FontSize, Colors } =
    useTheme();

  const handleDetail = (item) => {
    navigation.navigate("POSTDETAIL", { item });
  };

  const getPaddingBottom = () => (Platform.OS === "ios" ? 260 : 260);

  return (
    <View style={{ flex: type === "album" ? 1 : 0 }}>
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
            <View key={item.id} style={[Gutters.smallVMargin]}>
              <View style={[Layout.rowHCenter, Layout.fullWeight]}>
                <View style={[Layout.smallWidth]}>
                  <TouchableOpacity onPress={() => handleDetail(item)}>
                    <Card.Image
                      style={[{ height: width * 0.3, borderRadius: 5 }]}
                      source={
                        imageBlank
                        // item.urlImages.length > 0
                        //   ? {
                        //       uri: item.urlImages[0],
                        //     }
                        //   : imageBlank
                      }
                      alt="image"
                    />
                  </TouchableOpacity>
                </View>

                <View style={[Layout.mediumWidth, Gutters.smallLMargin]}>
                  <View style={[Layout.fullWeight]}>
                    <TouchableOpacity onPress={() => handleDetail(item)}>
                      <Text
                        style={[
                          Layout.fullWeight,
                          ColorText.fontWeight800,
                          Gutters.smallRPadding,
                          {
                            fontSize: FontSize.small,
                            color: Colors.text,
                          },
                        ]}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {item.title}
                      </Text>

                      <Text
                        style={[
                          Gutters.smallBMargin,
                          Gutters.smallRPadding,
                          ColorText.colorLabels,
                          { fontSize: FontSize.small },
                        ]}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {item.location}
                      </Text>

                      <View style={[Layout.rowHCenter]}>
                        <Text
                          style={[
                            Gutters.regularRMargin,
                            Fonts.textBold,
                            {
                              fontSize: FontSize.small,
                              color: darkMode ? Colors.white : Colors.text,
                            },
                          ]}
                        >
                          {item.price}
                        </Text>
                        <Text
                          style={{
                            color: darkMode ? Colors.white : Colors.text,
                            fontSize: FontSize.small,
                          }}
                        >
                          {item.area || ""}
                          {item.area > 0 ? item.areaUnit : ""}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
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
