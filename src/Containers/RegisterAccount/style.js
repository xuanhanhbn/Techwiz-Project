import { Colors } from "@/Theme/Variables";
import { Dimensions, StyleSheet } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
  },

  imgBackground: {
    flex: 1,
    justifyContent: "center",
  },
  registerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    // backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
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
  iconShowPass: {
    position: "absolute",
    right: 0,
    color: Colors.primary,
    padding: 10,
    backgroundColor: "transparent",
  },

  inputValue: {
    backgroundColor: "#333",
    borderRadius: 8,
    height: 50,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: "#333",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    // padding: 10,
  },

  rightHeader: {
    position: "absolute",
    right: 20,
  },
});
