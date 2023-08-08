import { call, put, takeLatest } from 'redux-saga/effects';
import { notificationActions } from './slice';
import { getApi, postApi } from './api';

function* onGetNotificationList({ payload }) {
  const { size, page, sort, order, ...rest } = payload;
  const url = `notification-service/api/v1/notification/search/me?page=${page}&size=${size}&sort=${sort}&order=${order}`;
  try {
    const response = yield call(postApi, url, payload);
    if (response && response.data.status === 1) {
      yield put(notificationActions.getNotificationListSuccess(response.data));
    } else {
      yield put(notificationActions.getNotificationListFailed(''));
    }
  } catch (error) {
    yield put(notificationActions.getNotificationListFailed(error.message));
  }
}

function* onViewNotification({ payload }) {
  const { id } = payload;
  const url = `notification-service/api/v1/notification/${id}`;
  try {
    const response = yield call(getApi, url);
    if (response && response.status === 200) {
      yield put(notificationActions.viewNotificationSuccess(response.data));
    } else {
      yield put(notificationActions.viewNotificationFailed(''));
    }
  } catch (error) {
    yield put(notificationActions.viewNotificationFailed(error.message));
  }
}

function* onMarkNotification({ payload }) {
  const { id } = payload;
  const url = `notification-service/api/v1/notification/${id}/seen`;
  try {
    const response = yield call(postApi, url, payload);
    if (response && response.data.status === 1) {
      yield put(notificationActions.markNotificationSuccess(response.data));
    } else {
      yield put(notificationActions.markNotificationFailed(''));
    }
  } catch (error) {
    yield put(notificationActions.markNotificationFailed(error.message));
  }
}

function* onMarkAllNotification({ payload }) {
  const { userId } = payload;
  const url = `notification-service/api/v1/notification/${userId}/seen-all`;
  try {
    const response = yield call(postApi, url);
    if (response && response.data.status === 1) {
      yield put(notificationActions.markAllNotificationSuccess(response.data));
    } else {
      yield put(notificationActions.markAllNotificationFailed(''));
    }
  } catch (error) {
    yield put(notificationActions.markAllNotificationFailed(error.message));
  }
}

function* onDeleteNotification({ payload }) {
  const { id } = payload;
  const url = `notification-service/api/v1/notification/${id}/delete`;
  try {
    const response = yield call(postApi, url, payload);
    if (response && response.data.status === 1) {
      yield put(notificationActions.deleteNotificationSuccess(response.data));
    } else {
      yield put(notificationActions.deleteNotificationFailed(''));
    }
  } catch (error) {
    yield put(notificationActions.deleteNotificationFailed(error.message));
  }
}

function* onDeleteAllNotification({ payload }) {
  const { id } = payload;
  const url = `notification-service/api/v1/notification/${id}/delete-all`;
  try {
    const response = yield call(postApi, url, payload);
    if (response && response.data.status === 1) {
      yield put(
        notificationActions.deleteAllNotificationSuccess(response.data),
      );
    } else {
      yield put(notificationActions.deleteAllNotificationFailed(''));
    }
  } catch (error) {
    yield put(notificationActions.deleteAllNotificationFailed(error.message));
  }
}

export default function* notificationSaga() {
  yield takeLatest(
    notificationActions.getNotificationList,
    onGetNotificationList,
  );
  yield takeLatest(notificationActions.viewNotification, onViewNotification);
  yield takeLatest(notificationActions.markNotification, onMarkNotification);
  yield takeLatest(
    notificationActions.markAllNotification,
    onMarkAllNotification,
  );
  yield takeLatest(
    notificationActions.deleteNotification,
    onDeleteNotification,
  );
  yield takeLatest(
    notificationActions.deleteAllNotification,
    onDeleteAllNotification,
  );

}
