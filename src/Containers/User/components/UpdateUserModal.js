/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { userActions, makeSelectUser } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import IconFeather from "react-native-vector-icons/Feather";
import DatePicker from "react-native-date-picker";
import { useTheme } from "@/Hooks";
import moment from "moment";
import { updateUserSchema } from "../constants";
import styles from "../style";

const UpdateUserModal = (props) => {
  const { userInfo, handleShowModal, isLoading } = props;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      birthday: null,
    },
    resolver: yupResolver(updateUserSchema),
  });
  const dispatch = useDispatch();
  const { Gutters, Layout, Colors, ColorText } = useTheme();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);

  const setDefaultValue = () => {
    setValue("name", userInfo?.name);
    setValue("email", userInfo?.email);
    setValue("phoneNumber", userInfo?.tel);
    setValue("birthday", userInfo?.birthday);
  };

  useEffect(() => {
    if (userInfo) {
      setDefaultValue();
      if (userInfo?.birthday) {
        setDate(new Date(userInfo?.birthday));
      }
    }
  }, [userInfo]);

  const onSubmit = (dataSubmit) => {
    const dataRequest = { ...dataSubmit };
    console.log("dataRequest: ", dataRequest);
    // dispatch(userActions.updateUser(dataRequest));
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors.secondaryBackground },
      ]}
    >
      <View
        style={[
          Gutters.largeBPadding,
          styles.borderBottom,
          Gutters.smallTMargin,
        ]}
      >
        <Text style={[styles.title, { color: Colors.white }]}>
          Edit Profile
        </Text>
      </View>

      <View style={[styles.borderBottom, Gutters.largeBPadding]}>
        <Text style={[Gutters.regularTMargin, styles.greyText]}>Email</Text>
        <View
          style={[
            styles.inputContainer,
            Gutters.middleTMargin,
            { backgroundColor: "#ccc", borderRadius: 8 },
          ]}
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[{ color: Colors.text }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                editable={false}
              />
            )}
            name="email"
          />
        </View>
        {errors.email && (
          <Text style={[ColorText.textDanger, Gutters.tinyTMargin]}>
            {errors.email.message}
          </Text>
        )}

        <Text style={[Gutters.regularTMargin, styles.greyText]}>Full Name</Text>
        <View
          style={[
            styles.inputContainer,
            Gutters.middleTMargin,
            { backgroundColor: Colors.inputBackground, borderRadius: 8 },
          ]}
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: Colors.white }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                placeholderTextColor={Colors.white}
              />
            )}
            name="name"
          />
        </View>
        {errors.name && (
          <Text style={[ColorText.textDanger, Gutters.tinyTMargin]}>
            {errors.name.message}
          </Text>
        )}

        <Text style={[Gutters.regularTMargin, styles.greyText]}>Birth Day</Text>
        <Pressable
          style={[
            styles.inputContainer,
            Gutters.middleTMargin,
            { backgroundColor: Colors.inputBackground, borderRadius: 8 },
          ]}
          onPress={() => setOpen(true)}
        >
          <Text style={[{ fontWeight: "400" }, { color: Colors.white }]}>
            {date ? moment(date).format("DD/MM/YYYY") : ""}
          </Text>
          <IconFeather name="calendar" size={20} style={styles.orangeIcon} />
        </Pressable>
        <DatePicker
          modal
          open={open}
          date={date || new Date()}
          onConfirm={(dateData) => {
            setOpen(false);
            setValue("birthday", moment(dateData).format("YYYY-MM-DD"));
            setDate(dateData);
            // console.log(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode="date"
          maximumDate={new Date()}
        />
        {errors.birthday && (
          <Text style={[ColorText.textDanger, Gutters.tinyTMargin]}>
            {errors.birthday.message}
          </Text>
        )}
        <Text style={[Gutters.regularTMargin, styles.greyText]}>
          Phone Number
        </Text>
        <View
          style={[
            styles.inputContainer,
            Gutters.middleTMargin,
            { backgroundColor: Colors.inputBackground, borderRadius: 8 },
          ]}
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: Colors.white }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
            name="phoneNumber"
          />
        </View>
        {errors.phoneNumber && (
          <Text style={[ColorText.textDanger, Gutters.tinyTMargin]}>
            {errors.phoneNumber.message}
          </Text>
        )}
      </View>

      <View style={[Layout.row, Gutters.regularTPadding]}>
        <Pressable
          style={[
            Layout.fill,
            Layout.center,
            Gutters.tinyLMargin,
            Gutters.middleVPadding,
            styles.buttonSecondary,
          ]}
          onPress={() => handleShowModal("generalAccountModal")}
        >
          <Text style={[ColorText.textPrimary, ColorText.fontWeight700]}>
            Cancel
          </Text>
        </Pressable>
        <Pressable
          style={[
            Layout.fill,
            Layout.center,
            Gutters.middleVPadding,
            Gutters.smallLMargin,
            styles.buttonPrimary,
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={[ColorText.white, ColorText.fontWeight700]}>
              Update
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default UpdateUserModal;
