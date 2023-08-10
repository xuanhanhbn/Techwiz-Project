import { call, put, takeLatest } from "redux-saga/effects";
import { getApi } from "./api";
import { getUniqueId } from "react-native-device-info";
import { listProductActions } from "./listProductSlice";

function* onGetListProvinder() {
  const url = "/provider/get";
  try {
    const response = yield call(getApi, url);
    if (response && response.data && response.status === 200) {
      yield put(listProductActions.getListProvinderSuccess(response.data));
    } else {
      yield put(
        listProductActions.getListProvinderFailed(response.data.errorMsg)
      );
    }
  } catch (error) {
    yield put(listProductActions.getListProvinderFailed());
  }
}

export default function* listProductSaga() {
  yield takeLatest(listProductActions.getListProvinder, onGetListProvinder);
}
