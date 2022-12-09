import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localBaseurl } from '../config/baseurl';
import { useState } from 'react';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment/moment';
import SimpleToast from 'react-native-simple-toast';

const Transaction = props => {

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      showProfile();
    }
  }, [isFocused]);

  const showProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(localBaseurl + 'showProfile', { headers: { Authorization: `Bearer ${token}` } })
      .then(async res => {
        // console.log('jidsaidfsj', res.data);
        // setFriendData(res.data);
        setProfileData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("show profile err-->>", err.response.data);
        setLoading(false);
        SimpleToast.show("Something went wrong!", SimpleToast.LONG);
      })
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={{ width: wp('23%'), height: hp('4%') }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack('MyWallet')}
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
            style={{ width: wp('54%'), height: hp('4%'), alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.5%'),
                color: '#fff',
                textAlignVertical: 'center',
              }}>
              Transaction History
            </Text>
          </View>
          <View style={{ width: wp('23%'), height: hp('4%') }} />
        </View>
        <View style={{ width: wp('100%'), height: '88%' }}>
          {
            loading ?
              <View style={{justifyContent:'center',height:'100%'}}>
                <ActivityIndicator size={40} />
              </View>
              :
              <ScrollView showsVerticalScrollIndicator={false}>
                {
                  profileData?.payment_history.length == 0 ? 
                  <Text style={{color:'#aaa',fontSize:16,fontWeight:'600',textAlign:'center',marginTop:40}}>No Data found</Text>
                  :
                  profileData?.payment_history?.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        width: wp('100%'),
                        height: hp('8%'),
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomColor: '#C5D5D6',
                        borderBottomWidth: hp('0.1%'),
                      }}>
                      <View
                        style={{
                          height: hp('7%'),
                          width: wp('55%'),
                          justifyContent: 'center',
                          paddingLeft: wp('4%'),
                        }}>
                        <Text
                          style={{
                            fontSize: hp('2%'),
                            color: '#000',
                            fontWeight: 'normal',
                          }}
                          numberOfLines={1}>
                          Top up {item.coins} BB coins
                        </Text>
                        <Text
                          style={{
                            fontSize: hp('1.7%'),
                            color: '#939292',
                            fontWeight: 'normal',
                          }}>
                          {moment(item.time).format('DD/MM/YYYY, h:mm:ss a')}
                        </Text>
                      </View>

                      <View
                        style={{
                          height: hp('5%'),
                          width: wp('35%'),
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          paddingRight: wp('2.5%'),
                        }}>
                        <Text
                          style={{
                            fontSize: hp('2.2%'),
                            color: '#939292',
                            fontWeight: 'normal',
                          }}>
                          Rs.{item.price}/-
                          <Text style={{}}>  {item.status}</Text>
                        </Text>
                      </View>
                    </View>
                  ))
                }
              </ScrollView>
          }

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Transaction;

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
