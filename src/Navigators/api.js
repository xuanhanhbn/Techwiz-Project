import baseApi from '../utils/baseApi';

export const getApi = (url, ) =>
  new Promise((resolve, reject) =>
    baseApi
      .get(url, )
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );

