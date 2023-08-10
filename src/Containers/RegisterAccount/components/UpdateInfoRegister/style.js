import { Colors } from "@/Theme/Variables";
import { StyleSheet } from "react-native";

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
    // backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 60,
  },
  buttonSubmit: {
    backgroundColor: "#ccc",
    borderRadius: 8,
  },

  iconShowPass: {
    position: "absolute",
    right: 0,
    padding: 10,
    // top: '30%',
    backgroundColor: "transparent",
    color: Colors.primary,
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
  inputValue: {
    backgroundColor: "#333",
    borderRadius: 8,
    height: 50,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  rightHeader: {
    position: "absolute",
    right: 20,
  },
});
