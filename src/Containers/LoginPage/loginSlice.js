import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMessage: "",
  loginData: {},
  userInfo: {},
  isLoginSuccess: false,
  forgotPassword: {},
  checkCode: {},
  resetPassword: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state) {
      state.isLoading = true;
    },
    loginWithBiometrics(state, action) {
      state.isLoading = true;
    },
    loginWithFaceBook(state, action) {
      state.isLoading = true;
    },
    loginWithApple(state, action) {
      state.isLoading = true;
    },
    loginWithGoogle(state, action) {
      state.isLoading = true;
    },
    loginFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isLoginSuccess = true;
      state.loginData = action.payload;
    },
    getUserInfo(state) {
      state.isLoading = true;
    },
    getUserInfoFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    getUserInfoSuccess(state, action) {
      state.isLoading = false;
      state.userInfo = action.payload;
    },
    forgotPassword(state) {
      state.isLoading = true;
    },
    forgotPasswordFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    forgotPasswordSuccess(state, action) {
      state.isLoading = false;
      state.forgotPassword = action.payload;
    },
    checkCode(state) {
      state.isLoading = true;
    },
    checkCodeFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    checkCodeSuccess(state, action) {
      state.isLoading = false;
      state.checkCode = action.payload;
    },
    resetPassword(state) {
      state.isLoading = true;
    },
    resetPasswordFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    resetPasswordSuccess(state, action) {
      state.isLoading = false;
      state.resetPassword = action.payload;
    },
    cleanup(state) {
      state.isLoading = false;
      state.errorMessage = "";
      state.loginData = {};
      state.isLoginSuccess = false;
      state.forgotPassword = {};
      state.checkCode = {};
      state.resetPassword = {};
    },
  },
});

export const loginActions = loginSlice.actions;

export const makeSelectLogin = (state) => state.login;

export default loginSlice.reducer;
