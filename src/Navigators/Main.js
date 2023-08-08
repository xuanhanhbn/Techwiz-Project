/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import routes from '@/routes';
import Icon from 'react-native-vector-icons/Feather';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectNotification, notificationActions } from '@/Containers/Notifications/slice.js';

const Tab = createBottomTabNavigator();

const getIconType = (item, origin) => {
  if (item.icon.type === 'FEATHER') {
    return (
      <Icon name={item.icon.name} color={origin.color} size={origin.size} />
    );
  }
  return (
    <IconIonic name={item.icon.name} color={origin.color} size={origin.size} />
  );
};

// @refresh reset
const MainNavigator = () => {
  const dispatch = useDispatch();
  const notificationData = useSelector(makeSelectNotification);
  const { notificationList } = notificationData;

  const baseDataRequest = {
    notificationTitle: '',
    notificationContent: '',
    createdDate: {
      fromValue: '',
      toValue: '',
    },
    size: 20,
    page: 0,
    sort: 'createdDate',
    order: 'DESC',
  };

  useEffect(() => {
    dispatch(notificationActions.getNotificationList(baseDataRequest));
  }, []);

  const getBadge = item => {
    if (item.isBadge) {
      const { numberOfUnseenNotification } = notificationList;
      return numberOfUnseenNotification > 0 ? numberOfUnseenNotification : null;
    }
    return null;
  };

  return (
    <Tab.Navigator>
      {routes
        .filter(item => item.isShowBottom)
        .map(item => (
          <Tab.Screen
            name={item.name}
            key={item.name}
            component={item.component}
            navigationKey={item.name}
            options={{
              tabBarIcon: ({ color, size }) =>
                getIconType(item, { color, size }),
              headerShown: false,
              tabBarLabel: item.title,
              tabBarBadge: getBadge(item),
            }}
          />
        ))}
    </Tab.Navigator>
  );
};

export default MainNavigator;
