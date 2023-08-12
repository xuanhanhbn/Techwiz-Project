import { useTheme } from "@/Hooks";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import VideoPlayer from "react-native-video-player";
import IconIonic from "react-native-vector-icons/Ionicons";

function MovieDetails() {
  const { Layout, Colors, FontSizeResponsive, ColorText, Gutters } = useTheme();

  const handleSaveProduct = () => {
    console.log("Save");
  };
  return (
    <View style={[Layout.fill]}>
      <VideoPlayer
        video={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        autoplay
        // showDuration
        videoWidth={1600}
        videoHeight={900}
        thumbnail={{
          uri: "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg",
        }}
      />
      <View style={[Gutters.regularTMargin]}>
        <Text
          style={[
            FontSizeResponsive.textSmall,
            ColorText.fontWeight500,
            { color: Colors.white },
          ]}
        >
          Title
        </Text>
      </View>

      <View style={[Gutters.regularTMargin]}>
        <Text
          style={[
            FontSizeResponsive.textSmall,
            ColorText.fontWeight500,
            { color: Colors.white },
          ]}
        >
          Description
        </Text>
      </View>

      <View style={[Gutters.regularTMargin]}>
        <Text
          style={[
            FontSizeResponsive.textSmall,
            ColorText.fontWeight500,
            { color: Colors.white },
          ]}
        >
          Category
        </Text>
      </View>

      <View style={[Gutters.regularTMargin]}>
        <Text
          style={[
            FontSizeResponsive.textSmall,
            ColorText.fontWeight500,
            { color: Colors.white },
          ]}
        >
          Author
        </Text>
      </View>

      <View style={[Gutters.regularTMargin]}>
        <TouchableOpacity onPress={() => handleSaveProduct()}>
          <View>
            <IconIonic name="bookmark-outline" size={35} color={Colors.white} />

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
        <Text
          style={[
            FontSizeResponsive.textSmall,
            ColorText.fontWeight500,
            { color: Colors.white },
          ]}
        >
          1 vài phim liên quan
        </Text>
      </View>

      <View style={[Gutters.regularTMargin]}>
        <Text
          style={[
            FontSizeResponsive.textSmall,
            ColorText.fontWeight500,
            { color: Colors.white },
          ]}
        >
          Các provider cung cấp phim
        </Text>
      </View>
    </View>
  );
}

export default MovieDetails;
