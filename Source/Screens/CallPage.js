import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {Component} from 'react';
import {
  Button,
  TextInput,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
  findNodeHandle,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import Modal from 'react-native-modal';

import ZegoExpressEngine, {
  ZegoTextureView,
  ZegoScenario,
  ZegoUpdateType,
  ZegoEngineProfile,
} from 'zego-express-engine-reactnative';
import {ZegoExpressManager} from '../../ZegoExpressManager';
import {ZegoMediaOptions} from '../../ZegoExpressManager/index.entity';
import {baseurl, localBaseurl} from '../config/baseurl';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import notifee from // AndroidVisibility, // AndroidImportance, // EventType, // AuthorizationStatus,
'@notifee/react-native';

notifee.createChannel({
  id: 'custom-sound',
  name: 'Channel with custom sound',
  sound: 'hollow',
});
//   notifee.displayNotification({
//     body: 'Custom sound',
//     android: {
//       sound: 'hollow',
//     },
//   });

const styles = StyleSheet.create({
  // ZegoEasyExample
  callPage: {
    width: '100%',
    height: '100%',
  },
  showPage: {
    display: 'flex',
  },
  showPreviewView: {
    display: 'flex',
    opacity: 1,
  },
  showPlayView: {
    display: 'flex',
    opacity: 1,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  previewView: {
    width: '100%',
    height: '100%',
  },
  play: {
    height: '25%',
    width: '40%',
    position: 'absolute',
    top: 80,
    right: 20,
    zIndex: 2,
  },
  playView: {
    width: '100%',
    height: '100%',
  },
  btnCon: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    bottom: 40,
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  phoneCon: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  cameraCon: {
    width: 60,
    height: 60,
    borderRadius: 40,
    // backgroundColor: 'gainsboro',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },

  giftStyle: {
    width: 50,
    height: 50,
    borderRadius: 40,
    // backgroundColor: 'gainsboro',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 2,
    marginLeft: wp('10%'),
  },
  micCon: {
    width: 60,
    height: 60,
    borderRadius: 40,
    // backgroundColor: 'gainsboro',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  phoneImage: {
    width: 35,
    height: 35,
  },

  modal: {
    justifyContent: 'flex-end',
    // alignItems: 'center',
    // backgroundColor : "#00BCD4",
    // height: 300 ,
    // width: '80%',
    // borderRadius:10,
    // borderWidth: 1,
    // borderColor: '#fff',
    // marginTop: 80,
    // marginLeft: 40,
    margin: 0,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
});

export default class CallPage extends Component {
  localViewRef;
  remoteViewRef;
  appID;
  token;
  roomID;
  userID;
  userName;
  timeRef;
  appData; // pass back to home page
  constructor(props) {
    super(props);
    // console.log('Call page route params--------------->>>>>>>>>>>>>>>> ', props.route.params)
    this.appData = props.route?.params?.appData;
    // this.targetUser = props.route?.params?.targetUser;
    // console.log(this.targetUser);
    this.localViewRef = React.createRef();
    // console.log("LOCAL VIEW---->>>>",this.localViewRef);
    this.remoteViewRef = React.createRef();
    this.appID = parseInt(this.appData.appID);
    this.token = this.appData.zegoToken;
    this.roomID = props.route.params.roomID;
    this.userID = this.appData.user.userId;
    this.userName = this.appData.user.fullName || this.appData.user.userId;
    // console.log("userName---->>>",this.userName);
  }
  state = {
    cameraEnable: true,
    micEnable: true,
    time: 0,
    sec: 0,
    min: 0,
    hour: 0,
    hostData: null,
    userAvailCoin: null,
    isVisible: false, //state of modal default false
    stickerAll: [],
    error: null,
    currentCoin:null,
    hostIDD: null,
  };

  componentDidMount() {
    // this._startTimer();
    this.getSticker();
    this.grantPermissions();
    this.coinsReduce();
    // ZegoExpressEngine.stopPublishingStream();

    //     if(user.userID == null){
    //         this.leaveRoom();
    //         console.log("leave .........9");
    //    }

    console.warn('init SDK');
    const profile = {
      appID: this.appID,
      scenario: ZegoScenario.General,
    };
    ZegoExpressManager.createEngine(profile).then(async () => {
      console.warn('ZegoExpressEngine created!');
      // Register callback
      this.registerCallback();

      // Join room and wait...
      this.joinRoom();
      setTimeout(() => {
        if (this.state.time == 0) {
          SimpleToast.show('Host is not available at this moment');
          this.leaveRoom();
          console.log('leave ................6');
        }
      }, 15000);
    });
    // this._startTimer("20255941");
  }
  componentWillUnmount() {
    this.coinsReduce();
    ZegoExpressManager.instance().leaveRoom();
    // clearInterval(this.startTimer);
    // clearInterval(this.calculateCoin);
    // clearTimeout(this.calculateCoin);
  }

  registerCallback() {
    // When other user join in the same room, this method will get call
    // Read more doc: https://doc-en-api.zego.im/ReactNative/interfaces/_zegoexpresseventhandler_.zegoeventlistener.html#roomuserupdate
    ZegoExpressManager.instance().onRoomUserUpdate(
      (updateType, userList, roomID) => {
        console.warn(
          'out roomUserUpdate------------->',
          updateType,
          userList,
          roomID,
        );
        console.log('leave ................1');

        if (updateType == null && userList == null && roomID == null) {
          console.log('sorry Cancel');
        }

        //    console.log("get Call------------------>",onRoomUserUpdate);
        if (updateType == ZegoUpdateType.Add) {
          console.log(
            '&&&&&&&&&',
            this.remoteViewRef.current,
            findNodeHandle(this.remoteViewRef.current),
          );
          userList.forEach(userID => {
            ZegoExpressManager.instance().setRemoteVideoView(
              userID,
              findNodeHandle(this.remoteViewRef.current),
            );
          });
          console.log(this.userID);
          console.log(this.roomID);
          this.addCallHistory();
          if (this.userID == roomID) {
            this._startTimer(userList[0]);
            this._coinCalculateOneTime(userList[0]);
            this._coinCalculateInterval(userList[0]);
            console.log('leave ................2');
          } else {
            this._startTimer(roomID);
            this._coinCalculateOneTime(roomID);
            this._coinCalculateInterval(roomID);
            console.log('leave ................3');
          }
        } else {
          console.log('Host is Left Please Cut a Call');
          SimpleToast.show('Host is Left', SimpleToast.LONG);
          this.leaveRoom();
        }
      },
      // this.leaveRoom()
    );
    ZegoExpressManager.instance().onRoomUserDeviceUpdate(
      (updateType, userID, roomID) => {
        console.warn('out roomUserDeviceUpdate', updateType, userID, roomID);
        console.log('leave ................4');
      },
    );
    ZegoExpressManager.instance().onRoomTokenWillExpire(
      async (roomID, remainTimeInSecond) => {
        console.warn('out roomTokenWillExpire', roomID, remainTimeInSecond);
        const token = (await this.generateToken()).token;
        ZegoExpressEngine.instance().renewToken(roomID, token);
        console.log('leave ................5');
      },
    );
  }
  async grantPermissions() {
    // Android: Dynamically obtaining device permissions
    if (Platform.OS === 'android') {
      // Check if permission granted
      let grantedAudio = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      let grantedCamera = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      const ungrantedPermissions = [];
      try {
        const isAudioGranted = await grantedAudio;
        const isVideoGranted = await grantedCamera;
        if (!isAudioGranted) {
          ungrantedPermissions.push(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          );
        }
        if (!isVideoGranted) {
          ungrantedPermissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
        }
      } catch (error) {
        ungrantedPermissions.push(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
      }
      // If not, request it
      PermissionsAndroid.requestMultiple(ungrantedPermissions).then(data => {
        console.warn('requestMultiple', data);
      });
    }
  }
  // Switch camera
  enableCamera() {
    ZegoExpressManager.instance()
      .enableCamera(!this.cameraEnable)
      .then(() => {
        console.log('get Call------------------>', onRoomUserUpdate);
        this.cameraEnable = !this.cameraEnable;
        this.setState({
          showPreview: this.cameraEnable,
        });
      });
  }

  async addCallHistory() {
    const token = await AsyncStorage.getItem('token');
    // console.log("token--->>",token);
    const targetUser = JSON.parse(await AsyncStorage.getItem('targetUser'));
    // console.log(targetUser);
    let body = {
      userCallhistorys: [
        {
          targetId: targetUser._id,
        },
      ],
    };
    axios({
      url: localBaseurl + 'adduserCallhistory',
      method: 'PUT',
      headers: {Authorization: `Bearer ${token}`},
      data: body,
    })
      .then(resp => {
        console.log('add to call history-->', resp.data);
      })
      .catch(err => {
        console.log('add to call history-->', err.response.data);
      });
  }

  // Switch microphone
  enableMic() {
    ZegoExpressManager.instance()
      .enableMic(!this.micEnable)
      .then(() => {
        this.micEnable = !this.micEnable;
      });
  }
  // Join in ZEGOCLOUD's room and wait for other.
  // While user on the same room, they can talk to each other
  async joinRoom() {
    this.setState({
      time: 0,
    });
    // console.log("Join room: ", this.roomID, this.token)
    ZegoExpressManager.instance()
      .joinRoom(
        this.roomID,
        this.token,
        {userID: this.userID, userName: this.userName},
        [
          ZegoMediaOptions.PublishLocalAudio,
          ZegoMediaOptions.PublishLocalVideo,
          ZegoMediaOptions.AutoPlayAudio,
          ZegoMediaOptions.AutoPlayVideo,
        ],
      )
      .then(result => {
        if (result) {
          console.warn('Login successful');
          ZegoExpressManager.instance().setLocalVideoView(
            findNodeHandle(this.localViewRef.current),
          );
        } else {
          console.warn('Login failed!', result);
        }
      });
  }
  // Leave room
  leaveRoom() {
    this.setState({
      showPreview: false,
      showPlay: false,
      time: 'done',
    });

    ZegoExpressManager.instance()
      .leaveRoom(this.roomID)
      .then(async () => {
        console.warn('Leave successful');
        clearInterval(this.startTimer);
        clearInterval(this.startTimer);
        clearInterval(this.calculateCoin);
        clearTimeout(this.calculateCoin);
        this.props.navigation.navigate('BottomTabNavigation', {
          appData: this.appData,
        });
      });
  }

  async _startTimer(_id) {
    // console.log("_id-->>",_id);
    // console.log("start timer");
    const token = await AsyncStorage.getItem('token');
    let randomPromise = Promise.resolve(200);
    axios
      .all([
        axios.get(baseurl + 'showProfile', {
          headers: {Authorization: `Bearer ${token}`},
        }),
        axios.get(baseurl + 'getOneUserProfile/' + _id, {
          headers: {Authorization: `Bearer ${token}`},
        }),
        randomPromise,
      ])
      .then(response => {
        let userData = response[0].data;
        let hostData = response[1].data.getuser;
        let userBalance = userData?.total_coins;
        let hostFees = hostData?.hostuser_fees;
        if (Number(userBalance) < Number(hostFees)) {
          SimpleToast.show('Insufficient coin!');
          this.leaveRoom();
          return;
        }
      })
      .catch(err => {
        console.log('call page get profile--->>>', err.response.data);
      });

    if (this.state.time != 'done') {
      this.startTimer = setInterval(() => {
        let time = this.state.time;
        console.log('start timer', time);

        this.setState({time: time + 1});
        let sec = Number(time) % 60;
        let min = this._getMinutes(time);
        let hours = this._getHours(time);

        if (sec < 10) {
          this.setState({sec: '0' + sec});
        } else {
          this.setState({sec: sec});
        }
        if (min < 10) {
          this.setState({min: '0' + min});
        } else if (min >= 60) {
          let newMin = min % 60;
          if (newMin < 10) {
            this.setState({min: '0' + newMin});
          } else {
            this.setState({min: newMin});
          }
        } else {
          this.setState({min: min});
        }
        if (hours < 10) {
          this.setState({hour: '0' + hours});
        } else {
          this.setState({hour: hours});
        }
      }, 1000);
    }
  }

  _coinCalculateOneTime = async _id => {
    // console.log("data-->>>",data);
    if (this.state.time != 'done') {
      this.calculateCoin = setTimeout(async () => {
        const token = await AsyncStorage.getItem('token');
        let randomPromise = Promise.resolve(200);
        // console.log(_id);
        axios
          .all([
            axios.get(baseurl + 'showProfile', {
              headers: {Authorization: `Bearer ${token}`},
            }),
            axios.get(baseurl + 'getOneUserProfile/' + _id, {
              headers: {Authorization: `Bearer ${token}`},
            }),
            randomPromise,
          ])
          .then(response => {
            let userData = response[0].data;
            let hostData = response[1].data.getuser;
            let userBalance = userData?.total_coins;
            let hostFees = hostData?.hostuser_fees;
            let hostId = hostData?.userId;
            this.setState({hostIDD :hostData?.userId });
            if (Number(userBalance) < Number(hostFees)) {
              SimpleToast.show('Insufficient coin!');
              this.leaveRoom();
              return;
            }
            // if (!this.state.userAvailCoin) {
            //     this.setState({ userAvailCoin: userBalance - hostFees });
            // } else {
            //     this.setState({ userAvailCoin: this.state.userAvailCoin - hostFees });
            // }
            let min = this._getMinutes(this.state.time);
            // console.log("_coinCalculateOneTime min--",min);
            let body = {
              hostuser_fees: hostFees,
              total_minute: 1,
              userId: hostId,
            };
            console.log('body for api _coinCalculateOneTime---', body);
            axios
              .put(baseurl + 'parMinuteCall', body, {
                headers: {Authorization: `Bearer ${token}`},
              })
              .then(resp => {
                console.log('reduce coin-->', resp.data);
                // console.log("_coinCalculateOneTime api");
                // AsyncStorage.setItem("coinsReduce","coinsReduce");
              })
              .catch(error => {
                console.log('reduce coin-->', error.response.data);
              });
          })
          .catch(err => {
            console.log('call page get profile--->>>', err.response.data);
          });
      }, 6000);
    }

    // const token = await AsyncStorage.getItem('token');
  };

  _coinCalculateInterval = async _id => {
    // console.log("data-->>>",data);

    if (this.state.time != 'done') {
      this.calculateCoin = setInterval(async () => {
        const token = await AsyncStorage.getItem('token');
        let randomPromise = Promise.resolve(200);
        // console.log(_id);
        axios
          .all([
            axios.get(baseurl + 'showProfile', {
              headers: {Authorization: `Bearer ${token}`},
            }),
            axios.get(baseurl + 'getOneUserProfile/' + _id, {
              headers: {Authorization: `Bearer ${token}`},
            }),
            randomPromise,
          ])
          .then(response => {
            let userData = response[0].data;
            let hostData = response[1].data.getuser;
            let userBalance = userData?.total_coins;
            let hostFees = hostData?.hostuser_fees;
            let hostId = hostData?.userId;
            this.setState({hostIDD :hostData?.userId });
            if (Number(userBalance) < Number(hostFees)) {
              SimpleToast.show('Insufficient coin!');
              this.leaveRoom();
              return;
            }
            // if (!this.state.userAvailCoin) {
            //     this.setState({ userAvailCoin: userBalance - hostFees });
            // } else {
            //     this.setState({ userAvailCoin: this.state.userAvailCoin - hostFees });
            // }
            let min = this._getMinutes(this.state.time);
            // console.log("_coinCalculateInterval min--",min);
            let body = {
              hostuser_fees: hostFees,
              total_minute: 1,
              userId: hostId,
            };
            // console.log(body);
            axios
              .put(baseurl + 'parMinuteCall', body, {
                headers: {Authorization: `Bearer ${token}`},
              })
              .then(resp => {
                console.log('reduce coin-->', resp.data);
                // console.log("_coinCalculateInterval api call");
              })
              .catch(error => {
                console.log('reduce coin-->', error.response.data);
              });
          })
          .catch(err => {
            console.log('call page get profile--->>>', err.response.data);
          });
      }, 60000);
    }

    // const token = await AsyncStorage.getItem('token');
  };

  _getMinutes = sec => {
    let minute = Number(sec) / 60;

    if (Number(minute) === minute && minute % 1 === 0) {
      return minute;
    } else {
      return Math.trunc(minute);
    }
  };

  _getHours = sec => {
    let hour = Number(sec) / 3600;
    if (Number(hour) === hour && hour % 1 === 0) {
      return hour;
    } else {
      return Math.trunc(hour);
    }
  };

  async toggleBottomSheet() {
    console.log('Press Success........');
    this.setState({isBottomSheetVisible: true});
  }

  async getSticker() {
    const token = await AsyncStorage.getItem('token');
    console.log('yess presssss.........////.;ljhh', token);

    try {
      axios
        .get(baseurl + `getAllChatSticker`, {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(res => {
          // console.log(
          //   'ressssssssssssssssssssssssssssssssssssssssssssssss',
          //   res.data.result,
          // );
          console.log('all Stciker ...........', res.data.result);

          this.setState({stickerAll: res.data.result});
          //   setstickerIg(res.data.result);
        })
        .catch(err => {
          console.log('error St', err);
        });
    } catch (err) {
      console.log('Error Of Sticker ...', err);
    }
  }

  async  coinsReduce() {
    console.log('Coin Reduces........');
    const token = await AsyncStorage.getItem('token');
    try {
      axios
        .get(baseurl + 'showProfile', {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(resp => {
          console.log('Response ...............', resp.data.total_coins);
          this.setState({currentCoin: resp.data.total_coins});
        })
        .catch(err => {
          console.log('error Of Coing', err);
        });
    } catch (err) {
      console.log('errror ...COing', err);
    }
  }

 async sendGift (stkUrl){
   console.log("hjwehfehfafhh4444pii3ppp",stkUrl);

   console.log("Current Coin......",this.state.currentCoin);

   if(this.state.currentCoin < stkUrl.coins){
    SimpleToast.show("Insufficient coin!");
   }
   else{
    console.log("Host id..........................Oooooo",this.state.hostIDD);
    let data = {
        spentCoins: stkUrl.coins,
        userId : this.state.hostIDD,
        stickerUrl: stkUrl.stickerUrl
      };
      const token = await AsyncStorage.getItem('token');

      axios
      .put(baseurl + `updateCoin`, data, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
      console.log("ress Data .............",res.data);
      SimpleToast.show("Send Gift Successfully");
      this.setState({isVisible: !this.state.isVisible});

      })
      .catch(err =>{
        console.log("errorr....",err);
      })

   }
 }

  render() {
    // console.log(this.state.userAvailCoin);
    return (
      <View style={[styles.callPage, styles.showPage]}>
        <View style={[styles.preview, styles.showPreviewView]}>
          <ZegoTextureView
            ref={this.localViewRef}
            // @ts-ignore
            style={styles.previewView}
          />
        </View>
        <View style={[styles.play, styles.showPlayView]}>
          <ZegoTextureView
            ref={this.remoteViewRef}
            // @ts-ignore
            style={styles.playView}
          />
        </View>
        <View style={styles.btnCon}>
          <TouchableOpacity
            disabled
            style={styles.micCon}
            // onPress={this.enableMic.bind(this)}
          >
            {/* <Image style={styles.image} source={require('../Assetst/Images/mic.png')} /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.phoneCon}
            onPress={this.leaveRoom.bind(this)}>
            <Image
              style={styles.phoneImage}
              source={require('../Assetst/Images/phone.png')}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
                        disabled
                        style={styles.cameraCon}
                        onPress={this.enableCamera.bind(this)}>
                        <Image
                            style={styles.image}
                            source={require('../Assetst/Images/camera.png')}
                        />
                    </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.giftStyle}
            // onPress={() => toggleBottomSheet()}
            onPress={() => {
              this.setState({isVisible: true});
            }}>
            <Image
              style={styles.image}
              source={require('../Assetst/Images/giftico.png')}
            />
          </TouchableOpacity>
        </View>

        <Modal
          // animationType={'fade'}
          // transparent={false}
          visible={this.state.isVisible}

          //   onRequestClose={() => {
          //     console.log('Modal has been closed.');
          //   }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: hp('40%'),
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({isVisible: !this.state.isVisible}),
                    this.getSticker();
                }}>
                <Text
                  style={{
                    textAlign: 'right',
                    right: 10,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Close
                </Text>
              </TouchableOpacity>

              <FlatList
                horizontal={false}
                //keyExtractor={item => item._id}
                numColumns={3}
                data={this.state.stickerAll}
                renderItem={({item, index}) => {
                  return (
                    <ScrollView>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: wp('20%'),
                          //backgroundColor: 'gray',
                          height: hp('10%'),
                          alignItems: 'center',
                          //paddingHorizontal:wp('4.5%'),
                          alignSelf: 'center',
                          marginVertical: 10,
                         // borderWidth: 1,
                          borderRadius: 10,
                          //  margin:10
                        }}>
                        <TouchableOpacity
                          style={{height: hp('7%'), width: wp('20%')}}
                          onPress={() => this.sendGift(item)}>
                          <Image
                            source={{uri: item.stickerUrl}}
                            style={{height: hp('5%'), width: wp('20%')}}
                          />
                          <View
                            style={{
                              alignSelf: 'center',
                              marginVertical: hp('0.5%'),
                              flexDirection: 'row',
                            }}>
                            <Image
                              source={require('../Assetst/Images/coins.png')}
                              style={{height: 20, width: 20}}
                            />
                            <Text style={{color: 'black', fontSize: 12}}>
                              {item.coins}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  );
                }}
              />


              {/* {this.state.stickerAll.map((item, index) => (
                <ScrollView >
                  {console.log('-------------------------------.....', item)}
                  <View
                    style={{
                      flexDirection: 'row',
                      width: wp('30%'),
                      //backgroundColor: 'gray',
                      height: hp('20%'),
                      alignItems: 'center',
                      //paddingHorizontal:wp('4.5%'),
                      alignSelf: 'center',
                      marginVertical: 10,
                      borderWidth: 1,
                      borderRadius: 10,
                      //  margin:10
                    }}>
                    <TouchableOpacity
                      style={{height: hp('7%'), width: wp('20%')}}
                      onPress={() => sendGift(item)}>
                      <Image
                        //  source={{uri: item.stickerUrl}}
                        source={require('../Assetst/Images/sticker.png')}
                        style={{height: hp('5%'), width: wp('20%')}}
                      />
                      <View
                        style={{
                          alignSelf: 'center',
                          marginVertical: hp('0.5%'),
                          flexDirection: 'row',
                        }}>
                        <Image
                          source={require('../Assetst/Images/coins.png')}
                          style={{height: 20, width: 20}}
                        />
                        <Text style={{color: 'black', fontSize: 12}}>
                          {item.coins}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              ))} */}
            </View>
          </View>
        </Modal>

        <View style={{position: 'absolute', alignSelf: 'center', top: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            {
              this.state.time ? (
                <Text style={{marginLeft: 2, color: '#fff', fontSize: 18}}>
                  {this.state.hour != 0
                    ? this.state.hour +
                      ':' +
                      this.state.min +
                      ':' +
                      this.state.sec
                    : this.state.min + ':' + this.state.sec}
                </Text>
              ) : (
                <Text style={{marginLeft: 2, color: '#fff', fontSize: 18}}>
                  Connecting.....
                </Text>
              )
              // null
            }
          </View>
        </View>
      </View>
    );
  }
}

const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  },
};
