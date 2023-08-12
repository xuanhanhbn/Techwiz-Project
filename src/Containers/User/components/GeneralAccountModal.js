import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import IconFeather from "react-native-vector-icons/Feather";
import { useTheme } from "@/Hooks";
import moment from "moment";
import styles from "../style";

const GeneralAccountModal = (props) => {
  const { userInfo, handleShowModal } = props;

  const { Gutters, Colors, ColorText, FontSizeResponsive } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors.secondaryBackground },
      ]}
    >
      <Text
        style={[
          styles.title,
          Gutters.largeBMargin,
          Gutters.smallTMargin,
          { color: Colors.white },
        ]}
      >
        Account Overview
      </Text>

      <View
        style={[styles.flexBox, styles.borderBottom, Gutters.middleBPadding]}
      >
        <View>
          <Text style={[styles.subTitle, { color: Colors.white }]}>
            Profile
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleShowModal("updateUserModal");
          }}
          style={styles.touchable}
        >
          <Text style={[FontSizeResponsive.textSmall, styles.touchableText]}>
            Edit Profile
          </Text>
          <IconFeather
            name="chevron-right"
            size={18}
            style={styles.touchableText}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={Gutters.regularTMargin}>
          <Text style={styles.greyText}>Email</Text>
          <Text
            style={[
              ColorText.fontWeight700,
              FontSizeResponsive.textSmall,
              { color: Colors.primary },
            ]}
          >
            {userInfo?.email}
          </Text>
        </View>
        <View style={Gutters.regularTMargin}>
          <Text style={styles.greyText}>Full Name</Text>
          <Text
            style={[
              ColorText.fontWeight700,
              FontSizeResponsive.textSmall,
              { color: Colors.primary },
            ]}
          >
            {userInfo?.name}
          </Text>
        </View>
        <View style={Gutters.regularTMargin}>
          <Text style={styles.greyText}>Phone Number</Text>
          <Text
            style={[
              ColorText.fontWeight700,
              FontSizeResponsive.textSmall,
              { color: Colors.primary },
            ]}
          >
            {userInfo?.tel}
          </Text>
        </View>
        <View style={Gutters.regularTMargin}>
          <Text style={styles.greyText}>Birth Day</Text>
          <Text
            style={[
              ColorText.fontWeight700,
              FontSizeResponsive.textSmall,
              { color: Colors.primary },
            ]}
          >
            {userInfo?.birthday
              ? moment(userInfo?.birthday).format("DD/MM/YYYY")
              : ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GeneralAccountModal;
