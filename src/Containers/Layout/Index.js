import React, { useState, useEffect, memo } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { layoutActions, makeSelectLayout } from './layoutSlice'
// import { useLazyFetchOneQuery } from '@/Services/modules/users'
// import { changeTheme } from '@/Store/Theme'

const Layout = (props) => {

  const { layout } = props;

  const { t } = useTranslation();
  const { Gutters, Layout } = useTheme();
  const dispatch = useDispatch();
  const globalData = useSelector(makeSelectLayout);
  
  useEffect(() => {

    dispatch(layoutActions.getExample());
    return () => {
      
    }
  }, [])
  

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
      <Text>This is Layout screen</Text>
    </ScrollView>
  )
}

export default memo(Layout);
