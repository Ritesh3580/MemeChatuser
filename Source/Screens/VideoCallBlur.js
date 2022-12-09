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
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const VideoCallBlur = ({navigation}) => {
  const [blur, setBlur] = useState();

  const unblur = () => {
    if (blur == 20) {
      setBlur(0);
    } else {
      setBlur(20);
    }
  };
  const unblur2 = () => {
    if (blur == 20) {
      setBlur(0);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.lightPurples} />
        <ImageBackground
          blurRadius={blur}
          source={require('../Assetst/Images/ManMobile.jpg')}
          style={{width: wp('100%'), height: hp('100%')}}>
          <View
            style={{
              width: wp('100%'),
              height: hp('17%'),
              marginTop: hp('0.2%'),
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: wp('96%'),
                height: hp('16%'),
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: wp('86%'),
                  height: hp('15%'),
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: wp('20%'),
                    height: hp('14.2%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../Assetst/Images/3.png')}
                    style={{
                      width: hp('11%'),
                      height: hp('11%'),
                      borderRadius: hp('6%'),
                    }}
                  />
                </View>
                <View
                  style={{
                    width: wp('65%'),
                    height: hp('9%'),
                    marginLeft: hp('0.8%'),
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: hp('2.2%'),
                      fontWeight: 'bold',
                      marginLeft: hp('0.8%'),
                      marginTop: hp('0.5%'),
                    }}>
                    Julie
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: wp('12%'),
                      height: hp('3%'),
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name="thumb-up"
                      size={hp('2.5%')}
                      color="white"
                      style={{marginLeft: hp('0.8%')}}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: hp('1.8%'),
                        fontWeight: 'bold',
                        marginLeft: hp('0.8%'),
                      }}>
                      21
                    </Text>
                    <View
                      style={{
                        width: wp('15%'),
                        height: hp('3%'),
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: hp('0.8%'),
                      }}>
                      <View
                        style={{
                          width: wp('5%'),
                          height: hp('3%'),
                          borderRadius: hp('2.5%'),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {/* <FontAwesome name='star' size={hp('1.5%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                        <Image
                          source={require('../Assetst/Images/map.png')}
                          style={{
                            width: hp('2.2%'),
                            height: hp('2.2%'),
                            borderRadius: hp('.1%'),
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: hp('2%'),
                          fontWeight: 'bold',
                        }}>
                        India
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: wp('8%'),
                  height: hp('5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: hp('0.5%'),
                }}
                onPress={() => navigation.navigate('BottomTabNavigation')}>
                <AntDesign name="close" color="white" size={hp('2.8%')} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: wp('100%'),
              height: hp('25%'),
              marginTop: hp('0.2%'),
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: wp('61%'),
                height: hp('17%'),
                justifyContent: 'center',
              }}></View>
            <View
              style={{
                width: wp('35%'),
                height: hp('25%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../Assetst/Images/3.png')}
                style={{width: hp('18%'), height: hp('24%')}}
              />
            </View>
          </View>

          <View
            style={{
              width: wp('100%'),
              height: hp('5%'),
              marginTop: hp('2%'),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: hp('1.8%'),
                fontWeight: 'bold',
              }}>
              Blur effect will disappear when the other side faces this camera
            </Text>
          </View>

          <TouchableOpacity
            onPressIn={unblur2}
            style={{
              width: wp('40%'),
              height: hp('6%'),
              alignSelf: 'center',
              borderRadius: hp('3%'),
              borderWidth: 2,
              borderColor: '#3cd676',
              marginTop: hp('2%'),
              backgroundColor: '#1A9637',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: hp('1.8%'),
                fontWeight: 'bold',
              }}>
              Remove
            </Text>
          </TouchableOpacity>

          <View
            style={{
              width: wp('100%'),
              height: hp('36%'),
              justifyContent: 'space-between',
              marginTop: hp('2%'),
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: wp('18%'),
                height: hp('35%'),
                alignItems: 'center',
              }}>
              {/* <TouchableOpacity style={{ width: hp('5%'), height: hp('5%'), borderRadius: hp('2.4%'), backgroundColor: 'gray', marginTop: hp('0.3%'), justifyContent: 'center', alignItems: 'center', }}>
                                <Ionicons name='person-add' size={hp('3%')} color='white' />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: hp('1.8%'), fontWeight: 'bold', marginTop: hp('0.2%') }}>Add</Text> */}

              <TouchableOpacity
                onPress={() => unblur()}
                style={{
                  width: hp('5%'),
                  height: hp('5%'),
                  borderRadius: hp('2.4%'),
                  backgroundColor: 'gray',
                  marginTop: hp('0.3%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name={blur ? 'blur-on' : 'blur-off'}
                  size={hp('3%')}
                  color="white"
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontSize: hp('1.5%'),
                  fontWeight: 'bold',
                  marginTop: hp('0.2%'),
                }}>
                Blur effect
              </Text>

              <TouchableOpacity
                style={{
                  width: hp('5%'),
                  height: hp('5%'),
                  borderRadius: hp('2.4%'),
                  backgroundColor: 'gray',
                  marginTop: hp('0.3%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather name="camera-off" size={hp('3%')} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontSize: hp('1.8%'),
                  fontWeight: 'bold',
                  marginTop: hp('0.2%'),
                }}>
                Hide
              </Text>

              {/* <View style={{ width: wp('100%'), height: hp('%'), backgroundColor: 'red' }}> */}
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('BottomTabNavigation')}
                  style={{
                    width: hp('5%'),
                    height: hp('5%'),
                    borderRadius: hp('2.4%'),
                    backgroundColor: 'gray',
                    marginTop: hp('0.3%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="closecircle" size={hp('3%')} color="white" />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    fontSize: hp('1.8%'),
                    fontWeight: 'bold',
                    marginTop: hp('0.2%'),
                  }}>
                  Cancle
                </Text>
              </View>
              {/* </View> */}
            </View>
            <View
              style={{
                width: wp('20%'),
                // height: hp('10%'),
                // backgroundColor: 'yellow',
                marginTop: hp('20%'),
                marginRight: wp('5%'),
              }}>
              <LottieView
                style={{height: hp('10%')}}
                source={require('../Assetst/Images/Lottie/giftBox.json')}
                autoPlay
                loop
              />
            </View>
          </View>
          {/* <TouchableOpacity onPress={() => unblur()}>
                        <Text>Blur Me</Text>
                    </TouchableOpacity> */}
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

export default VideoCallBlur;
