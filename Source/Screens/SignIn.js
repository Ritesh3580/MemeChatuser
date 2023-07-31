import React, { useState, useEffect, useRef } from 'react';
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
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assetst/Constants/Colors';
//import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { 
  LoginManager, 
  AccessToken, 
  GraphRequest, 
  GraphRequestManager 
} from 'react-native-fbsdk-next';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const verifyFbGL = "https://api.catchwoo.com/api/socialLogin"


const SignIn = ({ navigation }) => {

  const _googleSignIn = async () => {
    GoogleSignin.configure({
      androidClientId: '741976163539-3mimktjgh0h70ea36qqi1rnsfqsqcdi3.apps.googleusercontent.com', // debug
      // androidClientId: '741976163539-lgrio81ud1ko2ecqutp4b2nkesv2q23p.apps.googleusercontent.com', // release
    });
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then((userInfo) => {
          console.log("GOOLE SIGNIN DATA-->>",userInfo.user)
   
          const emailUs = userInfo.user.email;

          const dataEmail ={
            email :  emailUs
          }

          axios.post(verifyFbGL,dataEmail )
          .then(async response =>{
               
                 //await AsyncStorage.setItem('token', response.data.token);
                
                 
                 if(response.data.message == "Please enter mobile number to signUp user with email and phone"){
                 await AsyncStorage.setItem('fbresult',userInfo.user.email);

                 const emails = await AsyncStorage.getItem('fbresult');
                 console.log("---------------------...............",emails);
                  SimpleToast.show("Please Enter Mobile Number ",SimpleToast.LONG);
                  navigation.navigate("SignUpL");
                  console.log("enetergyureyreyeuy");
                 }
                 else if(response.data.message == "Welcome back"){
                  SimpleToast.show("Welcome Back",SimpleToast.LONG);
                  navigation.navigate("BottomTabNavigation")
                 }


          }).catch(err => {
            SimpleToast.show("Something error occured");
            console.log("Something error", err);
          })

         
        })
          .catch((e) => {
            console.log("GOOLE SIGNIN-->" + (e));
          })
      }
      else {
        console.log("playservice error");
      }
    }).catch((e) => {
      console.log("GOOLE SIGNIN-->" + (e));
    })
  };

  const _fblogIn=()=>{
    LoginManager
    .logInWithPermissions(['public_profile','email'])
    .then(function (result) {
      if (result.isCancelled) {
        alert('Login cancelled');
      } else {
        AccessToken
          .getCurrentAccessToken()
          .then((data) => {
            let accessToken = data.accessToken;
            // alert(accessToken.toString())

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log("--====err",error)
                // alert('Error fetching data: ' + error.toString());
              } else {
                console.log("fb sign in-->",result);

                const emailUs = result.email;
                console.log("emi-0-0-",emailUs);

                const dataEmail ={
                  email :  emailUs
                }



                axios.post(verifyFbGL,dataEmail )
                .then(async response =>{
                       //console.log("reso...../////",response.data);
                     
                     //  await AsyncStorage.setItem('token',response.data.token);
                          
                       if(response.data.message == "Please enter mobile number to signUp user with email and phone"){
                       await AsyncStorage.setItem('fbresult',result.email);



                       const emails = await AsyncStorage.getItem('fbresult');
                       console.log("---------------------...............",emails);
                        SimpleToast.show("Please Enter Mobile Number ",SimpleToast.LONG);
                        navigation.navigate("SignUpL");
                        console.log("enetergyureyreyeuy");
                       }
                       else if(response.data.message == "Welcome back"){
                        SimpleToast.show("Welcome Back",SimpleToast.LONG);
                        navigation.navigate("BottomTabNavigation")
                       }


                }).catch(err => {
                  SimpleToast.show("Something error occured");
                  console.log("Something error--/", err);
                })


               // navigation.navigate("SignUpL" ,{ result: result});
                // api call
              }
            }

            const infoRequest = new GraphRequest('/me', {
              accessToken: accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
                }
              }
            }, responseInfoCallback);

            // Start the graph request.
            new GraphRequestManager()
              .addRequest(infoRequest)
              .start()

          })
      }
    }, function (error) {
      alert('Login fail with error: ' + error);
    });
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.lightPurples} />
        <ImageBackground
          source={require('../Assetst/Images/Splashscreen4.png')}
          style={{
            width: wp('100%'),
            height: hp('100%'),
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: wp('100%'),
              height: hp('60%'),
              marginTop: hp('32%'),
            }}>
            <View
              style={{
                width: wp('40%'),
                height: hp('15%'),
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={require('../Assetst/Images/logoCatch.png')}
                style={{ width: hp('15%'), height: hp('15%') }}
              />
            </View>
            <View
              style={{
                width: wp('100%'),
                height: hp('7%'),
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom:hp('8%')
              }}>
              <Image
                resizeMode="stretch"
                source={require('../Assetst/Images/Only-Text.png')}
                style={{ width: wp('50%'), height: wp('12%') }}
              />
            </View>
            {/* <View style={{ width: wp('100%'), height: hp('5%'), justifyContent: 'center', alignItems: 'center',  }}>
                            <Text style={{ color: Colors.lightPinks, fontSize: hp('3%'), fontWeight: 'bold', }}>meme chat</Text>
                        </View> */}
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginWithPhone')}
              style={{
                width: wp('96%'),
                height: hp('7%'),
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                marginTop: hp('4%'),
                borderRadius: hp('1%'),
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.primaryGrayLight,
                flexDirection: 'row',
              }}>
              <AntDesign
                name="mobile1"
                size={hp('2.5%')}
                color="black"
                style={{ marginRight: hp('1%') }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: hp('2.2%'),
                  fontWeight: 'bold',
                  alignItems: 'center',
                  marginLeft: hp('0.5%'),
                }}>
                Login with Phone no.
              </Text>
            </TouchableOpacity>
            {/* <View style={{ width: wp('100%'), height: hp('6%'), marginTop: hp('1%'), backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}> */}
            <View
              style={{
                flexDirection: 'row',
                width: wp('96s%'),
                height: hp('6%'),
                marginTop: hp('1%'),
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  backgroundColor: Colors.primaryGray,
                  height: 0.6,
                  flex: 1,
                  alignSelf: 'center',
                }}
              />
              {/* <TouchableOpacity onPress={() => navigation.navigate("Profile")}> */}
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: hp('2%'),
                  color: Colors.white,
                }}>
                Sign in with
              </Text>
              {/* </TouchableOpacity> */}
            
              <View
                style={{
                  backgroundColor: Colors.primaryGray,
                  height: 0.6,
                  flex: 1,
                  alignSelf: 'center',
                }}
              />
            </View>
            {/* </View> */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp('96%'),
                height: hp('8%'),
                marginTop: hp('0.5%'),
                alignSelf: 'center',
                padding: wp('0.5%'),
              }}>
              <TouchableOpacity
              onPress={_fblogIn}
                style={{
                  width: wp('40%'),
                  flexDirection: 'row',
                  justifyContent: 'center',
                  height: hp('6.5%'),
                  backgroundColor: Colors.primaryColor8,
                  alignItems: 'center',
                  borderRadius: hp('1.5%'),
                  borderWidth: 1,
                  borderColor: Colors.primaryGrayLight,
                }}>
                <Image
                  source={require('../Assetst/Images/Facebook.png')}
                  style={{
                    width: wp('5%'),
                    height: hp('2.8%'),
                    marginLeft: hp('2%'),
                  }}
                />
                <Text
                  style={{
                    fontSize: hp('2.2%'),
                    fontWeight: 'bold',
                    color: Colors.primaryColor2,
                    marginLeft: 10,
                  }}>
                  Facebook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={_googleSignIn}
                style={{
                  width: wp('40%'),
                  flexDirection: 'row',
                  justifyContent: 'center',
                  height: hp('6.5%'),
                  backgroundColor: Colors.primaryColor8,
                  alignItems: 'center',
                  borderRadius: hp('1.5%'),
                  borderWidth: 1,
                  borderColor: Colors.primaryGrayLight,
                }}>
                <Image
                  source={require('../Assetst/Images/google.png')}
                  style={{ width: wp('5%'), height: hp('2.8%') }}
                />
                <Text
                  style={{
                    fontSize: hp('2.2%'),
                    color: 'black',
                    fontWeight: 'bold',
                    marginLeft: 10,
                  }}>
                  Google
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: wp('96%'),
                height: hp('6%'),
                marginTop: hp('0.5%'),
                justifyContent: 'center',
                alignSelf: 'center',
                padding: wp('0.5%'),
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: hp('1.6%'), color: 'white' }}>
                By signing up, you agree to our {''}
                <Text
                  style={{
                    fontSize: hp('1.6%'),
                    color: Colors.white,
                    textDecorationLine: 'underline',
                  }}>
                  Privacy Policy.
                  <Text style={{ fontSize: hp('1.6%'), color: 'white' }}>
                    {' '}
                    and{' '}
                    <Text
                      style={{
                        fontSize: hp('1.6%'),
                        color: Colors.white,
                        textDecorationLine: 'underline',
                      }}>
                      Terms of Service
                    </Text>
                  </Text>
                </Text>{' '}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),

    // backgroundColor: Colors.primaryColor9    w
  },
});

export default SignIn;
