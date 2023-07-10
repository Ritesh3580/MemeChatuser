import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
// import {Navigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {baseurl, localBaseurl} from '../config/baseurl';
// import { storage } from '../store/MMKV';
import {zego_config} from '../config/ZegoConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import Colors from '../Assetst/Constants/Colors';

const ProfileDetails = props => {
  const [myModal, setMyModal] = useState(false);
  const userData = props.route?.params;
  // console.log("userData---", userData);

  const toggleMyMobile = () => {
    setMyModal(!myModal);
  };

  const [myModal1, setMyModal1] = useState(false);

  const toggleMyMobile1 = () => {
    setMyModal1(!myModal1);
  };
  const [myModal2, setMyModal2] = useState(false);

  const toggleMyMobile2 = () => {
    setMyModal2(!myModal2);
    setMyModal1(false);
  };

  async function startCall(targetUser) {
    const token = await AsyncStorage.getItem('token');
    if (targetUser?.userId == '') {
      console.warn('Invalid user id');
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
        jumpToCallPage(userData.appData.user.userId);
        sendCallInvite({
          roomID: responses[0]?.data?.userId,
          user: responses[0].data,
          targetUserID: targetUser.userId,
        });
      })
      .catch(err => {
        SimpleToast.show('Server down!');
        console.log('get user during video call-->', err.response.data);
      });
  }

  // const startCall = (targetUser) => {
  //   if (targetUser?.userId == '') {
  //     console.warn('Invalid user id');
  //     return;
  //   }
  //   // console.log(targetUser);
  //   if(userData.appData?.user?.total_coins < targetUser.hostuser_fees){
  //     toggleMyMobile();
  //     return;
  //   }
  //   // TODO the caller use he/her own user id to join room, for test only
  //   jumpToCallPage(userData.appData.user.userId);
  //   sendCallInvite({
  //     roomID: userData.appData.user.userId,
  //     user: userData.appData.user,
  //     targetUserID: targetUser.userId
  //   });
  // };

  const sendCallInvite = data => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        targetUserID: data.targetUserID,
        callerUserID: data.user.userId,
        callerUserName: data.user.fullName,
        callerIconUrl: 'user_image',
        roomID: data.roomID,
        callType: 'Video', // TODO For test only
        role: '1',
      }),
    };
    // console.log(requestOptions.body);
    const reps = fetch(`${zego_config.serverUrl}/call_invite`, requestOptions);
    console.log('Send call invite reps: ', reps);
  };
  const jumpToCallPage = roomID => {
    // const appData_str = await AsyncStorage.getItem('appData');
    // const app_data = JSON.parse(appData_str);
    // console.log(newAppData);
    // console.log("JUMP TO CALL PAGE appData------------->>>>>>>>>>",userData.appData);
    props.navigation.navigate('CallPage', {
      appData: userData.appData,
      roomID: roomID,
    });
  };

  const _openChatRoom = async () => {
    let navData = {
      userData: userData,
      type: 0,
      id: userData.user.userId,
      name: userData.user.fullName,
    };
    props.navigation.navigate('ChatRoom', navData);
  };

  const _block = async () => {
    const token = await AsyncStorage.getItem('token');

    axios
      .put(
        baseurl + 'userblockbyhostUser',
        {block: userData.user._id},
        {headers: {Authorization: `Bearer ${token}`}},
      )
      .then(resp => {
        toggleMyMobile1(false);
        toggleMyMobile2();
        SimpleToast.show('blocked');
        console.log('block-->>', resp.data);
      })
      .catch(err => {
        toggleMyMobile1(false);
        toggleMyMobile2();
        SimpleToast.show('something went wrong!');
        console.log('block-->>', err?.response?.data);
      });
  };

  const submit_Follow = async host => {
    SimpleToast.show('Please wait...');
    console.log('following....');
    const token = await AsyncStorage.getItem('token');
    let body = {
      followers: host?._id,
    };
     console.log(token);
    // console.log(userData);
    axios({
      url: localBaseurl + 'userFollowapi',
      method: 'PUT',
      headers: {Authorization: `Bearer ${token}`},
      data: body,
    })
      .then(resp => {
        console.log('submit follow--->>>', resp.data);
        SimpleToast.show('Success');
        // userProfile();
      })
      .catch(err => {
        console.log('submit follow error--->>>', err.response.data);
        SimpleToast.show('Something error occured!');
      });
  };

  const submit_unFollow = async host => {
    SimpleToast.show('Please wait...');
    const token = await AsyncStorage.getItem('token');
    let body = {
      followers: host?._id,
    };
    axios({
      url: localBaseurl + 'userunFollowapi',
      method: 'PUT',
      headers: {Authorization: `Bearer ${token}`},
      data: body
    })
      .then(resp => {
        console.log('submit unfollow error--->>>//', resp.data);
        SimpleToast.show('Success');
        // userProfile();
      })
      .catch(err => {
        console.log('submit unfollow--->>>++', err.response);
        SimpleToast.show('Something error occured!-');
      });
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#2C0C40" />
      <View style={styles.container}>
        <Image
          style={styles.background}
          source={{uri: userData.user.userImage}}
        />
        <View style={styles.head}>
          <View
            style={{
              width: wp('48%'),
              height: hp('5%'),
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{
                width: wp('8%'),
                height: hp('4%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="circle-with-cross" size={hp('2.8%')} color="#fff" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: wp('48%'),
              height: hp('5%'),
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                toggleMyMobile1();
              }}
              style={{
                width: wp('8%'),
                height: hp('4%'),
                alignSelf: 'flex-end',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo
                name="dots-three-horizontal"
                size={hp('2.8%')}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: wp('100%'),
            height: hp('9%'),
            justifyContent: 'center',
            marginTop: hp('0.5%'),
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: wp('45%'),
              height: hp('8%'),
              alignItems: 'flex-start',
              padding: wp('1.5%'),
            }}>
            <Text
              style={{
                fontSize: hp('2.5%'),
                color: '#fff',
                textAlignVertical: 'center',
                fontWeight: 'bold',
              }}>
              {userData.user.FirstName}, {userData.user.age}
            </Text>

            <Text
              style={{
                fontSize: hp('1.8%'),
                color: '#fff',
                textAlignVertical: 'center',
                fontWeight: 'normal',
              }}>
              {userData.user.city}
            </Text>
          </View>
          <View
            style={{
              width: wp('49%'),
              height: hp('8%'),
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={{justifyContent: 'center'}} disabled>
              {/* <View
                style={{
                  width: wp('19%'),
                  height: hp('3%'),
                  borderColor: '#66B757',
                  borderRadius: hp('2%'),
                  borderWidth: wp('0.2%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: wp('3%'),
                  backgroundColor: '#66B757',
                }}>
                <Text
                  style={{
                    fontSize: hp('1.5%'),
                    color: '#fff',
                    textAlignVertical: 'center',
                  }}>
                  Online
                </Text>
              </View> */}
            </TouchableOpacity>
            {/* {
            userData?.user?.followings ? 
              <TouchableOpacity
                 onPress={() => submit_Follow(userData?.user)}
                style={{
                  height: hp('3%'),
                  width: wp('18%'),
                  backgroundColor: Colors.primary,
                  marginTop: 10,
                  // paddingVertical: 3,
                  // paddingHorizontal: 15,
                  borderRadius: 20,
                  // position: 'absolute',
                  right: wp('2%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: Colors.white, fontSize: 12}}>follow</Text>
              </TouchableOpacity>  : null
         
            } */}

            <TouchableOpacity style={{justifyContent: 'center'}}>
              <View
                style={{
                  height: hp('3%'),
                  borderColor: '#8D8B8B',
                  borderRadius: hp('2%'),
                  borderWidth: wp('0.2%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginRight: wp('4%'),
                  backgroundColor: '#9B45D2',
                  paddingHorizontal: 5,
                  marginBottom: hp('2%'),
                }}>
                <Image
                  source={require('../Assetst/Images/coins.png')}
                  style={{width: hp('2%'), height: hp('2%')}}
                />
                <Text
                  style={{
                    fontSize: hp('1.5%'),
                    color: '#fff',
                    textAlignVertical: 'center',
                    marginLeft: wp('0.5%'),
                  }}>
                  {userData.user?.hostuser_fees || 0} coins/min
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: wp('65%'),
            height: hp('12%'),
            justifyContent: 'space-between',
            marginTop: hp('2.5%'),
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.setItem(
                'targetUser',
                JSON.stringify(userData.user),
              );
              startCall(userData.user);
            }}
            style={{
              width: wp('30%'),
              height: hp('10%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../Assetst/Images/Group42.png')}
              style={{width: hp('7%'), height: hp('7%')}}
            />
            <Text style={{fontSize: hp('1.5%'), color: '#fff'}}>
              Video Call
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // toggleMyMobile();
              _openChatRoom();
            }}
            style={{
              width: wp('30%'),
              height: hp('10%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../Assetst/Images/Group51.png')}
              style={{width: hp('7.2%'), height: hp('7.2%')}}
            />
            <Text style={{fontSize: hp('1.5%'), color: '#fff'}}>Chat</Text>
          </TouchableOpacity>
        </View>

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
                  source={{uri: userData?.appData?.user?.imageUrl}}
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
                  {userData.appData.user.total_coins} coins
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
                {userData?.user?.hostuser_fees} coins per minute
              </Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('MyWallet', userData?.appData?.user)
                }
                style={styles.hin}>
                <Text style={styles.enter}>Get coins</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <View style={{bottom: 0}}>
          <Modal
            isVisible={myModal1}
            animationIn="slideInUp"
            // animationOutTiming={500}
            // animationInTiming={500}
            hideModalContentWhileAnimating={true}
            useNativeDriverForBackdrop={true}
            onBackdropPress={() => setMyModal1(false)}
            onSwipeComplete={() => setMyModal1(false)}
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
                width: wp('80%'),
                height: hp('21.5%'),
                backgroundColor: '#fff',
                borderRadius: hp('1.8%'),
                alignSelf: 'center',
                marginTop: wp('98%'),
              }}>
              <TouchableOpacity
                onPress={() => {
                  toggleMyMobile1();
                  props.navigation.navigate('Report', userData);
                }}>
                <View
                  style={{
                    width: wp('80%'),
                    height: hp('6%'),
                    alignSelf: 'center',
                    marginTop: hp('1.4%'),
                    borderBottomColor: '#C5D5D6',
                    borderBottomWidth: wp('0.3%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: hp('2%'),
                      color: '#000',
                      fontWeight: 'bold',
                    }}>
                    Report
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={_block}>
                <View
                  style={{
                    width: wp('80%'),
                    height: hp('7%'),
                    alignSelf: 'center',
                    borderBottomColor: '#C5D5D6',
                    borderBottomWidth: wp('0.3%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: hp('2%'),
                      color: '#000',
                      fontWeight: 'bold',
                    }}>
                    Block
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMyModal1(false)}>
                <View
                  style={{
                    width: wp('80%'),
                    height: hp('6%'),
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: hp('2%'),
                      color: '#000',
                      fontWeight: 'bold',
                    }}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <View style={{bottom: 0}}>
          <Modal
            isVisible={myModal2}
            animationIn="slideInUp"
            // animationOutTiming={500}
            // animationInTiming={500}
            hideModalContentWhileAnimating={true}
            useNativeDriverForBackdrop={true}
            onBackdropPress={() => setMyModal2(false)}
            onSwipeComplete={() => setMyModal2(false)}
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
                width: wp('80%'),
                height: hp('25%'),
                backgroundColor: 'white',
                borderRadius: hp('1.8%'),
                alignSelf: 'center',
              }}>
              <View
                style={{
                  width: wp('60%'),
                  height: hp('10%'),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: hp('2%'),
                }}>
                <LottieView
                  source={require('../Assetst/Images/Lottie/99630-tick.json')}
                  autoPlay
                  loop={false}
                />
              </View>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Successfully blocked
              </Text>
              <TouchableOpacity
                style={styles.ok}
                onPress={() =>
                  props.navigation.navigate('BottomTabNavigation')
                }>
                <Text style={styles.enter1}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#2C0C40',
  },
  head: {
    width: wp('100%'),
    height: hp('6%'),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    //backgroundColor: 'blue',
  },
  background: {
    width: wp('100%'),
    height: hp('72%'),
    borderBottomLeftRadius: hp('5%'),
    borderBottomRightRadius: hp('5%'),
    position: 'relative',
    //  borderBottomEndRadius:wp('15%')
  },
  hin: {
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
    // borderColor:"black"
  },
  enter: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#000',
  },
  ok: {
    height: hp('6%'),
    width: wp('48%'),
    backgroundColor: '#b15eff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('3%'),
    alignSelf: 'center',
    borderColor: '#b15eff',
    marginTop: hp('1%'),

    borderWidth: hp('0.2%'),
    // borderColor:"black"
  },
  enter1: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#fff',
  },
});
