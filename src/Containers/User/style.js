import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: '#ffffff'
  },
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 22,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    // shadowRadius: 2,
    elevation: 2,
  },
  zIndex1: {
    zIndex: 10,
  },
  boxUserName: { display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' },
  userName: { maxWidth: '85%', overflow: 'hidden' },
  boxIconCopy: { paddingLeft: 5 },
  boxBiometrics: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  boxBiometricsLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  topBackground: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 0,
    backgroundColor: '#FFF7F5',
  },
  topElements: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 20,
  },
  greyText: {
    color: '#B5B5B5',
    marginBottom: 5,
    // fontSize: 12,
  },
  orangeIcon: {
    color: '#F24822',
  },
  borderBottom: {
    borderBottomColor: 'rgba(7, 27, 166, 0.04)',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  subTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  faceId: {
    width: 20,
    height: 20,
  },
  bigNumber: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableText: {
    color: '#F24822',
  },
  buttonPrimary: {
    backgroundColor: '#FC5B00',
    borderRadius: 8,
  },
  buttonSecondary: {
    backgroundColor: '#FFF7F5',
    borderRadius: 8,
  },
  backButton: {
    marginTop: 60,
  },
  packageBox: {
    backgroundColor: '#FFF7F5',
    borderRadius: 8,
    width: '48%',
    marginTop: 12,
    paddingTop: 80,
    paddingLeft: 15,
    paddingBottom: 16,
  },
  // input: {
  //   borderBottomWidth: 1,
  //   borderColor: '#cccccc',
  //   padding: 10,
  //   width: '90%',
  //   marginBottom: 10,
  //   borderRadius: 5
  // },
  inputContainer: {
    // backgroundColor: "#FFF7F5",
    paddingHorizontal: 20,
    width: '100%',
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    minWidth: '80%',
  },
});

export default styles;
