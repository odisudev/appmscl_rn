import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { getUser } from '../../../store';
import { Config, APILogin } from "../../../service";

const UserPicture = () => {
  const userInfo = getUser();
  const [pickImage, setPickImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUserPicture = async () => {
    const items = await APILogin.GetUserPicture(userInfo.idno);
    if (items != null) {
      setPickImage(items.data != "" ? `data:image/png;base64,${items.data}` : Config.MobileCard.blankImage);
    }
    else {
      setPickImage(Config.MobileCard.blankImage);
    }
    setIsLoading(true);
  };

  useEffect(() => {
    getUserPicture();
  }, [pickImage]);

  return (
    <View>
      {!isLoading && <View style={{ width: 128, height: 158, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator color="#aaa" size="small" /></View>}
      {isLoading &&
        <Image
          style={{
            width: 128,
            height: 150,
            resizeMode: "stretch"
          }}
          source={{ uri: pickImage }}
        />
      }
    </View>
  )
}

export default UserPicture;