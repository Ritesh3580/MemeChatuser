import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseurl, localBaseurl } from '../config/baseurl';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import SimpleToast from 'react-native-simple-toast';

const BlockList = props => {

  const [isUnblocking, setIsUnblocking] = useState(false);
  const [blockedHost, setBlockedHost] = useState([]);

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
        setBlockedHost(res.data.block);
      })
      .catch(err => {
        console.log("show profile err-->>", err.response.data);
      })
  };

  const _unBlock = async (item) => {
    // setMyModal(!myModal);
    setIsUnblocking(true);
    const token = await AsyncStorage.getItem('token');

    axios.put(baseurl + "userunblockbyhostUser",
      { "block": item._id },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(resp => {
      SimpleToast.show('unblocked');
      console.log("unblock-->>", resp.data);
      showProfile();
      setIsUnblocking(false);
    })
      .catch(err => {
        SimpleToast.show('something went wrong!');
        console.log("unblock-->>", err?.response?.data);
        setIsUnblocking(false);
      })
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={{ width: wp('33%'), height: hp('4%') }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack('Settings')}
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
            style={{ width: wp('33%'), height: hp('4%'), alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.5%'),
                color: '#fff',
                textAlignVertical: 'center',
              }}>
              Block List
            </Text>
          </View>
          <View style={{ width: wp('33%'), height: hp('4%') }}></View>
        </View>
        <FlatList
          data={blockedHost}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: wp('100%'),
                height: hp('12%'),
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: '#C5D5D6',
                borderBottomWidth: hp('0.2%'),
                marginTop: hp('1%'),
              }}>
              <View
                style={{
                  height: hp('9%'),
                  width: wp('16%'),
                  justifyContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{
                    width: hp('9%'),
                    height: hp('9%'),
                    borderRadius: hp('9%'),
                  }}
                />
              </View>
              <View
                style={{
                  height: hp('9%'),
                  width: wp('38%'),
                  justifyContent: 'center',
                  paddingLeft: wp('2.5%'),
                }}>
                <Text style={{ fontSize: hp('2.2%'), color: '#000' }}>
                  {item.FirstName} {item.LastName}, {item.age}
                </Text>
                <Text style={{ fontSize: hp('1.7%'), color: '#aaa' }}>
                  {item.city}
                </Text>
              </View>
              <View
                style={{
                  height: hp('9%'),
                  width: wp('38%'),
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: wp('2%'),
                }}>
                <TouchableOpacity onPress={
                  isUnblocking ? 
                  () => {}
                  :
                  () => _unBlock(item)
                }>
                  <View
                    style={{
                      width: wp('22%'),
                      height: hp('4.4%'),
                      backgroundColor: '#66B757',
                      borderColor: '#66B757',
                      borderRadius: hp('2%'),
                      borderWidth: wp('0.2%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {
                      isUnblocking ?
                        <ActivityIndicator color={'#fff'} />
                        :
                        <Text
                          style={{
                            fontSize: hp('2%'),
                            color: '#fff',
                            margin: hp('0.5%'),
                          }}>
                          Unblock
                        </Text>
                    }
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default BlockList;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    // backgroundColor:'cyan'
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
