import { call, put, takeLatest } from "redux-saga/effects";
import { getApi, getApiProvider, postApi } from "./api";
import { getUniqueId } from "react-native-device-info";
import { listProductActions } from "./listProductSlice";

function* onGetListProvinder(data) {
  // const payload = { ...data?.payload };
  const { limit, page, ...payload } = data?.payload;
  try {
    const url = `/provider/get?limit=${limit}`;
    const response = yield call(getApiProvider, url, payload);
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

function* onGetDetailProvinder(data) {
  const providerId = { providerId: data?.payload };
  try {
    const url = "/provider/getById";
    const response = yield call(postApi, url, providerId);
    if (response && response.data && response.status === 200) {
      yield put(
        listProductActions.getDetailsProvinderSuccess(response.data.data)
      );
    } else {
      yield put(
        listProductActions.getDetailsProvinderFailed(response.data.errorMsg)
      );
    }
  } catch (error) {
    yield put(listProductActions.getDetailsProvinderFailed());
  }
}

function* onGetListFavorites() {
  const url = "/favorite/get";
  try {
    const response = yield call(getApi, url);
    if (response && response.data && response.status === 200) {
      yield put(listProductActions.getListFavoritesSuccess(response.data.data));
    } else {
      yield put(
        listProductActions.getListFavoritesFailed(response.data.errorMsg)
      );
    }
  } catch (error) {
    yield put(listProductActions.getListFavoritesFailed());
  }
}

function* onGetListProductByProvider(data) {
  const url = `/product/get?providerId=${data?.payload}`;
  try {
    const response = yield call(getApi, url);
    if (response && response.data && response.status === 200) {
      yield put(
        listProductActions.getListProductByProviderSuccess(response.data)
      );
    } else {
      yield put(
        listProductActions.getListProductByProviderFailed(
          response.data.errorMsg
        )
      );
    }
  } catch (error) {
    yield put(listProductActions.getListProductByProviderFailed());
  }
}

function* onGetListProgram(data) {
  const { page, limit, ...payload } = data?.payload;
  const url = `/product/get/?page=${page}&limit=${limit}`;
  try {
    const response = yield call(getApi, url);
    if (response && response.data && response.status === 200) {
      yield put(listProductActions.getListProgramSuccess(response.data));
    } else {
      yield put(
        listProductActions.getListProgramFailed(response.data.errorMsg)
      );
    }
  } catch (error) {
    yield put(listProductActions.getListProgramFailed());
  }
}

function* onGetListMovie(data) {
  const { _id, ...payload } = data?.payload;
  const productId = { productId: _id };
  const url = `/product/getProductProvider`;
  try {
    const response = yield call(postApi, url, productId);
    if (response && response.data && response.status === 200) {
      yield put(listProductActions.getListMoiveSuccess(response.data.data));
    } else {
      yield put(listProductActions.getListMovieFailed(response.data.errorMsg));
    }
  } catch (error) {
    yield put(listProductActions.getListMovieFailed());
  }
}

function* onSaveMovie(data) {
  const { _id, ...payload } = data?.payload;
  const productId = { productId: _id };
  const url = `/favorite/create`;
  try {
    const response = yield call(postApi, url, productId);
    if (response && response.data && response.status === 200) {
      yield put(listProductActions.onSaveProductSuccess(response.data.data));
    } else {
      yield put(listProductActions.onSaveProductFailed(response.data.errorMsg));
    }
  } catch (error) {
    yield put(listProductActions.onSaveProductFailed());
  }
}

function* onFeedBackProvider(data) {
  const { ...payload } = data?.payload;
  const url = `/feedback/create`;
  try {
    const response = yield call(postApi, url, payload);
    if (response && response.data && response.status === 200) {
      yield put(
        listProductActions.onFeedBackProviderSuccess(response.data.data)
      );
    } else {
      yield put(
        listProductActions.onFeedBackProviderFailed(response.data.errorMsg)
      );
    }
  } catch (error) {
    yield put(listProductActions.onFeedBackProviderFailed());
  }
}

export default function* listProductSaga() {
  yield takeLatest(listProductActions.getListProvinder, onGetListProvinder);
  yield takeLatest(listProductActions.getListFavorites, onGetListFavorites);
  yield takeLatest(listProductActions.getListProgram, onGetListProgram);
  yield takeLatest(listProductActions.getListMoive, onGetListMovie);
  yield takeLatest(listProductActions.onSaveProduct, onSaveMovie);
  yield takeLatest(listProductActions.onFeedBackProvider, onFeedBackProvider);

  yield takeLatest(
    listProductActions.getListProductByProvider,
    onGetListProductByProvider
  );

  yield takeLatest(
    listProductActions.getDetailsProvinder,
    onGetDetailProvinder
  );
}
