import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMessage: "",
  userInfo: {},
  accountBalance: {},
  isUpdateUserSuccess: false,
  // isForgotPassword: false,
  isChangePasswordSuccess: false,
  isLogoutSuccess: false,
  isDisableAccount: false,
  isErrorDisableAccount: false,
  isRegisterBioSuccess: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state) {
      state.isLoading = true;
    },
    getUserFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || "";
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.userInfo = action.payload || {};
    },
    updateUser(state) {
      state.isLoading = true;
    },
    updateUserFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || "";
    },
    updateUserSuccess(state, action) {
      state.isLoading = false;
      state.isUpdateUserSuccess = true;
    },
    // checkForgotPassword(state) {
    //   state.isLoading = true;
    // },
    // checkForgotPasswordFailed(state) {
    //   state.isLoading = false;
    //   state.errorMessage = "";
    // },
    // checkForgotPasswordSuccess(state, action) {
    //   state.isLoading = false;
    //   state.isForgotPassword = true
    // },
    changePassword(state) {
      state.isLoading = true;
    },
    changePasswordFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || "";
    },
    changePasswordSuccess(state, action) {
      state.isLoading = false;
      state.isChangePasswordSuccess = true;
    },
    getAccountBalance(state) {
      state.isLoading = true;
    },
    getAccountBalanceFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || "";
    },
    getAccountBalanceSuccess(state, action) {
      state.isLoading = false;
      state.accountBalance = action.payload || {};
    },
    logout(state) {
      state.isLoading = true;
    },
    logoutFailed(state, action) {
      state.isLoading = false;
      state.isLogoutSuccess = true;
      // state.errorMessage = action.payload || '';
    },
    logoutSuccess(state, action) {
      state.isLoading = false;
      state.isLogoutSuccess = true;
      // state.accessToken = null
    },

    disableAccount(state) {
      state.isLoading = true;
    },
    disableAccountFailed(state, action) {
      state.isLoading = false;
      state.isErrorDisableAccount = true;
    },
    disableAccountSuccess(state, action) {
      state.isLoading = false;
      state.isDisableAccount = true;
    },
    registerBio(state) {
      state.isLoading = true;
    },
    registerBioFailed(state, action) {
      state.isLoading = false;
      state.isRegisterBioSuccess = false;
      state.errorMessage = action.payload;
    },
    registerBioSuccess(state, action) {
      state.isLoading = false;
      state.isRegisterBioSuccess = true;
    },
    cleanup(state) {
      state.isLoading = false;
      state.errorMessage = "";
      state.userInfo = {};
      state.accountBalance = {};
      state.isUpdateUserSuccess = false;
      state.isChangePasswordSuccess = false;
      state.isLogoutSuccess = false;
      state.isRegisterBioSuccess = false;
    },
    clear(state) {
      state.isDisableAccount = false;
      state.isErrorDisableAccount = false;
      state.errorMessage = "";
      state.isRegisterBioSuccess = false;
    },
  },
});

export const userActions = userSlice.actions;

export const makeSelectUser = (state) => state.user;

export default userSlice.reducer;
