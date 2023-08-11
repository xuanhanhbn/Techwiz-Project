/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@/Hooks";
import { useForm, Controller } from "react-hook-form";
import IconFeather from "react-native-vector-icons/Feather";
import IconIonic from "react-native-vector-icons/Ionicons";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginActions, makeSelectLogin } from "../loginSlice";
import { loginSchema } from "../constants";
import styles from "../style";
import { useNavigation } from "@react-navigation/native";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import EncryptedStorage from "react-native-encrypted-storage";
import analytics from "@react-native-firebase/analytics";

const LoginModal = (props) => {
  // const { t } = useTranslation();
  const { Colors, Gutters } = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    // defaultValues: {
    //   username: "",
    //   password: "",
    // },
    resolver: yupResolver(loginSchema),
  });
  const dispatch = useDispatch();
  // const toast = useToast();
  const navigation = useNavigation();
  const loginData = useSelector(makeSelectLogin);
  const { isLoading } = loginData;
  const { handleShowModal, showMessage, loginMutateFunction } = props;
  const { width } = Dimensions.get("window");
  // console.log('loginData login modal', loginData);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [sensorAvailable, setSensorAvailable] = useState(null);
  const [lastUserLogin, setLastUserLogin] = useState(null);
  const [isOpenFacebook, setIsOpenFacebook] = useState(false);
  const [isOpenGoogle, setIsOpenGoogle] = useState(false);
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  // const removePrevKeyBiometric = async () => {

  // };

  const onSubmit = (data) => {
    // const formData = new FormData();
    // formData.append("username", data.username.trim());
    // formData.append("password", data.password);
    // formData.append("grant_type", "password");
    // formData.append("scope", "read");
    loginMutateFunction.mutate(data);
    analytics().logLogin({ method: "Manual" });
  };

  // check  đã tồn tại key trong store chưa
  const getBiometricKeysExist = async () => {
    try {
      const { keysExist } = await rnBiometrics.biometricKeysExist();
      // console.log('keysExist', keysExist);
      return keysExist;
    } catch (error) {
      return false;
    }
  };

  const getSensorAvailableData = async () => {
    try {
      const data = await rnBiometrics.isSensorAvailable();
      // console.log('getSensorAvailableData', data);
      setSensorAvailable(data);
    } catch (error) {}
    // console.log('data', data);
  };

  const checkSensitiveData = async () => {
    try {
      // Kiểm tra xem đã có dữ liệu nhạy cảm được lưu trữ hay chưa
      const data = await EncryptedStorage.getItem("userInfo");
      const user = JSON.parse(data);
      if (user && user?.stepActive === "2") {
        setLastUserLogin(user);
        setValue("username", user?.username);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    // dispatch(loginActions.cleanup());
    // getDevice();
    getSensorAvailableData();
    getBiometricKeysExist();
    checkSensitiveData();
    reset();
  }, []);

  const handleRedirectMain = () => navigation.navigate("Main");

  const handleRemoveLastLogin = () => {
    setLastUserLogin(null);
    setValue("username", "");
    dispatch(loginActions.cleanup());
  };

  const getMainTitle = () => {
    if (lastUserLogin?.username) {
      return (
        <View style={{ ...styles.borderBottom, ...styles.boxUserName }}>
          <Text style={[styles.title, { color: Colors.black }]}>
            Welcome,{" "}
            <Text style={[styles.title, { color: Colors.primary }]}>
              {lastUserLogin.displayName}
            </Text>
          </Text>
          <TouchableOpacity onPress={() => handleRemoveLastLogin()}>
            <View>
              <Text style={styles.changeAccount}>
                Log in under a different name
              </Text>
            </View>
          </TouchableOpacity>
          {/* {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>} */}
        </View>
      );
    }
    // return (
    //   <View style={styles.borderBottom}>
    //     <Text style={[styles.title, { color: Colors.black }]}>
    //       Welcome to Stream Master
    //     </Text>
    //     {/* {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>} */}
    //   </View>
    // );
  };

  return (
    <View style={width > 800 ? styles.modalTablet : styles.modal}>
      {getMainTitle()}
      <View>
        <View>
          {/* {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>} */}
          {!lastUserLogin?.email && (
            <View>
              {/* <Text style={[styles.label, { color: Colors.black }]}>
                UserName/Email
              </Text> */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, { color: "#fff" }]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      placeholder="UserName/Email"
                      placeholderTextColor="#fff"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  )}
                  name="email"
                />
              </View>
              {errors.email && (
                <Text style={styles.textError}>{errors.email.message}</Text>
              )}
            </View>
          )}
        </View>
        <View style={[styles.label]}>
          {/* <Text style={{ color: Colors.black }}>Password</Text> */}
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => handleShowModal("forgotPasswordModal")}
          >
            <Text style={styles.touchableText}>Forgot Password</Text>
            <IconFeather
              name="chevron-right"
              size={18}
              style={styles.touchableText}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: "#fff" }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={isShowPassword}
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor="#fff"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="password"
            style={styles.controller}
          />
          <Pressable onPress={() => setIsShowPassword(!isShowPassword)}>
            {isShowPassword ? (
              <IconFeather name="eye-off" size={15} style={styles.orangeIcon} />
            ) : (
              <IconFeather name="eye" size={15} style={styles.orangeIcon} />
            )}
          </Pressable>
        </View>
        {errors.password && (
          <Text style={styles.textError}>{errors.password.message}</Text>
        )}

        <View style={styles.boxButton}>
          <TouchableOpacity
            style={[styles.touchableBackground]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {loginMutateFunction.isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <View>
                <Text style={styles.touchableBackgroundText}>LOGIN</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default LoginModal;
