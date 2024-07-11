import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, SectionList, Dimensions, TouchableOpacity, Platform, Linking } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { userState, getUser } from '../../store';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Settings = () => {
  const userInfo = getUser();

  const DATA = [
    {
      title: "개인 환경 설정",
      data: [
        //{ "navi": "SetBeacon", "name": "좌석예약 위치인증", "icon": "mobile1", "color": '#000' },
        { "navi": "SetAutoLogin", "name": "자동 로그인", "icon": "login", "color": "#43D751" },
        //{ "navi": "SetAlarm", "name": "알림 설정", "icon": "bells", "color": "#FF9501" },
        // { "navi": "SetMCard", "name": "대출증 설정", "icon": "idcard", "color": "#7C7B81" }
      ],
    }
  ];

  useEffect(() => {

  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            //console.log(item);
            return (
              <SectionItem userInfo={userInfo} item={item}></SectionItem>
            )
          }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.itemHeader}>{title}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const SectionItem = ({ userInfo, item }) => {
  const navigation = useNavigation();
  //console.log(item);

  const SectionPress = (item) => {
    //console.log(item);
    if (userInfo) {
      //console.log("userInfo.idno:->", userInfo.idno);
      switch (item.navi) {
        case "SetAutoLogin":
          navigation.navigate('autoLoginset');
          break;
        case "SetAlarm":
          //navigation.navigate('alarmset');
          Linking.openSettings();
          break;
        case "SetMCard":
          navigation.navigate('mcardset');
          break;
        // case "SetBeacon":
        //   navigation.navigate('beaconSet');
        //   break;
      }
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
  };

  return (
    <TouchableOpacity
      onPress={() => {
        SectionPress(item);
      }}>
      <View style={styles.item}>
        <View style={styles.itemFooter}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <AntDesign
              name={item.icon}
              size={24}
              style={{ color: item.color, paddingLeft: 15 }}></AntDesign>
            <Text style={styles.note}>{item.name}</Text>
          </View>
          <AntDesign
            name={"right"}
            size={20}
            color="#999"
            style={styles.note}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    borderBottomWidth: 0.5,
    padding: 5,
    borderColor: 'gray',
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
  note: {
    paddingRight: 5,
    paddingLeft: 15,
    color: 'gray',
    fontSize: 17
  },
  noteTitle: {
    color: 'black',
    paddingLeft: 15,
  },
  noteView: {
    flex: 1,
    flexDirection: "column",
    margin: 15
  },
  noteDesc: {
    lineHeight: 30,
    fontSize: 15,
    color: "#696"
  }
});
