import { call, put, takeLatest } from "redux-saga/effects";
import { registerActions } from "./registerSlice";
import { postApi } from "./api";

function* onRegister(data) {
  const body = { email: data.payload?.email };
  const url = "/sent-otp";
  try {
    const response = yield call(postApi, url, body);
    console.log("res: ", response);
    if (response && response.status === 200) {
      yield put(registerActions.registerAccountSuccess(response.data));
    } else {
      yield put(registerActions.registerAccountFailed(response.data.message));
    }
  } catch (error) {
    yield put(registerActions.registerAccountFailed("internet"));
  }
}

export default function* registerSaga() {
  yield takeLatest(registerActions.registerAccount, onRegister);
}
