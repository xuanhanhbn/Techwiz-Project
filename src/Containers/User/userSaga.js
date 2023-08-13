import { call, put, takeLatest } from "redux-saga/effects";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { userActions } from "./userSlice";
import { getApi, postApi, getApiTransaction } from "./api";
// import crashlytics from '@react-native-firebase/crashlytics';
// import * as Keychain from 'react-native-keychain';
import EncryptedStorage from "react-native-encrypted-storage";
import { loginActions } from "@/Containers/LoginPage/loginSlice";

function* onGetUser() {
  const url = "users/me";
  try {
    const response = yield call(getApi, url);

    if (response?.status === 200 && response?.data) {
      yield put(userActions.getUserSuccess(response.data));
      yield put(loginActions.getUserInfoSuccess(response.data));
      // Chuyển đối tượng thành chuỗi JSON
      const jsonUser = JSON.stringify(response.data);
      // Lưu trữ dữ liệu nhạy cảm vào Keychain
      EncryptedStorage.setItem("userInfo", jsonUser);
      // crashlytics().setAttributes('userData', JSON.stringify(response.data));
    } else {
      yield put(userActions.getUserFailed(response.data));
    }
  } catch (error) {
    yield put(userActions.getUserFailed(error.message));
  }
}

function* onUpdateUser(data) {
  const payload = data?.payload;
  const url = `/update`;
  try {
    const response = yield call(postApi, url, payload);
    if (response && response.status === 201) {
      yield put(userActions.updateUserSuccess(response.data));
    } else {
      yield put(userActions.updateUserFailed(""));
    }
  } catch (error) {
    yield put(userActions.updateUserFailed(error.message));
  }
}

function* onChangePassword(data) {
  const url = "/changerpassword";
  try {
    const response = yield call(postApi, url, data.payload);
    if (response && response.status === 201) {
      yield put(userActions.changePasswordSuccess(response.data));
    } else if (
      response.data.status === 0 &&
      response.data.errorCode === "API-008"
    ) {
      yield put(userActions.changePasswordFailed(response.data.errorMsg));
    } else {
      yield put(userActions.changePasswordFailed(""));
    }
  } catch (error) {
    yield put(userActions.changePasswordFailed(error.message));
  }
}

function* onDisableAccount(data) {
  const url = "/delete";
  const payload = { password: data?.payload?.password };
  try {
    const response = yield call(postApi, url, payload);
    if (response && response?.status === 200) {
      yield put(userActions.disableAccountSuccess(response.data));
    } else {
      yield put(
        userActions.disableAccountFailed(response?.data?.errorMsg || "")
      );
    }
  } catch (error) {
    yield put(userActions.disableAccountFailed(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(userActions.getUser, onGetUser);
  yield takeLatest(userActions.updateUser, onUpdateUser);
  yield takeLatest(userActions.changePassword, onChangePassword);
  yield takeLatest(userActions.disableAccount, onDisableAccount);
}
