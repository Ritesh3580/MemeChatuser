import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, { useEffect } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import messaging from '@react-native-firebase/messaging';


import Colors from '../Assetst/Constants/Colors';
import FaceProfile from '../ReusableComponent/FaceProfle';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const findAllHost = localBaseurl + 'findHostuser';
const findAllUser = localBaseurl + 'allfinduser';
import { baseurl, localBaseurl } from '../config/baseurl';
import { storage } from '../store/MMKV';
import { zego_config } from '../config/ZegoConfig';

const Discover = (props) => {

  const [data, setData] = React.useState([]);
  const appData = props.route?.params?.appData;

  console.log("DISCOVER APPDATA-------------------------->>>>>>>>>>>>>>>>>>>>",appData);

  useEffect(() => {
    userProfile();
    if (props.route?.params?.roomID) {
      console.log("OKKKK");
      handleIncomingCall(props.route.params.roomID);
    }
  }, []);

  // useEffect(() => {
  //   if (props.route?.params?.roomID) {
  //     console.log("OKKKK");
  //     handleIncomingCall(props.route.params.roomID);
  //   }
  // }, []);

  // console.log(props.route?.params);

  function handleIncomingCall(roomID) {
    console.log("roomID---->>>",roomID);
    jumpToCallPage(roomID);
    console.log("Handle incoming call with room id: ", roomID)
  };

  function jumpToCallPage(roomID) {
    // const appData_str = await AsyncStorage.getItem('appData');
    // const app_data = JSON.parse(appData_str);
    // console.log(newAppData);
    console.log("JUMP TO CALL PAGE appData------------->>>>>>>>>>",appData);
    props.navigation.navigate('CallPage', { appData: appData, roomID: roomID });
  }


  const userProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(findAllUser, { headers: { Authorization: `Bearer ${token}` } })
      .then(async res => {
        // console.log("ALL USERS---->>>>>>", res.data);
        setData(res.data);
        storage.set('AllUser', JSON.stringify(res.data));
      })
      .catch(err => {
        console.log("All user error---->>>>", err);
      });
  };

  function startCall(targetUserID) {
    if (targetUserID == '') {
      console.warn('Invalid user id');
      return;
    }
    // TODO the caller use he/her own user id to join room, for test only
    jumpToCallPage(appData.user.userId);
    sendCallInvite({roomID: appData.user.userId, user: appData.user,targetUserID: targetUserID});
  }

  async function sendCallInvite(data) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetUserID: data.targetUserID,
        callerUserID: data.user.userId,
        callerUserName: data.user.fullName,
        callerIconUrl: "user_image",
        roomID: data.roomID,
        callType: 'Video' // TODO For test only
      })
    };
    // console.log(requestOptions.body);
    const reps = await fetch(`${zego_config.serverUrl}/call_invite`, requestOptions);
    console.log('Send call invite reps: ', reps);
  }


  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={{ height: hp('63%') }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              data?.map((item, index) => (
                // <View
                // key={index}
                //   style={{
                //     width: wp('100%'),
                //     height: hp('30%'),
                //     alignSelf: 'center',
                //     flexDirection: 'row',
                //     justifyContent: 'space-between',
                //     alignItems: 'center',
                //     paddingHorizontal: wp('6%'),
                //     marginTop: hp('1%'),
                //   }}>
                <View
                  style={{
                    width: wp('50%'),
                    height: hp('30%'),
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: wp('6%'),
                    marginTop: hp('1%'),
                  }}>
                  <TouchableOpacity
                    style={{
                      width: wp('42%'),
                      height: hp('28%'),
                      backgroundColor: Colors.lightGray,
                      justifyContent: 'center',
                      borderRadius: hp('2%'),
                      borderWidth: 2,
                      alignItems: 'center',
                      marginTop: hp('0.5%'),
                    }}
                    onPress={() => props.navigation.navigate('ProfileDetails')}>
                    <ImageBackground
                      source={require('../Assetst/Images/Lady3.png')}
                      resizeMode="cover"
                      style={{ width: wp('42%'), height: hp('28%') }}
                      imageStyle={{
                        borderRadius: hp('2%'),
                        borderWidth: 2,
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
                          width: wp('42%'),
                          height: hp('7%'),
                          marginTop: hp('15%'),
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            width: wp('25%'),
                            height: hp('7%'),
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontSize: hp('1.5%'),
                                color: Colors.white,
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
                                color: Colors.white,
                              }}>
                              {/* {val.city} */}
                              noida
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            width: wp('17%'),
                            height: hp('7%'),
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              startCall(item.userId)
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
                  </TouchableOpacity>
                </View>
                // </View>
              ))
            }
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Discover;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('75%'),
  },
  head: {
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#b15eff',
    flexDirection: 'row',
  },
});

// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   StatusBar,
//   TouchableOpacity,
//   Image,
//   ImageBackground,
//   ScrollView,
// } from 'react-native';
// import React from 'react';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Searchbar} from 'react-native-paper';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import Colors from '../Assetst/Constants/Colors';
// import FaceProfile from '../ReusableComponent/FaceProfle';

// const Discover = props => {
//   return (
//     <SafeAreaView>
//       <StatusBar backgroundColor="#b15eff" />
//       <View style={styles.container}>
//         <View style={{height: hp('63%')}}>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View
//               style={{
//                 width: wp('100%'),
//                 height: hp('30%'),
//                 alignSelf: 'center',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 paddingHorizontal: wp('6%'),
//                 marginTop: hp('1%'),
//               }}>
//               <FaceProfile
//                 t1="Kolapur"
//                 t2="Samuel...,24"
//                 img={require('../Assetst/Images/Lady3.png')}
//                 vdocallBlur={() => props.navigation.navigate('ProfileDetails')}
//                 CallingScreen={() => props.navigation.navigate('HomePage')}
//               />
//               <FaceProfile
//                 t1="Kanpur"
//                 t2="Aastha...,23"
//                 img={require('../Assetst/Images/Lady4.png')}
//               />
//             </View>
//             <View
//               style={{
//                 width: wp('100%'),
//                 height: hp('30%'),
//                 alignSelf: 'center',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 paddingHorizontal: wp('6%'),
//                 marginTop: hp('1%'),
//               }}>
//               <FaceProfile
//                 t1="Kolkata"
//                 t2="Archana...,26"
//                 img={require('../Assetst/Images/Lady6.png')}
//               />
//               <FaceProfile
//                 t1="Mumbai"
//                 t2="Simran...,25"
//                 img={require('../Assetst/Images/Lady7.png')}
//               />
//             </View>
//             <View
//               style={{
//                 width: wp('100%'),
//                 height: hp('30%'),
//                 alignSelf: 'center',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 paddingHorizontal: wp('6%'),
//                 marginTop: hp('1%'),
//               }}>
//               <FaceProfile
//                 t1="Kolapur"
//                 t2="Samuel...,24"
//                 img={require('../Assetst/Images/Lady2.png')}
//               />
//               <FaceProfile
//                 t1="Kolapur"
//                 t2="Samuel...,24"
//                 img={require('../Assetst/Images/Lady1.png')}
//               />
//             </View>
//             <View
//               style={{
//                 width: wp('100%'),
//                 height: hp('30%'),
//                 alignSelf: 'center',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 paddingHorizontal: wp('6%'),
//                 marginTop: hp('1%'),
//               }}>
//               <FaceProfile
//                 t1="Kolapur"
//                 t2="Samuel...,24"
//                 img={require('../Assetst/Images/Lady2.png')}
//               />
//               <FaceProfile
//                 t1="Kolapur"
//                 t2="Samuel...,24"
//                 img={require('../Assetst/Images/Lady3.png')}
//               />
//             </View>
//             <View
//               style={{
//                 width: wp('100%'),
//                 height: hp('30%'),
//                 alignSelf: 'center',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 paddingHorizontal: wp('6%'),
//                 marginTop: hp('1%'),
//               }}>
//               <FaceProfile
//                 t1="Kolapur"
//                 t2="Samuel...,24"
//                 img={require('../Assetst/Images/Lady9.png')}
//               />
//               <FaceProfile
//                 t1="Kolapur"
//                 t2="Samuel...,24"
//                 img={require('../Assetst/Images/Lady10.png')}
//               />
//             </View>
//           </ScrollView>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Discover;
// const styles = StyleSheet.create({
//   container: {
//     width: wp('100%'),
//     height: hp('75%'),
//   },
//   head: {
//     width: wp('100%'),
//     height: hp('8%'),
//     backgroundColor: '#b15eff',
//     flexDirection: 'row',
//   },
// });
