import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Linking, Text } from 'react-native';
import { Config } from '../../../service';

const Banner = () => {
  const [config, setConfig] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(Config.APP_CONFIG_URL)
        .then((res) => res.json())
        .then((data) => setConfig(data));
    }

    fetchData();
  }, []);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      bounces={true}
      contentContainerStyle={styles.banner_scroll}>
      {
        config && config.banner.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                Linking.openURL(item.link.url);
              }}
              style={config.banner.length > index ? styles.banner_view : null}>

              <Text style={styles.banner_item}>{item.title}</Text>
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  );
};

export default Banner

const styles = StyleSheet.create({
  banner_scroll: {
    alignItems: 'center',
    backgroundColor: 'white'
  },
  banner_view: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    padding: 14
  },
  banner_item: {
    fontSize: 17
  }
});