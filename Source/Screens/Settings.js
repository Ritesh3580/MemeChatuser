import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Splash from './Splash';
import axios from 'axios';
import {baseurl, localBaseurl, token} from '../config/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage } from '../store/MMKV';
import { useZIM } from '../hooks/zim';
const logoutApi = localBaseurl + 'signout';

const Setting = ({navigation}) => {
  const [switchValue, setSwitchValue] = useState(false);
  const [switchValue1, setSwitchValue1] = useState(false);
  const [switchValue2, setSwitchValue2] = useState(false);
  const [switchValue3, setSwitchValue3] = useState(false);
  const [data, setData] = useState('');
  const [{ callID }, zimAction] = useZIM();

  
  const toggleSwitch = value => {
    setSwitchValue(value);
  };

  const toggleSwitch1 = value => {
    setSwitchValue1(value);
  };
  const toggleSwitch2 = value => {
    setSwitchValue2(value);
  };
  const toggleSwitch3 = value => {
    setSwitchValue3(value);
  };

  const [color, setColor] = useState(true);
  const [myColor, setMyColor] = useState(true);

  const MyButton = () => {
    setColor(true);
    setMyColor(false);
  };
  const YourButton = () => {
    setMyColor(true);
    setColor(false);
  };
  const [myModal, setMyModal] = useState(false);

  const toggleMyMobile = () => {
    setMyModal(!myModal);
  };

  const api = () => {
    alert('LogOut successfully');
    axios
      .get(logoutApi)

      .then(async res => {
        // console.log('mai ni kr rahi logout');
        setData(res.data.message);
        await AsyncStorage.removeItem('token');
        zimAction.logout();
        storage.clearAll();
        navigation.navigate('SignIn');
      });
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={{width: wp('33%'), height: hp('4%')}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileEdit')}
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
            style={{width: wp('33%'), height: hp('4%'), alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.5%'),
                color: '#fff',
                textAlignVertical: 'center',
              }}>
              Settings
            </Text>
          </View>
          <View style={{width: wp('33%'), height: hp('4%')}}></View>
        </View>

        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}>
            <Text
              style={{fontSize: hp('2%'), color: '#000', fontWeight: 'bold'}}>
              Blur Effect
            </Text>
          </View>

          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: wp('2.5%'),
            }}>
            <Switch
              trackColor={{false: '#767577', true: '#dca6f7'}}
              thumbColor={switchValue ? '#b15eff' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={switchValue}
            />
          </View>
        </View>

        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}>
            <Text
              style={{fontSize: hp('2%'), color: '#000', fontWeight: 'bold'}}>
              Message notification
            </Text>
          </View>

          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: wp('2.5%'),
            }}>
            <Switch
              trackColor={{false: '#767577', true: '#dca6f7'}}
              thumbColor={switchValue1 ? '#b15eff' : '#f4f3f4'}
              onValueChange={toggleSwitch1}
              value={switchValue1}
            />
          </View>
        </View>

        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}>
            <Text
              style={{fontSize: hp('2%'), color: '#000', fontWeight: 'bold'}}>
              Call notification
            </Text>
          </View>

          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: wp('2.5%'),
            }}>
            <Switch
              trackColor={{false: '#767577', true: '#dca6f7'}}
              thumbColor={switchValue2 ? '#b15eff' : '#f4f3f4'}
              onValueChange={toggleSwitch2}
              value={switchValue2}
            />
          </View>
        </View>

        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}>
            <Text
              style={{fontSize: hp('2%'), color: '#000', fontWeight: 'bold'}}>
              Online Reminder
            </Text>
          </View>

          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: wp('2.5%'),
            }}>
            <Switch
              trackColor={{false: '#767577', true: '#dca6f7'}}
              thumbColor={switchValue3 ? '#b15eff' : '#f4f3f4'}
              onValueChange={toggleSwitch3}
              value={switchValue3}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('BlockList')}>
          <View
            style={{
              width: wp('100%'),
              height: hp('7%'),
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#C5D5D6',
              borderBottomWidth: hp('0.1%'),
            }}>
            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                paddingLeft: wp('4%'),
              }}>
              <Text
                style={{fontSize: hp('2%'), color: '#000', fontWeight: 'bold'}}>
                Blocklist
              </Text>
            </View>

            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: wp('2.5%'),
              }}>
              <TouchableOpacity
                style={{
                  height: hp('4%'),
                  justifyContent: 'center',
                  paddingLeft: wp('4%'),
                }}
                onPress={() => navigation.navigate('BlockList')}>
                <Ionicons
                  name="md-chevron-forward"
                  size={hp('3.2%')}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('Language')}>
          <View
            style={{
              width: wp('100%'),
              height: hp('7%'),
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#C5D5D6',
              borderBottomWidth: hp('0.1%'),
            }}>
            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                paddingLeft: wp('4%'),
              }}>
              <Text
                style={{fontSize: hp('2%'), color: '#000', fontWeight: 'bold'}}>
                Language
              </Text>
            </View>

            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: wp('2.5%'),
              }}>
              <TouchableOpacity
                style={{
                  height: hp('4%'),
                  justifyContent: 'center',
                  paddingLeft: wp('4%'),
                }}
                onPress={() => navigation.navigate('Language')}>
                <Ionicons
                  name="md-chevron-forward"
                  size={hp('3.2%')}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => navigation.navigate('Language')}>
          <View
            style={{
              width: wp('100%'),
              height: hp('7%'),
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#C5D5D6',
              borderBottomWidth: hp('0.1%'),
            }}>
            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                paddingLeft: wp('4%'),
              }}>
              <Text
                style={{fontSize: hp('2%'), color: '#000', fontWeight: 'bold'}}>
                Apply as Host
              </Text>
            </View>

            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: wp('2.5%'),
              }}>
              <TouchableOpacity
                style={{
                  height: hp('4%'),
                  justifyContent: 'center',
                  paddingLeft: wp('4%'),
                }}
                onPress={() => navigation.navigate('Language')}>
                <Ionicons
                  name="md-chevron-forward"
                  size={hp('3.2%')}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
          <View
            style={{
              width: wp('100%'),
              height: hp('7%'),
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#C5D5D6',
              borderBottomWidth: hp('0.1%'),
            }}>
            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                paddingLeft: wp('4%'),
              }}>
              <Text
                style={{fontSize: hp('2%'), color: '#000', fontWeight: 'bold'}}>
                Help & Feedback
              </Text>
            </View>

            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: wp('2.5%'),
              }}>
              <TouchableOpacity
                style={{
                  height: hp('4%'),
                  justifyContent: 'center',
                  paddingLeft: wp('4%'),
                }}
                onPress={() => navigation.navigate('Feedback')}>
                <Ionicons
                  name="md-chevron-forward"
                  size={hp('3.2%')}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMyMobile}>
          <View
            style={{
              width: wp('100%'),
              height: hp('7%'),
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#C5D5D6',
              borderBottomWidth: hp('0.1%'),
            }}>
            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                paddingLeft: wp('4%'),
              }}>
              <Text
                style={{fontSize: hp('2%'), color: '#000', fontWeight: 'bold'}}>
                Log Out
              </Text>
            </View>

            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: wp('2.5%'),
              }}>
              <TouchableOpacity
                style={{
                  height: hp('4%'),
                  justifyContent: 'center',
                  paddingLeft: wp('4%'),
                }}
                onPress={toggleMyMobile}>
                <Ionicons
                  name="md-chevron-forward"
                  size={hp('3.2%')}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}>
            <Text
              style={{fontSize: hp('2%'), color: '#000', fontWeight: 'bold'}}>
              Version
            </Text>
          </View>

          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: wp('2.5%'),
            }}>
            <Text
              style={{
                fontSize: hp('2%'),
                color: '#C5D5D6',
                fontWeight: 'normal',
              }}>
              1.0.10
            </Text>
          </View>
        </View>
      </View>

      <View style={{bottom: 0}}>
        <Modal
          isVisible={myModal}
          animationIn="slideInUp"
          // animationOutTiming={500}
          // animationInTiming={500}
          hideModalContentWhileAnimating={true}
          useNativeDriverForBackdrop={true}
          onBackdropPress={() => setMyModal(false)}
          onSwipeComplete={() => setMyModal(false)}
          swipeDirection={['down']}
          avoidKeyboard={true}
          useNativeDriver={true}
          style={{width: wp('90%')}}>
          <View
            style={{
              width: wp('85%'),
              height: hp('22%'),
              backgroundColor: 'white',
              borderRadius: hp('1%'),
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: wp('80%'),
                height: hp('8%'),
                alignSelf: 'center',
                alignItems: 'flex-start',
                marginTop: hp('2%'),
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Roboto-Bold',
                  fontSize: hp('2.6%'),
                }}>
                Log Out?
              </Text>
              <Text
                style={{
                  color: '#949894',
                  fontFamily: 'Roboto-Bold',
                  fontSize: hp('1.8%'),
                  marginTop: hp('1.5%'),
                }}>
                Are you sure want to log out?
              </Text>

              <View
                style={{
                  height: hp('8%'),
                  width: wp('80%'),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '4.8%',
                  paddingLeft: wp('0.5%'),
                  paddingRight: wp('0.5%'),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setMyModal(false);
                  }}
                  style={[
                    styles.eng,
                    {backgroundColor: color ? '#b15eff' : '#fff'},
                  ]}>
                  <Text
                    style={[styles.enter, {color: color ? '#fff' : '#b15eff'}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={api}
                  style={[
                    styles.hin,
                    {backgroundColor: myColor ? '#b15eff' : 'white'},
                  ]}>
                  <Text
                    style={[
                      styles.enter,
                      {color: myColor ? 'white' : '#b15eff'},
                    ]}>
                    Log out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  enter: {
    fontSize: hp('2%'),
    fontWeight: 'bold',

    fontFamily: 'Roboto',
  },
  eng: {
    height: hp('5%'),
    width: wp('32%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('0.9%'),
    alignSelf: 'center',
    borderColor: '#b15eff',
    // borderColor:"#8f9194",
    borderWidth: hp('0.2%'),
    // borderColor:"black",
  },
  hin: {
    height: hp('5%'),
    width: wp('32%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('0.9%'),
    alignSelf: 'center',
    borderColor: '#b15eff',

    borderWidth: hp('0.2%'),
    // borderColor:"black"
  },

  can: {
    alignItems: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: hp('1.8%'),
  },
});
