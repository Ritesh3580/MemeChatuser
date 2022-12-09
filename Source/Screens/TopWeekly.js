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
  TextInput,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assetst/Constants/Colors';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

const TopWeekly = props => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#371752'} />
        <ImageBackground
          source={require('../Assetst/Images/backGround.jpg')}
          style={{width: wp('100%'), height: hp('96%')}}>
          <View style={styles.headerContainer}>
            <View style={styles.backButton}>
              <TouchableOpacity onPress={() => props.navigation.goBack('Home')}>
                <FontAwesome5
                  name="chevron-left"
                  size={hp('2.5%')}
                  color="white"
                  style={{fontWeight: 'bold'}}
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
              <View
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
                  <Image
                    source={require('../Assetst/Images/Group1193.png')}
                    style={{
                      width: hp('8.2%'),
                      height: hp('11.3%'),
                      borderRadius: hp('1%'),
                    }}
                  />
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
                    Julie
                  </Text>
                  <View
                    style={{
                      width: wp('14%'),
                      height: hp('3.4%'),
                      flexDirection: 'row',
                      backgroundColor: '#007CCF',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      borderRadius: hp('1.8%'),
                      marginTop: hp('1%'),
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
                    <Text style={{color: 'white', marginRight: hp('0.6%')}}>
                      56
                    </Text>
                  </View>

                  {/* <View style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('0.3%') }}>
                                        <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                    </View> */}
                </View>
              </View>

              <View
                style={{
                  width: wp('30%'),
                  height: hp('29%'),
                  justifyContent: 'center',
                  marginLeft: hp('1%'),
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../Assetst/Images/Group1194.png')}
                  style={{
                    width: hp('14%'),
                    height: hp('18%'),
                    borderRadius: hp('1%'),
                  }}
                />
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
                    Julie
                  </Text>
                  <View
                    style={{
                      width: wp('14%'),
                      height: hp('3.4%'),
                      flexDirection: 'row',
                      backgroundColor: '#007CCF',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      borderRadius: hp('1.8%'),
                      marginTop: hp('1%'),
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
                    <Text style={{color: 'white', marginRight: hp('0.6%')}}>
                      56
                    </Text>
                  </View>

                  {/* <View style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('0.3%') }}>
                                        <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                    </View> */}
                </View>
              </View>

              <View
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
                  <Image
                    source={require('../Assetst/Images/Group1195.png')}
                    style={{
                      width: hp('8.2%'),
                      height: hp('11.3%'),
                      borderRadius: hp('1%'),
                    }}
                  />
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
                    Robert
                  </Text>
                  <View
                    style={{
                      width: wp('14%'),
                      height: hp('3.4%'),
                      flexDirection: 'row',
                      backgroundColor: '#007CCF',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      borderRadius: hp('1.8%'),
                      marginTop: hp('1%'),
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
                    <Text style={{color: 'white', marginRight: hp('0.6%')}}>
                      56
                    </Text>
                  </View>
                  {/* <Text style={{ color: 'white', marginRight: hp('0.6%'), marginTop: hp('1%') }}>8,23,412</Text> */}
                  {/* <View style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('0.3%') }}>
                                        <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                    </View> */}
                </View>
              </View>
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
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}>
              <View style={{width: wp('100%')}}>
                <View
                  style={{
                    width: wp('96%'),
                    height: hp('12%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: wp('20%'),
                      height: hp('12%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../Assetst/Images/6.png')}
                      style={{
                        width: hp('8%'),
                        height: hp('8%'),
                        borderRadius: hp('7%'),
                      }}
                    />
                    <View
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
                    </View>
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
                      <View style={{padding: wp('0.3%')}}>
                        <View
                          style={{
                            width: wp('32%'),
                            height: hp('3%'),
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: hp('1.5%'),
                              fontWeight: 'bold',
                              marginLeft: hp('1%'),
                            }}>
                            Lisa
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
                              56
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
                              color: Colors.primaryGray,
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
                            8,23,452
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: wp('96%'),
                    height: hp('12%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    marginTop: hp('0.7%'),
                  }}>
                  <View
                    style={{
                      width: wp('20%'),
                      height: hp('12%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../Assetst/Images/3.png')}
                      style={{
                        width: hp('8%'),
                        height: hp('8%'),
                        borderRadius: hp('7%'),
                      }}
                    />
                    <View
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
                    </View>
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
                      <View style={{padding: wp('0.3%')}}>
                        <View
                          style={{
                            width: wp('32%'),
                            height: hp('3%'),
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: hp('1.5%'),
                              fontWeight: 'bold',
                              marginLeft: hp('1%'),
                            }}>
                            Lisa
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
                              56
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
                              color: Colors.primaryGray,
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
                            8,23,452
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: wp('96%'),
                    height: hp('12%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: wp('20%'),
                      height: hp('12%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../Assetst/Images/ted.png')}
                      style={{
                        width: hp('8%'),
                        height: hp('8%'),
                        borderRadius: hp('7%'),
                      }}
                    />
                    <View
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
                    </View>
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
                      <View style={{padding: wp('0.3%')}}>
                        <View
                          style={{
                            width: wp('32%'),
                            height: hp('3%'),
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: hp('1.5%'),
                              fontWeight: 'bold',
                              marginLeft: hp('1%'),
                            }}>
                            Lisa
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
                              56
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
                              color: Colors.primaryGray,
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
                            8,23,452
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: wp('96%'),
                    height: hp('12%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: wp('20%'),
                      height: hp('12%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../Assetst/Images/4.png')}
                      style={{
                        width: hp('8%'),
                        height: hp('8%'),
                        borderRadius: hp('7%'),
                      }}
                    />
                    <View
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
                    </View>
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
                      <View style={{padding: wp('0.3%')}}>
                        <View
                          style={{
                            width: wp('32%'),
                            height: hp('3%'),
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: hp('1.5%'),
                              fontWeight: 'bold',
                              marginLeft: hp('1%'),
                            }}>
                            Lisa
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
                              56
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
                              color: Colors.primaryGray,
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
                            8,23,452
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: wp('96%'),
                    height: hp('12%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: wp('20%'),
                      height: hp('12%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../Assetst/Images/5.png')}
                      style={{
                        width: hp('8%'),
                        height: hp('8%'),
                        borderRadius: hp('7%'),
                      }}
                    />
                    <View
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
                    </View>
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
                      <View style={{padding: wp('0.3%')}}>
                        <View
                          style={{
                            width: wp('32%'),
                            height: hp('3%'),
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: hp('1.5%'),
                              fontWeight: 'bold',
                              marginLeft: hp('1%'),
                            }}>
                            Lisa
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
                              56
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
                              color: Colors.primaryGray,
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
                            8,23,452
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: wp('96%'),
                    height: hp('12%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: wp('20%'),
                      height: hp('12%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../Assetst/Images/2.png')}
                      style={{
                        width: hp('8%'),
                        height: hp('8%'),
                        borderRadius: hp('7%'),
                      }}
                    />
                    {/* <View style={{ width: wp('9%'), height: hp('2%'), backgroundColor: Colors.lightPinks, justifyContent: 'center', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('-2%') }}>
                                            <Text style={{ color: 'white', marginRight: hp('0.6%'),fontSize: hp('1.2%'), }}>live</Text>
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
                      <View style={{padding: wp('0.3%')}}>
                        <View
                          style={{
                            width: wp('32%'),
                            height: hp('3%'),
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: hp('1.5%'),
                              fontWeight: 'bold',
                              marginLeft: hp('1%'),
                            }}>
                            Lisa
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
                              56
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
                              color: Colors.primaryGray,
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
                            8,23,452
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    width: wp('96%'),
                    height: hp('12%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      width: wp('20%'),
                      height: hp('12%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../Assetst/Images/6.png')}
                      style={{
                        width: hp('8%'),
                        height: hp('8%'),
                        borderRadius: hp('7%'),
                      }}
                    />
                    {/* <View style={{ width: wp('9%'), height: hp('2%'), backgroundColor: Colors.lightPinks, justifyContent: 'center', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('-2%') }}>
                                            <Text style={{ color: 'white', marginRight: hp('0.6%'),fontSize: hp('1.2%'), }}>live</Text>
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
                      <View style={{padding: wp('0.3%')}}>
                        <View
                          style={{
                            width: wp('32%'),
                            height: hp('3%'),
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: hp('1.5%'),
                              fontWeight: 'bold',
                              marginLeft: hp('1%'),
                            }}>
                            Lisa
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
                              56
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
                              color: Colors.primaryGray,
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
                            8,23,452
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
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
