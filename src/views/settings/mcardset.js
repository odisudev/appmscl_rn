import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, SectionList, Dimensions, TouchableOpacity, Switch, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const McardSet = (props) => {
  const [value, setValue] = useState("qrcode");

  useEffect(() => {
    const chkCardType = async () => {
      const CardType = await AsyncStorage.getItem("appCARDTYPE");
      if (CardType === undefined || CardType === null) {
        AsyncStorage.setItem('appCARDTYPE', value).then(() => {
          setValue("qrcode");
        });
      }
      else {
        setValue(CardType);
      }
    };
    chkCardType();
  }, []);

  const CardChange = (value, CardType) => {
    //console.log(CardType);
    AsyncStorage.setItem('appCARDTYPE', CardType).then(() => {
      setValue(CardType);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.itemHeader}>설정</Text>
      </View>
      <View style={{ flex: 0 }}>
        <View style={styles.item}>
          <View style={styles.itemFooter}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <AntDesign
                name={"qrcode"}
                size={24}
                style={styles.icon}></AntDesign>
              <Text style={styles.note}>QRCode</Text>
            </View>
            <Switch
              style={styles.note}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={value === "qrcode" ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => { CardChange(value, "qrcode") }}
              value={value === "qrcode" ? true : false}>
            </Switch>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemFooter}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <AntDesign
                name={"barcode"}
                size={24}
                style={styles.icon}></AntDesign>
              <Text style={styles.note}>BarCode</Text>
            </View>
            <Switch
              style={styles.note}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={value === "barcode" ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => { CardChange(value, "barcode") }}
              value={value === "barcode" ? true : false}>
            </Switch>
          </View>
        </View>
        {/* <RadioButton.Group
          value={value}
          onValueChange={newValue => CardChange(newValue)}>
          <View style={styles.item}>
            <View style={styles.itemFooter}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <AntDesign
                  name={"barcode"}
                  size={24}
                  style={styles.icon}></AntDesign>
                <Text style={styles.note}>BarCode</Text>
              </View>
              <RadioButton.Item
                label={""}
                color="#5BC0F8"
                style={{ paddingTop: -15 }}
                value={"barcode"}
              />
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemFooter}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <AntDesign
                  name={"qrcode"}
                  size={24}
                  style={styles.icon}></AntDesign>
                <Text style={styles.note}>QRCode</Text>
              </View>
              <RadioButton.Item
                label={""}
                color="#5BC0F8"
                value={"qrcode"}
              />
            </View>
          </View>
        </RadioButton.Group> */}
      </View>
      <View style={styles.noteView}>
        <Text style={styles.noteDesc}>· 옵션 선택 시 대출증에 바로 적용 됩니다.</Text>
      </View>
    </SafeAreaView>
  )
}

export default McardSet;

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
    margin: 15
  },
  noteDesc: {
    lineHeight: 30,
    fontSize: 15,
    color: "#696"
  }
});