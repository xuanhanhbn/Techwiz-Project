import { call, put, takeLatest } from 'redux-saga/effects';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { userActions } from './userSlice';
import { getApi, postApi, getApiTransaction } from './api';
// import crashlytics from '@react-native-firebase/crashlytics';
// import * as Keychain from 'react-native-keychain';
import EncryptedStorage from 'react-native-encrypted-storage';
import { loginActions } from '@/Containers/LoginPage/loginSlice';

function* onGetUser() {
  const url = 'users/me';
  try {
    const response = yield call(getApi, url);

    if (response?.status === 200 && response?.data) {
      yield put(userActions.getUserSuccess(response.data));
      yield put(loginActions.getUserInfoSuccess(response.data));
      // Chuyển đối tượng thành chuỗi JSON
      const jsonUser = JSON.stringify(response.data);
      // Lưu trữ dữ liệu nhạy cảm vào Keychain
      EncryptedStorage.setItem('userInfo', jsonUser);
      // crashlytics().setAttributes('userData', JSON.stringify(response.data));
    } else {
      yield put(userActions.getUserFailed(response.data));
    }
  } catch (error) {
    yield put(userActions.getUserFailed(error.message));
  }
}

function* onUpdateUser(data) {
  const { id, ...userInfo } = data.payload;
  const url = `/users/${id}/patch`;
  try {
    const response = yield call(postApi, url, userInfo);
    // console.log("====================================");
    // console.log("response", response);
    // console.log("====================================");
    if (response.status === 200) {
      yield put(userActions.updateUserSuccess(response.data));
    } else {
      yield put(userActions.updateUserFailed(''));
    }
  } catch (error) {
    yield put(userActions.updateUserFailed(error.message));
  }
}

function* onChangePassword(data) {
  const url = 'users/update-password';
  try {
    const response = yield call(postApi, url, data.payload);
    // console.log("====================================");
    // console.log("response", response);
    // console.log("====================================");
    if (response.data.status === 1) {
      yield put(userActions.changePasswordSuccess(response.data));
    } else if (
      response.data.status === 0 &&
      response.data.errorCode === 'API-008'
    ) {
      yield put(userActions.changePasswordFailed(response.data.errorMsg));
    } else {
      yield put(userActions.changePasswordFailed(''));
    }
  } catch (error) {
    yield put(userActions.changePasswordFailed(error.message));
  }
}

function* onGetAccountBalance() {
  const url = 'account-balance/current-account-balance';
  try {
    const response = yield call(getApiTransaction, url);
    // console.log("====================================");
    // console.log("responseAccount", response);
    // console.log("====================================");
    if (response.status === 200) {
      yield put(userActions.getAccountBalanceSuccess(response.data));
    } else {
      yield put(userActions.getAccountBalanceFailed(''));
    }
  } catch (error) {
    yield put(userActions.getAccountBalanceFailed(error.message));
  }
}

function* onLogout(data) {
  const url = 'users/oauth/logout';
  try {
    const response = yield call(getApi, url);
    // console.log("====================================");
    // console.log("response", response);
    // console.log("====================================");
    if (response.status === 200) {
      yield put(userActions.logoutSuccess(response.data));
    } else {
      yield put(userActions.logoutFailed(''));
    }
  } catch (error) {
    yield put(userActions.logoutFailed(error.message));
  }
}

function* onTest(data) {
  const url = 'users/test';
  try {
    const response = yield call(postApi, url);
    // console.log("====================================");
    // console.log("response", response);
    // console.log("====================================");
    if (response.status === 200) {
      yield put(userActions.logoutSuccess(response.data));
    } else {
      yield put(userActions.logoutFailed('401'));
    }
  } catch (error) {
    yield put(userActions.logoutFailed(error.message));
  }
}

function* onDisableAccount(data) {
  const url = 'users/deactivate';
  const payload = data.payload || {};
  try {
    const response = yield call(postApi, url, payload);
    if (response?.data?.status === 1) {
      yield put(userActions.disableAccountSuccess(response.data));
    } else {
      yield put(userActions.disableAccountFailed(response?.data?.errorMsg || ''));
    }
  } catch (error) {
    yield put(userActions.disableAccountFailed(error.message));
  }
}

function* onRegisterBio(data) {
  const { isRegister, ...payload } = data.payload || {};
  const url = isRegister
    ? 'users/biometrics/register'
    : 'users/biometrics/unregister';
  try {
    const response = yield call(postApi, url, payload);
    if (response && response.data.status === 1) {
      yield put(userActions.registerBioSuccess(response.data));
    } else {
      yield put(userActions.registerBioFailed(response?.data?.errorMsg));
    }
  } catch (error) {
    yield put(userActions.registerBioFailed(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(userActions.getUser, onGetUser);
  yield takeLatest(userActions.updateUser, onUpdateUser);
  yield takeLatest(userActions.changePassword, onChangePassword);
  yield takeLatest(userActions.getAccountBalance, onGetAccountBalance);
  yield takeLatest(userActions.logout, onLogout);
  yield takeLatest(userActions.test, onTest);
  yield takeLatest(userActions.disableAccount, onDisableAccount);
  yield takeLatest(userActions.registerBio, onRegisterBio);
}
