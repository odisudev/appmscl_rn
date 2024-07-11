import React from 'react';
import {Alert} from 'react-native';
import Config from './conf.lib';
//import json from './external.json';
import {ErrorAlert} from '~/service/api/Alert';
const getExternalList = async () => {
  try {
    const url = `${Config.BASE_IMAGE_URL}/appmscl/external.json?VAR=${new Date().getTime()}`;
    const response = await fetch(url, {
      header: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    const data = json.external;
    return data;
  } catch (error) {
    ErrorAlert(error);
    return [];
  }
};

export default {
  GetExternalList: getExternalList,
};
