import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Modal, Text, Platform, PermissionsAndroid, Alert } from 'react-native';
import { getUser } from '../../../store';
import { Config, APILogin, APIDevice } from '../../../service';
// import * as ImagePicker from 'expo-image-picker';
import { CommonActions } from '@react-navigation/native';

const UserPicture = ({navigation}) => {
  const userInfo = getUser();
  const [pickImage, setPickImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getUserPicture = async () => {
    const items = await APILogin.GetUserPicture(userInfo.idno);
    if (items != null) {
      setPickImage(
        items.data
          ? `data:image/png;base64,${items.data}`
          : Config.MobileCard.blankImage,
      );
    } else {
      setPickImage(Config.MobileCard.blankImage);
    }
  };

  useEffect(() => {
    getUserPicture();
  }, [pickImage]);

  const onSelectOption = () => {
    setModalVisible(true);
  };

  // const activeCamera = async () => {
  //   const result = await ImagePicker.launchCameraAsync({
  //     aspect: [4, 3],
  //     quality: 0.3,
  //     mediaTypes: "Images"
  //   });

  //   if (!result.canceled) {
  //     try {
  //       const form = new FormData();
  //       form.append("photo", {
  //         uri: result.assets[0].uri,
  //         name: userInfo.idno + '.jpg',
  //         type: 'image/jpeg',
  //       });
  //       form.append("Loc", Config.LOC);
  //       const retval = await APIDevice.FileUpload(form);
  //       if (retval != "0") {
  //         const end = await APIDevice.MobilePhotoUpdate(userInfo.idno, retval);
  //         if (end != null && end.UpdateMobileCardPhotoResult === "저장완료") {
  //           Alert.alert(
  //             "저장",
  //             "저장 되었습니다.",
  //             [
  //               {
  //                 text: "확인",
  //                 onPress: () => {
  //                   navigation.dispatch(CommonActions.reset({
  //                     index: 1,
  //                     routes: [
  //                       { name: 'Home' },
  //                       {
  //                         name: 'More',
  //                       },
  //                     ],
  //                   }));
  //                   navigation.goBack();
  //                 }
  //               }
  //             ],
  //             { cancelable: true }
  //           )
  //         }

  //         setPickImage(result.assets[0].uri);
  //         setModalVisible(!modalVisible);
  //       }
  //     } catch {
  //       setModalVisible(!modalVisible);
  //     }
  //   } 
  // };

  // const getPhotos = async () => {
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       aspect: [4, 3],
  //       quality: 0.3,
  //     });

  //     if (!result.canceled) {
  //       const form = new FormData();
  //       form.append("photo", {
  //         uri: result.assets[0].uri,
  //         name: userInfo.idno + '.jpg',
  //         type: 'image/jpeg',
  //       });
  //       form.append("Loc", Config.LOC);
  //       const retval = await APIDevice.FileUpload(form);
  //       if (retval != "0") {
  //         const end = await APIDevice.MobilePhotoUpdate(userInfo.idno, retval);
  //         if (end != null && end.UpdateMobileCardPhotoResult === "저장완료") {
  //           Alert.alert(
  //             "저장",
  //             "저장 되었습니다.",
  //             [
  //               {
  //                 text: "확인",
  //                 onPress: () => {
  //                   navigation.dispatch(CommonActions.reset({
  //                     index: 1,
  //                     routes: [
  //                       { name: 'Home' },
  //                       {
  //                         name: 'More',
  //                       },
  //                     ],
  //                   }));
  //                   navigation.goBack();
  //                 }
  //               }
  //             ],
  //             { cancelable: true }
  //           )
  //         }

  //         setPickImage(result.assets[0].uri);
  //         setModalVisible(!modalVisible);
  //       }
  //     }
  //   }
  //   catch {
  //     setModalVisible(!modalVisible);
  //   }
  // };

  // const setNoImage = async () => {
  //   Alert.alert(
  //     '확인',
  //     '기본 이미지를 사용 하시겠습니까?',
  //     [
  //       {
  //         text: '취소',
  //         onPress: () => {},
  //       },
  //       {
  //         text: '확인',
  //         onPress: async () => {
  //           const retval = await APIDevice.MobilePhotoDelete(userInfo.idno, '');
  //           if (
  //             retval != null &&
  //             retval.DeleteMobileCardPhotoResult === '삭제 되었습니다.'
  //           ) {
  //             setPickImage(Config.MobileCard.blankImage);
  //             setModalVisible(!modalVisible);
  //           } else {
  //             setModalVisible(!modalVisible);
  //           }
  //         },
  //       },
  //     ],
  //     {cancelable: true},
  //   );
  // };

  return (
    <View>
      <View style={{borderRadius: 100, overflow: 'hidden'}}>
        <Image
          style={{
            width: 80,
            height: 90,
            resizeMode: 'stretch',
          }}
          source={{uri: (pickImage ? pickImage : Config.MobileCard.blankImage)}}
        />
      </View>
      {/* <TouchableOpacity
        style={styles.edit}
        activeOpacity={1}
        onPress={() => {
          onSelectOption();
        }}>
        <FontAwesome name="pencil" size={18} style={{color: '#000'}} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => activeCamera()}>
              <Text style={styles.textStyle}>사진 촬영</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => getPhotos()}>
              <Text style={styles.textStyle}>앨범에서 사진 선택</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setNoImage()}>
              <Text style={styles.textStyle}>기본 이미지로 변경</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default UserPicture;

const styles = StyleSheet.create({
  edit: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 28,
    backgroundColor: '#fff',
    right: 0,
    bottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    padding: 20,
  },
  textStyle: {
    fontSize: 15,
  },
});
