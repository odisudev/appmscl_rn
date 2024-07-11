import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getUser } from '../../../store';
import { APIDevice } from '../../../service';

const PushList = ({ route, navigation }) => {
  const { gcmUserInfo, getFCMToken } = route.params;
  const [myPushData, setMyPushData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = getUser();

  useEffect(() => {
    const getPUSHLIST = async () => {
      getMyPushData();
    };
    getPUSHLIST();
  }, []);

  const getMyPushData = async () => {
    const item = await APIDevice.GetPushList2(gcmUserInfo, getFCMToken);
    //const item = await APIDevice.GetPushList(gcmUserInfo);
    if (item && item.length !== 0) {
      //console.log(item);
      setMyPushData(item)
    }
    else {
      setMyPushData([]);
    }
  };

  const PushMessagePress = async (item) => {
    //console.log(item);
    const items = await APIDevice.UpdatePushListReadType(gcmUserInfo, getFCMToken, item.ID);
    //const items = await APIDevice.UpdatePushListReadType("201973034", "", item.ID);
    //console.log("items:->", items);
    if (items && items.statusCode === 0) {
      switch (item.SendType) {
        case "DOCUMENT":
          navigation.navigate('BoardDetail', {
            categoryId: "1",  //이부분 강제 셋팅인디... 그냥 해야하나(HJN - 20230213)
            boardId: item.Data
          });
          break;
        default:
          Alert.alert(
            item.Title,
            item.Message,
            [
              {
                text: "확인",
                onPress: () => { }
              }
            ],
            { cancelable: true }
          );
          break;
      }
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          PushMessagePress(item)
        }}>
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Text style={{ fontSize: 16 }}>{item.Title}</Text>
            {item.ReadType != 'Y' &&
              <View style={styles.badge}><Text style={styles.badgenote}> ! </Text></View>}
          </View>
        </View>
      </TouchableOpacity>

    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>알림 리스트</Text>
      </View>
      <View
        style={{
          flex: 8,
          width: '100%',
        }}>
        {myPushData && (
          <FlatList
            data={myPushData}
            renderItem={renderItem}
            refreshing={loading}
            onRefresh={() => {
              getMyPushData();
            }}
          />
        )}
        {myPushData == '' &&
          <View style={{
            flex: 8,
            width: '100%',
          }}>
            <Text style={styles.note}>알림이 없습니다.</Text>
          </View>
        }
      </View>
    </SafeAreaView>
  )
};

export default PushList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    fontSize: 18,
    backgroundColor: '#D3D3D3',
  },
  item: {
    flex: 1,
    borderBottomWidth: 0.5,
    padding: 5,
    borderColor: 'gray',
    width: Dimensions.get('screen').width,
  },
  itemHeader: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  itemFooter: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
  },
  noticeTitle: {
    color: 'black',
  },
  note: {
    paddingRight: 5,
    paddingLeft: 5,
    color: 'gray',
    textAlign: 'center',
    fontSize: 18
  },
  badge: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 50,
    backgroundColor: 'red',
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 6,
    paddingLeft: 6,
    textAlign: 'center',
    marginLeft: 10
  },
  badgenote: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold'
  }
});