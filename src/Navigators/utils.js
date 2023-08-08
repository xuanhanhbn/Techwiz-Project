/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import EncryptedStorage from 'react-native-encrypted-storage';

import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const navigateAndReset = (routes = [], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }
};

export const navigateAndSimpleReset = (name, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    );
  }
};

export const isLogin = async () => {
  const data = await EncryptedStorage.getItem('loginData');
  return data ? JSON.parse(data) : {};
};

export const getStepActive = async () => {
  const stepActiveData = await EncryptedStorage.getItem('userInfo');
  // console.log(stepActiveData)
  return stepActiveData ? JSON.parse(stepActiveData) : {};

};

export const handleCommentExceptionSaga = (error, defaultMessage) => {
  if (error?.code === 'ERR_NETWORK'){
    return 'Lỗi kết nối , vui lòng thử lại sau';
  }
  if (error?.message){
    return error?.message;
  }
  return defaultMessage;
};
