import React, { Component } from 'react';
// import { AppNavigation } from './Source/Navigations/StackNavigation.js'
import { StackNavigation } from './Source/Navigations/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { Platform, Alert } from 'react-native';
import notifee, { AuthorizationStatus, EventType, AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { zego_config } from './Source/config/ZegoConfig';
import { storage } from './Source/store/MMKV';
import { navigationRef } from './Source/Navigations/BottomTabNavigation';
import store from './Source/store/redux_store';
import { Provider } from 'react-redux';
import './Source/config/Ignore';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ZimProvider } from './Source/hooks/zim';
import * as eva from '@eva-design/eva';



class App extends Component {
   routesInstance;
   navigationRef;
   messageListener;

   state = {
      user: null,
      zegoToken: '',
      fcmToken: '',
   };

   //////////////////////////// permission stuffs /////////////////////////

   render() {
      // console.log(appData);
      return (
         <Provider store={store}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
               <ZimProvider>
                  <NavigationContainer ref={navigationRef}>
                     <StackNavigation />
                  </NavigationContainer>
               </ZimProvider>
            </ApplicationProvider>
         </Provider>
      )
   }
}
export default App
