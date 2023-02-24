import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {List} from 'react-native-paper';
//import Accordion from 'react-native-collapsible-accordion';
//import {Accordion} from 'react-native-accordion';
import { AntDesign } from 'react-native-vector-icons/AntDesign';
import { Divider, Layout, ListItem } from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';


import Messages1 from './Messages1';
import Notification from './Notification';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useZIM } from '../hooks/zim';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { storage } from '../store/MMKV';
import { localBaseurl } from '../config/baseurl';
import Colors from '../Assetst/Constants/Colors';
import moment from 'moment';


const timestampToTime = (timestamp) => {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
};

const RightBox = (props) => (
  <Layout style={{ direction: "rtl" }}>
    <Text>{props.text}</Text>
    {props.notify !== 1 && <Icon name='bell-off-outline' fill='#a5a5a5' style={{ width: 15, height: 15 }} />}
  </Layout>
);

const LeftBox = ({ item }) => (
  <View style={styles.leftBox}>
    {item.unreadMessageCount > 0 &&
      (item.notificationStatus == 1 ?
        <View style={styles.point}>
          <Text style={styles.pointNumber}>{item.unreadMessageCount}</Text>
        </View> :
        <View style={styles.min}></View>)
    }

    <Image
      style={styles.avatar}
      source={{
        uri: "item.conversationAvatarUrl",
      }} />
    {/*<Avatar*/}
    {/*    size={42}*/}
    {/*    name={`${item.conversationName + item.conversationID}`}*/}
    {/*    variant='beam'*/}
    {/*    colors={['#E3D88C', '#7BAEF3', '#C08FEF', '#EF9F9F', '#73CAAE']}*/}
    {/*/>*/}
  </View>

);

const Messages = props => {
  // const Tab = createMaterialTopTabNavigator();
  const [loading, setLoading] = React.useState(true);
  const [hostData, setHostData] = React.useState(null);

  const [state, zimAction] = useZIM();

  useEffect(() => {
    zimAction.queryConversationList();
    findAllHost()
  }, []);

  

   MessageList=state.convs;
   add=MessageList.map((item)=>{
    return(
        item.unreadMessageCount
        )
      })

       sum=0;
  for(let i=0; i<add.length; i += 1) {
    sum += add[i]
  }

  //console.log("sum===============================sum",sum)



  async function findAllHost() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(localBaseurl + 'findHostuser', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async res => {
        // console.log("ALL Hosts---->>>>>>", res.data);
        setHostData(res.data);
        setLoading(false);
        storage.set('AllHost', JSON.stringify(res.data));
      })
      .catch(err => {
        console.log('get all host error---->>>>', err.response.data);
        setLoading(false);
      });
  };

  const lastMessage = item => {
    return item.lastMessage && item.lastMessage.message
      ? item.lastMessage.message.length > 20
        ? item.lastMessage.message.slice(0, 20) + '...'
        : item.lastMessage.message
      : '';
  };

  const intoChat = (item) => {
    const pressedHostData = hostData?.find(host=> host.userId == item.senderUserID);
    // console.log(pressedHostData);
    props.route.params['user'] = pressedHostData;
      // console.log(props.route.params);
    const convInfo = {
      userData: props.route.params,
      id: item.conversationID,
      type: item.type,
      name: item.conversationName
    };
    zimAction.clearConversationUnreadMessageCount(convInfo.id, convInfo.type).then(() => {
      props.navigation.navigate('ChatRoom', convInfo);
    });
  }

  const renderItem = ({ item, index }) => (
    <ListItem
      onPress={() => intoChat(item)}
      title={`${item.conversationName || item.conversationID}`}
      description={lastMessage(item)}
      accessoryLeft={<LeftBox item={item} />}
      accessoryRight={<RightBox notify={item.notificationStatus} text={item.lastMessage &&  moment(item.lastMessage.timestamp).format('DD/MM/YYYY, hh:mm a')   || ''} />}
    />
  );

  
  //
  //-----------------------------Sum of Messages------------------------------------//
  //
  let MessageList=state.convs;
  let add=MessageList.map((item)=>{
    return(
        item.unreadMessageCount
        )
      })

  let sum=0;
  for(let i=0; i<add.length; i += 1) {
    sum += add[i]
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <View
            style={{
              width: wp('33%'),
              height: hp('4%'),
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
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
              Messages
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
              onPress={() => props.navigation.navigate('Messages1')}
              style={{
                width: wp('8%'),
                height: hp('4%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="notifications" size={hp('3.2%')} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('88%'),
          }}>
          {
            loading ?
              <ActivityIndicator size={30} color={Colors.lightBlue} style={{marginTop:'20%'}} />
              :
              <FlatList
                data={state.convs}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
              />
              // <>
              // </>
          }


         

          {/* <TouchableOpacity>
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
                    <Text style={{ fontSize: hp('1.5%'), color: '#fff' }}>2</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Messages;

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

  wrapDropDownHeader: {
    height: 50,
    width: wp('100%'),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    position: 'relative',
  },
  context: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  leftBox: {
    position: 'relative'
  },
  rightBox: {
    flexDirection: 'column'
  },
  point: {
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    right: 0,
    zIndex: 999
  },
  pointNumber: {
    color: "white",
    fontWeight: '700',
    alignSelf: 'center',
  },
  min: {
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    zIndex: 999
  },
  avatar: {
    height: 60,
    width: 60
  }
});
