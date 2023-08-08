/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { Dimensions } from 'react-native';

/**
 * Colors
 */
const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFF7F5',
  white: '#ffffff',
  text: '#212529',
  primary: '#FC5B00',
  primaryBlack: '#6B6B76',
  a: '#6D6D6D24',
  black: '#434343',
  subBlack: '#9A9A9A',
  primaryBackground: '#F5881F26',
  coloredBackground: '#FFF7F5',
  modalBackground: '#ffffff',
  success: '#28a745',
  error: '#dc3545',
  categoriesText: '#967D6F',
  gray: '#686868',
  divider: '#EBE1DB66',
  secondaryBackground: '#F5881F26',
  errorBox: '#FEA1A1',
};

export const NavigationColors = {
  primary: Colors.primary,
};

/**
 * FontSize
 */
let baseFontSize = 14;
let baseHeightImageAlone = null;
let baseHeightImages = null;
let baseWidthImages = null;

if (width < 375) {
  baseFontSize = 10;
  baseHeightImageAlone = 73;
  baseHeightImages = 35;
  baseWidthImages = 55;
  // Thiết bị điện thoại nhỏ
} else if (width > 375 && width <= 414) {
  baseFontSize = 12;
  baseHeightImageAlone = 143;
  baseHeightImages = 70;
  baseWidthImages = 90;
  // Thiết bị điện thoại lớn
} else if (width > 414 && width <= 768) {
  baseFontSize = 14;
  baseHeightImageAlone = 143;
  baseHeightImages = 70;
  baseWidthImages = 90;
  // Tablet
} else if (width > 768 && width <= 1024) {
  baseFontSize = 18;
  baseHeightImageAlone = 280;
  baseHeightImages = 140;
  baseWidthImages = 180;
}
export const HeightImage = {
  defaultHeight: baseHeightImageAlone,
  heightImages: baseHeightImages,
};
export const WidthImage = {
  baseWidthImages: baseWidthImages,
};
export const FontSize = {
  verySmall: baseFontSize,
  small: baseFontSize + 2,
  normal: baseFontSize + 4,
  regular: baseFontSize + 8,
  large: baseFontSize + 28,
};
/**
 * Metrics Sizes
 */
const none = 0;
const tiny = 5;
const small = tiny * 2; // 10
const middle = tiny * 3; // 15
const regular = tiny * 4; // 20
const large = middle * 2; // 30
export const MetricsSizes = {
  none,
  tiny,
  small,
  middle,
  regular,
  large,
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
};
