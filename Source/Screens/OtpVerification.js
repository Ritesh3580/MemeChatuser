import { View, Text, SafeAreaView, StatusBar, ImageBackground, VirtualizedList, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView , Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Assetst/Constants/Colors'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import axios from 'axios';
const apiUrl = localBaseurl + 'login_with_phone';
import { localBaseurl } from '../config/baseurl';
import SimpleToast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Use } from 'react-native-svg';

const verifyOtpUrl = localBaseurl + 'verifyOTP';



const alreadyApi = localBaseurl + 'isAlreadyRegistered';

const { height, width } = Dimensions.get('window');

export default function OtpVerification({route,navigation}) {

  const [state, setState] = useState({
    otp: '',
    isLoading: false
});

const [counter, setCounter] = React.useState(30);

 // const predata = route.params.newRusult;

  const [detailsID , setDetailId] = useState(route.params.newRusult);

 
  const num = route.params.num;
// const details = route.params;

   //  setDetailId(details);
 

  console.log("predatat...............++++..../////",detailsID,num);

  let splitNumberToArray = num?.slice(-4);
  let f_number = parseFloat(splitNumberToArray?.toString().replace(/,/g, ''));


  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        let newTime = ('0' + (counter - 1).toString()).slice(-2);
        setCounter(newTime);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);


  const resentOtp = async () =>{
    console.log("yesssresend");

    axios
    .post(apiUrl,{
      phone: num
    }).then(function (response){
        
      if(response.data){
        setState({
          ...state,
          isLoading:false
        });
        if(response.data.Status == "Success"){
          response.data['phone'] = state.num;
          let newRusult = response.data.Details;
          
             setDetailId(newRusult);
          return;
        }
      }
    })
    .catch(function (error)
    {
      console.log(error);
    })

    setCounter(30);
  }

  const onPressVerifyOtp = () => {
    const verifyObj = {
      details: detailsID,
      otp: state.otp,
      phone: num,
    };

    console.log("otpValueNUm",verifyObj);

    axios
      .post(verifyOtpUrl, verifyObj)
      .then(async response => {
        console.log("yesssss1//////////////////",response)
        await AsyncStorage.setItem('token', response.data.token);
       
        if (response.data.Status === 'Success') {
          // console.log('sdkncjkdsvn', alreadyApi);

         // alert('otp verify successful');
            SimpleToast.show('otp verify successful', SimpleToast.LONG);
          const token = await AsyncStorage.getItem('token');
          await axios
            .post(
              alreadyApi,
              {phone: num},
              {headers: {Authorization: `Bearer ${token}`}},
            )
            .then(res => {
              console.log('hiiiii', res.data);
            })
            .catch(e => {
              console.log("=======================================",e);
              if (e.toString().split(' ')[6] === '422') {
                //navigation.dispatch(StackActions.replace('BottomTabNavigation'));
                console.log('Already registered');
                 navigation.navigate('BottomTabNavigation');
                
              //   navigation.navigate('BottomTabNavigation');
              } else if (e.toString().split(' ')[6] === '409') {

                //navigation.dispatch(StackActions.replace('Profile'));
                console.log('No data found');
                
                 navigation.navigate('Profile');
              }
            });
          //navigation.navigate('Profile', {tokenIdName: response.data.token});
        } else {
          alert('Something error occurred');
        }
      })
      .catch(() => {
            SimpleToast.show('WRONG OTP.', SimpleToast.LONG);
        //alert('wrong OTP');
      });
  };


  
  return (
    // <SafeAreaView style={{backgroundColor:'white' }} >

    //   <View style={{backgroundColor:'white',width : wp('100%') }}>
    //   <StatusBar backgroundColor={Colors.lightPurples} />  

        
    //     <View style={{ }}>
    //         <Image source={require('../Assetst/Images/memechat-illustration.png')} style={{height: hp('30%'), width: wp('100%')}} /> 


          
    //       <KeyboardAvoidingView behavior='padding'>
    //       <View style={{ backgroundColor:'white' , marginVertical:10,backgroundColor:'red'}}>
    //         <Text style={{fontSize:22, fontWeight:'bold', padding:5, color:'black'}}>
    //           Enter OTP 
    //         </Text>
    //         <Text style={{color:'black'}}> We've sent an OTP to your mobile number +91******76</Text>


    //        <View style={{  marginHorizontal:12}}>
    //           <OTPInputView
    //                     style={{ width: '100%', height: 200, }}
    //                     pinCount={6}
    //                     autoFocusOnLoad={false}
    //                     codeInputFieldStyle={styles.underlineStyleBase}
    //                     onCodeFilled={(code => {
    //                         setState({
    //                             ...state,
    //                             otp: code
    //                         });
    //                     })}
    //                 />
    //         </View> 

    //         <TouchableOpacity style={{height: wp('15%'), backgroundColor: Colors.lightPurples, borderRadius:20 ,justifyContent:'center', alignItems:'center', marginHorizontal:20}} onPress={onPressVerifyOtp}>
    //         <Text style={{color:'white' , fontSize:18}}>
    //          Login
    //         </Text>
    //         </TouchableOpacity>
            
            
          
    //         </View>
    //       </KeyboardAvoidingView>
          
           
         
             

           
    //     </View>
      
    
             
    //   </View>
    // </SafeAreaView>


    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
       <StatusBar backgroundColor={Colors.lightPurples} />  
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {/* <ScrollView style={{backgroundColor: '#fff', height: '100%'}}> */}
        <View
          style={{
            width: '100%',
            height: '60%',

          //  backgroundColor: '#0B56CD',
          }}>
          <Image
            source={require('../Assetst/Images/memechat-illustration.png')}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '80%',

              //backgroundColor: 'pink',
            }}
          />
        </View>
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
                fontSize: 20,
                //marginHorizontal: 28,
                marginVertical: 10,
                color: 'black',
                alignSelf: 'flex-start',
                justifyContent: 'center',
                marginLeft: 20,
                fontWeight:'bold'
              }}>
              Enter OTP
            </Text>
            <Text
              style={{
                fontSize: 12,
                //marginHorizontal: 28,
                // marginVertical: 7,
                color: 'black',
                alignSelf: 'flex-start',
                justifyContent: 'center',
                marginLeft: 20,
                marginBottom:20
              }}>
              We've sent an OTP to your mobile number +91 ******{f_number}
            </Text>

            {/* <View style={{alignItems: 'center', backgroundColor: 'pink'}}> */}
            <OTPInputView
              style={{
                width: '90%',
                height: '24%',
                //backgroundColor: 'purple',
                alignSelf: 'center',
                //color: '#000',
              }}
              pinCount={6}
              autoFocusOnLoad={false}
              codeInputFieldStyle={Styles.underlineStyleBase}
              codeInputHighlightStyle={Styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                // console.log(`Code is ${code}, you are good to go!`)
                //setPin(code);
                setState({
                  ...state,
                  otp: code
              });
                
              }}
            />
            {/* </View> */}

            <View
              style={{
                width: '90%',
                height: '5%',
                //backgroundColor: 'pink',
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 4,
                justifyContent: 'space-between',
                paddingLeft: 2,
                paddingRight: 2,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  //marginHorizontal: 28,
                  //marginVertical: 10,
                  color: 'black',
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                  //marginLeft: 20,
                }}>
                Time remaining
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  //marginHorizontal: 28,
                  //marginVertical: 10,
                  color: 'black',
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                  //marginLeft: 20,
                }}>
                00:{counter}
              </Text>
            </View>
            <View
              style={{
                //backgroundColor: 'pink',
                //alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  fontSize: 15,
                  paddingVertical: 6,
                  //paddingBottom: 10,
                }}>
                Didn't get the code?{' '}
              </Text>
              <TouchableOpacity
                onPress={counter == 0 ? resentOtp : () => {}}
                >
                <Text
                  style={[
                    Styles.respontextstyles3,
                    counter != 0
                      ? {color: Colors.gray}
                      : {color: Colors.lightBlue},
                  ]}>
                  Resend code
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 10}}>
              {/* <ButtonPress
                Title={'Continue'}
                // navigateTo={() => navigation.navigate('Registration')}
               // navigateTo={PressotpVerification}
              /> */}

           <TouchableOpacity style={{height: wp('15%'), backgroundColor: Colors.lightPurples,  borderRadius: hp('4%'),justifyContent:'center', alignItems:'center', marginHorizontal:20, marginTop:20}} onPress={onPressVerifyOtp}>
             <Text style={{color:'white' , fontSize:18}}>
              Login
             </Text>
            </TouchableOpacity>


            </View>
          </View>
        </KeyboardAvoidingView>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  underlineStyleBase: {
      width: width/7,
      height: 80,
      backgroundColor: Colors.white,
      color: Colors.black,
      fontSize: width / 20,
      fontWeight: '600',
      borderRadius: 4,
      borderColor:'black'
      
  },

  input: {
    height: height / 15,
    color: '#000',
    fontSize: 15,

    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    width: '85%',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  // underlineStyleBase: {
  //   width: 60,
  //   height: 70,
  //   borderWidth: 1,
  //   borderColor: '#000',
  //   alignSelf: 'center',
  //   color: '#000',
  //   //borderBottomWidth: 1,
  //   //backgroundColor: 'green',
  // },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',

    //backgroundColor: 'green',
  },
})