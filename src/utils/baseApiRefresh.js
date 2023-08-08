import axios from 'axios';
// import { refreshAccessToken } from './common';
import { baseApiUrlGateway } from './constants';
// import EncryptedStorage from 'react-native-encrypted-storage';
// // import { NavigationActions } from '@react-navigation/native';

const baseApiRefresh = `${baseApiUrlGateway}/security-service/`;

const baseInstance = axios.create({
  baseURL: baseApiRefresh,
});
baseInstance.interceptors.request.use(config => {
    config.validateStatus = status => status < 500;
    return config;
  },
  error => Promise.reject(error),
);

baseInstance.defaults.timeout = 60000;

baseInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    return Promise.reject(error);
  },
);

export default baseInstance;
