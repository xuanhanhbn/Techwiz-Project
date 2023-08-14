import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errorMessage: "",
  dataFavorites: [],
};

const FavoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    getListFavorites(state) {
      state.isLoading = true;
    },
    getListFavoritesFailed(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload || "";
    },
    getListFavoritesSuccess(state, action) {
      state.isLoading = false;
      state.dataFavorites = action.payload || {};
    },
    clear(state) {
      state.isDisableAccount = false;
      state.isErrorDisableAccount = false;
      state.errorMessage = "";
      state.isRegisterBioSuccess = false;
    },
  },
});

export const favoritesActions = FavoritesSlice.actions;

export const makeSelectFavorites = (state) => state.favorites;

export default FavoritesSlice.reducer;
