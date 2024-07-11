import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Button
} from 'react-native';

const Loading = (props) => {
  const { setReload } = props;
  const [pageShow, setPageShow] = useState(false);
  const [visible, setVisible] = useState(true);
  const fetchChk = setInterval(() => {
    setPageShow(true);
  }, 30000);

  useEffect(() => {
    return () => { };
  }, []);

  if (visible) {
    return (
      <SafeAreaView style={styles.container}>
        {!pageShow && <ActivityIndicator color="#529FF3" size="large" />}
        {pageShow && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 40,
              borderRadius: 15,
              backgroundColor: 'rgba(52,52,52,0.7)',
              borderWidth: 1,
            }}>
            <Text style={{ color: 'white' }}>네트워크 연결 상태가 좋지 않습니다.</Text>
            <Text style={{ color: 'white' }}>확인 후 다시 시도해주세요.</Text>
            {typeof setReload === "function" && (
              <TouchableOpacity onPress={() => setReload()}>
                <View style={styles.btnSearch}>
                  <Text>새로고침</Text>
                </View>
              </TouchableOpacity>
            )}
            <Button onPress={() => setVisible(false)}>닫기</Button>
          </View>
        )}
      </SafeAreaView>
    );
  }
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    //opacity: "0.2",
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 150,
  },
  btnSearch: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
});
