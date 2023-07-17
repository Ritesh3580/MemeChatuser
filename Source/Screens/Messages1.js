import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Messages1 = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.head}>
          <View
            style={{
              width: wp('33%'),
              height: hp('4%'),
              //backgroundColor: 'green',
            }}>
            <TouchableOpacity
              onPress={() =>navigation.goBack()}
              style={{
                width: wp('8%'),
                height: hp('4%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="md-chevron-back" size={hp('3.2%')} color="#fff" />
              
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: wp('33%'),
              height: hp('4%'),
              alignItems: 'center',
              //backgroundColor: 'pink',
            }}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.5%'),
                color: '#fff',
                textAlignVertical: 'center',
              }}>
              Notification
            </Text>
          </View>
          <View
            style={{
              width: wp('33%'),
              height: hp('4%'),
              //backgroundColor: 'purple',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingRight: wp('2%'),
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: wp('8%'),
                height: hp('4%'),
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor:'pink'
              }}></TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: hp('76%'),
            width: wp('100%'),
            backgroundColor: '#fff',
          }}>
          <ScrollView>
            <TouchableOpacity onPress={()=>navigation.navigate('AdminNotification')}>
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
                    source={require('../Assetst/Images/logoCatch.png')}
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
                    width: wp('74%'),
                    padding: wp('2.5%'),
                  }}>
                  <Text
                    style={{
                      fontSize: hp('2%'),
                      color: '#000',
                      fontWeight: 'bold',
                    }}>
                    Catchwoo Official Account
                  </Text>
                  <Text
                    style={{fontSize: hp('1.5%'), color: '#949894'}}
                    numberOfLines={1}>
                    we can assist you anytime if you have any issue
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('MissedCall')}>
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
                    source={require('../Assetst/Images/logoCatch.png')}
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
                    width: wp('74%'),
                    padding: wp('2.5%'),
                  }}>
                  <Text
                    style={{
                      fontSize: hp('2%'),
                      color: '#000',
                      fontWeight: 'bold',
                    }}>
                    Notificatons
                  </Text>
                  <Text
                    style={{fontSize: hp('1.5%'), color: '#949894'}}
                    numberOfLines={1}>
                    Missed calls
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Messages1;

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
