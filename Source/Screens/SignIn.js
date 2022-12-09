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
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assetst/Constants/Colors';
//import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SignIn = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.lightPurples} />
        <ImageBackground
          source={require('../Assetst/Images/Splashscreen–2.png')}
          style={{
            width: wp('100%'),
            height: hp('100%'),
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: wp('100%'),
              height: hp('60%'),
              marginTop: hp('42%'),
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
                source={require('../Assetst/Images/memechatlogo.png')}
                style={{width: hp('10%'), height: hp('10%')}}
              />
            </View>
            <View
              style={{
                width: wp('100%'),
                height: hp('7%'),
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Image
                resizeMode="stretch"
                source={require('../Assetst/Images/memechat.png')}
                style={{width: wp('30%'), height: wp('12%')}}
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
                style={{marginRight: hp('1%')}}
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
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: hp('2%'),
                  color: Colors.primaryGray,
                }}>
                Sign in with
              </Text>
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
                  style={{width: wp('5%'), height: hp('2.8%')}}
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
              <Text style={{fontSize: hp('1.6%'), color: 'black'}}>
                By signing up, you agree to our {''}
                <Text
                  style={{
                    fontSize: hp('1.6%'),
                    color: Colors.lightPinks,
                    textDecorationLine: 'underline',
                  }}>
                  Privacy Policy.
                  <Text style={{fontSize: hp('1.6%'), color: 'black'}}>
                    {' '}
                    and{' '}
                    <Text
                      style={{
                        fontSize: hp('1.6%'),
                        color: Colors.lightPinks,
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
