import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Switch, Platform, Alert } from 'react-native';
import { getUser } from '../../store';
// import * as Notifications from 'expo-notifications';
import { APIDevice } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

let ispush = false, issound = false, isvibrate = false, expotoken = "";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

const AlarmSet = (props) => {
  const userInfo = getUser();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSound, setIsSound] = useState(false);
  const [isVibrate, setIsVibrate] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(Notifications.Notification);
  const notificationListener = useRef(Subscription);
  const responseListener = useRef(Subscription);

  useEffect(() => {
    //console.log(userInfo);
    console.warn("권한체크 해야함");
    //ispush = "", issound = "", isvibrate = "";
    const getPUSHTYPE = async () => {
      const PushType = JSON.parse(await AsyncStorage.getItem("appPUSHTYPE"));
      //console.log("PushType:->", PushType);
      if (PushType) {
        setIsEnabled(PushType.isPush);
        setIsSound(PushType.isSound);
        setIsVibrate(PushType.isVibrate);
        ispush = PushType.isPush;
        issound = PushType.isSound;
        isvibrate = PushType.isVibrate;
        expotoken = PushType.token;
      }
      // if (expotoken === "") {
      //   registerForPushNotificationsAsync().then(token => {
      //     setExpoPushToken(token);
      //   });

      //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      //     setNotification(notification);
      //   });

      //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //     console.log(response);
      //   });

      //   return () => {
      //     if (typeof notificationListener.current !== 'undefined' && typeof responseListener.current !== 'undefined') {
      //       Notifications.removeNotificationSubscription(notificationListener.current);
      //       Notifications.removeNotificationSubscription(responseListener.current);
      //     }
      //   };
      // }
      // else {
      //   setExpoPushToken(expotoken);
      // }
    };
    getPUSHTYPE();
  }, []);

  const toggleSwitch = async (value, type) => {
    let data = [];
    switch (type) {
      case "isPush":
        expotoken = expoPushToken;
        ispush = value;
        setIsEnabled(ispush);
        if (ispush === true) {
          //DB등록
          const item = await APIDevice.RegisterGCM(userInfo.idno, userInfo.name, expotoken, Platform.OS);
          if (item && item.statusCode === 0) {
            //await schedulePushNotification();
            Alert.alert("저장", "푸시서비스가 " + item.message, [
              { text: '확인' },
            ]);
          }
          else {
            Alert.alert("오류", "오류가 발생했습니다", [
              { text: '확인' },
            ]);
          }
        }
        else {
          //DB삭제
          const item = await APIDevice.DeleteGCM(expoPushToken);
          if (item && item.statusCode === 0) {
            expotoken = "";
            Alert.alert("삭제", "푸시서비스가 " + item.message, [
              { text: '확인' },
            ]);
          }
          else {
            Alert.alert("오류", "오류가 발생했습니다", [
              { text: '확인' },
            ]);
          }
          setIsEnabled(false);
          setIsSound(false);
          setIsVibrate(false);
          issound = false;
          isvibrate = false;
          //setExpoPushToken("");
          //expotoken = "";
        }
        break;
      case "isSound":
        issound = value;
        setIsSound(issound);
        break;
      case "isVibrate":
        isvibrate = value;
        setIsVibrate(isvibrate);
        break;
    }
    data = JSON.stringify({ "token": expotoken, "isPush": ispush, "isSound": issound, "isVibrate": isvibrate });
    AsyncStorage.setItem('appPUSHTYPE', data).then(() => {
      //console.log("type:->", expotoken, "---", ispush, "--", issound, "--", isvibrate);
      return () => { };
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.itemHeader}>알림</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.item}>
          <View style={styles.itemFooter}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.note}>푸시 받기</Text>
            </View>
            <Switch
              style={styles.note}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={isEnabled}
              onValueChange={(value) => { toggleSwitch(value, "isPush") }}>
            </Switch>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.itemHeader}>수신 방법 선택</Text>
        <View style={styles.item}>
          <View style={styles.itemFooter}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.note}>소리 알림</Text>
            </View>
            <Switch
              style={styles.note}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isSound ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={isSound}
              onValueChange={(value) => { toggleSwitch(value, "isSound") }}>
            </Switch>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemFooter}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={styles.note}>진동 알림</Text>
            </View>
            <Switch
              style={styles.note}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isVibrate ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={isVibrate}
              onValueChange={(value) => { toggleSwitch(value, "isVibrate") }}>
            </Switch>
          </View>
        </View>
      </View>
      <View style={styles.noteView}>
        <Text style={styles.noteDesc}>· 옵션 선택 시 앱 전체에 바로 적용 됩니다.</Text>
      </View>
    </SafeAreaView>
  )
}

export default AlarmSet;

// const schedulePushNotification = async () => {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "알림 설정",
//       body: "푸시 받기를 설정 합니다.",
//       categoryId: "default",
//       android: {
//         channelId: "default",
//         sound: true,
//       },
//     },
//     trigger: { seconds: 1 },
//   });
// }

// const registerForPushNotificationsAsync = async () => {
//   let token;
//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;
//   if (existingStatus !== 'granted') {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }
//   if (finalStatus !== 'granted') {
//     //alert('Failed to get push token for push notification!');
//     //console.log("푸시알림오류 발생");
//     return;
//   }
//   token = (await Notifications.getExpoPushTokenAsync()).data;
//   //console.log(token);


//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('appHSUL', {
//       name: 'default',
//       sound: true,
//       importance: Notifications.AndroidImportance.DEFAULT,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    //borderBottomWidth: 0.5,
    padding: 5,
    //borderColor: 'gray',
    width: Dimensions.get('screen').width,
    backgroundColor: '#fff',
    minHeight: 60,
  },
  itemHeader: {
    padding: 10,
    fontSize: 18,
    backgroundColor: '#D3D3D3',
  },
  itemFooter: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
  },
  icon: {
    color: "#808080",
    paddingLeft: 15
  },
  note: {
    paddingRight: 5,
    paddingLeft: 15,
    color: 'gray',
    fontSize: 17
  },
  noteView: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    borderTopWidth: 0.5,
    borderColor: 'gray',
  },
  noteDesc: {
    margin: 15,
    lineHeight: 30,
    fontSize: 15,
    color: "#696"
  }
});