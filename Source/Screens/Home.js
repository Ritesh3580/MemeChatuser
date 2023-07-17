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
import React, {Component, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
// import { Searchbar } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Assetst/Constants/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SliderBox} from 'react-native-image-slider-box';
// import Discover from '../Screens/Discover';
// import NearBy from '../Screens/Nearby';
import {baseurl, localBaseurl} from '../config/baseurl';
import {storage} from '../store/MMKV';
import {zego_config} from '../config/ZegoConfig';
import {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useZIM} from '../hooks/zim';
import Modal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';
import messaging from '@react-native-firebase/messaging';
// import Calling from '../ReusableComponent/Calling';

//import { ScrollView } from 'react-native-gesture-handler';

const findAllHost = baseurl + 'findHostuser';

const ScrollBanner = [
  require('../Assetst/Images/ScrollBanner.png'),
  require('../Assetst/Images/banner.jpg'),
];

export default function Home(props) {
  const [data, setData] = useState([]);
  const [banner, setBanner] = useState([]);
  const [blockedHostId, setBlockedHostId] = useState([]);
  const [userData, setUserData] = useState(null);
  const [myModal, setMyModal] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const appData = props.route.params.appData;
  const isFocused = useIsFocused();

  const [{callID}, zimAction] = useZIM();

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     if (remoteMessage?.notification?.body == "offline" || remoteMessage?.notification?.body == "Online") {
  //       userProfile();
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    zimAction.initEvent();
    zimAction
      .login({userID: appData?.user?.userId, userName: appData?.user?.fullName})
      .then(() => {
        console.log('ZIM LOGIN SUCCESS');
        zimAction.updateUserInfo(
          appData?.user?.fullName,
          appData?.user?.imageUrl,
        );
      });
    console.log('props==?', props);
    if (props.route.params.roomID) {
      handleIncomingCall(props.route.params.roomID);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      userProfile();
    }
  }, [isFocused]);

  const toggleMyMobile = () => {
    setMyModal(!myModal);
  };

  function handleIncomingCall(roomID) {
    jumpToCallPage(roomID);
    console.log('Handle incoming call with room id: ', roomID);
  }

  async function userProfile() {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    let bannerArr = [];
    let randomPromise = Promise.resolve(200);
    let user_URL = localBaseurl + 'showProfile';
    let host_user_URL = localBaseurl + 'findHostuser';
    let banner_URL = localBaseurl + 'userfindBanner';
    axios
      .all([
        axios.get(user_URL, {headers: {Authorization: `Bearer ${token}`}}),
        axios.get(host_user_URL, {headers: {Authorization: `Bearer ${token}`}}),
        axios.get(banner_URL, {headers: {Authorization: `Bearer ${token}`}}),
        randomPromise,
      ])
      .then(responses => {
        // console.log("ok1");
        let HostArr = [];
        setUserData(responses[0].data);
        // setData(responses[1].data);
        storage.set('AllHost', JSON.stringify(responses[1].data));
        responses[2].data.findBanner.map(item => {
          bannerArr.push(item.imageUrl);
        });
        setBanner(bannerArr);
        responses[0].data.block?.map(item => HostArr.push(item._id));
        if (HostArr.length > 0) {
          HostArr.map(item => {
            const filter = responses[1].data.filter(
              _item => item !== _item._id,
            );
            setData(filter);
          });
        } else {
          setData(responses[1].data);
        }
      })
      .catch(err => {
        console.log('axios all promise error---->>>>', err);
        SimpleToast.show('Something error occured!', SimpleToast.LONG);
      });
  }

  async function startCall(targetUser) {
    const token = await AsyncStorage.getItem('token');
    if (!targetUser) {
      console.warn('Invalid user id');
      alert('Invalid target user');
      return;
    }
    let randomPromise = Promise.resolve(200);

    axios
      .all([
        axios.get(baseurl + 'showProfile', {
          headers: {Authorization: `Bearer ${token}`},
        }),
        axios.get(baseurl + 'getOneUserProfile/' + targetUser.userId, {
          headers: {Authorization: `Bearer ${token}`},
        }),
        randomPromise,
      ])
      .then(responses => {
        if (
          responses[0]?.data?.total_coins <
          responses[1]?.data?.getuser?.hostuser_fees
        ) {
          console.log('insufficient coin');
          toggleMyMobile();
          return;
        }
        //console.log(baseurl + 'showProfile')
        // setIsCalling(true);
        // alert('calling');
        sendCallInvite({
          roomID: appData.user.userId,
          user: appData.user,
          targetUserID: targetUser.userId,
        });
        jumpToCallPage(appData?.user?.userId);
      })
      .catch(err => {
        SimpleToast.show('Server down!');
        console.log('get user during video call-->', err);
      });
  }

  async function sendCallInvite(data) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        targetUserID: data.targetUserID,
        callerUserID: data.user?.userId,
        callerUserName: data.user?.fullName,
        callerIconUrl: 'user_image',
        roomID: data.roomID,
        callType: 'Video', // TODO For test only
        role: '1',
      }),
    };
    // console.log(requestOptions.body);
    const reps = await fetch(
      `${zego_config.serverUrl}/call_invite`,
      requestOptions,
    );
    console.log('Send call invite reps: ', reps);
  }

  async function jumpToCallPage(roomID) {
    props.navigation.navigate('CallPage', {
      appData: appData,
      roomID: roomID,
    });
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#b15eff',
            alignItems: 'center',
           
          }}>
          <TouchableOpacity
            style={{
              width: wp('25%'),
              height: hp('4%'),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginLeft: 10,
              // backgroundColor:'pink'
            }}
            onPress={() => props.navigation.navigate('TopWeekly')}>
           
            <FontAwesome5Icon
              name="crown"
              size={hp('2.5%')}
              style={{color: Colors.yellow}}
            />

            <Text
              style={{
                color: 'white',
                fontSize: wp('4%'),
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              Trending
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: wp('50%'),
              height: hp('4%'),
              flexDirection: 'row',
              alignItems: 'center',
              //  paddingHorizontal: wp('4%'),
              //  justifyContent: 'space-between',
              //backgroundColor:'pink'
            }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('SearchPerson', {
                  host: data,
                  appData: appData,
                  roomID: props.route?.params?.roomID,
                })
              }
              style={{
                backgroundColor: 'white',
                width: wp('40%'),
                height: hp('2.8%'),
                borderRadius: 20,
               // justifyContent: 'center',
                justifyContent:'space-between',
                flexDirection:'row',
                alignItems:'center',
                // padding:1
              }}>
                 <Text style={{color:'black', marginLeft:7, fontSize:12}}>search....</Text>
              <FontAwesome5Icon
                name="search"
                size={hp('1.9%')}
                style={{
                  color: Colors.black,
                //  alignSelf: 'flex-end',
                  marginRight: 5,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Messages1')}>
              <FontAwesome5Icon
                name="bell"
                size={hp('2.5%')}
                style={{color: Colors.white, marginLeft: wp('2%')}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('15%'),
            alignSelf: 'center',
            //marginTop: hp('0.5%'),
            // alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: 'green',
            // borderWidth: 1,
            // borderColor: Colors.gray
          }}>
          {banner?.length === 0 ? (
            <>
              <Text
                style={{
                  color: Colors.gray,
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                No image available!
              </Text>
            </>
          ) : (
            <SliderBox
              style={styles.imgSlider}
              images={banner}
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
              resizeMode="stretch"
            />
          )}
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          data={data}
          numColumns={2}
          contentContainerStyle={{paddingBottom: 100}}
          renderItem={({item, index}) => {
            // if (blockedHostId.includes(item._id)) {
            //   return null;
            // }
            return (
              <View
                style={{
                  width: wp('50%'),
                  height: hp('30.5%'),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  paddingHorizontal: wp('0.8%'),
                  // backgroundColor:'red'
                }}>
                <TouchableOpacity
                  style={{
                    width: wp('49%'),
                    height: hp('29.8%'),
                    justifyContent: 'center',
                    borderRadius: hp('2%'),
                    borderWidth: 1,
                    //borderColor: '#b15eff',
                    alignItems: 'center',
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
                  {item.userImage ? (
                    <ImageBackground
                      source={{uri: item.userImage}}
                      resizeMode="cover"
                      style={{width: wp('49%'), height: hp('29.8%')}}
                      imageStyle={{
                        borderRadius: hp('2%'),
                        borderWidth: 1,
                        //borderColor: '#b15eff',
                        backgroundColor:'gray'
                      }}>
                      {item.acctiveStatus == 'online' ? (
                        <View
                          style={{
                            width: wp('42%'),
                            height: hp('5%'),
                            justifyContent: 'center',
                            padding: wp('2%'),
                            // backgroundColor:'red'
                          }}>
                          <TouchableOpacity
                            style={{
                              width: wp('10%'),
                              height: hp('2%'),
                              backgroundColor: Colors.green2,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: hp('1.5%'),
                              position: 'absolute',
                            }}>
                            {/* {
                                item.acctiveStatus == "offline" &&
                                console.log("active status ...........",item.acctiveStatus)
                              } */}
                            <Text
                              style={{
                                fontSize: hp('1%'),
                                color: Colors.white,
                                textTransform: 'capitalize',
                              }}>
                              {item.acctiveStatus}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View
                          style={{
                            width: wp('42%'),
                            height: hp('5%'),
                            justifyContent: 'center',
                            padding: wp('2%'),
                            // backgroundColor:'red'
                          }}>
                          <TouchableOpacity
                            style={{
                              width: wp('10%'),
                              height: hp('2%'),
                              // backgroundColor: Colors.green2,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: hp('1.5%'),
                              position: 'absolute',
                            }}>
                            {/* {
                              item.acctiveStatus == "offline" &&
                              console.log("active status ...........",item.acctiveStatus)
                            } */}
                            <Text
                              style={{
                                fontSize: hp('1%'),
                                color: Colors.white,
                                textTransform: 'capitalize',
                              }}>
                              {/* {item.acctiveStatus} */}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      <View
                        style={{
                          width: wp('45%'),
                          height: hp('6%'),
                          marginTop: hp('16%'),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // backgroundColor:'purple',
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
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: hp('2%'),
                                fontWeight: 'bold',
                                color: Colors.black,
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
                          <TouchableOpacity style={{flexDirection: 'row'}}>
                            <Ionicons
                              name="md-location-sharp"
                              size={hp('2%')}
                              style={{color: '#ffff'}}
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
                            onPress={async () => {
                              // await setTargetUser(item);
                              await AsyncStorage.setItem(
                                'targetUser',
                                JSON.stringify(item),
                              );
                              await startCall(item);
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
                              style={{color: '#b15eff'}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      source={{uri: item.userImage}}
                      resizeMode="cover"
                      style={{width: wp('49%'), height: hp('24.8%')}}
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
                        {/* <TouchableOpacity
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
                        </TouchableOpacity> */}
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
                          <View style={{flexDirection: 'row'}}>
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
                          <TouchableOpacity style={{flexDirection: 'row'}}>
                            <Ionicons
                              name="md-location-sharp"
                              size={hp('2%')}
                              style={{color: '#ffff'}}
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
                            onPress={async () => {
                              await AsyncStorage.setItem(
                                'targetUser',
                                JSON.stringify(item),
                              );
                              await startCall(item);
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
                              style={{color: '#b15eff'}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                  )}
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View style={{bottom: 0}}>
          <Modal
            isVisible={myModal}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            // animationOutTiming={500}
            // animationInTiming={500}
            hideModalContentWhileAnimating={true}
            useNativeDriverForBackdrop={true}
            onBackdropPress={() => setMyModal(false)}
            onSwipeComplete={() => setMyModal(false)}
            swipeDirection={['down']}
            avoidKeyboard={true}
            useNativeDriver={true}
            style={{
              width: wp('100%'),
              alignSelf: 'center',
              height: hp('100%'),
            }}>
            <View
              style={{
                width: wp('65%'),
                height: hp('45%'),
                backgroundColor: 'white',
                borderRadius: hp('1.8%'),
                alignSelf: 'center',
              }}>
              <View
                style={{
                  width: wp('60%'),
                  height: hp('4%'),
                  alignSelf: 'center',
                  alignItems: 'flex-end',
                  marginTop: hp('0.5%'),
                }}>
                <TouchableOpacity
                  onPress={() => setMyModal(false)}
                  style={{
                    width: wp('8%'),
                    height: hp('4%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo
                    name="circle-with-cross"
                    size={hp('3.6%')}
                    color="#949894"
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 45,
                  alignSelf: 'center',
                  marginTop: '0.5%',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  overflow: 'hidden',
                  elevation: 9,
                  backgroundColor: '#fff',
                }}>
                <Image
                  source={{uri: userData?.imageUrl}}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
              <Text
                style={{
                  color: '#949894',
                  fontWeight: 'bold',
                  fontSize: hp('2.2%'),
                  marginTop: hp('1.5%'),
                  textAlign: 'center',
                }}>
                Your Balance
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  // width: wp('18%'),
                  height: hp('5%'),
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <Image
                  source={require('../Assetst/Images/coins.png')}
                  style={{width: hp('2.8%'), height: hp('2.8%')}}
                />
                <Text
                  style={{
                    fontSize: hp('2%'),
                    color: '#FDBF00',
                    fontWeight: 'bold',
                    marginLeft: wp('1%'),
                  }}>
                  {userData?.total_coins} coins
                </Text>
              </View>

              <Text
                style={{
                  color: '#949894',
                  fontWeight: 'bold',
                  fontSize: hp('1.5%'),
                  marginTop: hp('1%'),
                  textAlign: 'center',
                  // marginHorizontal:10
                }}>
                For Safe private calls,you will be charged
              </Text>
              <Text
                style={{
                  color: '#949894',
                  fontWeight: 'bold',
                  fontSize: hp('1.5%'),
                  textAlign: 'center',
                  // marginHorizontal:10
                }}>
                {userData?.hostuser_fees} coins per minute
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('MyWallet', userData)}
                style={{
                  height: hp('5%'),
                  width: wp('45%'),
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: hp('3%'),
                  alignSelf: 'center',
                  borderColor: '#b15eff',
                  marginTop: hp('2%'),

                  borderWidth: hp('0.2%'),
                }}>
                <Text
                  style={{
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  Get coins
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        {/* <View>
          <Modal
            isVisible={isCalling}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            // animationOutTiming={500}
            // animationInTiming={500}
            hideModalContentWhileAnimating={true}
            useNativeDriverForBackdrop={true}
            onBackdropPress={() => setMyModal(false)}
            onSwipeComplete={() => setMyModal(false)}
            swipeDirection={['down']}
            avoidKeyboard={true}
            useNativeDriver={true}
            style={{
              width: wp('100%'),
              alignSelf: 'center',
              height: hp('100%'),
              alignItems: 'center'
            }}>
            <View style={{ height: 60, width: '80%', borderRadius: 4, flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', justifyContent:'space-between',paddingHorizontal:20 }}>
              <Feather name='phone-call' color={'blue'} size={24} />
              <Text style={{ color: '#000',fontWeight:'600' }}>Calling...</Text>
              <MaterialIcons name='call-end' color={'red'} size={30} />
            </View>
          </Modal>
        </View> */}
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
    width: wp('100%'),
    height: wp('30%'),
    //alignSelf: 'center',
    // justifyContent: 'center',
  },
});
