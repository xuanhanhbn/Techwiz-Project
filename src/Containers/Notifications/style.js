import { Dimensions, StyleSheet } from 'react-native';
import { Colors as CommonColor } from '@/Theme/Variables';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  btnHeaderActive: {
    backgroundColor: CommonColor.primary,
    color: 'white',
    paddingVertical: 13,
    marginHorizontal: 3,
    width: 120,
    borderRadius: 13,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
    overflow: 'hidden',
  },
  btnHeader: {
    color: CommonColor.primary,
    paddingVertical: 13,
    marginHorizontal: 3,
    width: 120,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  textDescription: {
    fontSize: 15,
    fontWeight: '700',
    color: '#777777',
  },
});
