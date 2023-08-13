import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMessage: "",
  dataListProviderByUser: [],
};

const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    getListProviderByUser(state) {
      state.isLoading = true;
    },
    getListProviderByUserFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || "";
    },
    getListProviderByUserSuccess(state, action) {
      state.isLoading = false;
      state.dataListProviderByUser = action.payload || {};
    },
    clear(state) {
      state.isDisableAccount = false;
      state.isErrorDisableAccount = false;
      state.errorMessage = "";
    },
  },
});

export const accountActions = AccountSlice.actions;

export const makeSelectAccount = (state) => state.account;

export default AccountSlice.reducer;
