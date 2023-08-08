import axios from 'axios';
// import { refreshAccessToken } from './common';
import {
  baseApiUrlGateway,
  // responseCode
} from './constants';
import { NavigationActions } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
const baseApiUrl = `${baseApiUrlGateway}/`;

const baseInstance = axios.create({
  baseURL: baseApiUrl,
});

baseInstance.interceptors.request.use(
  config => {
    // const loginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');
    // const roleSet = sessionStorage.getItem('roleSet');
    // if (loginData && loginData.accessToken) {
    //   config.headers.Authorization = `Bearer ${loginData.accessToken}`;
    //   // checkExpiredToken();
    // }
    config.validateStatus = (status) => status < 500;
    // config.headers['Content-Type'] = 'application/json';
    // config.headers['X-Request-ID'] = genRequestId();
    // config.headers['X-Current-Role'] = roleSet;
    return config;
  },
  error => Promise.reject(error),
);

baseInstance.defaults.timeout = 60000;

baseInstance.interceptors.response.use(
  response => {
    // if (response.headers.authorization) {
    //   sessionStorage.setItem('accessToken', response.headers.authorization);
    // }
    return response;
  }, async error => {

    // const originalRequest = error.config;
    // check lần đầu bị 401 sẽ call api refreshToken để lấy lại accessToken mới
    // nếu có accessToken sẽ recall api , còn không sẽ reject request
    if (error.response.status === 401) {
      EncryptedStorage.removeItem('loginData');
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'LOGIN' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    return Promise.reject(error);
  },
);

export default baseInstance;
