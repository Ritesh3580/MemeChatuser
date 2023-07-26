import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Pressable, AppState, Image} from 'react-native';
//import bg from '../../../assets/images/ios_bg.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import bg from '../Assetst/Images/Android-Wallpaper-Neon-Purple.jpg'


import Feather from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';

import {useRoute, useNavigation, createNavigationContainerRef, StackActions} from '@react-navigation/native';
import { pushToScreen } from '../Navigations/BottomTabNavigation';
//import {Voximplant} from 'react-native-voximplant';



export default function InCommingVideoCall ()  {

  // state ={
  //   user: null,
  //   zegoToken:'',
  //   fcmToken:'',
  //   isIncomingCall: false,
  //   messageData: null,
  //   appState : AppState.currentState,
  // }

  const [caller, setCaller] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const {call} = route.params;
  const detail = route.params.detail;
  const appData = route.params.appData;



  console.log("111111111111111111111111111111111111111111111111111111111111",appData);

  const isFocused = useIsFocused();

  
  // useEffect(() =>{
  //   this.onAppBootstrap();
  //   AppState.addEventListener('change', this._handleAppStateChange);
  //   AppState.removeEventListener('change', this._handleAppStateChange);
  // })

  //  async function onAppBootstrap(){
  //   await this.prepareBasicData();
  // }


  // async function updateFcmToken() {
  //   // Register the device with FCM
  //   await messaging().registerDeviceForRemoteMessages();
  //   // Get the token
  //   const token = await messaging().getToken();
  //   const access_token = await AsyncStorage.getItem('token');
  //   console.log('Fcm token: ', token);
  //   this.setState({
  //     fcmToken: token
  //   });
  //   axios.put(localBaseurl + 'addfcmToken', {
  //     fcmToken: token
  //   },
  //     {
  //       headers: { Authorization: `Bearer ${access_token}` }
  //     }).then(resp => {
  //       console.log('fcm token put', resp.data);
  //     }).catch(err => {
  //       console.log('fcm token put', err.response.data);
  //     })

  // };

  
  // async function prepareBasicData() {
  //   // Get fcm token
  //   await this.updateFcmToken();
  //   await this.setCurrentUser();
  //   //await this.getValue();
  //   // Generate user id
  //   // this.setState({
  //   //    userID: Math.floor(Math.random() * 1000000).toString()
  //   // })
  //   // Save the fcm token with user id to server, then you can invite someone to call by user's id
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ userID: this.state.user.userId, token: this.state.fcmToken })
  //   };
  //   const reps = await fetch(`${zego_config.serverUrl}/store_fcm_token`, requestOptions);
  //   console.log('Store fcm token reps success ');
  //   await this.updateZegoToken();
  // };

  //   async function updateFcmToken() {
  //   // Register the device with FCM
  //   await messaging().registerDeviceForRemoteMessages();
  //   // Get the token
  //   const token = await messaging().getToken();
  //   const access_token = await AsyncStorage.getItem('token');
  //   console.log('Fcm token: ', token);
  //   this.setState({
  //     fcmToken: token
  //   });
  //   axios.put(localBaseurl + 'addfcmToken', {
  //     fcmToken: token
  //   },
  //     {
  //       headers: { Authorization: `Bearer ${access_token}` }
  //     }).then(resp => {
  //       console.log('fcm token put', resp.data);
  //     }).catch(err => {
  //       console.log('fcm token put', err.response.data);
  //     })

  // };
  


 // console.log("----------------///",detail);

//   useEffect(() => {
//     setCaller(call.getEndpoints()[0].displayName);

//     call.on(Voximplant.CallEvents.Disconnected, callEvent => {
//       navigation.navigate('Contacts');
//     });

//     return () => {
//       call.off(Voximplant.CallEvents.Disconnected);
//     };
//   }, []);


 async function decline(){
    //const token = await AsyncStorage.getItem('token');

     navigation.navigate('Home');
  }   

  const onDecline = () => {
    decline();
  };


  

