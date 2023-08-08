import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const ErrorsMessage = props => {
  const { isError, errorMesage } = props;
  // console.log('errorMesage: ', errorMesage);
  // console.log('isError: ', isError);

  // const [error, setError] = useState(false)
  const [errorsMesage, setErrorsMessage] = useState('');
  useEffect(() => {
    if (isError && errorMesage === 'internet') {
      setErrorsMessage('Có lỗi trong quá trình thực hiện, vui lòng thử lại');
    }
  }, [errorMesage]);
  return (
    <View>
      <Text>{errorsMesage}</Text>
    </View>
  );
};

export default ErrorsMessage;

const styles = StyleSheet.create({});
