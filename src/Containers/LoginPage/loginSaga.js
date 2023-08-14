import { call, put, takeLatest } from "redux-saga/effects";
import { loginActions } from "./loginSlice";
import { postApi, getApiUser, postApiLogin } from "./api";
import EncryptedStorage from "react-native-encrypted-storage";
import { getUniqueId } from "react-native-device-info";
import { handleCommentExceptionSaga } from "@/Navigators/utils";

function* onLogin(data) {
  const url = "oauth/token";
  try {
    const deviceId = yield call(getUniqueId);
    const response = yield call(postApiLogin, url, data.payload, {
      "Device-Id": deviceId,
    });
    if (response?.data?.access_token) {
      EncryptedStorage.setItem("loginData", JSON.stringify(response.data));
      // EncryptedStorage.setItem('accessToken', response.data.access_token);
      // EncryptedStorage.setItem('refreshToken',response.data.refresh_token);
      yield put(loginActions.loginSuccess(response.data));
      // console.log(response)
    } else if (response?.data?.errorMsg === "User account is locked") {
      yield put(loginActions.loginFailed("Tài khoản đã bị khoá"));
    } else if (response?.data?.errorMsg === "Bad credentials") {
      yield put(
        loginActions.loginFailed("Tên đăng nhập hoặc mật khẩu không đúng")
      );
    } else {
      yield put(loginActions.loginFailed(response.data.errorMsg));
    }
  } catch (error) {
    // console.log('====================================');
    // console.log('error', error.code);
    // console.log('====================================');
    yield put(
      loginActions.loginFailed(handleCommentExceptionSaga(error) || "")
    );
  }
}

function* onGetUserInfo() {
  const url = "/profile";
  // console.log(data);
  try {
    const response = yield call(getApiUser, url);
    // console.log("====================================");
    // console.log("responseGetStepActive", response);
    // console.log("====================================");
    if (response?.status === 200) {
      yield put(loginActions.getUserInfoSuccess(response.data.data));
      EncryptedStorage.setItem("userInfo", JSON.stringify(response.data.data));
    } else {
      yield put(loginActions.getUserInfoFailed(""));
    }
  } catch (error) {
    yield put(loginActions.getUserInfoFailed(""));
    // console.log(error)
  }
}

function* onForgotPassword(data) {
  // console.log("datA: ", data);
  const url = "forgot-password";
  try {
    const response = yield call(postApi, url, data.payload);
    // console.log("====================================");
    // console.log("responseForgotPassword", response);
    // console.log("====================================");
    if (response && response.status === 200) {
      yield put(loginActions.forgotPasswordSuccess(response.data));
    } else {
      yield put(loginActions.forgotPasswordFailed(response?.data?.errorMsg));
    }
  } catch (error) {
    yield put(loginActions.forgotPasswordFailed(error.message));
  }
}

function* onCheckCode(data) {
  const url = "api/v1/users/check/reset-password-token";
  try {
    const response = yield call(postApi, url, data.payload);
    // console.log('====================================');
    // console.log('responseCheckCode', response);
    // console.log('====================================');
    if (response?.data?.status === 1) {
      yield put(loginActions.checkCodeSuccess(response.data));
    } else {
      yield put(loginActions.checkCodeFailed(response?.data?.errorMsg));
    }
  } catch (error) {
    // if(error.response.data.status === 0 && error.response.data.errorMsg === "Sai mã đặt lại mật khẩu!") {
    //     yield put(loginActions.checkCodeFailed("Sai mã xác nhận"));
    // } else {
    //     yield put(loginActions.checkCodeFailed(error.message));
    // }
    yield put(loginActions.checkCodeFailed(error.message));
  }
}

function* onResetPassword(data) {
  const payload = data?.payload;
  const url = "reset-password";
  console.log(data);
  try {
    const response = yield call(postApi, url, payload);
    console.log("====================================");
    console.log("responseResetPassword", response);
    console.log("====================================");
    if (response?.status === 200) {
      yield put(loginActions.resetPasswordSuccess(response.data));
    } else {
      yield put(loginActions.resetPasswordFailed(response?.data?.errorMsg));
    }
  } catch (error) {
    yield put(loginActions.resetPasswordFailed(error.message));
  }
}

export default function* loginSaga() {
  yield takeLatest(loginActions.login, onLogin);
  yield takeLatest(loginActions.getUserInfo, onGetUserInfo);
  yield takeLatest(loginActions.forgotPassword, onForgotPassword);
  yield takeLatest(loginActions.resetPassword, onResetPassword);
  yield takeLatest(loginActions.checkCode, onCheckCode);
}
