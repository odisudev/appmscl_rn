import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Switch, SectionList, Dimensions, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AutoLoginset = () => {
  const [isEnabled, setIsEnabled] = useState(false);
    
  useEffect(() => {
    const chkAutoLogin = () => {
      setTimeout(async () => {
        const isAutoLogin = await AsyncStorage.getItem("appAUTOLOGIN"); 
        if (isAutoLogin === "true") {
          setIsEnabled(true);
        }
        else {
          setIsEnabled(false);
        }
      }, 300)
    };
    chkAutoLogin();
  }, []);

  const toggleSwitch = (auto) => {
    AsyncStorage.setItem('appAUTOLOGIN', JSON.stringify(auto)).then(() => {
      setIsEnabled(auto);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <Text style={{ fontSize: 18 }}>설정</Text>
        </View>
        <View style={styles.itemFooter}>
          <View style={{ flex: 1 }}>
            <Text style={styles.note}>
              자동 로그인
            </Text>
          </View>
          <Switch
            style={styles.note}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(auto) => { toggleSwitch(auto) }}
            value={isEnabled}>
              {console.log('isEnabled = ')}
              {console.log(isEnabled)}
          </Switch>
        </View>
      </View>
      <View style={styles.noteView}>
        <Text style={styles.noteDesc}>· 옵션 선택 시 앱 시작과 함께 로그인이 진행됩니다.</Text>
        <Text style={styles.noteDesc}>· 옵션 해제 시 로그인을 별도로 진행해야 합니다.</Text>
      </View>
    </SafeAreaView>
  )
}

export default AutoLoginset;

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
    minHeight: 100,
  },
  itemHeader: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: "#D3D3D3",
  },
  itemFooter: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
  },
  noticeTitle: {
    color: 'black',
  },
  note: {
    paddingRight: 5,
    paddingLeft: 5,
    color: 'gray',
    fontSize: 17
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