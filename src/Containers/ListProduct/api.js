import baseApiUrlAuth from "@/utils/baseApiAuthorization";

export const getApi = (url) =>
  new Promise((resolve, reject) =>
    baseApiUrlAuth
      .get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  );
