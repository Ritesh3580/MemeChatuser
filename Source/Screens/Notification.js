import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Notification = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: hp('76%'),
          width: wp('100%'),
          backgroundColor: '#fff',
        }}>
        <ScrollView>
          <TouchableOpacity>
            <View
              style={{
                width: wp('100%'),
                height: hp('8%'),
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: '#C5D5D6',
                borderBottomWidth: hp('0.1%'),
                marginTop: hp('1%'),
              }}>
              <View
                style={{
                  height: hp('7%'),
                  width: wp('13%'),
                  justifyContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../Assetst/Images/girl.jpg')}
                  style={{
                    width: hp('7%'),
                    height: hp('7%'),
                    borderRadius: hp('7%'),
                  }}
                />
              </View>
              <View
                style={{
                  height: hp('9%'),
                  width: wp('40%'),
                  padding: wp('2.5%'),
                }}>
                <Text
                  style={{
                    fontSize: hp('2%'),
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  Urvashi
                </Text>
                <Text
                  style={{
                    fontSize: hp('1.5%'),
                    color: '#949894',
                    marginTop: hp('0.8%'),
                  }}
                  numberOfLines={1}>
                  Hii
                </Text>
              </View>
              <View
                style={{
                  height: hp('9%'),
                  width: wp('38%'),
                  padding: wp('2.5%'),
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: hp('1.5%'),
                    color: '#949894',
                    fontWeight: 'bold',
                  }}>
                  06/05/2022
                </Text>
                <View
                  style={{
                    width: hp('3%'),
                    height: hp('3%'),
                    borderRadius: hp('3'),
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: hp('1.5%'),
                  }}>
                  <Text style={{fontSize: hp('1.5%'), color: '#fff'}}>2</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View
              style={{
                width: wp('100%'),
                height: hp('8%'),
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: '#C5D5D6',
                borderBottomWidth: hp('0.1%'),
                marginTop: hp('1%'),
              }}>
              <View
                style={{
                  height: hp('7%'),
                  width: wp('13%'),
                  justifyContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../Assetst/Images/girl12.jpg')}
                  style={{
                    width: hp('7%'),
                    height: hp('7%'),
                    borderRadius: hp('7%'),
                  }}
                />
              </View>
              <View
                style={{
                  height: hp('9%'),
                  width: wp('40%'),
                  padding: wp('2.5%'),
                }}>
                <Text
                  style={{
                    fontSize: hp('2%'),
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  Sofia
                </Text>
                <Text
                  style={{
                    fontSize: hp('1.5%'),
                    color: '#949894',
                    marginTop: hp('0.8%'),
                  }}
                  numberOfLines={1}>
                  what are you that?
                </Text>
              </View>
              <View
                style={{
                  height: hp('9%'),
                  width: wp('38%'),
                  padding: wp('2.5%'),
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: hp('1.5%'),
                    color: '#949894',
                    fontWeight: 'bold',
                  }}>
                  01/08/2021
                </Text>
                <View
                  style={{
                    width: hp('3%'),
                    height: hp('3%'),
                    borderRadius: hp('3'),
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: hp('1.5%'),
                  }}>
                  <Text style={{fontSize: hp('1.5%'), color: '#fff'}}>4</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
