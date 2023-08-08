import { call, put, takeLatest } from 'redux-saga/effects';
import { updateInfoActions } from './updateInfoSlice';
import { postApi } from './api';

function* onUpdate(data) {
  const payload = data.payload.data || [];
  const id =
    data.payload.idUser.status === 1
      ? data.payload.idUser.id
      : data.payload.idUser;
  const url = `users/register-update-infor/${id}`;
  try {
    const response = yield call(postApi, url, payload);

    if (response && response.data && response.data.status === 1) {
      yield put(updateInfoActions.updateInfomationSuccess(response.data));
    } else {
      yield put(
        updateInfoActions.updateInfomationFailed(
          response.data.duplidateDetails
            ? response.data.duplidateDetails.fieldError
            : response.data.validateDetails,
        ),
      );
    }
  } catch (error) {
    yield put(updateInfoActions.updateInfomationFailed('internet'));
  }
}

export default function* updateInfoSaga() {
  yield takeLatest(updateInfoActions.updateInfomation, onUpdate);
}
