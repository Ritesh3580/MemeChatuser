import React, { Component, useEffect } from 'react';
import { Alert, AppState, PermissionsAndroid, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNavigationContainerRef, getFocusedRouteNameFromRoute, StackActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import Home from '../Screens/Home';
import City from '../Screens/City';
import Language from '../Screens/Language';
import Delete from '../Screens/Delete';
import History from '../Screens/History';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../Assetst/Constants/Colors';
import ProfileScreen from '../Screens/Profile';
import ProfileEdit from '../Screens/ProfileEdit';
import Messages from '../Screens/Messages';
import axios from 'axios';
import { baseurl, localBaseurl } from '../config/baseurl';
import messaging from '@react-native-firebase/messaging';
import { storage } from '../store/MMKV';
import { zego_config } from '../config/ZegoConfig';
// import { pushToScreen } from './StackNavigation';
import notifee, { AuthorizationStatus, EventType, AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import PushNotification from "react-native-push-notification";
import ChatRoom from '../Screens/ChatRoom';
import ZIM from 'zego-zim-react-native';
import { useZIM } from '../hooks/zim';
import Setting from '../Screens/Settings';
import MyWallet from '../Screens/MyWallet';
import BlockList from '../Screens/BlockList';
import { FollowsFollowers } from './TopTabNavigation.js';
import TopWeekly from '../Screens/TopWeekly';
import BackgroundTimer from 'react-native-background-timer';
import MissedCall from '../Screens/MissedCall';
import Messages1 from '../Screens/Messages1';
import AdminNotification from '../Screens/AdminNotification';


notifee.createChannel({
  id: 'callinvite',
  name: 'Call Invite',
  badge: false,
  vibration: true,
  vibrationPattern: [300, 500],
  importance: AndroidImportance.HIGH,
  visibility: AndroidVisibility.PUBLIC,
  // Check below link for get more sound \/\/\/\/\/\/\/
  // https://clideo.com/merge-audio
  // https://www.zedge.net/find/ringtones/sound-effects
  sound: 'call_invite',
});

PushNotification.createChannel({
  channelId: "missedCall",
  channelName: "Missed Call"
});

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/ Code for APP been killed \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

// Store the RoomID in global section while the APP has been killed. 
// Then you can read it on App component call 'componentDidMount', if this variable with an empty value means it launches by the user, otherwise, launch by FCM notification.
var killedIncomingCallRoomId = '';

// Display a message while APP has been killed, trigger by FCM
async function onBackgroundMessageReceived(message) {
  console.log("Message---->>>>>: ", message);
  if (message.data?.roomID) {
    killedIncomingCallRoomId = message.data.roomID;
    notifee.displayNotification({
      title: '<p style="color: #4caf50;"><b>' + '📞 ' + message.data.callerUserName + ' incoming call..' + '</span></p></b></p>',
      body: 'Tap to view contact.',
      data: { "roomID": message.data.roomID, "callType": message.data.callType },
      android: {
        channelId: 'callinvite',
        largeIcon: message.data.callerIconUrl,
        // Launch the app on lock screen
        fullScreenAction: {
          // For Android Activity other than the default:
          id: 'full_screen_body_press',
          launchActivity: 'default',
        },
        pressAction: {
          id: 'body_press',
          launchActivity: 'default',
        },
        actions: [
          {
            title: 'Denied',
            //   icon: 'https://my-cdn.com/icons/snooze.png',
            pressAction: {
              id: 'denied',
            },
          },
          {
            title: 'Accept',
            //   icon: 'https://my-cdn.com/icons/snooze.png',
            pressAction: {
              id: 'accept',
              launchActivity: 'default',
            },
          },
        ],
      },
    });
    console.log('Show completed.');
  }
  else {
    if (message.notification?.body == 'Online' || message.notification?.body == 'offline') {
    }
  }
}
// Handle message while APP has been killed
messaging().setBackgroundMessageHandler(onBackgroundMessageReceived);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

class BottomTabNavigation extends Component {
  routesInstance;
  navigationRef;
  messageListener;

  state = {
    user: null,
    zegoToken: '',
    fcmToken: '',
    isIncomingCall: false,
    messageData: null,
    appState: AppState.currentState,
  };


  componentDidMount() {
    this.onAppBootstrap();
    AppState.addEventListener('change', this._handleAppStateChange);
    // _updateStatus();
    this._updateOnlineStatus();
  };

  componentWillUnmount() {
    this.messageListener;
    AppState.removeEventListener('change', this._handleAppStateChange);
  };

  _updateOnlineStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    let header = { Authorization: `Bearer ${token}` }
    axios.put(baseurl + 'userUpdateStatusOnline', {}, { headers: header })
      .then(resp => {
        console.log("appstate -->>", resp.data);
      })
      .catch(err => {
        console.log('appstate -->>', err.response.data);
      })
  };

  _updateOfflineStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    let header = { Authorization: `Bearer ${token}` }
    axios.put(baseurl + 'userUpdateStatusOffline', {}, { headers: header })
      .then(resp => {
        console.log("appstate -->>", resp.data);
      })
      .catch(err => {
        console.log('appstate -->>', err.response.data);
      })
  };

  _handleAppStateChange = async (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      this._updateOnlineStatus();
    }
    this.setState({ appState: nextAppState });
    if (nextAppState === 'background') {
      console.log('App is in background!');
      this._updateOfflineStatus();
    }
  }

  handleIncomingCall(roomID) {
    console.log('Navigate to home with incoming call..........');
    pushToScreen('Home', { 'roomID': roomID });
  };

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
      // let grantedNotification = PermissionsAndroid.check(
      //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      // );
      const ungrantedPermissions = [];
      try {
        const isAudioGranted = await grantedAudio;
        const isVideoGranted = await grantedCamera;
        // const isNotificationGranted = await grantedNotification;
        if (!isAudioGranted) {
          ungrantedPermissions.push(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        }
        if (!isVideoGranted) {
          ungrantedPermissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
        }
        // if (!isNotificationGranted) {
        //   ungrantedPermissions.push(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        // }
      } catch (error) {
        ungrantedPermissions.push(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          // PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }
      // If not, request it
      PermissionsAndroid.requestMultiple(ungrantedPermissions).then(data => {
        console.warn('requestMultiple', data);
      });
    }
  };

  async onAppBootstrap() {
    await this.checkPermission();

    await this.prepareBasicData();

    await this.setupNotification();

    // If this variable comes with a non-empty value, means the APP launched by FCM notification. Then jump to incoming call logic
    if (killedIncomingCallRoomId != '') {
      this.handleIncomingCall(killedIncomingCallRoomId);
    }
  };

  async checkPermission() {
    // For android
    await this.grantPermissions();
    if (Platform.OS === 'android') {
      await this.checkAndroidNotificationPermission();
      await this.checkAndroidChannelPermission('callinvite');
      // await this.checkBatteryOptimization();
      // await this.checkPowerManagerRestrictions();
    }
    // For ios 
    else {
      await this.requestiOSUserPermission();
    }

  };
  async checkAndroidNotificationPermission() {
    const settings = await notifee.getNotificationSettings();

    if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permissions has been authorized');
    } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
      console.log('Notification permissions has been denied');
    }
  };
  async checkAndroidChannelPermission(channelId) {
    const channel = await notifee.getChannel(channelId);
    // console.log(">>>>>>>>", channel)

    if (!channel) {
      console.warn('Channel has not been created!');
    } else if (channel.blocked) {
      console.log('Channel is disabled');
      Alert.alert(
        'Restrictions Detected',
        'To ensure notifications are delivered, please enable notification for the app.',
        [
          // 3. launch intent to navigate the user to the appropriate screen
          {
            text: 'OK, open settings',
            onPress: async () => await notifee.openNotificationSettings(),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
    } else {
      console.log('Channel is enabled');
    }
  };
  // Need for background message
  async requestiOSUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
  async checkBatteryOptimization() {
    const batteryOptimizationEnabled = await notifee.isBatteryOptimizationEnabled();
    console.log("batteryOptimizationEnabled", batteryOptimizationEnabled)
    if (batteryOptimizationEnabled) {
      // 2. ask your users to disable the feature
      Alert.alert(
        'Restrictions Detected',
        'To ensure notifications are delivered, please disable battery optimization for the app.',
        [
          // 3. launch intent to navigate the user to the appropriate screen
          {
            text: 'OK, open settings',
            onPress: async () => await notifee.openBatteryOptimizationSettings(),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
    };
  };
  async checkPowerManagerRestrictions() {
    const powerManagerInfo = await notifee.getPowerManagerInfo();
    console.log("powerManagerInfo", powerManagerInfo.activity)
    if (powerManagerInfo.activity) {
      // 2. ask your users to adjust their settings
      Alert.alert(
        'Restrictions Detected',
        'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
        [
          // 3. launch intent to navigate the user to the appropriate screen
          {
            text: 'OK, open settings',
            onPress: async () => await notifee.openPowerManagerSettings(),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
    };
  };

  async prepareBasicData() {
    // Get fcm token
    await this.updateFcmToken();
    await this.setCurrentUser();
    // Generate user id
    // this.setState({
    //    userID: Math.floor(Math.random() * 1000000).toString()
    // })
    // Save the fcm token with user id to server, then you can invite someone to call by user's id
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID: this.state.user.userId, token: this.state.fcmToken })
    };
    const reps = await fetch(`${zego_config.serverUrl}/store_fcm_token`, requestOptions);
    console.log('Store fcm token reps success ');
    await this.updateZegoToken();
  };

  async updateFcmToken() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();
    // Get the token
    const token = await messaging().getToken();
    const access_token = await AsyncStorage.getItem('token');
    console.log('Fcm token: ', token);
    this.setState({
      fcmToken: token
    });
    axios.put(localBaseurl + 'addfcmToken', {
      fcmToken: token
    },
      {
        headers: { Authorization: `Bearer ${access_token}` }
      }).then(resp => {
        console.log('fcm token put', resp.data);
      }).catch(err => {
        console.log('fcm token put', err.response.data);
      })

  };

  async setCurrentUser() {
    const token = await AsyncStorage.getItem('token');
    const resp = await axios.get(localBaseurl + 'showProfile', { headers: { Authorization: `Bearer ${token}` } });
    // console.log("set current user====",resp.data)
    if (resp.data) {
      await AsyncStorage.setItem('uid', resp.data.uid);
      this.setState({
        user: resp.data
      })
      // console.log('ok');
    } else {
      console.log("get profile error");
    }
  };

  async updateZegoToken() {
    // Obtain the token interface provided by the App Server
    const reps = await fetch(
      `${zego_config.serverUrl}/access_token?uid=${this.state.user?.userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );
    if (reps.ok) {
      const tokenObj = await reps.json();
      console.log('Get zego token succeed');
      this.setState({
        zegoToken: tokenObj['token']
      });
      storage.set('zegoToken', tokenObj['token']);
    } else {
      console.warn('Get zego token error: ', reps.text);
    }
  };

  async setupNotification() {
    notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('User press on froeground event: ', detail);
        this.timer !== undefined ? clearTimeout(this.timer) : null;
        this.background_timer !== undefined ? BackgroundTimer.clearTimeout(this.background_timer) : null;
        await notifee.cancelAllNotifications();
      } else if (type == EventType.ACTION_PRESS && detail.pressAction.id) {
        if (detail.pressAction.id == 'accept') {
          console.log('Accept the call...', detail.notification.data.roomID);
          this.handleIncomingCall(detail.notification.data.roomID);
        }
        this.timer !== undefined ? clearTimeout(this.timer) : null;
        this.background_timer !== undefined ? BackgroundTimer.clearTimeout(this.background_timer) : null;
        await notifee.cancelAllNotifications();
      }
      else {
        const token = await AsyncStorage.getItem('token');
        this.timer = setTimeout(async () => {
          await notifee.cancelAllNotifications();
          PushNotification.localNotification({
            channelId: "missedCall",
            title: `Missed Call`,
            message: `You have a missed call from ${detail.notification?.data?.callerUserName || detail.notification?.data?.roomID || '_unknown_'}`,
            bigText: ``
          });

          axios.get(baseurl + 'getOneUserProfile/' + detail.notification?.data?.roomID,
           { headers: { Authorization: `Bearer ${token}` } })
            .then(async resp => {
              let uid = await AsyncStorage.getItem('uid');
              let data = {
                "uid": uid,
                "videocallstatus": {
                  "hostuserId": resp.data.getuser?._id,
                  "status": "missed call"
                }
              };
              // console.log("data-->>",data);
              axios.post(baseurl + 'uservideocallstatus', data,
                { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                  console.log("Post Missed call--->>", response.data);
                })
                .catch(error => {
                  console.log("Post Missed call--->>", error.response.data);
                })
                .catch(err => {
                  console.log("get one host--->>", err.response.data);
                })
            })
        }, 30000);
      }
    });
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      // console.log('on background event: ', this.background_timer);
      if (detail.notification?.data && detail.notification.data.roomID) {
        if (type === EventType.PRESS) {
          console.log('User press on background event: ', detail)
          this.background_timer !== undefined ? BackgroundTimer.clearTimeout(this.background_timer) : null;
          await notifee.cancelAllNotifications();
        } else if (type == EventType.ACTION_PRESS && detail.pressAction.id) {
          if (detail.pressAction.id == 'accept') {
            console.log('Accept the call...', detail.notification.data.roomID)
            this.handleIncomingCall(detail.notification.data.roomID);
          }
          this.background_timer !== undefined ? BackgroundTimer.clearTimeout(this.background_timer) : null;
          await notifee.cancelAllNotifications();
        } else {
          const token = await AsyncStorage.getItem('token');
          this.background_timer = BackgroundTimer.setTimeout(async () => {
            axios.get(baseurl + 'getOneUserProfile/' + detail.notification?.data?.roomID, { headers: { Authorization: `Bearer ${token}` } })
              .then(async resp => {
                let uid = await AsyncStorage.getItem('uid');
                let data = {
                  "uid": uid,
                  "videocallstatus": {
                    "hostuserId": resp.data.getuser?._id,
                    "status": "missed call"
                  }
                };
                axios.post(baseurl + 'uservideocallstatus', data,
                  { headers: { Authorization: `Bearer ${token}` } })
                  .then(response => {
                    console.log("Post Missed call---user video call>>", response.data);
                  })
                  .catch(error => {
                    console.log("Post Missed call--->>", error.response.data);
                  })
                  .catch(err => {
                    console.log("get one host--->>", err.response.data);
                  })
              })
            await notifee.cancelAllNotifications();
            PushNotification.localNotification({
              channelId: "missedCall",
              title: `Missed Call`,
              message: `You have a missed call from ${detail.notification?.data?.callerUserName || detail.notification?.data?.roomID || '_unknown_'}`,
              bigText: ``
            });
          }, 30000);
        }
      }
    });

    // Binding FCM message callback for APP in foreground
    this.messageListener = messaging().onMessage(this.onMessageReceived);
  };
  // Receive message from FCM and display the notification
  async onMessageReceived(message) {
    // invokeApp();
    console.log("Foreground Message:---->>>> ", message);
    if (message.data?.roomID) {
      notifee.displayNotification({
        title: '<p style="color: #4caf50;"><b>' + '📞 ' + message.data.callerUserName + ' incoming call..' + '</span></p></b></p>',
        body: 'Tap to view contact.',
        data: { "roomID": message.data.roomID, "callType": message.data.callType },
        android: {
          channelId: 'callinvite',
          largeIcon: message.data.callerIconUrl,
          // Launch the app on lock screen
          fullScreenAction: {
            // For Android Activity other than the default:
            id: 'full_screen_body_press',
            launchActivity: 'default',
          },
          pressAction: {
            id: 'body_press',
            launchActivity: 'default',
          },
          actions: [
            {
              title: 'Denied',
              //   icon: 'https://my-cdn.com/icons/snooze.png',
              pressAction: {
                id: 'denied',
                launchActivity: 'default',
              },
            },
            {
              title: 'Accept',
              //   icon: 'https://my-cdn.com/icons/snooze.png',
              pressAction: {
                id: 'accept',
                launchActivity: 'default',
              },
            },
          ],
        },
      });
      console.log('Show completed.')
    }
    else {
      console.log("admin foreground notification");
      if (message.notification?.body == 'online' || message.notification?.body == 'offline') {
        // PushNotification.clearAllNotifications();
      }
    }
  };

  getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "ChatRoom" ||
      routeName === "MyWallet" ||
      routeName === "Settings" ||
      routeName === "BlockList" ||
      routeName === "TopWeekly" ||
      routeName === "MissedCall" ||
      routeName === "Messages1" ||
      routeName === "AdminNotification"
    ) {
      return "none";
    }
    return "flex";
  };


  HomeStack(props) {

    // console.log(props.route.params);

        //
  //-----------------------------Sum of Messages------------------------------------//
  //

  

    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          initialParams={props.route.params}
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TopWeekly"
          initialParams={props.route.params}
          component={TopWeekly}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyWallet"
          component={MyWallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Messages1"
          component={Messages1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MissedCall"
          initialParams={props.route.params}
          component={MissedCall}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminNotification"
          initialParams={props.route.params}
          component={AdminNotification}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  MessageStack(props) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Message"
          initialParams={props.route.params}
          component={Messages}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Messages1"
          component={Messages1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MissedCall"
          initialParams={props.route.params}
          component={MissedCall}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminNotification"
          initialParams={props.route.params}
          component={AdminNotification}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  HistoryStack(props) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Offers"
          initialParams={props.route.params}
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyWallet"
          component={MyWallet}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  AccountStack(props) {
    // console.log(props.route.params);
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEdit}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Delete"
          component={Delete}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyWallet"
          component={MyWallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Setting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BlockList"
          component={BlockList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          initialParams={props.route.params}
          name="FollowsFollowers"
          component={FollowsFollowers}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };


  render() { 

    if (this.state.user && this.state.zegoToken && this.state.fcmToken != '') {
      var appData = {
        appID: zego_config.appID,
        serverUrl: zego_config.serverUrl,
        user: this.state.user,
        zegoToken: this.state.zegoToken,
      };

      // this.setState({appData: appData})
      // console.log("appData----->>>>", appData);
      return (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: '#fff' },
            tabBarInactiveTintColor: Colors.black,
            tabBarActiveTintColor: Colors.pink,
            tabBarHideOnKeyboard: true,
          }}>
          <Tab.Screen
            name="Home2"
            initialParams={{ 'appData': appData }}
            component={this.HomeStack}
            options={({ route }) => ({
              tabBarStyle: [{ backgroundColor: '#fff' }, { display: this.getTabBarVisibility(route) }],
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
            })}
          />
          <Tab.Screen
            name="HistoryStack"
            initialParams={{ 'appData': appData }}
            component={this.HistoryStack}
            options={({ route }) => ({
              tabBarStyle: [{ backgroundColor: '#fff' }, { display: this.getTabBarVisibility(route) }],
              tabBarBadgeStyle: { backgroundColor: 'blue' },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="history" color={color} size={size}/>
              ),
            })}
          // options={{
          //   // tabBarBadge: 3,
          //   tabBarBadgeStyle: { backgroundColor: 'blue' },
          //   tabBarIcon: ({ color, size }) => (
          //     <Ionicons name="heart" color={color} size={size} />
          //   ),
          // }}
          />
          <Tab.Screen
            name="Call us"
            component={this.MessageStack}
            initialParams={{ 'appData': appData }}
            options={({ route }) => ({
              tabBarStyle: [{ backgroundColor: '#fff' }, { display: this.getTabBarVisibility(route) }],
              tabBarBadge:[7],
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="md-chatbubble-ellipses-outline"
                  color={color}
                  size={size}
                />
              ),
            })}
          />
          <Tab.Screen
            name="AccountStack"
            initialParams={{ 'appData': appData }}
            component={this.AccountStack}
            options={({ route }) => ({
              tabBarStyle: [{ backgroundColor: '#fff' }, { display: this.getTabBarVisibility(route) }],
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              ),
            })}
          />
        </Tab.Navigator>
      );
    }
    else {
      // console.log(this.state.user,this.state.zegoToken,this.state.fcmToken);
      return <ActivityIndicator />
    }
  };

}


export default BottomTabNavigation;

const navigationRef = createNavigationContainerRef()

function pushToScreen(...args) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(...args));
  }
}

export {
  navigationRef,
  pushToScreen
};
