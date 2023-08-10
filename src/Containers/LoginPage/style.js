import { StyleSheet } from "react-native";
import { Colors, FontSize } from "@/Theme/Variables";
import { Platform } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  boxUserName: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "100%",
    borderRadius: 10,
    padding: 22,
    // backgroundColor: "#ffffff",
  },
  // displayNone: {
  //   display: 'none',
  // },
  displayFlex: {
    display: "flex",
  },
  changeAccount: {
    color: Colors.subBlack,
    paddingVertical: 10,
  },
  faceId: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  boxFlashMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // height: 100
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  modalTablet: {
    width: "70%",
    borderRadius: 10,
    padding: 22,
    // backgroundColor: "#ffffff",
  },
  boxButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  flexBox: {
    flexDirection: "row",
    justifyContent: "",
    alignItems: "center",
  },
  justifyContentEnd: {
    justifyContent: "flex-end",
  },
  orangeIcon: {
    color: "#d64040",
  },
  borderBottom: {
    paddingBottom: 17,
    borderBottomColor: "rgba(7, 27, 166, 0.04)",
    borderBottomWidth: 1,
  },
  borderBottomHeader: {
    borderBottomColor: "rgba(238, 238, 238, 0.16)",
    borderBottomWidth: 1,
  },
  borderRightHeader: {
    borderRightColor: "rgba(238, 238, 238, 0.16)",
    borderRightWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  touchableText: {
    color: "#fff",
    fontWeight: "500",
  },
  touchableBackground: {
    backgroundColor: "#d64040",
    paddingVertical: 15,
    borderRadius: 8,
    // marginTop: 18,
    flexGrow: 1,
    // marginRight: 15,
  },
  touchableGuestBackground: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 8,
    // marginTop: 18,
    flexGrow: 1,
    // marginRight: 15,
  },
  boxContinue: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingBottom: 10,
    paddingTop: 10,
  },
  continue: {
    color: "#FC5B00",
    marginTop: 18,
    textAlign: "center",
  },
  touchableWhiteBackground: {
    borderWidth: 1,
    borderColor: " rgba(47, 17, 0, 0.09)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 8,
  },
  touchableBackgroundText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  touchableBackgroundTextGuest: {
    color: Colors.primary,
    textAlign: "center",
    fontWeight: "bold",
  },
  label: {
    marginTop: 16,
    marginBottom: 10,
  },
  boxHrSocial: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
  },
  hr: { backgroundColor: Colors.primaryBackground, height: 1, width: "40%" },
  boxSocial: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxLeft: { width: "33.333%", paddingRight: 5 },
  boxCenter: { width: "33.333%", paddingLeft: 2.5, paddingRight: 2.5 },
  boxRight: { width: "33.333%", paddingLeft: 5 },
  boxFacebook: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b5998",
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  facebookIcon: { fontSize: FontSize.small, color: "#fff", marginRight: 10 },
  facebookText: { color: "#fff", fontSize: FontSize.verySmall },
  boxApple: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  appleIcon: { fontSize: FontSize.small, color: "#fff", marginRight: 10 },
  appleText: { color: "#fff", fontSize: FontSize.verySmall },
  boxGoogle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E23436",
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  googleIcon: { fontSize: FontSize.small, color: "#fff", marginRight: 10 },
  googleText: { color: "#fff", fontSize: FontSize.verySmall },
  inputContainer: {
    backgroundColor: "#333",
    paddingHorizontal: 20,
    width: "100%",
    height: 50,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    minWidth: "80%",
    fontSize: 16,
  },
  textError: {
    color: "#eee",
    fontWeight: "700",
  },
  textWhite: {
    color: "#ffffff",
  },
  textBold: {
    fontWeight: "700",
  },
  controller: {
    padding: 0,
  },
  socialImage: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 20,
  },
  dividerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(242, 72, 34, 0.07)",
  },
  warningBox: {
    borderRadius: 5,
    padding: 20,
  },
});

export default styles;
