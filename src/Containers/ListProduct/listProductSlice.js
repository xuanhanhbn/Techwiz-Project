import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMessage: "",
  dataProvinder: [],
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

    cleanup(state) {
      state.isLoading = false;
    },
  },
});

export const listProductActions = listProductSlice.actions;

export const makeSelectListProduct = (state) => state.listProduct;

export default listProductSlice.reducer;
