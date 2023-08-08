import baseApiUrlRegister from '@/utils/baseApiRegister';

export const getApi = url =>
  new Promise((resolve, reject) =>
    baseApiUrlRegister
      .get(url)
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );
export const postApi = (url, data) =>
  new Promise((resolve, reject) =>
    baseApiUrlRegister
      .post(url, data)
      .then(res => resolve(res))
      .catch(err => reject(err)),
  );
