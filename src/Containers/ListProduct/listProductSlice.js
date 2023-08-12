import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMessage: "",
  dataProvinder: [],
  dataFavorites: [],
  dataDetailProvinder: {},
  dataProgram: [],
  dataListProductByProvinder: [],
};

const listProductSlice = createSlice({
  name: "listProduct",
  initialState,
  reducers: {
    getListProvinder(state) {
      state.isLoading = true;
    },
    getListProvinderFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    getListProvinderSuccess(state, action) {
      state.isLoading = false;
      state.dataProvinder = action.payload;
    },

    getDetailsProvinder(state) {
      state.isLoading = true;
    },
    getDetailsProvinderFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    getDetailsProvinderSuccess(state, action) {
      state.isLoading = false;
      state.dataDetailProvinder = action.payload || {};
    },

    getListProductByProvider(state) {
      state.isLoading = true;
    },
    getListProductByProviderFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    getListProductByProviderSuccess(state, action) {
      state.isLoading = false;
      state.dataListProductByProvinder = action.payload || [];
    },

    getDetailsFavorites(state) {
      state.isLoading = true;
    },
    getDetailsFavoritesFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    getDetailsFavoritesSuccess(state, action) {
      state.isLoading = false;
      state.dataDetailProvinder = action.payload || {};
    },

    getListFavorites(state) {
      state.isLoading = true;
    },
    getListFavoritesFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    getListFavoritesSuccess(state, action) {
      state.isLoading = false;
      state.dataFavorites = action.payload;
    },

    getListProgram(state) {
      state.isLoading = true;
    },
    getListProgramFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    getListProgramSuccess(state, action) {
      state.isLoading = false;
      state.dataProgram = action.payload || [];
    },

    cleanup(state) {
      state.isLoading = false;
    },
  },
});

export const listProductActions = listProductSlice.actions;

export const makeSelectListProduct = (state) => state.listProduct;

export default listProductSlice.reducer;
