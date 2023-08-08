import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  errorMessage: '',
  notificationList: [],
  notificationContent: {},
  isViewSuccess: false,
  isMarkSuccess: false,
  isMarkAllSuccess: false,
  isDeleteSuccess: false,
  isDeleteAllSuccess: false,
};
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotificationList(state) {
      state.isLoading = true;
    },
    getNotificationListFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || '';
    },
    getNotificationListSuccess(state, action) {
      state.isLoading = false;
      state.notificationList = action.payload || [];
    },
    viewNotification(state) {
      state.isLoading = true;
    },
    viewNotificationFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || '';
    },
    viewNotificationSuccess(state, action) {
      state.isLoading = false;
      state.notificationContent = action.payload;
      state.isViewSuccess = action.payload || [];
    },
    markNotification(state) {
      state.isLoading = true;
    },
    markNotificationFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || '';
    },
    markNotificationSuccess(state, action) {
      state.isLoading = false;
      state.isMarkSuccess = action.payload || [];
    },
    markAllNotification(state) {
      state.isLoading = true;
    },
    markAllNotificationFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || '';
    },
    markAllNotificationSuccess(state, action) {
      state.isLoading = false;
      state.isMarkAllSuccess = action.payload || [];
    },
    deleteNotification(state) {
      state.isLoading = true;
    },
    deleteNotificationFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || '';
    },
    deleteNotificationSuccess(state, action) {
      state.isLoading = false;
      state.isDeleteSuccess = action.payload || [];
    },
    deleteAllNotification(state) {
      state.isLoading = true;
    },
    deleteAllNotificationFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || '';
    },
    deleteAllNotificationSuccess(state, action) {
      state.isLoading = false;
      state.isDeleteAllSuccess = action.payload || [];
    },
    cleanup(state) {
      state.isLoading = false;
      state.errorMessage = '';
      state.isViewSuccess = false;
      state.isMarkSuccess = false;
      state.isMarkAllSuccess = false;
      state.isDeleteSuccess = false;
      state.isDeleteAllSuccess = false;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export const makeSelectNotification = state => state.notification;

export default notificationSlice.reducer;
