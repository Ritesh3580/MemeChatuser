import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const ReferEarn = props => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={{width: wp('25%'), height: hp('4%')}}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack('ProfileEdit')}
              style={{
                width: wp('8%'),
                height: hp('4%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="md-chevron-back" size={hp('3.2%')} color="#fff" />
              {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
            </TouchableOpacity>
          </View>
          <View
            style={{width: wp('50%'), height: hp('4%'), alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.5%'),
                color: '#fff',
                textAlignVertical: 'center',
              }}>
              Refer & Earn
            </Text>
          </View>
          <View style={{width: wp('25%'), height: hp('4%')}}></View>
        </View>

        <View
          style={{
            height: hp('28%'),
            width: wp('100%'),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp('2.8%'),
          }}>
          <Image
            source={require('../Assetst/Images/Gift.png')}
            style={{width: hp('15%'), height: hp('15%')}}
          />
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              fontSize: hp('2.5%'),
              color: '#000',
              textAlignVertical: 'center',
              marginTop: hp('1.2%'),
            }}>
            Refer & Earn
          </Text>
        </View>
        <TouchableOpacity>
          <View
            style={{
              height: hp('5%'),
              width: wp('54%'),
              backgroundColor: '#FBF2FF',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: hp('0.5%'),
              alignSelf: 'center',
              borderRadius: hp('1%'),
            }}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2%'),
                color: '#b15eff',
                textAlignVertical: 'center',
              }}>
              Referral code:MC0V496
            </Text>
          </View>
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: 'Roboto-Bold',
            fontSize: hp('2%'),
            color: '#b15eff',
            textAlign: 'center',
            marginTop: hp('1.5%'),
          }}
          numberOfLines={1}>
          Refer a friend & both of you get
        </Text>
        <Text
          style={{
            fontFamily: 'Roboto-Bold',
            fontSize: hp('2%'),
            color: '#b15eff',
            textAlign: 'center',
          }}
          numberOfLines={1}>
          memecoins of every referrals code
        </Text>
        <View
          style={{
            height: hp('19%'),
            width: wp('100%'),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp('3.5%'),
          }}>
          <Image
            source={require('../Assetst/Images/Refer&Earn.png')}
            style={{width: wp('98%'), height: hp('18%')}}
          />
        </View>

        <View
          style={{
            height: hp('10%'),
            width: wp('90%'),
            alignSelf: 'center',
            marginTop: hp('4.5%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: wp('40%'),
              height: hp('7%'),
              backgroundColor: 'white',
              borderRadius: hp('4%'),
              backgroundColor: '#b15eff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => props.navigation.goBack('City')}>
            <Text
              style={{
                color: '#ffffff',
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.2%'),
              }}>
              Invite Friends
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReferEarn;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  head: {
    width: wp('100%'),
    height: hp('6%'),
    backgroundColor: '#b15eff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
