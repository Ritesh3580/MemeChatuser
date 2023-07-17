import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  ImageBackground,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assetst/Constants/Colors';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl, localBaseurl, token} from '../config/baseurl';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {storage} from '../store/MMKV';
import axios from 'axios';
import Video from 'react-native-video';

const Splash = ({navigation}) => {
  const AnimationRef = useRef(null);

  useEffect(() =>{
    setTimeout(() =>
    {
      page();
    },2100);
  })

  const page = async e => {
    const token = await AsyncStorage.getItem('token');
    // console.log('hiiiiii', token);
    if (token) {
      axios
        .get(baseurl + 'showProfile', {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(resp => {
          // console.log(resp.data);
          storage.set('user', JSON.stringify(resp.data));
          navigation.dispatch(StackActions.replace('BottomTabNavigation'));
        })
        .catch(err => {
          // navigation.navigate('SignIn');
          navigation.dispatch(StackActions.replace('SignIn'));
          console.log('get profile error-->>', err.response?.data);
        });
      // const resp = await axios.get(localBaseurl + 'showProfile', { headers: { Authorization: `Bearer ${token}` } })
      // // console.log(resp.data);
      // if(resp.data){
      //   storage.set("user", JSON.stringify(resp.data));
      //   navigation.navigate('BottomTabNavigation');
      // }
      // else{
      //   navigation.navigate('SignIn');
      //   console.log("get profile error-->>", resp.response?.data);
      // }
      // resp.data ?
      //   storage.set("user", JSON.stringify(resp.data))
      //   :
      //   navigation.navigate('SignIn');
      //   // console.log("get profile error-->>", resp.response?.data);
      // navigation.navigate('BottomTabNavigation');
    } else {
      // navigation.navigate('SignIn');
      navigation.dispatch(StackActions.replace('SignIn'));
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} />
        {/* <ImageBackground
          source={require('../Assetst/Images/people-persons-peoples.png')}
          style={{
            width: wp('100%'),
            height: hp('100%'),
            justifyContent: 'center',
          }}>
            <View style={{backgroundColor:Colors.darkPurple, height:hp('100%'), width:wp('100%'), opacity:0.6, justifyContent: 'center',
              alignItems: 'center', }}>

      
          <TouchableOpacity
            style={{
              width: wp('100%'),
              height: hp('5%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>

            <Animatable.Image
              style={styles.logo}
              animation="slideInUp"
              delay={200}
              duration={4000}
              source={require('../Assetst/Images/logoCatch.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              width: wp('100%'),
              height: hp('6%'),
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp('4%'),
            }}
        
          >
            <Animatable.View
              animation="slideInDown"
              delay={200}
              duration={4000}
              onAnimationEnd={e => page(e)}>
             

              <Image
                resizeMode="stretch"
                source={require('../Assetst/Images/Only-Text.png')}
                style={{ width: wp('38%'), height: wp('18%') }}
              />
            </Animatable.View>
          </View>

          </View>
        </ImageBackground>  */}
        <Video
          source={require('../Assetst/video/catchsplash.mp4')}
          style={{top:0,left:0,right:0,bottom:0, position:'absolute'}}
          muted={true}
          repeat={true}
          resizeMode='cover'
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.primaryColor9,
  },
  logo: {
    width: wp('25%'),
    height: wp('25%'),
    // backgroundColor:'#09C6F9',
    // backgroundColor:'#035FCE',
    // backgroundColor:'#F1F8F9',
    // backgroundColor:'#ABB286',

    // backgroundColor:'#D0DAE0',
  },
});

export default Splash;
