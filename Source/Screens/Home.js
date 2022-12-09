import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, { Component, useEffect } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assetst/Constants/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SliderBox } from 'react-native-image-slider-box';
import Discover from '../Screens/Discover';
import NearBy from '../Screens/Nearby';
import { baseurl, localBaseurl } from '../config/baseurl';
import { storage } from '../store/MMKV';
import { zego_config } from '../config/ZegoConfig';
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useZIM } from '../hooks/zim';
//import { ScrollView } from 'react-native-gesture-handler';

const findAllHost = baseurl + 'findHostuser';

const ScrollBanner = [
  require('../Assetst/Images/ScrollBanner.png'),
  require('../Assetst/Images/banner.jpg'),
];

export default function Home(props) {

  const [data, setData] = useState([]);
  const appData = props.route.params.appData;
  const isFocused = useIsFocused();

  const [{ callID }, zimAction] = useZIM();


  if (props.route.params.roomID) {
    handleIncomingCall(props.route.params.roomID);
  };

  useEffect(()=>{
    zimAction.initEvent();
    zimAction.login({ userID: appData?.user?.userId, userName: appData?.user?.fullName }).then(() => {
      // navigation.push('Home');
      console.log("ZIM LOGIN SUCCESS");
      zimAction.updateUserInfo(appData?.user?.fullName,appData?.user?.imageUrl);
      // zimAction.queryUsersInfo(['69899928']);
    })
  },[]);

  useEffect(() => {
    if (isFocused) {
      userProfile();
    }
  }, [isFocused]);

  function handleIncomingCall(roomID) {
    jumpToCallPage(roomID);
    console.log('Handle incoming call with room id: ', roomID);
  };

  async function userProfile() {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    axios
      .get(localBaseurl + 'findHostuser', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async res => {
        // console.log("ALL USERS---->>>>>>", res.data);
        setData(res.data)
        storage.set('AllHost', JSON.stringify(res.data));
      })
      .catch(err => {
        console.log('All user error---->>>>', err);
      });
  };

  function startCall(targetUserID) {
    if (targetUserID == '') {
      console.warn('Invalid user id');
      return;
    }
    // TODO the caller use he/her own user id to join room, for test only
    jumpToCallPage(appData?.user?.userId);
    sendCallInvite({
      roomID: appData?.user?.userId,
      user: appData.user,
      targetUserID: targetUserID,
    });
  };

  async function sendCallInvite(data) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetUserID: data.targetUserID,
        callerUserID: data.user?.userId,
        callerUserName: data.user?.fullName,
        callerIconUrl: 'user_image',
        roomID: data.roomID,
        callType: 'Video', // TODO For test only
        role: 1
      }),
    };
    // console.log(requestOptions.body);
    const reps = await fetch(
      `${zego_config.serverUrl}/call_invite`,
      requestOptions,
    );
    console.log('Send call invite reps: ', reps);
  };

  function jumpToCallPage(roomID) {
    props.navigation.navigate('CallPage', {
      appData: appData,
      roomID: roomID,
    });
  };


  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View
          style={{
            width: wp('96%'),
            height: hp('4.5%'),
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            //backgroundColor:'green'
          }}>
          <TouchableOpacity
            style={{
              width: wp('10%'),
              height: hp('4%'),
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor:'pink'
            }}
            onPress={() => props.navigation.navigate('TopWeekly')}>
            <FontAwesome5Icon
              name="crown"
              size={hp('2%')}
              style={{ color: Colors.yellow }}
            />
          </TouchableOpacity>
          <View
            style={{
              width: wp('20%'),
              height: hp('4%'),
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: wp('4%'),
              justifyContent: 'space-between',
              //backgroundColor:'pink'
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Messages1')}>
              <FontAwesome5Icon
                name="bell"
                size={hp('2.2%')}
                style={{ color: Colors.black }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SearchPerson')}>
              <FontAwesome5Icon
                name="search"
                size={hp('2.5%')}
                style={{ color: Colors.black }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              width: wp('100%'),
              height: hp('10%'),
              alignSelf: 'center',
              //marginTop: hp('0.5%'),
              // alignItems: 'center',
              justifyContent: 'center',
              //backgroundColor: 'green',
            }}>
            <SliderBox
              style={styles.imgSlider}
              images={ScrollBanner}
              autoplay={true}
              autoPlayWithInterval={500}
              circleLoop={true}
              //inactiveDotColor={false}
              inactiveDotColor="#90A4AE"
              dotStyle={{
                width: 10,
                height: 9,
                borderRadius: 10,
              }}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            data={data}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  width: wp('50%'),
                  height: hp('30.5%'),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  paddingHorizontal: wp('0.8%'),
                  // marginTop: hp('1%'),
                  //backgroundColor:'skyblue',
                  //marginHorizontal:2
                }}>
                <TouchableOpacity
                  style={{
                    width: wp('49%'),
                    height: hp('29.8%'),
                    //backgroundColor: Colors.lightGray,
                    justifyContent: 'center',
                    borderRadius: hp('2%'),
                    borderWidth: 2,
                    alignItems: 'center',
                    //paddingHorizontal:wp('1%')
                    // paddingLeft:2
                    marginTop: hp('1%'),
                  }}
                  onPress={() => {
                    let navData = {
                      appData: appData,
                      roomID: props.route?.params?.roomID,
                      user: item,
                    };
                    props.navigation.navigate('ProfileDetails', navData);
                  }}>
                  {item.imageUrl ? (
                    <ImageBackground
                      source={{ uri: item.imageUrl }}
                      resizeMode="cover"
                      style={{ width: wp('49%'), height: hp('29.8%') }}
                      imageStyle={{
                        borderRadius: hp('2%'),
                        borderWidth: 1,
                        borderColor: '#b15eff',
                      }}>
                      <View
                        style={{
                          width: wp('42%'),
                          height: hp('5%'),
                          justifyContent: 'center',
                          padding: wp('2%'),
                        }}>
                        <TouchableOpacity
                          style={{
                            width: wp('10%'),
                            height: hp('2%'),
                            backgroundColor: Colors.green2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: hp('1.5%'),
                          }}>
                          <Text
                            style={{
                              fontSize: hp('1%'),
                              color: Colors.white,
                            }}>
                            online
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: wp('45%'),
                          height: hp('6%'),
                          marginTop: hp('18%'),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          //backgroundColor:'purple',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            width: wp('25%'),
                            height: hp('6%'),
                            //alignItems: 'center',
                            justifyContent: 'center',
                            //backgroundColor:'skyblue',
                            paddingLeft: 10,
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontSize: hp('2%'),
                                fontWeight: 'bold',
                                color: Colors.black,
                                //alignItems:'center'
                              }}>
                              {item.fullName}
                            </Text>
                            {/* <Text
                                style={{
                                  fontSize: hp('1.5%'),
                                  color: Colors.white,
                                }}>
                                30
                              </Text> */}
                          </View>
                          <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Ionicons
                              name="md-location-sharp"
                              size={hp('2%')}
                              style={{ color: '#ffff' }}
                            />
                            <Text
                              style={{
                                fontSize: hp('1.5%'),
                                marginLeft: wp('1%'),
                                fontWeight: 'bold',
                                color: Colors.black,
                              }}>
                              {item.city}
                              {/* noida */}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            width: wp('17%'),
                            height: hp('6%'),
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              startCall(item.userId);
                            }}
                            style={{
                              width: hp('5%'),
                              height: hp('5%'),
                              borderRadius: hp('5%'),
                              backgroundColor: Colors.white,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Ionicons
                              name="videocam-outline"
                              solid
                              size={hp('3%')}
                              style={{ color: '#b15eff' }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      source={{ uri: item.imageUrl }}
                      resizeMode="cover"
                      style={{ width: wp('49%'), height: hp('29.8%') }}
                      imageStyle={{
                        borderRadius: hp('2%'),
                        borderWidth: 1,
                        borderColor: '#b15eff',
                      }}>
                      <View
                        style={{
                          width: wp('42%'),
                          height: hp('5%'),
                          justifyContent: 'center',
                          padding: wp('2%'),
                        }}>
                        <TouchableOpacity
                          style={{
                            width: wp('10%'),
                            height: hp('2%'),
                            backgroundColor: Colors.green2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: hp('1.5%'),
                          }}>
                          <Text
                            style={{
                              fontSize: hp('1%'),
                              color: Colors.white,
                            }}>
                            online
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: wp('45%'),
                          height: hp('6%'),
                          marginTop: hp('18%'),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          //backgroundColor:'purple',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            width: wp('25%'),
                            height: hp('6%'),
                            //alignItems: 'center',
                            justifyContent: 'center',
                            //backgroundColor:'skyblue',
                            paddingLeft: 10,
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontSize: hp('2%'),
                                fontWeight: 'bold',
                                color: '#eb4034',
                                //alignItems:'center'
                              }}>
                              {item.FirstName}
                            </Text>
                            {/* <Text
                                style={{
                                  fontSize: hp('1.5%'),
                                  color: Colors.white,
                                }}>
                                30
                              </Text> */}
                          </View>
                          <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Ionicons
                              name="md-location-sharp"
                              size={hp('2%')}
                              style={{ color: '#ffff' }}
                            />
                            <Text
                              style={{
                                fontSize: hp('1.5%'),
                                marginLeft: wp('1%'),
                                fontWeight: 'bold',
                                color: Colors.black,
                              }}>
                              {item.city}
                              {/* noida */}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            width: wp('17%'),
                            height: hp('6%'),
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              startCall(item.userId);
                            }}
                            style={{
                              width: hp('5%'),
                              height: hp('5%'),
                              borderRadius: hp('5%'),
                              backgroundColor: Colors.white,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Ionicons
                              name="videocam-outline"
                              solid
                              size={hp('3%')}
                              style={{ color: '#b15eff' }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  head: {
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#b15eff',
    flexDirection: 'row',
  },
  imgSlider: {
    width: wp('98%'),
    height: wp('19%'),
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
