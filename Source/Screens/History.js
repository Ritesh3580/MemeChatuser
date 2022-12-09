import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GirlsHistory from '../ReusableComponent/GirlsHistory';
import Colors from '../Assetst/Constants/Colors';

const History = props => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View
          style={{
            width: wp('100%'),
            height: hp('6%'),
            backgroundColor: '#b15eff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: hp('2.2%'),
              color: Colors.white,
              fontWeight: 'bold',
            }}>
            History
          </Text>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('15%'),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <GirlsHistory img={require('../Assetst/Images/Lady3.png')} />
            <GirlsHistory img={require('../Assetst/Images/Lady1.png')} />
            <GirlsHistory img={require('../Assetst/Images/Lady2.png')} />
            <GirlsHistory img={require('../Assetst/Images/Lady4.png')} />
            <GirlsHistory img={require('../Assetst/Images/Lady5.png')} />
            <GirlsHistory img={require('../Assetst/Images/Lady6.png')} />
          </ScrollView>
        </View>

        <View
          style={{
            width: wp('84%'),
            height: hp('60%'),
            backgroundColor: Colors.lightGray,
            justifyContent: 'center',
            borderRadius: hp('2%'),
            borderWidth: 2,
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: hp('1%'),
          }}>
          <ImageBackground
            source={require('../Assetst/Images/Lady3.png')}
            resizeMode="cover"
            style={{width: wp('84%'), height: hp('60%')}}
            imageStyle={{
              borderRadius: hp('2%'),
              borderWidth: 0.3,
              borderColor: '#b15eff',
            }}>
            <View
              style={{
                width: wp('84%'),
                height: hp('10%'),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp('2%'),
              }}>
              <TouchableOpacity
                style={{
                  width: hp('6%'),
                  height: hp('6%'),
                  borderRadius: hp('6%'),
                  backgroundColor: Colors.gray,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="shield-alert"
                  size={hp('3%')}
                  style={{color: Colors.white}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: hp('6%'),
                  height: hp('6%'),
                  borderRadius: hp('6%'),
                  backgroundColor: Colors.gray,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="delete"
                  size={hp('3%')}
                  style={{color: Colors.white}}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: wp('84%'),
                height: hp('18%'),
                marginTop: hp('31%'),
              }}>
              <View
                style={{
                  width: wp('84%'),
                  height: hp('9%'),
                  justifyContent: 'center',
                  paddingHorizontal: wp('2%'),
                }}>
                <Text
                  style={{
                    fontSize: hp('2.5%'),
                    color: Colors.white,
                    fontWeight: 'bold',
                  }}>
                  Rosy, 24
                </Text>

                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: hp('2%'), color: Colors.white}}>
                    Kolapur
                  </Text>
                  <Ionicons
                    name="md-location-sharp"
                    size={hp('2%')}
                    style={{color: '#ffff', marginLeft: wp('1%')}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: wp('84%'),
                  height: hp('9%'),
                  justifyContent: 'center',
                  paddingHorizontal: wp('2%'),
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: wp('48%'),
                    height: hp('9%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: wp('2%'),
                  }}>
                  <TouchableOpacity
                    style={{
                      width: wp('20%'),
                      height: hp('3%'),
                      backgroundColor: 'green',
                      borderRadius: hp('5%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: hp('1.3%'), color: Colors.white}}>
                      Online
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: wp('20%'),
                      height: hp('3%'),
                      backgroundColor: 'green',
                      borderRadius: hp('5%'),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../Assetst/Images/coins.png')}
                      style={{
                        width: hp('1.8%'),
                        height: hp('1.8%'),
                        resizeMode: 'contain',
                        borderRadius: hp('1.8%'),
                      }}
                    />
                    <Text style={{fontSize: hp('1.5%'), color: Colors.white}}>
                      {' '}
                      50/min
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: wp('36%'),
                    height: hp('9%'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: wp('7%'),
                  }}>
                  <TouchableOpacity
                    style={{
                      width: hp('5%'),
                      height: hp('5%'),
                      borderRadius: hp('5%'),
                      backgroundColor: Colors.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {/* <Ionicons
                                            name="videocam-outline"
                                            solid
                                            size={hp('3%')}
                                            style={{ color: '#b15eff', }}
                                        /> */}
                    <MaterialCommunityIcons
                      name="video"
                      size={hp('3%')}
                      style={{color: '#b15eff'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: hp('5%'),
                      height: hp('5%'),
                      borderRadius: hp('5%'),
                      backgroundColor: Colors.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {/* <Ionicons
                                            name="chat"
                                            solid
                                            size={hp('3%')}
                                            style={{ color: '#b15eff', }}
                                        /> */}
                    <MaterialCommunityIcons
                      name="chat"
                      size={hp('3%')}
                      style={{color: 'pink'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default History;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    // backgroundColor:'cyan'
  },
  head: {
    width: wp('100%'),
    height: hp('6%'),
    backgroundColor: '#b15eff',
    flexDirection: 'row',
  },
});
