import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, Alert, TouchableOpacity, Platform, ImageBackground, NativeModules } from 'react-native';
import { check, request, checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Menu, Banner } from './components';
import { Config, APILogin, APIBoard, APIUnipass, APILibrary } from '../../service';
import { setUser, getUser, getAppLogin } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import ReactCall from '~/service/customModule';
import { setGlobalAlert } from '../../store';
import { Dialog, Portal, Button, Card, Text } from 'react-native-paper';


const Home = ({ route, navigation }) => {
  const setUserState = setUser();
  const getUserState = getUser();
  const appLoginState = getAppLogin();
  const globalAlert = setGlobalAlert();
  const [board, setBoard] = useState(null);
  const [myLentData, setMyLentData] = useState(null);
  const [dialog, setDialog] = useState({
    visible: false,
    message: '',
    onPress: null
  });

  const saveTokenToDatabase = async (token) => {
    if (getUserState && getUserState.idno) {
      await APIUnipass.SaveGcmUsers(Config.LOC, getUserState.idno, Platform.OS.toUpperCase(), token);
    }
  }

  const chkUser = async () => {
    const userInfo = await AsyncStorage.getItem("appmscl");
    if (userInfo) {
      const autoLogin = await AsyncStorage.getItem("appAUTOLOGIN");
      if (autoLogin && autoLogin === "true") {
        const userData = await APILogin.AutoLogin(userInfo.replaceAll('"',''));
        if (userData && userData.MobileMemberResult) {
          // console.warn("재직/재학 이외 이용자는 강제 로그아웃");
          // console.warn("기본은 CFYN 가 Y 인 이용자만 사용, 기관에 맞게 커스트마이징 하면 될듯.");
          if (userData.MobileMemberResult.CFYN === "Y") {
            setUserState((old) => ({
              loc2: userData.MobileMemberResult.Loc2,
              userImage: userData.MobileMemberResult.ImageFile,
              idno: userData.MobileMemberResult.Idno,
              name: userData.MobileMemberResult.Name,
              ccCode: userData.MobileMemberResult.CcCode,
              ccName: userData.MobileMemberResult.CcName,
              cdCode: userData.MobileMemberResult.CdCode,
              cdName: userData.MobileMemberResult.CdName,
              chCode: userData.MobileMemberResult.ChCode,
              chName: userData.MobileMemberResult.ChName,
              useChk: userData.MobileMemberResult.UseIDYN,
              cfYN: userData.MobileMemberResult.CFYN,
              cnt: userData.MobileMemberResult.Cnt,
              memberFrDT: userData.MobileMemberResult.MemberFrDT,
              memberToDT: userData.MobileMemberResult.MemberToDT,
              mobileTel: userData.MobileMemberResult.MobileTel,
              tel: userData.MobileMemberResult.Tel,
              rfid: userData.MobileMemberResult.RFID,
              isAdmin: userData.MobileMemberResult.isAdmin,
              giganChk: userData.MobileMemberResult.GiganChk
            }));
          }
          else {
            Alert.alert(
              "로그인",
              "재학/재직자 이외는 강제 로그아웃 됩니다.",
              [
                {
                  text: "확인",
                  onPress: () => {
                    AsyncStorage.removeItem('appmscl');
                  }
                }
              ],
              { cancelable: false }
            ); 
          }
        }
      }
      if (autoLogin && autoLogin === "false" && !appLoginState.idno) {
        AsyncStorage.removeItem('appmscl');
        setUserState((old) => ({
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
      }
    }
    else {
      AsyncStorage.removeItem('appmscl');
      setUserState((old) => ({
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
    }
  }


  const getLentData = async () => {
    if (getUserState) {
      const item = await APILibrary.GetLentStatus(getUserState.idno);
      if (item != null) {
        setMyLentData(item.ItemMyLentCnt);
      }
    }
  };

  useEffect(() => {
    getLentData();
  }, [getUserState]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        <View style={styles.main}>
          <View style={styles.dashboard}>
            <Card
              contentStyle={{
                height: 200,
                backgroundColor: 'white',
              }}
            >
              <Card.Content>
                <Text variant="titleMedium">이용현황</Text>
                <View style={{ height: 140, justifyContent: 'center', alignItems: 'center' }}>
                  {!getUserState &&
                    <>
                      <Text variant="bodyMedium">로그인 시 도서관의{`\n`}여러 서비스 이용이 가능합니다.</Text>
                      <Button
                        style={{ marginTop: 20, width: 120 }}
                        mode="contained-tonal"
                        onPress={() => {
                          navigation.navigate("Login");
                        }}
                      >
                        로그인
                      </Button>
                    </>
                  }
                </View>
              </Card.Content>
            </Card>
          </View>
          <View style={styles.menu}>
            <Menu />
          </View>
        </View>
        {dialog.visible &&
        <Portal>
          <Dialog visible={dialog.visible} onDismiss={() => setDialog({...dialog, visible: false})}>
            <Dialog.Title>기기인증</Dialog.Title>
            <Dialog.Content>
              <Text>{dialog.message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialog({...dialog, visible: false})}>취소</Button>
              <Button onPress={dialog.onPress}>확인</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      }
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,1)'
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    //marginTop: 60,
  },
  board: {
    paddingTop: 15,
    width: '90%',
    paddingRight: 10
  },
  boardHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  boardBody: {
    borderBottomWidth: 2
  },
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    //paddingBottom: 155,
  },
  banner: {
    height: 54,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderColor: '#ddd'
  },
  dashboard: {
    marginTop: 15,
    width: '90%',
  },
})