//  if (this.state.user && this.state.zegoToken && this.state.fcmToken != '') {
//     var appData = {
//       appID: zego_config.appID,
//       serverUrl: zego_config.serverUrl,
//       user: this.state.user,
//       zegoToken: this.state.zegoToken,
//     };
//   }

  // const onAccept = () => {
  //   pushToScreen('Home', { 'roomID': detail.notification.data.callType.roomID });
  // };

  // var killedIncomingCallRoomId = '';

  //  killedIncomingCallRoomId = detail.notification.data.callType.roomID;
  //console.log("------------------appData ",appData);

  const onAccept = () => {
  // navigation.navigate('Home', {'roomID': detail.notification.data.roomID   });
    //alert("ghgcchgh")
    console.log("...........................>callacceptgyj", detail.notification.data.roomID);
    pushToScreen('CallPage',{
      appData: appData,
      roomID : detail.notification.data.roomID
    })

    //handleIncomingCa(detail.notification.data.roomID);


  };

  async function handleIncomingCa(detaill){
    console.log("detaill.................._____",detaill);
    pushToScreen('Home',{'roomID' : detaill});
  }

  // if (killedIncomingCallRoomId != '') {
  //     onAccept(killedIncomingCallRoomId);
  // }

  // onAccept(roomID) => {
  //   console.log('Navigate to home with incoming call..........');
  //   pushToScreen('Home', { 'roomID': roomID });

  // }

  
  useEffect(() =>{
    //console.log("props.................>",detail);2
    if(detail){
      handleIncomingCallScrr(detail);
    }
  })

  function handleIncomingCallScrr(detail){
    // alert("jhjfgsiacshck");
    console.log("--------++++====",detail.notification.data);
  }
  

  return (
    <>
   
    <ImageBackground   resizeMode="cover"  source={bg}  style= {styles.bg}>
      <Image source={{uri : appData.user.imageUrl}} style={{height:100,width:100, marginTop:80, borderRadius:50}}/>
      <Text style={styles.name}>{appData.user.userId}</Text>
      {/* <Text style={styles.phoneNumber}>{appData.user.city}</Text> */}

      <View style={[styles.row, {marginTop: 'auto'}]}>
        {/* <View style={styles.iconContainer}>
          <Ionicons name="alarm" color="white" size={30} />
          <Text style={styles.iconText}>Remind me</Text>
        </View>
        <View style={styles.iconContainer}>
          <Entypo name="message" color="white" size={30} />
          <Text style={styles.iconText}>Message</Text>
        </View> */}
      </View>

      <View style={styles.row}>
        {/* Decline Button */}
        <Pressable onPress={onDecline} style={styles.iconContainer}>
          <View style={styles.iconButtonContainer}>
            <Feather name="call-end" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </Pressable>

        {/* Accept Button */}
        <Pressable onPress={onAccept} style={styles.iconContainer}>
          <View
            style={[styles.iconButtonContainer, {backgroundColor: '#00FF00'}]}>
            <Feather name="call-end" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Accept</Text>
        </Pressable>
      </View>
    </ImageBackground>

    </>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: 'white',
  },
  bg: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 50,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconText: {
    color: 'white',
    marginTop: 10,
  },
  iconButtonContainer: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },
});

//export default IncomingCallScreen;
// const navigationRef = createNavigationContainerRef()

// function pushToScreentg(...args){
//  // console.log("-----------------------push2");
//   if(navigationRef.isReady()){
//     console.log("------------------Push");
//     navigationRef.dispatch(StackActions.push(...args));
    
//   }
// }
// export{
//   navigationRef,
//   pushToScreentg
// };  
// const navigationRef = createNavigationContainerRef()
// function pushToScreen(...args){
//   if(navigationRef.isReady())
//    {
//     navigationRef.dispatch(StackActions.push(...args));
//    }
  
// }

// export {
//   pushToScreen
// }
