// export default (build) =>
//   build.query({
//     query: () => `api/v1/categories/find-all-product-type`,
//   });

export const getProductType = (build) =>
  build.query({
    query: () => `api/v1/categories/find-all-product-type`,
  });

export const getProvince = (build) =>
  build.query({
    query: () => `api/v1/locate/find-province`,
  });

export const getDistrict = (build) =>
  build.query({
    query: () => `api/v1/locate/find-district/01`,
  });

export const getSubDistrict = (build) =>
  build.query({
    query: () => `api/v1/locate/find-sub-district/004`,
  });
