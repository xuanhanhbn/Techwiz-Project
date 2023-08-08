
import axios from 'axios';
// import { refreshAccessToken } from './common';
import {
  baseApiUrlGateway,
  // responseCode
} from './constants';
import EncryptedStorage from 'react-native-encrypted-storage';
import { NavigationActions } from '@react-navigation/native';
const baseApiUrlNews = `${baseApiUrlGateway}/news-service/api/v1/`;

const baseInstance = axios.create({
  baseURL: baseApiUrlNews,
});

baseInstance.interceptors.request.use(
  // async (config) => {
  //   try {
  //     const loginData = await EncryptedStorage.getItem('loginData');

  //     // const roleSet = sessionStorage.getItem("roleSet");
  //     if (loginData !== undefined) {
  //       const loginDataParse = JSON.parse(loginData);
  //       config.headers.Authorization = `Bearer ${loginDataParse.access_token}`;
  //       // checkExpiredToken();
  //     }
  //   } catch (error) {
  //     config.headers['Content-Type'] = 'application/json';
  //     // config.headers["X-Request-ID"] = uuidv4();
  //     config.headers.Authorization = 'Basic d2ViYXBwOmVuYW9AMTIz';
  //     config.validateStatus = (status) => status < 500;

  //     // config.headers['X-Current-Role'] = roleSet;
  //   } finally {
  //     return config;
  //   }
  // },
  // (error) => Promise.reject(error)
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
  (response) => {
    return response;
  },
  async (error) => {
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
  }
);

export default baseInstance;
