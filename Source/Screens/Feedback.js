import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Assetst/Constants/Colors';
import { useIsFocused } from '@react-navigation/native';
import { localBaseurl } from '../config/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleToast from 'react-native-simple-toast';

const Feedback = props => {

  const [customerCareNumber, setCustomerCareNumber] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedBack] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      _getUserData();
      getHelpLineNumber();
    }
  }, [isFocused]);

  const _getUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    axios.get(localBaseurl + 'showProfile', { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => {
        setUserData(resp.data);
      })
      .catch(err => {
        console.log("userData -->>>", err.response?.data);
      })
  };
  const getHelpLineNumber = async () => {
    const token = await AsyncStorage.getItem('token');
    axios.get(localBaseurl + 'userGethelpline', { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => {
        // console.log(resp.data);
        setCustomerCareNumber(resp.data.getNumber[0]?.number);
      })
      .catch(err => {
        console.log("contact no-->>>", err.response?.data);
      })
  };

  const _openDialer = () => {
    if (!customerCareNumber) {
      return;
    }
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${customerCareNumber}`;
    } else {
      number = `tel:${customerCareNumber}`;
    }
    Linking.openURL(number);
  };

  const _giveFeedBack = async () => {
    if (!feedback || !userData) {
      return;
    };
    const token = await AsyncStorage.getItem('token');
    setLoading(true);
    SimpleToast.show('Please wait...');
    let body = {
      "userId": userData?._id,
      "message": feedback
    };

    axios.post(localBaseurl + 'userSendReviews', body, { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => {
        console.log("feedback-->", resp.data);
        setLoading(false);
        SimpleToast.show('Thank you for your feedback!');
        setFeedBack('');
      })
      .catch(err => {
        console.log("feedback-->", err.response.data);
        SimpleToast.show('Something went wrong!');
        setLoading(false);
      })
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              width: wp('8%'),
              height: hp('4%'),
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: wp('1%'),
            }}>
            <Ionicons
              name="md-chevron-back"
              size={hp('3.2%')}
              color="#ffffff"
            />
            {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              fontSize: hp('2.5%'),
              color: '#ffffff',
              textAlignVertical: 'center',
              paddingLeft: wp('28%'),
            }}>
            Help & Feedback
          </Text>
        </View>
        {/* <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
            marginTop: hp('2.5%'),
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.goBack('City')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Rate us
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.goBack('City')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Feedback
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.goBack('City')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Safety Center
            </Text>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() =>
              Linking.openURL('https://web.memechat.co.in/termsOfUse')
            }>
            <Text style={{ fontSize: hp('2.5%'), color: '#000000' }}>
              Terms of Service
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() =>
              Linking.openURL('https://web.memechat.co.in/privacyPolicy')
            }>
            <Text style={{ fontSize: hp('2.5%'), color: '#000000' }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 10
            // backgroundColor:'#aaa'
          }}
        >
          <View
            style={{
              // width: wp('100%'),
              // height: hp('8%'),
              // borderBottomColor: '#C5D5D6',
              // borderBottomWidth: hp('0.1%'),
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: hp('4%'),
                justifyContent: 'center',
                paddingLeft: wp('4%'),
              }}
              onPress={() => props.navigation.goBack('City')}>
              <Text style={{ fontSize: hp('2.5%'), color: '#000000' }}>
                Feedback
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder='Give feedback...'
            placeholderTextColor={"#aaa"}
            style={{
              color: '#000',
              paddingLeft: 10,
              borderColor: '#aaa',
              height: 100,
              borderWidth: 1,
              width: '65%',
              textAlignVertical: 'top',
              borderRadius: 4,
              marginLeft: 10,
              fontSize:16
            }}
            multiline
            value={feedback}
            onChangeText={(val) => setFeedBack(val)}
          />
        </View>
        {/* <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.goBack('City')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Safety Center
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.navigate('Delete')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View> */}
        <TouchableOpacity
          style={{
            backgroundColor: "#b15eff",
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 50,
            borderRadius: 2,
            elevation: 9
          }}
          onPress={loading ? () => { } : _giveFeedBack}
        >
          <Text style={{ color: '#fff', fontWeight: '600', paddingHorizontal: 20, paddingVertical: 5, fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_openDialer}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 10,
            height: 60,
            width: 60,
            borderRadius: 30,
            elevation: 6,
            backgroundColor: Colors.lightBlue,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <AntDesign name='customerservice' color={Colors.white} size={40} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Feedback;

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
  },
});
