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
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assetst/Constants/Colors';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl, localBaseurl} from '../config/baseurl';
import SimpleToast from 'react-native-simple-toast';

const apiUrl = localBaseurl + 'login_with_phone';
const verifyOtpUrl = localBaseurl + 'verifyOTP';
const alreadyApi = localBaseurl + 'isAlreadyRegistered';

const {height, width} = Dimensions.get('window');

const LoginWithPhone = ({route, navigation,props}) => {
  const [num, setNum] = useState(null);
  const [otpValue, setOtp] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [detailsValue, setdetailsValue] = useState(null);
  const [detailsId, setDetailId] = useState(null);
  const [data, setData] = useState('');
  const [getValue, setGetValue] = useState(true);
  //const { DetailsIdGet,phoneNo } = route.params;
  //console.log("Details Id get===="+DetailsIdGet)
  //console.log("last page phone no=====" + phoneNo)
  const number = v => {
    setNum(v.nativeEvent.text);
  };
  const getOtp = otp => {
    setOtp(otp.nativeEvent.text);
  };

  const [state, setState] = useState({
    phoneNumber: '',
    isLoading: false
});




  //  console.log("ashfihasifh-----------------------------",detailsValue);
  //  useEffect(() => {
  //   if(detailsValue){
  //     naviagteFuc();
  //   }
    
  //   //Runs only on the first render
  // }, [detailsValue]);


   async function naviagteFuc(){
    navigation.dispatch(StackActions.replace('OtpVerification' , { num, detailsId }));
    console.log("fuccccccc");
   }

   const api = async () => {
    setGetValue(false);
    setIsOtpSent(false);
    // alert('otp sent');
   
    // setOtp('');
    axios
      .post(apiUrl, {
        phone: num,
      })
      .then(function (response) {
        console.log("response data",response.data);
        if(response.data){
          setState({
            ...state,
            isLoading:false
          });

          if(response.data.Status == "Success" ){
            SimpleToast.show('OTP sent Successfully.', SimpleToast.LONG);
            setIsOtpSent(true);
            response.data['phone'] = state.num;
            let newRusult = response.data.Details;
            navigation.dispatch(StackActions.replace('OtpVerification' , { newRusult ,num }));
            return;
          }
        }
      
        // setdetailsValue(response.data.Details);
        // setDetailId(response.data);
        // setIsOtpSent(true);
        // //navigation.navigte("OtpVerification");
        // naviagteFuc();
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onPressVerifyOtp = () => {
    const verifyObj = {
      details: detailsValue,
      otp: otpValue,
      phone: num,
    };

    axios
      .post(verifyOtpUrl, verifyObj)

      .then(async response => {
        await AsyncStorage.setItem('token', response.data.token);
        if (response.data.Status === 'Success') {
          // console.log('sdkncjkdsvn', alreadyApi);

          alert('otp verify successful');
          const token = await AsyncStorage.getItem('token');
          await axios
            .post(
              alreadyApi,
              {phone: num},
              {headers: {Authorization: `Bearer ${token}`}},
            )
            .then(res => {
              console.log('hiiiii--------------------', res.data);
            })
            .catch(e => {
              if (e.toString().split(' ')[6] === '422') {
                console.log('Already registered');
                // navigation.navigate('BottomTabNavigation');
                navigation.dispatch(StackActions.replace('BottomTabNavigation'));
                // navigation.navigate('FollowNext');
              } else if (e.toString().split(' ')[6] === '409') {
                console.log('No data found');
                navigation.dispatch(StackActions.replace('Profile'));
                // navigation.navigate('Profile');
              }
            });
          //navigation.navigate('Profile', {tokenIdName: response.data.token});
        } else {
          alert('Something error occurred');
        }
      })
      .catch(() => {
        alert('wrong OTP');
      });
  };

  const api1 = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(alreadyApi, {headers: {Authorization: `Bearer ${token}`}})
      .then(res => {
        console.log('hiiiii');
      });
  };

  return (
    // <SafeAreaView>
    //   <View style={styles.container}>
    //     <StatusBar backgroundColor={Colors.lightPurples} />
    //     <View
    //       style={{
    //         width: wp('100%'),
    //         height: hp('6%'),
    //         justifyContent: 'center',
    //       }}>
    //       <TouchableOpacity
    //         style={{
    //           width: wp('5%'),
    //           height: hp('5%'),
    //           justifyContent: 'center',
    //           marginLeft: hp('1.3%'),
    //         }}
    //         onPress={() => navigation.goBack()}>
    //         <FontAwesome5 name="chevron-left" size={hp('3%')} color="black" />
    //       </TouchableOpacity>
    //     </View>
    //     <View style={{height:300}}>

    //       <ImageBackground source={require('../Assetst/Images/memechat-illustration.png')}  style={{height:300,width:'100%'}}>

    //       </ImageBackground>

    //     </View>

    //     <KeyboardAvoidingView behavior="padding">

     

    //     <View
    //       style={{width: wp('100%'), height: hp('34%'), alignSelf: 'center'}}>
    //       <View
    //         style={{
    //           width: wp('95%'),
    //           height: hp('5%'),
    //           alignSelf: 'center',
    //           justifyContent: 'center',
    //           marginTop: hp('0.5%'),
    //         }}>
    //           <TouchableOpacity onPress={() =>   navigation.dispatch(StackActions.replace('Profile'))}>
    //           <Text
    //           style={{
    //             color: 'black',
    //             fontSize: hp('2.7%'),
    //             fontWeight: 'bold',
    //             textAlign:'center',
                
              
    //           }}>
    //           Login with Mobile Number 
    //         </Text>
    //           </TouchableOpacity>
           
    //       </View>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           width: wp('95%'),
    //           height: hp('7%'),
    //           marginTop: hp('1%'),
    //           justifyContent: 'center',
    //           alignSelf: 'center',
    //           marginTop:30,
    //           borderRadius: hp('4%'),
    //         }}>
    //         {/* <View
    //           style={{
    //             width: wp('15%'),
    //             height: hp('7%'),
    //             backgroundColor: Colors.primaryGrayLight,
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderTopLeftRadius: hp('1%'),
    //             borderBottomLeftRadius: hp('1%'),
    //             backgroundColor: '#C5D5D6',
    //           }}>
    //           <Text
    //             style={{
    //               color: 'black',
    //               fontSize: hp('2.2%'),
    //               fontWeight: 'bold',
    //             }}>
    //            dhsjkghsd
    //           </Text>
    //         </View> */}
    //         <TextInput
    //           placeholder="Mobile number"
    //           placeholderTextColor={Colors.primaryGray}
    //           style={{
    //             fontSize: hp('2.2%'),
    //             width: wp('90%'),
    //             backgroundColor: '#C5D5D6',
    //             height: hp('7%'),
    //             color:'#000',
    //             borderRadius: hp('1.8%'),
    //             paddingLeft:20
    //           }}
    //           maxLength={10}
    //           onChange={v => number(v)}
    //           keyboardType="numeric"
    //         />
    //         {/* <View
    //           style={{
    //             width: wp('17%'),
    //             height: hp('7%'),
    //             backgroundColor: '#C5D5D6',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             borderTopRightRadius: hp('1%'),
    //             borderBottomRightRadius: hp('1%'),
    //           }}>
        
    //           {isOtpSent ? (
    //             <></>
    //           ) : (
    //             <TouchableOpacity
    //               onPress={api}
    //               style={{
    //                 width: wp('14%'),
    //                 height: hp('3.8%'),
    //                 backgroundColor: Colors.lightPurples,
    //                 alignSelf: 'center',
    //                 justifyContent: 'center',
    //                 borderRadius: hp('0.5%'),
    //               }}>
    //               <Text
    //                 style={{
    //                   fontSize: hp('1.3%'),
    //                   alignSelf: 'center',
    //                   color: 'white',
    //                 }}>
    //                 send
    //               </Text>
    //             </TouchableOpacity>
    //           )}

    //         </View> */}
    //       </View>

    //       {/* <View
    //         style={{
    //           width: wp('95%'),
    //           height: hp('7%'),
    //           alignSelf: 'center',
    //           flexDirection: 'row',
    //           justifyContent: 'space-between',
    //           marginTop: hp('1%'),
    //           borderRadius: hp('1%'),
    //         }}>
    //         <TextInput
    //           placeholder="Enter Verification code"
    //           placeholderTextColor={Colors.primaryGray}
    //           keyboardType="numeric"
    //           value={otpValue}
    //           style={{
    //             fontSize: hp('1.8%'),
    //             width: wp('70%'),
    //             height: hp('7%'),
    //             backgroundColor: '#C5D5D6',
    //             paddingLeft: wp('2%'),
    //             borderTopLeftRadius: hp('1%'),
    //             borderBottomLeftRadius: hp('1%'),
    //             color:'#000'
    //           }}
    //           onChange={otp => getOtp(otp)}
    //         />
    //         <View
    //           style={{
    //             width: wp('25%'),
    //             height: hp('7%'),
    //             backgroundColor: '#C5D5D6',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             borderTopRightRadius: hp('1%'),
    //             borderBottomRightRadius: hp('1%'),
    //           }}>
    //           <TouchableOpacity
    //             onPress={api}
    //             style={{
    //               width: wp('19%'),
    //               height: hp('3.8%'),
    //               backgroundColor: Colors.lightPurples,
    //               alignSelf: 'center',
    //               justifyContent: 'center',
    //               borderRadius: hp('0.5%'),
    //             }}>
    //             <Text
    //               style={{
    //                 fontSize: hp('1.3%'),
    //                 alignSelf: 'center',
    //                 color: 'white',
    //               }}
    //               numberOfLines={1}>
    //               Resend Otp
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View> */}
    //       {/* <TouchableOpacity onPress={api} style={{ alignItems: 'flex-end', paddingRight: wp('4%') }}>
    //                     <Text style={{ fontSize: hp('1.8%'), color: '#000', fontWeight: 'bold' }}>Resend Otp</Text>
    //                 </TouchableOpacity> */}




    //       <TouchableOpacity
    //         //onPress={() => onPressVerifyOtp()}
    //         onPress={api}
    //         style={{
    //           width: wp('90%'),
    //           height: hp('7%'),
    //           backgroundColor: Colors.lightPurples,
    //           alignSelf: 'center',
    //           justifyContent: 'center',
    //           borderRadius: hp('4%'),
    //           marginTop: hp('5%'),
    //         }}>
    //         <Text
    //           style={{fontSize: hp('2%'), alignSelf: 'center', color: 'white'}}>
    //           Get OTP
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
     

    //     </KeyboardAvoidingView>


    //     {/* <View style={{flex:1,justifyContent:'flex-end', alignItems:'center'}}>
    //     <Text style={{fontSize:11}}>By signing up, you agree to our Privacy Policy and Terms of Service</Text>
    //     </View> */}
        
    //   </View>

      
    // </SafeAreaView>

    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
    <StatusBar backgroundColor={'#128AD5'} />
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          width: '100%',
          height: '68%',

          
        }}>
        <Image
          source={require('../Assetst/Images/memechat-illustration.png')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '80%',
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
            onPress={api}
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
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },

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

export default LoginWithPhone;
