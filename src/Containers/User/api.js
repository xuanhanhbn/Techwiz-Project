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

export const getApiTransaction = (url) =>
  new Promise((resolve, reject) =>
    baseApiUrlAuth
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  );
