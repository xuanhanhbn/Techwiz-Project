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
