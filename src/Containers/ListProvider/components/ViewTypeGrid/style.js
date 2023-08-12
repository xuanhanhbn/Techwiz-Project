import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bookMark: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 9999,
  },
  postDateContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 9999,
    // backgroundColor: 'rgba(26, 26, 26, 0.2)',
    borderRadius: 100,
    paddingTop: 3,
    paddingBottom: 4,
  },
  imageCollections: {
    marginRight: 3,
    height: 143,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imgContainerThree: {
    width: '50%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    aspectRatio: 1.5,
    // marginRight: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imgItem: {
    width: '100%',
    height: '100%',
  },
});
