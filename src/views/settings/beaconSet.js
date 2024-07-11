import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Switch, Dimensions, Platform, Linking, NativeModules } from 'react-native';
import { checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { setGlobalAlert } from '../../store';
import { Dialog, Portal, Button } from 'react-native-paper';

const BeaconSet = (props) => {
  const [setting, setSetting] = useState(false);
  const globalAlert = setGlobalAlert();
  
  const { HCEModule } = NativeModules;

  const [dialog, setDialog] = useState({
    visible: false,
    message: '',
    onPress: null
  });

  useEffect(() => {
    getSetting();
    return () => { }
  }, []);

  const getSetting = async () => {
    const check = await HCEModule.permissionCheck();
    setSetting(Boolean(check));
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
              좌석예약 위치인증
            </Text>
          </View>
          <Switch
            style={styles.note}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={setting ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={async (value) => {
              setSetting(value);
              if (value) {
                const permissions = [];
                if (Platform.OS === 'ios') {
                  await checkMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.LOCATION_ALWAYS]).then((statuses) => {
                    switch (statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]) {
                      case RESULTS.DENIED:
                        permissions.push(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
                        break;
                    }

                    switch (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS]) {
                      case RESULTS.DENIED:
                        permissions.push(PERMISSIONS.IOS.LOCATION_ALWAYS);
                        break;
                    }
                  });
                }
                else {
                  await checkMultiple([PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.BLUETOOTH_SCAN]).then((statuses) => {
                    switch (statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]) {
                      case RESULTS.DENIED:
                        permissions.push(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
                        break;
                    }

                    switch (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]) {
                      case RESULTS.DENIED:
                        permissions.push(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
                        break;
                    }

                    switch (statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN]) {
                      case RESULTS.DENIED:
                        permissions.push(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
                        break;
                    }
                  });

                  let d = true;
                  await requestMultiple(permissions).then(async (value) => {
                    switch (value[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]) {
                      case RESULTS.BLOCKED:
                        d = false;
                        break;
                    }

                    switch (value[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]) {
                      case RESULTS.BLOCKED:
                        d = false;
                        break;
                    }

                    switch (value[PERMISSIONS.ANDROID.BLUETOOTH_SCAN]) {
                      case RESULTS.BLOCKED:
                        d = false;
                        break;
                    }

                    if (d) {
                      const items = [];
                      await checkMultiple([PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION]).then((statuses) => {
                        switch (statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION]) {
                          case RESULTS.DENIED:
                            items.push(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
                            break;
                        }
                      });
                      if (items.length > 0) {
                        globalAlert({
                          visible: true,
                          message: '위치 권한을 항상 허용으로 설정하시면 앱을 종료하셔도 인증이 가능합니다.',
                          onPress: async () => {
                            try {
                              await requestMultiple(items);
                            }
                            catch {
                            }
                            finally {
                            }
                          }
                        });
                      }

                      HCEModule.permissionGrant();
                      setSetting(true);
                    }
                    else {
                      setSetting(false);
                      globalAlert({
                        visible: true,
                        message: '근처 기기, 위치 권한을 활성화 해주세요.',
                        onPress: async() => {
                          Linking.openSettings();
                        }
                      })
                    }
                  });
                }
              }
              else {
                HCEModule.permissionBlock();
                setSetting(false);
              }
              
            }}
            value={setting}>
          </Switch>
        </View>
      </View>
      <View style={styles.noteView}>
        <Text style={styles.noteDesc}>· 기기의 블루투스 기능도 켜주시길 바랍니다.</Text>
        <Text style={styles.noteDesc}>· 열람실 근처에 있을 시 자동으로 인증됩니다.</Text>
      </View>
    </SafeAreaView>
  )
}

export default BeaconSet

const styles = StyleSheet.create({
  container: {
    flex: 1
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
})