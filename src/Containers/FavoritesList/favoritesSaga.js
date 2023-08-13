import { call, put, takeLatest } from "redux-saga/effects";
import { getApi, postApi, getApiTransaction } from "./api";
import { favoritesActions } from "./favoritesSlice";

function* onGetListFavorites() {
  const url = "favorite/getFavorite";
  try {
    const response = yield call(getApi, url);
    console.log("response; ", response);
    if (response?.status === 200) {
      yield put(favoritesActions.getListFavoritesSuccess(response.data));
    } else {
      yield put(favoritesActions.getListFavoritesFailed(response.data));
    }
  } catch (error) {
    yield put(favoritesActions.getListFavoritesFailed(error.message));
  }
}

export default function* favoritesSaga() {
  yield takeLatest(favoritesActions.getListFavorites, onGetListFavorites);
}
