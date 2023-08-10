import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  imgBackground: {
    flex: 1,
    justifyContent: "center",
  },
  registerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    position: "absolute",
    bottom: 90,
    left: 16,
    right: 16,
  },

  buttonSubmit: {
    backgroundColor: "#ccc",
    borderRadius: 8,
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

  // Update Info
  goBackRegister: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textInfo: {
    marginLeft: 5,
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 18,
    color: "#6D6D6D",
  },
});
