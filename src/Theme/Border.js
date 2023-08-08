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
      regularRadius: {
        borderRadius: 15,
      },
      smallRadius: {
        borderRadius: 8,
      },
    }),
  };
}
