import { View, Text, SafeAreaView, StatusBar, Image, KeyboardAvoidingView, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from "@react-navigation/native"
import Colors from '../Assetst/Constants/Colors';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sendUrl ="https://api.memechat.co.in/api/socialPhoneLogin";

const {height,width} = Dimensions.get('window')
export default function SignUpL({navigation}) 
{
  const route = useRoute();
  const result = route.params?.result;

  const [num, setNum] = useState(null);
  const [otpValue, setOtp] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [detailsValue, setdetailsValue] = useState(null);
  const [detailsId, setDetailId] = useState(null);
  const [data, setData] = useState('');
  const [getValue, setGetValue] = useState(true);

  console.log("--------,,,,,,,",result);

  const number = v => {
    setNum(v.nativeEvent.text);
  };


  console.log("Number......//",num);

  const [state, setState] = useState({
    phoneNumber: '',
    isLoading: false
});

  async function loginVerify(){

    setGetValue(false);
    setIsOtpSent(false);

    const emails = await AsyncStorage.getItem('fbresult');

    const mobileData = { 
      email: emails,
      phone:num
    }

    axios
    .post(sendUrl, mobileData)
    .then(async response => {
      if(response){
        navigation.navigate("OtpVerFityFB",{num : num})
      }
      console.log("resss...///////////////////",response.data);
    }).catch(err => {
      console.log("errrorrrr...............",err);
    })
    
     

    
  }
  return (
  
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar backgroundColor={'#128AD5'} />

      <View style={{flex:1,backgroundColor: '#fff'}}>
        <View style={{
            width: '100%',
            height:'68%'
        }}>

            <Image source={require('../Assetst/Images/memechat-illustration.png')}
                 resizeMode="cover"
                 style={{width:"100%",height:'80%'}}
            >

            </Image>


    <KeyboardAvoidingView behavior="padding">
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            //height: '30%',
            marginTop: '-35%',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
          }}>
          <Text
            style={{
              fontSize: 24,
              marginHorizontal: 28,
              marginVertical: 10,
              color: 'black',

              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Login withh Mobile Number
          </Text>
          <View style={styles.cunstyles1}>
            <TextInput
              style={styles.input}
              placeholder=" Mobile number"
              placeholderTextColor="#888888"
              maxLength={10}
              keyboardType="numeric"
             // value={phonenumber}
             onChange={v => number(v)}
            />
          </View>
          {/* <TouchableOpacity style={{marginTop: 30}}>
            <ButtonPress Title={'Continue'} navigateTo={loginUser} />
          </TouchableOpacity> */}

            <TouchableOpacity
            //onPress={() => onPressVerifyOtp()}
            onPress={loginVerify}
            style={{
              width: wp('90%'),
              height: hp('7%'),
              backgroundColor: Colors.lightPurples,
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: hp('4%'),
              marginTop: hp('5%'),
            }}>
            <Text
              style={{fontSize: hp('2%'), alignSelf: 'center', color: 'white'}}>
              Get OTP
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

        </View>

      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    // container: {
    //   width: wp('100%'),
    //   height: hp('100%'),
    // },
  
    input: {
      height: height / 15,
      color: '#000',
      fontSize: 15,
  
      // borderBottomColor: 'gray',
      // borderBottomWidth: 2,
      backgroundColor:Colors.lightGray,
      width: '85%',
      marginHorizontal: 10,
      marginVertical: 4,
      borderRadius:10,
      paddingLeft:20
    },
    cunstyles1: {
      alignItems: 'center',
      justifyContent: 'center',
  
      //backgroundColor: 'purple',
      //marginVertical: 10,
    },
  });