import React, { useState, useEffect } from 'react';
import { LogBox, TouchableOpacity, View, Image, TextInput, StyleSheet, Dimensions, Alert, Text, Platform } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WithLocalSvg } from 'react-native-svg';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import GlobalAlert from './components/GlobalAlert';
import GloabalSnackBar from './components/GlobalSnackBar';
import { getUser } from '../store'

import Home from './home';
import Login from './login';
import More from './more';
import Settings from './settings';


import AutoLoginSet from './settings/autoLoginset';
import AlarmSet from './settings/alarmset';
import McardSet from './settings/mcardset';
import BeaconSet from './settings/beaconSet';


import MCard from './mcard';


LogBox.ignoreLogs([
  'Sending',
  'new NativeEventEmitter',
]);

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const MainTabs = (props) => {
  const userInfo = getUser();
  return (
    <BottomTab.Navigator
      initialRouteName="MCard"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarButton: [
          "NewBooks",
          "Board",
          "Guide",
          "External",
          "Request",
          "MyLibrary"
        ].includes(route.name)
          ? () => {
            return null;
          }
          : undefined,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 100 : 80,
          backgroundColor: 'rgba(252, 249, 252, 1)',
          borderTopWidth: 0
        }
      })}>
      <BottomTab.Screen
        name={"MCard"}
        component={userInfo ? MCard : Login}
        options={({ navigation }) => ({
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 100 : 80,
            display: userInfo ? 'flex' : 'none'
          },
          headerTitle: '모바일 회원증',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name={'idcard'} size={40} color="#15508e" />
                <Text style={{ color: '#15508e' }}>학생증</Text>
              </View>
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name={'idcard'} size={40} color="#000" />
                <Text style={{ color: '#000' }}>학생증</Text>
              </View>
            ),
        })}
      />
      <BottomTab.Screen
        name={"More"}
        component={userInfo ? More : Login}
        options={({ navigation }) => ({
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 100 : 80,
            display: userInfo ? 'flex' : 'none'
          },
          headerTitle: '설정',
          headerLeft: () => (
            <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={29} color="black" />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) =>
          focused ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name={'sliders'} size={40} color="#15508e" />
              <Text style={{color: '#15508e'}}>설정</Text>
            </View>
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name={'sliders'} size={40} color="#000" />
              <Text style={{color: '#000'}}>설정</Text>
            </View>
          ),
          tabBarBadge: undefined
        })}
      />
    </BottomTab.Navigator>
  )
}

const MainNavigator = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <Stack.Navigator initialRouteName={"MainTab"}>
      <Stack.Screen
        name="MainTab"
        component={MainTabs}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: '로그인', headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({ navigation }) => ({
          headerTitle: '환경설정', headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate("Search")}>
              <MaterialCommunityIcons name="magnify" size={32} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="autoLoginset"
        component={AutoLoginSet}
        options={({ navigation }) => ({
          title: '자동 로그인',
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate("Search")}>
              <MaterialCommunityIcons name="magnify" size={32} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="alarmset"
        component={AlarmSet}
        options={({ navigation }) => ({
          title: '알림 설정',
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate("Search")}>
              <MaterialCommunityIcons name="magnify" size={32} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="mcardset"
        component={McardSet}
        options={({ navigation }) => ({
          title: '대출증 설정',
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate("Search")}>
              <MaterialCommunityIcons name="magnify" size={32} color="black" />
            </TouchableOpacity>
          ),
        })}
      />

    </Stack.Navigator>
  )
}

export default Navigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      <GlobalAlert />
      <GloabalSnackBar />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get('screen').width / 1.45,
    height: 30,
    borderWidth: 1,
    marginRight: 3,
    borderRadius: 20,
    paddingHorizontal: 10,
    padding: 0,
    color: '#424242'
  },
  headerRight: {
    marginTop: 0,
    marginRight: 7
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
    padding: 5
    //borderWidth: 1
  }
})