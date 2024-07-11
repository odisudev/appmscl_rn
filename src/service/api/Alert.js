import React from 'react';
import {Alert} from 'react-native';

export const ErrorAlert = (error) => {
  let check = false;
  try {
    check = error.message.toUpperCase().indexOf('NETWORK') > -1;
  } catch (error) {
    check = false;
  }
  Alert.alert(
    '검색',
    check
      ? '네트워크 연결 상태가 좋지 않습니다.\n확인 후 다시 시도해주세요'
      : `${error.message} 오류가 발생했습니다. 관리자에게 문의바랍니다.`,
    [
      {
        text: '확인',
        onPress: () => {},
      },
    ],
    {cancelable: false},
  );
};
