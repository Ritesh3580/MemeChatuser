import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assetst/Constants/Colors';
import FaceProfile from '../ReusableComponent/FaceProfle';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const nearAllHost = localBaseurl + 'getNearbyAlluser';
import {baseurl, token, localBaseurl} from '../config/baseurl';

const NearBy = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [age, setAge] = React.useState('');
  const [data, setData] = React.useState('');
  const [profile, setProfile] = React.useState('');

  useEffect(() => {
    userProfile();
  }, []);

  const userProfile = async () => {
    //console.log('user profile------');
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios
      .get(nearAllHost, {headers: {Authorization: `Bearer ${token}`}})
      .then(res => {
        // console.log('ttttttt', res.data);
        //setData(res.data);
      });
  };

  userProfile();
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={{height: hp('63%')}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: wp('100%'),
                height: hp('60'),
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {/* {data.length !== 0 &&
                data.map(val => {
                  return ( */}
              <View
                style={{
                  width: wp('50%'),
                  height: hp('30%'),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: wp('6%'),
                  marginTop: hp('1%'),
                }}>
                <TouchableOpacity
                  style={{
                    width: wp('42%'),
                    height: hp('28%'),
                    backgroundColor: Colors.lightGray,
                    justifyContent: 'center',
                    borderRadius: hp('2%'),
                    borderWidth: 2,
                    alignItems: 'center',
                    marginTop: hp('0.5%'),
                  }}
                  // onPress={navigation.navigate('ProfileDetails')}
                >
                  <ImageBackground
                    source={require('../Assetst/Images/Lady3.png')}
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
                        <Text
                          style={{
                            fontSize: hp('1%'),
                            color: Colors.white,
                          }}>
                          online
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
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: hp('1.5%'),
                              color: Colors.white,
                            }}>
                            {/* {val.FirstName} */}
                            Kriti
                          </Text>
                          <Text
                            style={{
                              fontSize: hp('1.5%'),
                              color: Colors.white,
                            }}>
                            {/* {val.age} */}
                            22
                          </Text>
                        </View>
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
                            {/* {val.city}
                             */}
                            noida
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
                          //onPress={navigation.navigate('ProfileDetails')}
                          style={{
                            width: hp('5%'),
                            height: hp('5%'),
                            borderRadius: hp('5%'),
                            backgroundColor: Colors.white,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
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
              </View>
              {/* );
                })} */}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NearBy;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('75%'),
  },
  head: {
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#b15eff',
    flexDirection: 'row',
  },
});
