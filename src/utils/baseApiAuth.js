import axios from 'axios';
// import Config from 'react-native-config';
// import { refreshAccessToken } from './common';
import {
  baseApiUrlGateway,
} from './constants';

const baseApiUrlAuth = `${baseApiUrlGateway}/security-service/`;

const baseInstance = axios.create({
  baseURL: baseApiUrlAuth,
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
    // console.log('====================================');
    // console.log('LOGIN CONFIG', config);
    // console.log('====================================');
    // console.log('====================================');
    // console.log('baseApiUrlAuth', baseApiUrlAuth);
    // console.log('====================================');
    // console.log('====================================');
    // console.log('Config ENV', Config.ENV);
    // console.log('====================================');
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
    // console.log('====================================');
    // console.log('LOGIN response', response);
    // console.log('====================================');
    return response;
  }, async error => {
    // console.log('====================================');
    // console.log('LOGIN error', error);
    // console.log('====================================');
    // const originalRequest = error.config;
    // check lần đầu bị 401 sẽ call api refreshToken để lấy lại accessToken mới
    // nếu có accessToken sẽ recall api , còn không sẽ reject request
    // if (error.response.status === 401 && !originalRequest.retry) {
    //   originalRequest.retry = true;
    //   const response = await refreshAccessToken();
    //   if(response && response.data && response.data.data && response.data.code === responseCode.success){
    //     axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.accessToken}`;
    //     return baseInstance(originalRequest);
    //   }
    // }
    return Promise.reject(error);
  },
);

export default baseInstance;
