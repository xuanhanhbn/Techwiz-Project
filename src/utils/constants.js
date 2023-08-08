import Config from 'react-native-config';

export const baseApiUrl = 'http://10.100.30.35:9085';
export const baseApiUrlGatewayProd = 'https://mapi.star.vn';

// export const baseApiUrlGateway = 'http://10.100.30.35:9095';
export const baseApiUrlGateway = 'https://mapi.star.vn';
export const baseUrlWebsite = 'https://star.vn';

export const displayTypes = {
  grid: 'GRID',
  menu: 'MENU',
  list: 'LIST',
};

export const googleLoginConfig = {
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  iosClientId:
    '195989098397-gbnj5t8d7nhd1ufe328hhh2ed5i5f53j.apps.googleusercontent.com',
  androidClientId:
    '195989098397-85jifo9ep250agmvb0462vmac2o21kgc.apps.googleusercontent.com',
  webClientId:
    '195989098397-h8hdao73akj5c77o8d3lhagn1c0mb6si.apps.googleusercontent.com',
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
};