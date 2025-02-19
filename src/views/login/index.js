import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Alert, Keyboard, Text, Switch, StyleSheet, Image, ScrollView, Platform, NativeModules } from 'react-native';
import { setUser, setAppLogin } from '../../store';
import * as Components from './components';
import Loading from '../Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Config, APILogin, APIUnipass } from '../../service';
import { setGlobalAlert } from '../../store';
import { Dialog, Portal, Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Login = (props) => {
  const [txtIdno, setTxtIdno] = useState(null);
  const [txtPW, setTxtPW] = useState(null);
  const [txtDesc, setTxtDesc] = useState("");
  const [pwVisible, setPwVisible] = useState({ icon: "eye-off", secure: true });
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = props.navigation;
  const setUserState = setUser();
  const setAppLoginState = setAppLogin();
  const globalAlert = setGlobalAlert();
  const [dialog, setDialog] = useState({
    visible: false,
    message: '',
    onPress: null
  });

  const onChangeIcon = () => {
    setPwVisible({
      icon: pwVisible.icon === 'eye' ? 'eye-off' : 'eye',
      secure: !pwVisible.secure
    })
  }

  const setLogin = async () => {
    setIsLoading(true);
    Keyboard.dismiss();

    if (!txtIdno || !txtPW) {
      Alert.alert('로그인', 'ID/PW를 입력해주세요', [{ text: '확인' }], {
        cancelable: false,
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await APILogin.Login(txtIdno, txtPW);
      const data = result.MobileLoginResult;
      if (data.Idno) {
        const userPicture = await APILogin.GetUserPicture(data.Idno);
        setAppLoginState({ idno: data.Idno });
        setUserState({
          userImage:
            userPicture.data != ''
              ? userPicture.data
              : `${Config.PROTOCOL}://${Config.DOMAIN}/WebImg/QRCode/Photo/${data.ImageFile}`,
          loc2: data.Loc2,
          idno: data.Idno,
          name: data.Name,
          ccCode: data.CcCode,
          ccName: data.CcName,
          cdCode: data.CdCode,
          cdName: data.CdName,
          chCode: data.ChCode,
          chName: data.ChName,
          cnt: data.Cnt,
          memberFrDT: data.MemberFrDT,
          memberToDT: data.MemberToDT,
          mobileTel: data.MobileTel,
          tel: data.Tel,
          rfid: data.RFID,
          isAdmin: data.isAdmin,
          cfYN: data.CFYN,
          useChk: data.UseIDYN,
          giganChk: data.GiganChk
        });

        Alert.alert(
          '로그인',
          `${data.Name}님 환영합니다.`);
  
        setIsLoading(false);

        //아이디 저장
        await AsyncStorage.setItem('appmscl', JSON.stringify(data.Idno))
        //자동로그인 여부 저장
        await AsyncStorage.setItem('appAUTOLOGIN', JSON.stringify(isAutoLogin));
      }
      else  {
        Alert.alert('로그인', 'ID/PW를 확인해주세요.', [{ text: '확인' }], {
          cancelable: false,
        });
        setIsLoading(false);
        return;
      }
    }
    catch (e){
      console.log(4)
      console.log("로그: "+e);
      Alert.alert('로그인', '로그를 확인해주세요', [{ text: '확인' }], {
        cancelable: false,
      });
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    chkUser();
    return () => {}
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.HeaderContainer}>
          <Image source={require('../../assets/login_logo.png')} style={{ width: 95, height: 95 }} />
        </View>
        <View style={styles.HeaderContainer}>
          <Text style={styles.noteheader}>반갑습니다</Text>
          <Text style={styles.noteheader}>{Config.LOC_NAME} 입니다.</Text>
          <Text style={styles.noteheaderdesc}>원할한 서비스를 위하여 로그인 해주세요.</Text>
        </View>
        <View style={styles.FormContainer}>
          <View style={{ flex: 1 }}>
            <Components.Input
              //style={{ marginBottom: 16 }}
              placeholder="아이디/회원번호"
              secureTextEntry={false}
              onKeyPress={(value) => {
                //console.log(value);
              }}
              onChangeText={(value) => {
                setTxtIdno(value);
              }}
            />
            <Components.Input
              //style={{ marginBottom: 16 }}
              placeholder="비밀번호"
              secureTextEntry={pwVisible.secure}

              onChangeText={(value) => {
                setTxtPW(value);
              }}
              onSubmitEditing={() => {
                setLogin()
              }}
              InputItem={() => (
                <Ionicons name={pwVisible.icon} size={30} color="black" onPress={onChangeIcon} />
              )}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Text style={styles.note}>자동 로그인</Text>
            <View style={styles.note}>
              <Switch
                style={{
                  color: 'gray',
                  fontSize: 16,
                }}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isAutoLogin ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                value={isAutoLogin}
                onValueChange={(value) => { setIsAutoLogin(value) }}>
              </Switch>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Components.Button
              style={{ marginBottom: 24 }}
              label="로그인"
              onPress={() => {
                setLogin();
              }}
            />
          </View>
        </View>
        <View style={styles.noteView}>
          <Text style={styles.noteDesc}>{txtDesc}</Text>
        </View>
      </ScrollView>
      {isLoading && <Loading />}
      {dialog.visible &&
        <Portal>
          <Dialog visible={dialog.visible} onDismiss={() => setDialog({...dialog, visible: false})}>
            <Dialog.Title>기기인증</Dialog.Title>
            <Dialog.Content>
              <Text>{dialog.message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialog({...dialog, visible: false})}>취소</Button>
              <Button onPress={() => dialog.onPress}>확인</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      }
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  HeaderContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 25,
    marginLeft: 30
  },
  noteheader: {
    paddingRight: 16,
    paddingLeft: 16,
    color: '#000',
    fontSize: 18,
    fontWeight: "bold"
  },
  noteheaderdesc: {
    padding: 16,
    color: '#000',
    fontSize: 16,
  },
  FormContainer: {
    width: '100%',
    padding: 30,
    paddingTop: 0,
  },
  note: {
    paddingTop: 15,
    paddingRight: 16,
    paddingLeft: 16,
    color: '#000',
    fontSize: 16
  },
  noteView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    marginTop: -20,
  },
  noteDesc: {
    lineHeight: 30,
    fontSize: 15,
    color: "#696"
  }
});