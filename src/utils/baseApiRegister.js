import axios from 'axios';
import { baseApiUrlGateway } from './constants';

const baseApiUrlRegister = `${baseApiUrlGateway}/security-service/api/v1/`;

const baseInstance = axios.create({
  baseURL: baseApiUrlRegister,
});
baseInstance.interceptors.request.use(
  async config => {
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
