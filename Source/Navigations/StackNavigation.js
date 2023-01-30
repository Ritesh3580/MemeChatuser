import React, { Component } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screens/Home';
import City from '../Screens/City';
import VideoCallBlur from '../Screens/VideoCallBlur';
import LoginWithPhone from '../Screens/LoginWithPhone';
import Monthly from '../Screens/Monthly';
import Splash from '../Screens/Splash';
import SignIn from '../Screens/SignIn';
import Profile from '../Screens/Profile';
import FollowNext from '../Screens/FollowNext';
import ProfileDetails from '../Screens/ProfileDetails';
import Discover from '../Screens/Discover';
import MyWallet from '../Screens/MyWallet';
import Transaction from '../Screens/Transactions';
import BottomTabNavigation from '../Navigations/BottomTabNavigation';
import Report from '../Screens/Report';
import Setting from '../Screens/Settings';
import BlockList from '../Screens/BlockList';
import Language from '../Screens/Language';
import Feedback from '../Screens/Feedback';
import ReferEarn from '../Screens/Refer&earn';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Delete from '../Screens/Delete';
import Edit from '../Screens/exc';
import ProfileEdit from '../Screens/ProfileEdit';
import TopWeekly from '../Screens/TopWeekly';
import WaitingForAcceptCall from '../Screens/WaitingForCall';
import CallingScreen from '../Screens/CallingScreen';
import Notification from '../Screens/Notification';
import Messages1 from '../Screens/Messages1';
import SearchPerson from '../Screens/SearchPerson';
import CallPage from '../Screens/CallPage';
import HomePage from '../Screens/HomePage'
import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import MissedCall from '../Screens/MissedCall';


const Stack = createNativeStackNavigator();

class StackNavigation extends Component {
  state = {
     appData: {},
  }
  constructor(props) {
     super(props);
  }
  // getDerivedStateFromProps is invoked right before calling the render method
  static getDerivedStateFromProps(props, state) {
     if (props.appData !== state.appData) {
      // console.log(props.appData);
        return {
           appData: props.appData
        };
     }
     // Return null to indicate no change to state.
     return null;
  };
  

  render() {
    return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="LoginWithPhone"
          component={LoginWithPhone}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoCallBlur"
          component={VideoCallBlur}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Monthly"
          component={Monthly}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FollowNext"
          component={FollowNext}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileDetails"
          component={ProfileDetails}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="MyWallet"
          component={MyWallet}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Transaction"
          component={Transaction}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Settings"
          component={Setting}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
          name="BlockList"
          component={BlockList}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Language"
          component={Language}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Delete"
          component={Delete}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Refer&earn"
          component={ReferEarn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="exc"
          component={Edit}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="ProfileEdit"
          component={ProfileEdit}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="City"
          component={City}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TopWeekly"
          component={TopWeekly}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WaitingForCall"
          component={WaitingForAcceptCall}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CallingScreen"
          component={CallingScreen}
          options={{headerShown: false}}
        />
  
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
  
        {/* <Stack.Screen
          name="Messages1"
          component={Messages1}
          options={{headerShown: false}}
        /> */}
  
        <Stack.Screen
          name="SearchPerson"
          component={SearchPerson}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="CallPage"
          component={CallPage}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false}}
        />
         {/* <Stack.Screen
          name="Discover"
          // initialParams={{'appData': this.state.appData}}
          component={Discover}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    );
  }
}

const navigationRef = createNavigationContainerRef()

function pushToScreen(...args) {
  if (navigationRef.isReady()) {
     navigationRef.dispatch(StackActions.push(...args));
  }
}

export {
  StackNavigation,
  navigationRef,
  pushToScreen
};

