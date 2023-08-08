import baseApiAuthorization from '@/utils/baseApiAuthorization';

export const getApi = url =>
  new Promise((resolve, reject) =>
    baseApiAuthorization
      .get(url)
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );

export const postApi = (url, data) =>
  new Promise((resolve, reject) =>
    baseApiAuthorization
      .post(url, data)
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );