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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {baseurl, token, localBaseurl} from '../config/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
const selectApi = localBaseurl + 'allfinduser';
import axios from 'axios';
const followApi = localBaseurl + 'userfollow';
//const getAlluser = baseurl + 'findHostuser';
const FollowNext = ({props, navigation}) => {
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);
  const [follows, setFollows] = useState([]);
  const [next, setNext] = useState([]);
  //const { tokenIdName } = route.params;

  const followNext = n => {
    console.log(n);
  };
  const Follow = () => {
    setChecked(!checked);
  };

  const followers = f => {
    setFollows(f);
  };
  const pi = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(selectApi, {headers: {Authorization: `Bearer ${token}`}})
      .then(response => {
        setData(response.data);
      });
  };

  // const pi2 = async() => {
  //     const token= await AsyncStorage.getItem('token');
  //     axios.get(getAlluser, { headers: { "Authorization": `Bearer ${token}` } })
  //         .then((response) => {
  //            // console.log(response.data)
  //             setData(response.data)
  //         });
  // }

  useEffect(() => {
    console.log(token);
    pi();
    // pi2();
  }, []);

  //     const pi1=async()=>{
  //         const token= await AsyncStorage.getItem('token');
  //         alert('api call')
  //       axios.put( 'http://10.0.2.2:3000/api/userfollow/6294b26a752ec52564c98e23',{userId:"6295a0fd2e8695b6816d496f"}).then((res)=>{
  //         props.navigation.navigate('BottomTabNavigation')
  //       setData(res.data);
  //      // console.log(res.data)
  //   })
  //   }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.lightPurples} />
        <View
          style={{
            width: wp('100%'),
            height: hp('6%'),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            //backgroundColor: 'pink',
          }}>
          <View
            style={{
              width: wp('96%'),
              height: hp('5%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              alignSelf: 'center',
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              onPress={navigation.navigate('BottomTabNavigation')}
              style={{
                width: wp('12%'),
                height: hp('4%'),
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: hp('1%'),
              }}>
              <AntDesign name="close" color="black" size={hp('2.8%')} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: wp('100%'),
            height: hp('9%'),
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: hp('1%'),
            //backgroundColor: 'green',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: hp('3%'),
              marginLeft: hp('0.3%'),
              fontWeight: 'normal',
            }}>
            Send daily set of likes
          </Text>
          <Text
            style={{
              color: Colors.primaryGray,
              fontSize: hp('1.8%'),
              marginLeft: hp('0.3%'),
              fontWeight: 'normal',
            }}>
            Uncheck the selected profiles of you are not interested
          </Text>
        </View>
        <View>
          <ScrollView>
            <View
              style={{
                width: wp('100%'),
                height: hp('70%'),
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                // backgroundColor: 'pink',
              }}>
              {data.length !== 0 &&
                data.map(val => {
                  return (
                    <View
                      style={{
                        width: wp('40%'),
                        height: hp('20%'),
                        justifyContent: 'center',
                        marginLeft: hp('1%'),
                        alignItems: 'center',
                        marginTop: hp('2%'),
                      }}>
                      <Image
                        source={require('../Assetst/Images/girl1.png')}
                        style={{
                          width: hp('12%'),
                          height: hp('12%'),
                          borderRadius: hp('6%'),
                        }}
                      />
                      <TouchableOpacity onChange={f => followers(f)}>
                        {!checked ? (
                          <MaterialIcons
                            name="check-circle"
                            color={Colors.lightPurples}
                            size={hp('3%')}
                            style={{marginTop: hp('-2%')}}
                          />
                        ) : (
                          <Image
                            source={require('../Assetst/Images/circle.png')}
                            style={{
                              width: wp('5.5%'),
                              height: wp('5.5%'),
                              borderRadius: hp('1.5%'),
                              marginTop: hp('-2%'),
                            }}
                          />
                        )}
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: hp('2%'),
                          fontWeight: 'normal',
                          marginTop: hp('0.8%'),
                        }}>
                        {val.fullName}
                      </Text>
                    </View>
                  );
                })}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity
          style={{
            width: wp('85%'),
            height: hp('7%'),
            backgroundColor: Colors.lightPurples,
            alignSelf: 'center',
            marginTop: hp('1%'),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: hp('4%'),
          }}
          onPress={navigation.navigate('BottomTabNavigation')}>
          <Text
            style={{fontWeight: 'bold', fontSize: hp('1.8%'), color: 'white'}}>
            Follow & Next
          </Text>
        </TouchableOpacity>
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
});

export default FollowNext;
