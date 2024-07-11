import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert, Linking, NativeModules } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { userState, getUser, setAppLogin } from '../../store';
import { setUser } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Loading from '../Loading';
import { Config, APILibrary, APIDevice } from '../../service';
import { UserPicture, UserPoint, pushList } from './components';

const More = ({ navigation }) => {
  const userInfo = getUser();
  const setLoginState = setAppLogin();
  const [myLentData, setMyLentData] = useState(null);
  const [hold, setHold] = useState(null);
  const logout = setUser();

  useEffect(() => {
    if (userInfo) {
      getLentData();
      getHoldData();
    }
    else {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'MainTab' },
            { name: 'Login' }
          ]
        })
      );
    }

    return () => { };
  }, []);

  const getLentData = async () => {
    const item = await APILibrary.GetLentStatus(userInfo.idno);
    if (item != null) {
      setMyLentData(item.ItemMyLentCnt);
    }
  };

  const getHoldData = async () => {
    const item = await APILibrary.GetLentHold(userInfo.idno);
    if (item != null) {
      setHold(item);
    }
  };

  const onPushButtonPress = async () => {
    navigation.navigate('pushList', {
      gcmUserInfo: userInfo.idno,
      getFCMToken: ""
    });
  }

  const onButtonPress = () => {
    // codePush.sync({
    //   updateDialog: false,
    //   installMode: codePush.InstallMode.IMMEDIATE,
    // });
    //checkForUpdates();
  };

  const setLogOut = async () => {
    //로그아웃시 푸시 부분 DB 에서 삭제 해야 할듯(추후 사용 여부 확인 - HJN[20230209])
    await APIDevice.DeleteGCM(userInfo.idno);

    logout(() => ({
      loc2: null,
      userImage: null,
      idno: null,
      name: null,
      ccCode: null,
      ccName: null,
      cdCode: null,
      cdName: null,
      chCode: null,
      chName: null,
      useChk: null,
      cfYN: null,
      cnt: null,
      memberFrDT: null,
      memberToDT: null,
      mobileTel: null,
      tel: null,
      rfid: null,
      isAdmin: null,
      giganChk: null
    }));
    setLoginState({ idno: null });
    
    await AsyncStorage.removeItem('appPUSHTYPE');
    await AsyncStorage.removeItem('appKYDC');
    await AsyncStorage.removeItem('appAUTOLOGIN');
    await AsyncStorage.removeItem('appCARDTYPE');

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'MainTab' },
        ]
      })
    );
  }

  if (userInfo == null) {
    return (
      <SafeAreaView>
        <Loading />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 40 }}>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.userBox}>
              <View style={styles.userPicture}>
                <UserPicture edit={Config.MobileCard.edit} />
              </View>
              <View style={styles.userinfo}>
                <Text style={styles.userT}>아이디/회원번호</Text>
                <Text style={styles.userC}>{userInfo.idno}</Text>
              </View>
              <View style={styles.userinfo}>
                <Text style={styles.userT}>이름</Text>
                <Text style={styles.userC}>{userInfo.name}</Text>
              </View>
              <View style={styles.userinfo}>
                <Text style={styles.userT}>소속</Text>
                <Text style={styles.userC}>{userInfo.cdName}</Text>
              </View>
              <View style={styles.userinfo}>
                <Text style={styles.userT}>신분</Text>
                <Text style={styles.userC}>{userInfo.ccName}</Text>
              </View>
              {userInfo.memberFrDT != '' && userInfo.memberToDT != '' && (
                <View style={styles.userinfo}>
                  <Text style={styles.userT}>사용가능기간</Text>
                  <Text style={styles.userC}>
                    {userInfo.memberFrDT}~{userInfo.memberToDT}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {/* {myLentData != null &&
            myLentData.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity style={styles.lentBox} onPress={() => navigation.navigate('Lent')}>
                    <View style={styles.bookCnt}>
                      <Text>{item.LentCnt}</Text>
                      <Text>권</Text>
                    </View>
                    <Text>대출도서</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.lentBox} onPress={() => navigation.navigate('Reservation')}>
                    <View style={styles.bookCnt}>
                      <Text>{item.BwCnt}</Text>
                      <Text>권</Text>
                    </View>
                    <Text>예약도서</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.lentBox} onPress={() => navigation.navigate('Loss')}>
                    <View style={styles.bookCnt}>
                      <Text>{item.LostCnt}</Text>
                      <Text>권</Text>
                    </View>
                    <Text>분실도서</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          {myLentData === null && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity style={styles.lentBox} onPress={() => navigation.navigate('Lent')}>
                <View style={styles.bookCnt}>
                  <Text>0</Text>
                  <Text>권</Text>
                </View>
                <Text>대출도서</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.lentBox} onPress={() => navigation.navigate('Reservation')}>
                <View style={styles.bookCnt}>
                  <Text>0</Text>
                  <Text>권</Text>
                </View>
                <Text>예약도서</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.lentBox} onPress={() => navigation.navigate('Loss')}>
                <View style={styles.bookCnt}>
                  <Text>0</Text>
                  <Text>권</Text>
                </View>
                <Text>분실도서</Text>
              </TouchableOpacity>
            </View>
          )} 
          {hold != null && hold.data != '' && (
            <View>
              <Text>{hold.data.split('|')[0]}로 인해 대출금지 입니다.</Text>
              <Text>{hold.data.split('|')[1]}</Text>
            </View>
          )} */}
        </ScrollView>
        <View style={{ justifyContent: 'flex-end', borderTopWidth: 0.5, borderColor: "#aaa" }}>
          <TouchableOpacity
            style={styles.appInfo}
            onPress={() => navigation.navigate("Settings")}>
            <View style={styles.appList}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <MaterialIcons name="settings" size={20} color="black" />
                <Text style={styles.note}>환경설정</Text>
              </View>
              <AntDesign
                name={"right"}
                size={20}
                color="#999"
                style={styles.note}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appInfo}
            onPress={() => onButtonPress()}>
            <View style={styles.appList}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Entypo name="info-with-circle" size={20} color="black" />
                <Text style={styles.note}>버전 {Config.Version}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogout} onPress={setLogOut}>
            <MaterialCommunityIcons
              name="logout"
              size={20}
              style={{ color: '#fff' }}
            />
            <Text style={styles.logoutNote}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgTitle: {
    //margin: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  badgeIconView: {
    position: 'relative',
    padding: 2
  },
  badge: {
    color: '#fff',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 7,
    fontSize: 11,
    backgroundColor: 'red',
    borderRadius: 100,
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 4,
    paddingLeft: 4
  },
  userBox: {
    alignItems: 'center',
    borderWidth: 1,
    width: '90%',
    marginTop: 10,
    borderRadius: 7,
    borderColor: '#333',
    padding: 20,
    paddingTop: 70,
    paddingBottom: 30,
  },
  userPicture: {
    position: 'absolute',
    top: -40,
    bottom: 0,
    zIndex: 2,
  },
  userinfo: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 7,
    paddingLeft: '10%',
    marginBottom: 7,
    width: '90%',
  },
  userT: {
    color: '#555',
    fontSize: 12,
    marginTop: 3,
    width: '40%',
  },
  userC: {
    marginLeft:16,
    fontSize: 15,
  },
  lentBox: {
    padding: 20,
    width: '30%',
    alignItems: 'center',
  },
  bookCnt: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  appInfo: {
    height: 55,
    width: '100%',
    padding: 14,
    borderBottomWidth: 0.5,
    borderColor: "#aaa"
  },
  appList: {
    flex: 1,
    flexDirection: 'row',
  },
  note: {
    paddingLeft: 10,
    color: 'gray',
    fontSize: 17
  },
  btnLogout: {
    flexDirection: 'row',
    backgroundColor: '#15508e',
    borderColor: '#15508e',
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 13,
    margin: 8,
    color: '#fff'
  },
  logoutNote: {
    paddingLeft: 10,
    color: '#fff',
    fontSize: 17
  },
});
