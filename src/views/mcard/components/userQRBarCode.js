import React, { useState, useEffect, useReducer, useRef } from 'react';
import { Platform,View, Image, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUnmountBrightness } from '@reeq/react-native-device-brightness';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { getUser } from '../../../store';
import { APIDevice, Config } from "../../../service";

const SettingBrightness = (props) => {
  const { focus } = props;
  const brightnessLevel = useUnmountBrightness(focus ? 1 : -1);
  return (<></>)
}

const Button = ({ label, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.styleButton, { style }]} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const UserQRBarCode = (props) => {
  const { timeterm, qrEncrypt, isOnlyQr } = Config?.MobileCard;
  const userInfo = getUser();
  const progressTimer = useRef();
  const [time, setTime] = useState(null);
  const [qrcodeUrl, setQRCodeUrl] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0); //qr 0 , barcode 1
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const [state, dispatch] = useReducer(timeReducer, {
    status: "INIT",
    seconds: 0,
  });

  function timeReducer(state, action) {
    switch (action.type) {
      case "START":
        setTime(moment().utc());
        return { ...state, status: "TIMER", seconds: timeterm };
      case "BLOCK":
        return { ...state, status: "BLOCK", seconds: 0 };
      case "DECREMENT":
        if (moment().utc().diff(time) < (timeterm * 1000)) {
          return { ...state, seconds: timeterm - moment.utc(moment().utc().diff(time)).format('s') };
        } else {
          return { ...state, status: "BLOCK", seconds: 0 };
        }
    }
  }

  const hhmmss = (seconds) => {
    let retval = "";
    var hour = parseInt(seconds / 3600);
    var min = parseInt((seconds % 3600) / 60);
    var sec = seconds % 60;

    if (hour > 0) {
      retval = hour + "시간 " + min + "분 " + sec + "초";
    }
    else {
      if (min > 0) {
        retval = min + "분 " + sec + "초";
      }
      else {
        retval = sec + "초";
      }
    }
    return retval;
  };

  const getQRCode = async () => {
    let item;
    if (qrEncrypt) {
      item = await APIDevice.GetQRBarCodeEncrypt(userInfo.idno, "", userInfo.cnt, userInfo.ccCode, "qrcode", "230", "230", "0");
    }
    else {
      item = await APIDevice.GetQRBarCode(userInfo.idno, "", 'qrcode', "140", "140", "0");
    }
    if (item != null) {
      if (item.statusCode == 0 && item.data != "") {
        setQRCodeUrl(item.data);
      }

    }
  };

  const handleTimer = () => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }
    progressTimer.current = setInterval(() => {
      dispatch({ type: "DECREMENT" });
    }, 1000);
  };

  useEffect(() => {
    dispatch({ type: "START" });
  }, []);

  useEffect(() => {
    switch (state.status) {
      case "TIMER":
        getQRCode();
        handleTimer();
        break;
        case "BLOCK":
          if (progressTimer.current) {
            clearInterval(progressTimer.current);
          }
          break;
    }
    return () => {
    }
  }, [state.status]);

  return (
    <View style={{ borderColor: 'red', width: '100%', height: 250, alignItems: 'center' }}>
      {qrcodeUrl &&
        <View style={Platform.OS === 'android' ? { height: 265, width: '100%' } : { height: 245, width: '100%' }}>
        <View style={styles.page}>
            <View
              style={[styles.container, {
                width: 200,
                height: 200,
                paddingTop: 0,
                paddingBottom: 0,
                marginLeft: 3,
                marginTop: 8
              }]}>
              {!qrEncrypt && (
                <Image
                  source={{ uri: qrcodeUrl }}
                  style={{
                    width: 140,
                    height: 140,
                  }}
                />
              )}
              {qrEncrypt && state.status === "TIMER" &&
                <Image
                  source={{ uri: qrcodeUrl }}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                />
              }
              {qrEncrypt && state.status === "BLOCK" &&
                <>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({ type: "START" });
                    }}
                  >
                    <MaterialCommunityIcons
                      name="refresh"
                      size={120}
                      color="#15508e"
                    />
                  </TouchableOpacity>
                </>
              }
            </View>
            {qrEncrypt && state.status === "TIMER" && (
            <View style={styles.timer}>
              <Text style={Platform.OS === 'android' ? {fontSize: 18, color: "#000"} : {fontSize: 20, color: "#000"} }>{hhmmss(state?.seconds)}</Text>
            </View>
          )}
          {qrEncrypt && state.status === "BLOCK" &&
            <View style={styles.timer}>
              <Text style={{ fontSize: 20 }}>{" "}</Text>
            </View>
          }
          </View>
        </View>
      }
      {!qrcodeUrl &&
        <View>
          <ActivityIndicator color="#eee" size="small" />
        </View>
      }
      <View style={styles.btnView}>
        <Button style={{}}
          label="새로고침" onPress={() => {
            //checkIsSupported();
            getQRCode();
            handleTimer();
            dispatch({ type: "START" });
          }} />
      </View>
      {navigation.isFocused() &&
        <SettingBrightness focus={navigation.isFocused()} />
      }
      {!navigation.isFocused() &&
        <SettingBrightness focus={false} />
      }
    </View>
  )
};

export default UserQRBarCode;

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderColor: "#15508e",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    color: "#15508e",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  refresh: {
    color: "#15508e",
    alignItems: "center",
    justifyContent: "center",
  },
  styleButton: {
    width: '40%',
    height: 35,
    backgroundColor: '#15508e',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#111',
  },
  label: {
    color: '#fff',
    fontSize: 18
  }
})