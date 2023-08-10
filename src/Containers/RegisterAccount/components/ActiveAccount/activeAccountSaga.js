import { call, put, takeLatest } from "redux-saga/effects";
import { activeAccountActions } from "./activeAccountSlice";
import { postApi } from "./api";

function* onActive(data) {
  const payload = data.payload || [];
  console.log("payload: ", payload);
  const url = "signup";
  try {
    const response = yield call(postApi, url, payload);
    console.log("res: ", response);
    if (response && response.data.status === 1) {
      yield put(activeAccountActions.activeAccountSuccess(response.data));
    } else {
      yield put(
        activeAccountActions.activeAccountFailed(response.data.errorMsg)
      );
    }
  } catch (error) {
    yield put(activeAccountActions.activeAccountFailed("internet"));
  }
}

function* reActive(data) {
  const id = data.payload || "";
  const url = `users/active-code/resend/${id}`;
  try {
    const response = yield call(postApi, url, id);
    if (response && response.status === 200) {
      yield put(activeAccountActions.reActiveAccountSuccess(response.data));
    } else {
      yield put(
        activeAccountActions.reActiveAccountFailed(response.data.errorMsg)
      );
    }
  } catch (error) {
    yield put(activeAccountActions.reActiveAccountFailed("internet"));
  }
}

export default function* activeAccountSaga() {
  yield takeLatest(activeAccountActions.activeAccount, onActive);
  yield takeLatest(activeAccountActions.reActiveAccount, reActive);
}
