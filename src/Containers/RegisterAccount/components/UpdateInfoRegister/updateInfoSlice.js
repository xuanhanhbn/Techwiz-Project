import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  dataUpdateRegister: {},
  dataError: {},
};
const updateInfomation = createSlice({
  name: 'updateInfo',
  initialState,
  reducers: {
    updateInfomation(state) {
      // state.isSuccess = false;
      state.isLoading = true;
    },
    updateInfomationFailed(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.dataError = action.payload || {};
      state.errorMessage = '';
    },
    updateInfomationSuccess(state, action) {
      state.isLoading = false;
      state.dataUpdateRegister = action.payload || {};
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

export const updateInfoActions = updateInfomation.actions;

export const makeSelectLayout = state => state.updateInfo;

export default updateInfomation.reducer;
