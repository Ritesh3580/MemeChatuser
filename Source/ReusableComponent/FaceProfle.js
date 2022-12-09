import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assetst/Constants/Colors';
const FaceProfile = props => {
  return (
    <TouchableOpacity
      style={{
        width: wp('42%'),
        height: hp('28%'),
        backgroundColor: Colors.lightGray,
        justifyContent: 'center',
        borderRadius: hp('2%'),
        borderWidth: 2,
        alignItems: 'center',
      }}
      onPress={props.vdocallBlur}>
      <ImageBackground
        source={props.img}
        resizeMode="cover"
        style={{width: wp('42%'), height: hp('28%')}}
        imageStyle={{
          borderRadius: hp('2%'),
          borderWidth: 2,
          borderColor: '#b15eff',
        }}>
        <View
          style={{
            width: wp('42%'),
            height: hp('5%'),
            justifyContent: 'center',
            padding: wp('2%'),
          }}>
          <TouchableOpacity
            style={{
              width: wp('10%'),
              height: hp('2%'),
              backgroundColor: Colors.green2,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: hp('1.5%'),
            }}>
            <Text style={{fontSize: hp('1%'), color: Colors.white}}>
              {props.t1}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: wp('42%'),
            height: hp('7%'),
            marginTop: hp('15%'),
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: wp('25%'),
              height: hp('7%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: hp('1.5%'), color: Colors.white}}>
              {props.t2}
            </Text>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Ionicons
                name="md-location-sharp"
                size={hp('2%')}
                style={{color: '#ffff'}}
              />
              <Text
                style={{
                  fontSize: hp('1.5%'),
                  marginLeft: wp('1%'),
                  color: Colors.white,
                }}>
                Kolapur
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: wp('17%'),
              height: hp('7%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: hp('5%'),
                height: hp('5%'),
                borderRadius: hp('5%'),
                backgroundColor: Colors.white,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={props.CallingScreen}>
              <Ionicons
                name="videocam-outline"
                solid
                size={hp('3%')}
                style={{color: '#b15eff'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default FaceProfile;
