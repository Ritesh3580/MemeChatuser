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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import {Navigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { baseurl, localBaseurl } from '../config/baseurl';
import { storage } from '../store/MMKV';
import { zego_config } from '../config/ZegoConfig';

const ProfileDetails = props => {
  const [myModal, setMyModal] = useState(false);
  const userData = props.route?.params;
  console.log("userData---", userData);

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

  const startCall =(targetUserID)=> {
    if (targetUserID == '') {
      console.warn('Invalid user id');
      return;
    }
    // TODO the caller use he/her own user id to join room, for test only
    jumpToCallPage( userData.appData.user.userId);
    sendCallInvite({roomID: userData.appData.user.userId, user:  userData.appData.user,targetUserID: targetUserID});
  };
  const  sendCallInvite =(data)=> {
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
    const reps =  fetch(`${zego_config.serverUrl}/call_invite`, requestOptions);
    console.log('Send call invite reps: ', reps);
  }
  const jumpToCallPage=(roomID)=> {
    // const appData_str = await AsyncStorage.getItem('appData');
    // const app_data = JSON.parse(appData_str);
    // console.log(newAppData);
    // console.log("JUMP TO CALL PAGE appData------------->>>>>>>>>>",userData.appData);
     props.navigation.navigate('CallPage', { appData: userData.appData, roomID: roomID });
  };

  const _openChatRoom=async()=>{
    let navData = {
      userData: userData,
      type: 0,
      id: userData.user.userId,
      name: userData.user.fullName
    };
    props.navigation.navigate('ChatRoom',navData);
  };


  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#2C0C40" />
      <View style={styles.container}>
        <Image
          style={styles.background}
          source={require('../Assetst/Images/Cameragirl.jpg')}
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
              {userData.user.fullName}, {userData.user.age}
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
            <TouchableOpacity style={{justifyContent: 'center'}}>
              <View
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
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent: 'center'}}>
              <View
                style={{
                  width: wp('19%'),
                  height: hp('3%'),
                  borderColor: '#8D8B8B',
                  borderRadius: hp('2%'),
                  borderWidth: wp('0.2%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginRight: wp('4%'),
                  backgroundColor: '#9B45D2',
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
                  50/min
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
            // onPress={() => {
            //   toggleMyMobile();
            // }}
            onPress={() => {
              startCall(userData.user.userId)
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
                  height: hp('15%'),
                  width: wp('60%'),
                  alignSelf: 'center',
                  marginTop: '0.5%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../Assetst/Images/Cameragirl.jpg')}
                  style={{
                    width: hp('14%'),
                    height: hp('14%'),
                    borderRadius: hp('14%'),
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
                  width: wp('18%'),
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
                  16
                </Text>
              </View>

              <Text
                style={{
                  color: '#949894',
                  fontWeight: 'bold',
                  fontSize: hp('1.5%'),
                  marginTop: hp('1%'),
                  textAlign: 'center',
                }}
                numberOfLines={1}>
                For Safe private calls,you will be changed 50 coins{' '}
              </Text>
              <Text
                style={{
                  color: '#949894',
                  fontWeight: 'bold',
                  fontSize: hp('1.5%'),
                  textAlign: 'center',
                }}
                numberOfLines={1}>
                per minute
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('MyWallet')}
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
                onPress={() => props.navigation.navigate('Report')}>
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
              <TouchableOpacity
                onPress={() => {
                  toggleMyMobile1(false);
                  toggleMyMobile2();
                }}>
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
