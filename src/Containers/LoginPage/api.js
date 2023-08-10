import baseApiUrlAuth from "@/utils/baseApiAuthorization";

export const getApi = (url) =>
  new Promise((resolve, reject) =>
    baseApiUrlAuth
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  );

export const postApi = (url, data) =>
  new Promise((resolve, reject) =>
    baseApiUrlAuth
      .post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  );

export const postApiLogin = (url, data, header) =>
  new Promise((resolve, reject) =>
    baseApiUrlAuth
      .post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  );

export const getApiUser = (url) =>
  new Promise((resolve, reject) =>
    baseApiUrlAuth
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  );

// export const postApiUser = (url, data, config) =>
// new Promise((resolve, reject) =>
//   baseApiUrlUser
//     .post(url, data, config)
//     .then(res => resolve(res))
//     .catch(err => reject(err)),
// )
