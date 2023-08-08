/**
 * This file contains all application's style relative to fonts
 */
import { Dimensions, StyleSheet } from 'react-native';

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function () {
  return StyleSheet.create({
    textSmall: {
      fontSize: height * 0.02,
    },
    textDefault: {
      fontSize: height * 0.03,
    },
    textMedium: {
      fontSize: height * 0.04,
    },
    textLarge: {
      fontSize: height * 0.06,
    },
    textTitle: {
      fontSize: height * 0.03,
    },
  });
}
