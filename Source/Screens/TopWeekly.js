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
  TextInput,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assetst/Constants/Colors';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { baseurl } from '../config/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';

// const Stack = createNativeStackNavigator();

const TopWeekly = props => {

  const [topHost, setTopHost] = useState([]);
  const [loading, setLoading] = useState(true);
  const appData = props.route.params.appData;

  const isFocused = useIsFocused();


  useEffect(() => {
    if (isFocused) {
      _getTopHost();
    }
  }, [isFocused]);

  const _getTopHost = async () => {

    const token = await AsyncStorage.getItem('token');
    axios.get(baseurl + 'findTopHost', { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => {
         console.log("--------host user...........",resp.data.hostuser);
        setTopHost(resp.data.hostuser);
        setLoading(false);
      })
      .catch(err => {
        console.log("TOP HOST--->>>", err.response.data);
        setLoading(false);
      })
  };

  const _navToProfile = (item) => {
    let navData = {
      appData: appData,
      roomID: props.route?.params?.roomID,
      user: item,
    };
    props.navigation.navigate('ProfileDetails', navData);
  };



  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#371752'} />
        {
          loading ?
            <ActivityIndicator style={{ marginTop: heightPercentageToDP(45) }} size={40} />
            :
            <ImageBackground
              source={require('../Assetst/Images/backGround.jpg')}
              style={{ width: wp('100%'), height: hp('96%') }}>
              <View style={styles.headerContainer}>
                <View style={styles.backButton}>
                  <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <FontAwesome5
                      name="chevron-left"
                      size={hp('2.5%')}
                      color="white"
                      style={{ fontWeight: 'bold' }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: hp('2.5%'),
                      fontWeight: 'bold',
                    }}>
                    Top Weekly
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: wp('100%'),
                  height: hp('31%'),
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: wp('96%'),
                    height: hp('29%'),
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  {
                    topHost.length >= 2 &&
                    <TouchableOpacity
                      onPress={() => _navToProfile(topHost[1])}
                      style={{
                        width: wp('28%'),
                        height: hp('27%'),
                        justifyContent: 'center',
                        marginLeft: hp('1%'),
                        alignItems: 'center',
                        marginTop: hp('1.8%'),
                      }}>
                      <View
                        style={{
                          width: wp('20%'),
                          height: hp('14.2%'),
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: hp('1.8%'),
                        }}>
                        {/* <Image
                        source={require('../Assetst/Images/Group1193.png')}
                        style={{
                          width: hp('8.2%'),
                          height: hp('11.3%'),
                          borderRadius: hp('1%'),
                        }}
                      /> */}
                        <ImageBackground
                          source={require('../Assetst/Images/crown2.png')}
                          style={{
                            width: hp('10.1%'),
                            height: hp('14%'),
                            borderRadius: hp('1%'),
                          }}
                        >
                          <Image
                            style={{
                              marginTop:hp('4.4%'),
                              width: hp('9%'),
                              height: hp('9%'),
                              borderRadius: hp('14%'),
                              alignSelf:'center'
                            }}
                            // source={require('../Assetst/Images/Group1193.png')}
                            source={{ uri: topHost[1].userImage }}
                            // source={{ uri: 'https://kickrproject.s3.amazonaws.com/b781b318-9c40-4987-b3cc-233f958f62e6.jpeg' }}

                          />
                        </ImageBackground>
                      </View>
                      <View
                        style={{
                          width: wp('20%'),
                          height: hp('10%'),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: hp('2%'),
                            fontWeight: 'normal',
                            marginTop: hp('0.8%'),
                          }}>
                          {topHost[1].FirstName}
                        </Text>
                        <View
                          style={{
                            // width: wp('14%'),
                            height: hp('3.4%'),
                            flexDirection: 'row',
                            backgroundColor: '#007CCF',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            borderRadius: hp('1.8%'),
                            marginTop: hp('1%'),
                            paddingHorizontal: 5
                          }}>
                          <View
                            style={{
                              width: wp('5%'),
                              height: hp('3%'),
                              borderRadius: hp('2.5%'),
                              backgroundColor: 'yellow',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {/* <FontAwesome name='star' size={hp('2%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                            <Image
                              source={require('../Assetst/Images/star.png')}
                              style={{
                                width: hp('2.2%'),
                                height: hp('2.2%'),
                                borderRadius: hp('.1%'),
                              }}
                            />
                          </View>
                          <Text style={{ color: 'white', marginLeft: 5 }}>
                            {topHost[1].host_balance}
                          </Text>
                        </View>

                        {/* <View style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('0.3%') }}>
                                        <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                    </View> */}
                      </View>
                    </TouchableOpacity>
                  }

                  {
                    topHost.length >= 1 &&
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => _navToProfile(topHost[0])}
                      style={{
                        width: wp('30%'),
                        height: hp('29%'),
                        justifyContent: 'center',
                        marginLeft: hp('1%'),
                        alignItems: 'center',
                      }}>
                      <ImageBackground
                        source={require('../Assetst/Images/crown1.png')}
                        style={{
                          width: hp('14%'),
                          height: hp('18%'),
                          borderRadius: hp('18%'),
                          justifyContent:'center',
                          alignItems:'center',
                          overflow:'hidden'
                        }}
                      >
                        <Image
                          style={{
                            marginTop: hp('3.8%'),
                            width: hp('13%'),
                            height: hp('13%'),
                            borderRadius: hp('18%'),
                            alignSelf:'center'
                            // overflow:'hidden'
                            // alignSelf:'center',

                          }}
                          // source={require('../Assetst/Images/Group1193.png')}
                          source={{uri: topHost[0].userImage}}
                          // source={{ uri: 'https://kickrproject.s3.amazonaws.com/b781b318-9c40-4987-b3cc-233f958f62e6.jpeg' }}
                        />
                      </ImageBackground>
                      <View
                        style={{
                          width: wp('20%'),
                          height: hp('10%'),
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: hp('0.1%'),
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: hp('2%'),
                            fontWeight: 'normal',
                            marginTop: hp('0.8%'),
                          }}>
                          {topHost[0].FirstName}
                        </Text>
                        <View
                          style={{
                            // width: wp('14%'),
                            height: hp('3.4%'),
                            flexDirection: 'row',
                            backgroundColor: '#007CCF',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            borderRadius: hp('1.8%'),
                            marginTop: hp('1%'),
                            paddingHorizontal: 5
                          }}>
                          <View
                            style={{
                              width: wp('5%'),
                              height: hp('3%'),
                              borderRadius: hp('2.5%'),
                              backgroundColor: 'yellow',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {/* <FontAwesome name='star' size={hp('2%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                            <Image
                              source={require('../Assetst/Images/star.png')}
                              style={{
                                width: hp('2.2%'),
                                height: hp('2.2%'),
                                borderRadius: hp('.1%'),
                              }}
                            />
                          </View>
                          <Text style={{ color: 'white', marginLeft: 5 }}>
                            {topHost[0].host_balance}
                          </Text>
                        </View>

                        {/* <View style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('0.3%') }}>
                                        <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                    </View> */}
                      </View>
                    </TouchableOpacity>
                  }

                  {
                    topHost.length >= 3 &&
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => _navToProfile(topHost[2])}
                      style={{
                        width: wp('28%'),
                        height: hp('27%'),
                        justifyContent: 'center',
                        marginLeft: hp('1%'),
                        alignItems: 'center',
                        marginTop: hp('1.8%'),
                      }}>
                      <View
                        style={{
                          width: wp('20%'),
                          height: hp('14.2%'),
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: hp('1.8%'),
                        }}>
                        <ImageBackground
                          source={require('../Assetst/Images/crown3.png')}
                          style={{
                            width: hp('9%'),
                            height: hp('12.5%'),
                            borderRadius: hp('18%'),
                          }}
                        >
                          <Image
                            style={{
                              marginTop: hp('4%'),
                              width: hp('8%'),
                              height: hp('8%'),
                              borderRadius: hp('12%'),
                              alignSelf:'center'
                            }}
                            // source={require('../Assetst/Images/Group1193.png')}
                            source={{ uri: topHost[2].userImage }}
                            // source={{ uri: 'https://kickrproject.s3.amazonaws.com/b781b318-9c40-4987-b3cc-233f958f62e6.jpeg' }}
                          />
                        </ImageBackground>
                        {/* <Image
                        source={require('../Assetst/Images/Group1195.png')}
                        style={{
                          width: hp('8.2%'),
                          height: hp('11.3%'),
                          borderRadius: hp('1%'),
                        }}
                      /> */}
                      </View>
                      <View
                        style={{
                          width: wp('20%'),
                          height: hp('10%'),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: hp('2%'),
                            fontWeight: 'normal',
                            marginTop: hp('0.8%'),
                          }}>
                          {topHost[2].FirstName}
                        </Text>
                        <View
                          style={{
                            // width: wp('14%'),
                            height: hp('3.4%'),
                            flexDirection: 'row',
                            backgroundColor: '#007CCF',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            borderRadius: hp('1.8%'),
                            marginTop: hp('1%'),
                            paddingHorizontal: 5
                          }}>
                          <View
                            style={{
                              width: wp('5%'),
                              height: hp('3%'),
                              borderRadius: hp('2.5%'),
                              backgroundColor: 'yellow',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {/* <FontAwesome name='star' size={hp('2%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                            <Image
                              source={require('../Assetst/Images/star.png')}
                              style={{
                                width: hp('2.2%'),
                                height: hp('2.2%'),
                                borderRadius: hp('.1%'),
                              }}
                            />
                          </View>
                          <Text style={{ color: 'white', marginLeft: 5 }}>
                            {topHost[2].host_balance}
                          </Text>
                        </View>
                        {/* <Text style={{ color: 'white', marginRight: hp('0.6%'), marginTop: hp('1%') }}>8,23,412</Text> */}
                        {/* <View style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('0.3%') }}>
                                        <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                    </View> */}
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              </View>

              <View
                style={{
                  width: wp('100%'),
                  height: hp('58%'),
                  marginTop: hp('1%'),
                  backgroundColor: Colors.primaryColor8,
                  borderTopLeftRadius: hp('1%'),
                  borderTopRightRadius: hp('1%'),
                //  backgroundColor:'red'
                }}>
                <ScrollView
                  showsVerticalScrollIndicator={true}
                  scrollEnabled={true}
                  >
                  {
                    topHost.filter((item, index) => index > 0).map((item, index) => (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => _navToProfile(item)}
                        key={index}
                        style={{
                          width: wp('96%'),
                          height: hp('12%'),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingRight: 5,
                         
                        }}>
                        <View
                          style={{
                            width: wp('20%'),
                            height: hp('12%'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                           // backgroundColor:'green'
                          }}>
                          {
                            item.userImage ?

                              <Image
                                source={ { uri: item.userImage } }
                                style={{
                                  width: hp('8%'),
                                  height: hp('8%'),
                                  borderRadius: hp('7%'),
                               
                                }}
                              />
                              :
                              <View
                                style={{
                                  width: hp('8%'),
                                  height: hp('8%'),
                                  borderRadius: hp('7%'),
                                  borderWidth: 0.5
                                }}
                              />
                          }
                          {/* <View
                            style={{
                              width: wp('9%'),
                              height: hp('2%'),
                              backgroundColor: Colors.lightPinks,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: hp('1.8%'),
                              marginTop: hp('-2%'),
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                marginRight: hp('0.6%'),
                                fontSize: hp('1.2%'),
                              }}>
                              live
                            </Text>
                          </View> */}
                        </View>
                        <View
                          style={{
                            width: wp('40%'),
                            height: hp('12%'),
                            marginLeft: hp('0.5%'),
                            justifyContent: 'center',
                            
                          }}>
                          <View
                            style={{
                              width: wp('35%'),
                              height: hp('8%'),
                              flexDirection: 'row',
                              alignSelf: 'center',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <View style={{ padding: wp('0.3%') }}>
                              <View
                                style={{
                                  // width: wp('32%'),
                                  height: hp('3%'),
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: 'black',
                                    fontSize: hp('1.5%'),
                                    fontWeight: 'bold',
                                    marginLeft: hp('1%'),
                                    left: -5,
                                  }}>
                                  {item.FirstName} {item.LastName}
                                </Text>
                                <View
                                  style={{
                                    width: wp('10%'),
                                    height: hp('2.5%'),
                                    flexDirection: 'row',
                                    backgroundColor: '#007CCF',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    borderRadius: hp('1.8%'),
                                    alignSelf: 'center',
                                  }}>
                                  <View
                                    style={{
                                      width: wp('4%'),
                                      height: hp('2%'),
                                      borderRadius: hp('2.5%'),
                                      backgroundColor: 'yellow',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      alignSelf: 'center',
                                    }}>
                                    {/* <FontAwesome name='star' size={hp('1.5%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                                    <Image
                                      source={require('../Assetst/Images/star.png')}
                                      style={{
                                        width: hp('1.8%'),
                                        height: hp('1.8%'),
                                        borderRadius: hp('.1%'),
                                      }}
                                    />
                                  </View>
                                  <Text
                                    style={{
                                      color: 'white',
                                      marginRight: hp('0.6%'),
                                      fontSize: hp('1%'),
                                    }}>
                                    {item.hostuser_fees}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  width: wp('32%'),
                                  height: hp('3%'),
                                  justifyContent: 'space-between',
                                  marginTop: hp('0.3%'),
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: Colors.gray,
                                    fontSize: hp('1.5%'),
                                    fontWeight: 'bold',
                                    marginLeft: hp('1%'),
                                  }}>
                                  Recived
                                </Text>

                                <Text
                                  style={{
                                    color: Colors.lightPinks,
                                    marginRight: hp('0.6%'),
                                    fontSize: hp('1.3%'),
                                  }}>
                                  {item.host_balance}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </ScrollView>
              </View>
            </ImageBackground>
        }

      {/* <View style={{backgroundColor:'red'}}>
        <Text> {topHost[1].FirstName}</Text>
       </View>

       <View style={{backgroundColor:'red'}}>
        <Text> {topHost[1].FirstName}</Text>
       </View> */}
      </View>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.primaryColor8,
  },
  headerContainer: {
    width: wp('100%'),
    height: hp('6%'),
    // marginTop:hp('0.8%')
    // alignSelf:'center',
    // backgroundColor: Colors.lightPurples
  },
  backButton: {
    flexDirection: 'row',
    width: wp('60%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: hp('2%'),
  },
});

export default TopWeekly;
