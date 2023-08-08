export default build =>
  build.query({
    query: id => `/users/${id}`,
  })

export const getListNews = build =>   build.query({
  query: () => `/news`,
})