import { call, put, takeLatest } from "redux-saga/effects";
import { getApi, postApi, getApiTransaction } from "./api";
import { accountActions } from "./accountSlice";

function* onGetListProviderByUser() {
  const url = "get/favorite/";
  try {
    const response = yield call(getApi, url);
    console.log("response; ", response);
    if (response?.status === 200) {
      yield put(accountActions.getListProviderByUserSuccess(response.data));
    } else {
      yield put(accountActions.getListProviderByUserFailed(response.data));
    }
  } catch (error) {
    yield put(accountActions.getListProviderByUserFailed(error.message));
  }
}

export default function* accountSaga() {
  yield takeLatest(
    accountActions.getListProviderByUser,
    onGetListProviderByUser
  );
}
