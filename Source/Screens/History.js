import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GirlsHistory from '../ReusableComponent/GirlsHistory';
import Colors from '../Assetst/Constants/Colors';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { localBaseurl } from '../config/baseurl';
import axios from 'axios';
import { zego_config } from '../config/ZegoConfig';
import Modal from 'react-native-modal';
import { baseurl } from '../config/baseurl';
import SimpleToast from 'react-native-simple-toast';


const History = props => {

  const userData = props.route?.params;
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeProfile, setActiveProfile] = useState(null);
  const [myModal, setMyModal] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      userProfile();
    }
  }, [isFocused]);

  async function userProfile() {
    // setLoading(true);
    setActiveProfile(null);
    // setHistoryData([]);
    const token = await AsyncStorage.getItem('token');
    axios
      .get(baseurl + 'finduserCallHistory', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async res => {

        console.log("ALL HOSTS---->>>>>>", res.data.CallHistory.userCallhistorys.length);
        // storage.set('AllHost', JSON.stringify(res.data));
        const newData = res.data.CallHistory.userCallhistorys.filter((v, i, a) => a.findIndex(v2 => (v2.targetId._id === v.targetId._id)) === i);
        // console.log(newData);
        // const newData = res.data.CallHistory.userCallhistorys;

        setHistoryData(newData);
        setLoading(false);
      })
      .catch(err => {
        console.log('video call history---->>>>', err);
        setLoading(false);
      });
  };

  // console.log(activeProfile);


  const _profilePressed = (data) => {
    // console.log(data);
    setActiveProfile(data);
  };

  const toggleMyMobile = () => {
    setMyModal(!myModal);
  };

  async function startCall(targetUser) {
    const token = await AsyncStorage.getItem('token');
    if (targetUser?.userId == '') {
      console.warn('Invalid user id');
      return;
    };
    let randomPromise = Promise.resolve(200);

    axios.all([
      axios.get(baseurl + 'showProfile', { headers: { Authorization: `Bearer ${token}` } }),
      axios.get(baseurl + 'getOneUserProfile/' + targetUser.userId, { headers: { Authorization: `Bearer ${token}` } }),
      randomPromise
    ]).then(responses => {
      if (responses[0]?.data?.total_coins < responses[1]?.data?.getuser?.hostuser_fees) {
        console.log("insufficient coin");
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
        SimpleToast.show("Server down!");
        console.log("get user during video call-->", err.response.data);
      })
  };

  // const startCall = (targetUser) => {
  //   // console.log(targetUser);
  //   if (targetUser?.userId == '') {
  //     console.warn('Invalid user id');
  //     return;
  //   }
  //   if (userData?.appData?.user?.total_coins < targetUser?.hostuser_fees) {
  //     console.log("insufficient coin");
  //     toggleMyMobile();
  //     return;
  //   }
  //   // toggleMyMobile();
  //   // TODO the caller use he/her own user id to join room, for test only
  //   jumpToCallPage(userData.appData.user.userId);
  //   sendCallInvite({ roomID: userData.appData.user.userId, user: userData.appData.user, targetUserID: targetUser.userId });
  // };

  const sendCallInvite = (data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetUserID: data.targetUserID,
        callerUserID: data.user.userId,
        callerUserName: data.user.fullName,
        callerIconUrl: "user_image",
        roomID: data.roomID,
        callType: 'Video', // TODO For test only
        role: '1'
      })
    };
    // console.log(requestOptions.body);
    const reps = fetch(`${zego_config.serverUrl}/call_invite`, requestOptions);
    console.log('Send call invite reps: ', reps);
  };

  const jumpToCallPage = (roomID) => {
    // const appData_str = await AsyncStorage.getItem('appData');
    // const app_data = JSON.parse(appData_str);
    // console.log(newAppData);
    // console.log("JUMP TO CALL PAGE appData------------->>>>>>>>>>",userData.appData);
    props.navigation.navigate('CallPage', { appData: userData.appData, roomID: roomID });
  };

  const _openChatRoom = async (item) => {
    // console.log(item);
    userData['user'] = item;
    let navData = {
      userData: userData,
      type: 0,
      id: item?.userId,
      name: item?.fullName
    };
    props.navigation.navigate('ChatRoom', navData);
  };

  const _removeAlert=(targetHost)=>{
    // console.log(targetHost);
    Alert.alert('Remove from History', 'Are your sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => _removeCallHistory(targetHost._id)},
    ]);
  };

  const _removeCallHistory=async(_id)=>{
    if(!_id){
      return;
    }
    const token = await AsyncStorage.getItem('token');
    axios.put(baseurl + 'removecallhistroy',{"_id": _id},{headers: { Authorization: `Bearer ${token}` }})
    .then(res=>{
      console.log("remove from call history-->>>",res.data);
      userProfile();
      SimpleToast.show("Host is removed from call history");
    })
    .catch(err=>{
      console.log("remove from call history-->>>",err.response.data);
      SimpleToast.show("Something error happened!");
    })
  }

  const ActiveProfile = ({ activeProfileData }) => {
    console.log("activeProfileData--------------------------------------------------------------------------------",activeProfileData);
    console.log("historyData--------------------------------------------------------------------------------------",historyData)
    return (
      <View
        style={{
          width: wp('84%'),
          height: hp('60%'),
          backgroundColor: Colors.lightGray,
          justifyContent: 'center',
          borderRadius: hp('2%'),
          borderWidth: 2,
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: hp('1%'),
        }}>
        <ImageBackground
          source={{ uri: activeProfileData?.targetId?.userImage }}
          // source={{ uri: "https://kickrproject.s3.amazonaws.com/f1f37338-1fbe-4142-b61c-724b8e8b0bd3.jpeg" }}
          resizeMode="cover"
          style={{ width: wp('84%'), height: hp('60%') }}
          imageStyle={{
            borderRadius: hp('2%'),
            borderWidth: 0.3,
            borderColor: '#b15eff',
          }}>
          <View
            style={{
              width: wp('84%'),
              height: hp('10%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: wp('2%'),
            }}>
            {/* <TouchableOpacity
              style={{
                width: hp('6%'),
                height: hp('6%'),
                borderRadius: hp('6%'),
                backgroundColor: Colors.gray,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="shield-alert"
                size={hp('3%')}
                style={{ color: Colors.white }}
              />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>_removeAlert(activeProfileData)}
              style={{
                width: hp('6%'),
                height: hp('6%'),
                borderRadius: hp('6%'),
                backgroundColor: Colors.gray,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: 10
              }}>
              <MaterialCommunityIcons
                name="delete"
                size={hp('3%')}
                style={{ color: Colors.white }}
              />
            </TouchableOpacity> */}
          </View>

          <View
            style={{
              width: wp('84%'),
              height: hp('18%'),
              marginTop: hp('31%'),
            }}>
            <View
              style={{
                width: wp('84%'),
                height: hp('9%'),
                justifyContent: 'center',
                paddingHorizontal: wp('2%'),
              }}>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  color: Colors.white,
                  fontWeight: 'bold',
                }}>
                {activeProfileData?.targetId?.FirstName}, {activeProfileData?.targetId?.age}
              </Text>

              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: hp('2%'), color: Colors.white }}>
                  {activeProfileData?.targetId?.city}
                </Text>
                <Ionicons
                  name="md-location-sharp"
                  size={hp('2%')}
                  style={{ color: '#ffff', marginLeft: wp('1%') }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: wp('84%'),
                height: hp('9%'),
                justifyContent: 'center',
                paddingHorizontal: wp('2%'),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: wp('48%'),
                  height: hp('9%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: wp('2%'),
                }}>
                {/* <TouchableOpacity
                style={{
                  width: wp('20%'),
                  height: hp('3%'),
                  backgroundColor: 'green',
                  borderRadius: hp('5%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: hp('1.3%'), color: Colors.white }}>
                  Online
                </Text>
              </TouchableOpacity> */}
                <TouchableOpacity
                  style={{
                    // width: wp('20%'),
                    // height: hp('3%'),
                    backgroundColor: 'green',
                    borderRadius: hp('1%'),
                    paddingVertical: 4,
                    paddingHorizontal:10,
                  }}>
                  <Text style={{ fontSize: hp('1.5%'), color: Colors.white }}>
                    {activeProfileData?.targetId?.acctiveStatus || ""}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: wp('36%'),
                  height: hp('9%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp('7%'),
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    await AsyncStorage.setItem('targetUser', JSON.stringify(activeProfileData?.targetId));
                    startCall(activeProfileData.targetId);
                  }}
                  style={{
                    width: hp('5%'),
                    height: hp('5%'),
                    borderRadius: hp('5%'),
                    backgroundColor: Colors.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="video"
                    size={hp('3%')}
                    style={{ color: '#b15eff' }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => _openChatRoom(activeProfileData.targetId)}
                  style={{
                    width: hp('5%'),
                    height: hp('5%'),
                    borderRadius: hp('5%'),
                    backgroundColor: Colors.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="chat"
                    size={hp('3%')}
                    style={{ color: 'pink' }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ bottom: 0 }}>
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
                    source={{ uri: userData?.appData?.user?.imageUrl }}
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
                    style={{ width: hp('2.8%'), height: hp('2.8%') }}
                  />
                  <Text
                    style={{
                      fontSize: hp('2%'),
                      color: '#FDBF00',
                      fontWeight: 'bold',
                      marginLeft: wp('1%'),
                    }}>
                    {userData?.appData?.user?.total_coins} coins
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
                  }}
                >
                  For Safe private calls,you will be charged
                </Text>
                <Text
                  style={{
                    color: '#949894',
                    fontWeight: 'bold',
                    fontSize: hp('1.5%'),
                    textAlign: 'center',
                    // marginHorizontal:10
                  }}
                >
                  {userData?.appData?.user?.hostuser_fees} coins per minute
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    toggleMyMobile();
                    props.navigation.navigate('MyWallet', userData?.appData?.user)
                  }}
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
                  <Text style={{
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                    color: '#000'
                  }}>Get coins</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </ImageBackground>
      </View>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View
          style={{
            width: wp('100%'),
            height: hp('6%'),
            backgroundColor: '#b15eff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: hp('2.2%'),
              color: Colors.white,
              fontWeight: 'bold',
            }}>
            History
          </Text>
        </View>
        {
          loading ?
            <ActivityIndicator size={35} color={"#b15eff"} style={{ marginTop: '50%' }} />
            :
            historyData.length == 0 ?
              <Text style={{
                color: '#aaa', textAlign: 'center',
                marginTop: hp(40), fontSize: 16, fontWeight: '500'
              }}>No Data available!</Text>
              :
              <>
                <View
                  style={{
                    width: wp('100%'),
                    height: hp('15%'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {
                      historyData.reverse().map((item, index) => (
                        <View key={index} >
                          <GirlsHistory
                            _key={index}
                            img={item.targetId.FirstName}
                            click={() => _profilePressed(item)}
                          />
                        </View>
                      ))
                    }
                  </ScrollView>
                </View>
                {
                  activeProfile ?
                    <ActiveProfile
                      activeProfileData={activeProfile}
                    />
                    :
                    historyData[0]?.targetId &&
                    <ActiveProfile
                      activeProfileData={historyData[0]}
                    />
                }
              </>
        }
      </View>
    </SafeAreaView>
  );
};

export default History;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    // backgroundColor:'cyan'
  },
  head: {
    width: wp('100%'),
    height: hp('6%'),
    backgroundColor: '#b15eff',
    flexDirection: 'row',
  },
});
