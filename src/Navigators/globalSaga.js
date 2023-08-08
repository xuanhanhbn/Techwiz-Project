import { call, takeLatest } from 'redux-saga/effects';
import { globalActions } from './globalSlice';
import { getApi } from './api';

function* onExample({}) {
    const url = getUrl(data)
    try {
        const response = yield call(getApi, url, );
        if (true) {
            yield put(searchSuccess({}));
        } else {
            yield put(searchFailed(''));
        }
    } catch (error) {
        yield put(searchFailed(error.response));
    }
}

export default function* globalSaga() {
    yield takeLatest(globalActions.getExample, onExample);
}
