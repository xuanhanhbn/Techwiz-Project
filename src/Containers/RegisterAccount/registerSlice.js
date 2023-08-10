import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMessage: "",
  isSuccess: false,
  isError: false,
  activeCodeRegister: {},
  dataError: {},
};
const registerAccount = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerAccount(state) {
      state.isLoading = true;
    },
    registerAccountFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.dataError = action.payload || {};
      state.errorMessage = "";
    },
    registerAccountSuccess(state, action) {
      state.isLoading = false;
      state.activeCodeRegister = action.payload || {};
      state.isSuccess = true;
    },
    clear(state) {
      // state.errorMessage = "";
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
});

export const registerActions = registerAccount.actions;

export const makeSelectRegister = (state) => state.registerAccount;

export default registerAccount.reducer;
