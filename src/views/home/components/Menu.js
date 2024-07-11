import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity, Linking, ScrollView, Dimensions, Platform, Image } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { Config } from '../../../service';
import { getUser } from '../../../store'

const MenuItem = (props) => {
  const { id, link, style, navigation, title, login } = props.item;
  const userInfo = props.userInfo;
  const nav = useNavigation();

  const handleNavigation = (route) => {
    if (link['url']) {
      Linking.openURL(link['url']);
    } else {
      if (login && !userInfo) {
        nav.navigate('Login');
      }
      else {
        nav.navigate(route, {
          title: title,
          param: navigation.param,
          relationship: navigation.relationship
        });
      }
    }
  }

  return (
    <View
      style={[
        id > 8 ? styles.item2 : styles.item,
        { backgroundColor: style.box.backgroundColor },
      ]}>
      <TouchableOpacity onPress={() => handleNavigation(navigation.navigate)} style={styles.touch}>
        {style.icon.type === "AntDesign" &&
          <AntDesign
            name={style.icon.name}
            size={style.icon.fontSize}
            color={style.icon.color}
          />
        }
        {style.icon.type === "MaterialCommunityIcons" &&
          <MaterialCommunityIcons
            name={style.icon.name}
            size={style.icon.fontSize}
            color={style.icon.color}
          />
        }
        {style.icon.type === "Entypo" &&
          <Entypo
            name={style.icon.name}
            size={style.icon.fontSize}
            color={style.icon.color}
          />
        }
        {style.icon.type === "FontAwesome" &&
          <FontAwesome
            name={style.icon.name}
            size={style.icon.fontSize}
            color={style.icon.color}
          />
        }
        {
          style.icon.type === "Feather" &&
          <Feather
            name={style.icon.name}
            size={style.icon.fontSize}
            color={style.icon.color}
          />
        }
        <Text
          style={{
            color: style.title.color,
            marginTop: 3
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Menu = () => {
  const [config, setConfig] = useState(null);
  const nav = useNavigation();
  const userInfo = getUser();
  
  const fetchData = async () => {
    await fetch(Config.APP_CONFIG_URL)
        .then((res) => res.json())
        .then((data) => setConfig(data));
  }

  useEffect(() => {
    fetchData();
    return () => {
    }
  }, []);

  return (
    <ScrollView style={styles.root} bounces={false}>
      <View style={styles.container}>
        {config && config.quick[0].items.length > 0 &&
          config.quick[0].items.map((item, index) => (
            <MenuItem key={index.toString()} item={item} userInfo={userInfo} />
          ))
        }
      </View>
    </ScrollView>
  )
}

export default Menu;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center", // if you want to fill rows left to right
    justifyContent: "center",
    alignContent: "center",
    //height: 550,
    height: Dimensions.get("window").height * 0.5,
  },
  touch: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '30%', // is 50% of container width
    backgroundColor: 'red',
    height: Dimensions.get("window").height * 0.14,
    margin: 5,
    borderRadius: 5,
  },
  item2: {
    width: '46%', // is 50% of container width
    backgroundColor: 'red',
    height: Dimensions.get("window").height * 0.14,
    margin: 5,
    borderRadius: 5,
  }
});