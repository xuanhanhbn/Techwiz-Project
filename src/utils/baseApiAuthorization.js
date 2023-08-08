import React from 'react';
import axios from 'axios';
// import { refreshAccessToken } from './common';
import {
  baseApiUrlGateway,
  // responseCode
} from './constants';
import baseApiUrlAuth from '@/utils/baseApiAuth';
import EncryptedStorage from 'react-native-encrypted-storage';

// import { refreshAccessToken } from './constants';
import eventEmitter from '@/utils/eventEmitter';

const baseApiAuthorization = `${baseApiUrlGateway}/`;

const baseInstance = axios.create({
  baseURL: baseApiAuthorization,
});
baseInstance.interceptors.request.use(
  async config => {
    // console.log('====================================');
    // console.log('CONFIG', config);
    // console.log('====================================');
    try {
      const loginData = await EncryptedStorage.getItem('loginData');
      if (loginData !== undefined) {
        const loginDataParse = JSON.parse(loginData);
        config.headers.Authorization = `Bearer ${loginDataParse.access_token}`;
      }
    } catch (error) {
      config.validateStatus = status => status < 500;
    } finally {
      return config;
    }
  },
  error => Promise.reject(error),
);

baseInstance.defaults.timeout = 60000;

const refreshAccessToken = body =>
  new Promise((resolve, reject) =>
    baseApiUrlAuth
      .post(
        'oauth/token',
        // requestBody,
        {
          grant_type: 'refresh_token',
          refresh_token: body,
        },
        // body,
        {
          headers: {
            Authorization: `Basic bW9iaWxlYXBwOmVuYW9AMTIz`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );

baseInstance.interceptors.response.use(
  response => {
    // console.log('====================================');
    // console.log('RESPONSE', response);
    // console.log('====================================');
    return response;
  },
  async error => {
    // console.log('====================================');
    // console.log('error', error);
    // console.log('====================================');
    const originalRequest = error.config;
    // check lần đầu bị 401 sẽ call api refreshToken để lấy lại accessToken mới
    // nếu có accessToken sẽ recall api , còn không sẽ reject request
    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const loginData = await EncryptedStorage.getItem('loginData');
      const refreshToken = loginData
        ? JSON.parse(loginData).refresh_token
        : null;
      const response = await refreshAccessToken(refreshToken);
      if (response && response.data && response.data.access_token) {
        // console.log('response success', response);

        axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
        await EncryptedStorage.setItem(
          'loginData',
          JSON.stringify(response.data),
        );
        // await EncryptedStorage.setItem(
        //   'accessToken',
        //   response.data.access_token,
        // );

        return baseInstance(originalRequest);
      } else {
        eventEmitter.emit('reset');
        await EncryptedStorage.removeItem('loginData');
      }
    }

    return Promise.reject(error);
  },
);

export default baseInstance;
