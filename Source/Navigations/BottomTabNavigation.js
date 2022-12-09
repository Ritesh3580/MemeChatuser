import React, { Component, useEffect } from 'react';
import StyleSheet, { PermissionsAndroid, Platform } from 'react-native';
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
import Discover from '../Screens/Discover';
import ChatRoom  from '../Screens/ChatRoom';
import ZIM from 'zego-zim-react-native';
import { useZIM } from '../hooks/zim';

// ZIM.create({ appID: Number(zego_config.appID), appSign: zego_config.appSign });
// const zim = ZIM.getInstance();


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

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/ Code for APP been killed \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

// Store the RoomID in global section while the APP has been killed. 
// Then you can read it on App component call 'componentDidMount', if this variable with an empty value means it launches by the user, otherwise, launch by FCM notification.
var killedIncomingCallRoomId = '';

// Display a message while APP has been killed, trigger by FCM
async function onBackgroundMessageReceived(message) {
  // invokeApp();
  console.log("Message---->>>>>: ", message, message.data.callerUserName);
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
  console.log('Show completed.')
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
    // appData: null
  };


  componentDidMount() {
    this.onAppBootstrap();
  }

  componentWillUnmount() {
    this.messageListener;
  }

  handleIncomingCall(roomID) {
    console.log('Navigate to home with incoming call..........');
    // const userStr = storage.getString('user');
    // // console.log("USER STRING FROM STORAGE---->>>>", userStr);
    // const user = JSON.parse(userStr);
    // const zegoToken = storage.getString('zegoToken');
    // var appData = {
    //   appID: zego_config.appID,
    //   serverUrl: zego_config.serverUrl,
    //   user: user,
    //   zegoToken: zegoToken,
    // };
    // console.log("INCOMMING CALL APPDATA------------------------>>>>>>>>",appData);
    pushToScreen('Home', { 'roomID': roomID })
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
          ungrantedPermissions.push(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
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

  async onAppBootstrap() {
    await this.checkPermission();

    await this.prepareBasicData();

    await this.setupNotification();

    // If this variable comes with a non-empty value, means the APP launched by FCM notification. Then jump to incoming call logic
    if (killedIncomingCallRoomId != '') {
      this.handleIncomingCall(killedIncomingCallRoomId);
    }
  }

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
  }

  async updateFcmToken() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();
    console.log('Fcm token: ', token);
    this.setState({
      fcmToken: token
    });

  }

  async setCurrentUser() {
    // const [{ callID }, zimAction] = useZIM();
    const token = await AsyncStorage.getItem('token');
    const resp = await axios.get(localBaseurl + 'showProfile', { headers: { Authorization: `Bearer ${token}` } });
    if (resp.data) {
      this.setState({
        user: resp.data
      })
      var userInfo = { userID: resp.data.userId, userName: resp.data.fullName };
      // zimAction.login(userInfo).then(() => {
      //   console.log("ZIM login success");
      // }).catch(function (err) {
      //   // Login failed.
      //   console.log("ZIM login failed");
      // });
    } else {
      console.log("get profile error");
    }
  };

  async updateZegoToken() {
    // Obtain the token interface provided by the App Server
    const reps = await fetch(
      `${zego_config.serverUrl}/access_token?uid=${this.state.user.userId}`,
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
        console.log('User press on froeground event: ', detail)
        await notifee.cancelAllNotifications();
      } else if (type == EventType.ACTION_PRESS && detail.pressAction.id) {
        if (detail.pressAction.id == 'accept') {
          console.log('Accept the call...', detail.notification.data.roomID)
          this.handleIncomingCall(detail.notification.data.roomID);
        }
        await notifee.cancelAllNotifications();
      }
    });
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('User press on background event: ', detail)
        // await notifee.cancelNotification(detail.notification.id);
        await notifee.cancelAllNotifications();
      } else if (type == EventType.ACTION_PRESS && detail.pressAction.id) {
        if (detail.pressAction.id == 'accept') {
          console.log('Accept the call...', detail.notification.data.roomID)
          this.handleIncomingCall(detail.notification.data.roomID);
        }
        await notifee.cancelAllNotifications();
      }
    });

    // Binding FCM message callback for APP in foreground
    this.messageListener = messaging().onMessage(this.onMessageReceived);
  };
  // Receive message from FCM and display the notification
  async onMessageReceived(message) {
    // invokeApp();
    console.log("Foreground Message:---->>>> ", message);
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
  };

  getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "ChatRoom") {
      return "none";
    }
    return "flex";
  };


  HomeStack(props) {
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
      </Stack.Navigator>
    );
  }

  render() {
    if (this.state.user && this.state.fcmToken != '') {
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
            name="Offers"
            component={History}
            options={{
              // tabBarBadge: 3,
              tabBarBadgeStyle: { backgroundColor: 'blue' },
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Call us"
            component={this.MessageStack}
            initialParams={{ 'appData': appData }}
            options={({ route }) => ({
              tabBarStyle: [{ backgroundColor: '#fff' }, { display: this.getTabBarVisibility(route) }],
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
            name="Chat boat"
            component={ProfileEdit}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      );
    }
    else {
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
  navigationRef, pushToScreen
};
