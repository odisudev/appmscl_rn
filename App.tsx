/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, Platform, PermissionsAndroid, Alert } from 'react-native';
import { RecoilRoot } from 'recoil';
import Navigator from './src/views/Navigator';
import { Provider, MD3LightTheme } from 'react-native-paper';
import CodePush from 'react-native-code-push';

const codePushOptions = {
  // 언제 업데이트를 체크하고 반영할지를 정한다.
  // ON_APP_RESUME은 Background에서 Foreground로 오는 것을 의미
  // ON_APP_START은 앱이 실행되는(켜지는) 순간을 의미
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  // 업데이트를 할지 안할지 여부에 대한 노출 (잠수함 패치의 경우 false)
  updateDialog: {
    title: "알림",
    optionalUpdateMessage: '업데이트가 있습니다.',
    optionalIgnoreButtonLabel: '나중에 설치',
    optionalInstallButtonLabel: '업데이트',
    mandatoryUpdateMessage: '필수 업데이트가 있습니다.',
    mandatoryContinueButtonLabel: '업데이트'
  },
  // 업데이트를 어떻게 설치할 것인지 (IMMEDIATE는 강제설치를 의미)
  installMode: CodePush.InstallMode.IMMEDIATE,
};

function App(): JSX.Element {
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }
  }, []);

  return (
    <Provider theme={MD3LightTheme}>
      <RecoilRoot>
        <StatusBar barStyle={"dark-content"} />
        <Navigator />
      </RecoilRoot>
    </Provider>
  );
}

export default CodePush(codePushOptions)(App);
