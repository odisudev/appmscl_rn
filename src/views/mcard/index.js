import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  NativeModules,
} from 'react-native';
import { getUser } from '../../store';
import Loading from '../Loading';
import { UserPicture, UserQRBarCode } from './components';


const cardTitle = '모바일 회원증은 또 하나의 신분증입니다.';
const cardDesc = '모바일 회원증은 또 하나의 신분증입니다.';

const MCard = ({ navigation }) => {
  const userInfo = getUser();

  if (userInfo == null) {
    return (
      <SafeAreaView>
        <Loading />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.cardBox}>
         {/* <View style={styles.header}>
          <Text style={{ color: '#fff', fontSize: 14 }}>{cardTitle}</Text>
        </View>  */}
        <View style={styles.contents}>
          <View style={styles.user}>
            <View style={{ margin: 15 }}>
              <UserPicture />
            </View>
            <View style={{ marginTop: 15 }}>
              <View style={styles.userText}>
                <Text style={styles.contentT}>이름</Text>
                <Text style={styles.contentC}>{userInfo.name}</Text>
              </View>
              <View style={styles.userText}>
                <Text style={styles.contentT}>학번</Text>
                <Text style={styles.contentC}>{userInfo.idno}</Text>
              </View>
              <View style={styles.userText}>
                <Text style={styles.contentT}>학과</Text>
                <Text style={styles.contentC}>{userInfo.cdName}</Text>
              </View>
              <View style={styles.userText}>
                <Text style={styles.contentT}>신분</Text>
                <Text style={styles.contentC}>{userInfo.ccName}</Text>
              </View>
            </View>
          </View>
          <View style={styles.qrbarcode}>
            <UserQRBarCode />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 20,
            }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{ width: 230, height: 50, marginTop: 20, resizeMode: 'stretch' }}
            />
          </View>
        </View>
        <View style={styles.footer}>
            <Text style={{ color: '#fff', fontSize: 14 }}>{cardDesc}</Text>
          </View>
      </ScrollView>
    </SafeAreaView>
    );
  }
};

export default MCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBox: {
    //borderWidth: 1,
    borderColor: '#111',
    //borderRadius: 7,
    width: '100%',
    //marginTop: '5%',
  },
  header: {
    height: 40,
    backgroundColor: 'rgba(189,206,170,1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 6,
    borderTopEndRadius: 6
  },
  footer: {
    height: 40,
    backgroundColor: '#15508e',
    justifyContent: 'center',
    alignItems: 'center',
    //borderBottomStartRadius: 6,
    //borderBottomEndRadius: 6
  },
  contents: {
    paddingTop: 10,
    backgroundColor: '#fff',
    //borderWidth: 1,
    //width: 300,
    //height: '80%'
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userText: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 5,
    marginLeft:20
  },
  contentT: {
    color: '#999',
    fontSize: 13,
    marginRight: 10,
    marginTop: 1,
    justifyContent: 'center',
  },
  contentC: {
    fontSize: 14,
    color: '#000',
    justifyContent: 'center',
  },
  qrbarcode: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
});
