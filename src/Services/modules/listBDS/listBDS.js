export default (build) =>
  build.query({
    query: () => `api/v1/product-realestate`,
  });
