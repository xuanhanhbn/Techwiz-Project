/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from "react-native";
import buttonStyles from "./components/Buttons";
/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ Colors, ...args }) {
  return {
    ...StyleSheet.create({
      white: {
        color: Colors.white,
      },
      colorLabels: {
        color: "#6B6B76",
      },
      textDanger: {
        color: Colors.error,
      },
      colorTitle: {
        color: "#484848",
      },
      textDiscription: {
        color: "#979797",
      },
      textPrimary: {
        color: Colors.primary,
      },
      colorIcon: {
        color: "#6D6D6D",
      },
      backgroundPrimary: {
        backgroundColor: "#FC5B00",
      },
      fontWeight800: {
        fontWeight: "800",
      },
      fontWeight700: {
        fontWeight: "700",
      },
      flex1: {
        flex: 1,
      },
      fontWeight500: {
        fontWeight: "500",
      },
      backgroundWhite: {
        backgroundColor: Colors.white,
      },
      lineHeightRe: {
        lineHeight: 32,
      },
      lineHeightMedium: {
        lineHeight: 20,
      },
    }),
  };
}
