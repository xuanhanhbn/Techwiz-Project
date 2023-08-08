import { call, put, takeLatest } from 'redux-saga/effects';
import { registerActions } from './registerSlice';
import { postApi } from './api';

function* onRegister(data) {
  const payload = data.payload || [];
  const url = 'users/register';
  try {
    const response = yield call(postApi, url, payload);
    if (response && response.data.status === 1) {
      yield put(registerActions.registerAccountSuccess(response.data));
    } else {
      yield put(
        registerActions.registerAccountFailed(
          response.data.duplidateDetails.fieldError,
        ),
      );
    }
  } catch (error) {
    yield put(registerActions.registerAccountFailed('internet'));
  }
}

export default function* registerSaga() {
  yield takeLatest(registerActions.registerAccount, onRegister);
}
