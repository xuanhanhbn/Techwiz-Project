import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { api } from '@/Services/api';
import theme from './Theme';

import globalReducer from '@/Navigators/globalSlice';
import globalSaga from '@/Navigators/globalSaga';

// Đăng kí tài khoản
import registerReducer from '@/Containers/RegisterAccount/registerSlice';
import registerSaga from '@/Containers/RegisterAccount/registerSaga';

// Cập nhật thông tin tài khoản
import updateInfoReducer from '@/Containers/RegisterAccount/components/UpdateInfoRegister/updateInfoSlice';
import updateInfoSaga from '@/Containers/RegisterAccount/components/UpdateInfoRegister/updateInfoSaga';

// Active account
import activeAccountReducer from '@/Containers/RegisterAccount/components/ActiveAccount/activeAccountSlice';
import activeAccountSaga from '@/Containers/RegisterAccount/components/ActiveAccount/activeAccountSaga';

import loginReducer from '@/Containers/LoginPage/loginSlice';
import loginSaga from '@/Containers/LoginPage/loginSaga';

import notificationSaga from '@/Containers/Notifications/saga';
import notificationReducer from '@/Containers/Notifications/slice';

// registry reducer
const reducers = combineReducers({
  theme,
  api: api.reducer,
  global: globalReducer,
  login: loginReducer,
  registerAccount: registerReducer,
  updateInfo: updateInfoReducer,
  activeAccount: activeAccountReducer,
  notification: notificationReducer,
});

// registry sagas
function* rootSaga() {
  yield all([
    globalSaga(),
    loginSaga(),
    registerSaga(),
    updateInfoSaga(),
    activeAccountSaga(),
    notificationSaga(),
  ]);
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

// const allSagaMiddleWare = [];

const sagaMiddleware = createSagaMiddleware({});
// allSagaMiddleWare.push(sagaMiddleware);

// const enhancers = [];
// enhancers.push(applyMiddleware(...allSagaMiddleWare));
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // thunk: false
    }).concat(api.middleware);
    middlewares.push(sagaMiddleware);
    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }
    return middlewares;
  },
});

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
