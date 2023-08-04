import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  Linking,
  Platform,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import {localBaseurl} from '../config/baseurl';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNUpiPayment from 'react-native-upi-payment';

import {_makeid} from '../ReusableComponent/U_ID';
import {PAYEE_NAME, VPA} from '../config/PaymentInfo';
import SimpleToast from 'react-native-simple-toast';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Colors from '../Assetst/Constants/Colors';
import {token} from '../config/baseurl';
import {Time} from 'react-native-gifted-chat';
import moment from 'moment';

const MyWallet = props => {
    const navigation = useNavigation();
  
  const preData = props.route?.params;
  console.log(preData);

  const [coinsData, setCoinsData] = useState([]);
  const [coinsItemObj, setCoinsItemObj] = useState(null);
  const [customerCareNumber, setCustomerCareNumber] = useState('');
  const isFocused = useIsFocused();
  const [isProcessing, setProcessing] = useState(false);
  const [OrderIdKey, setOrderIdKey] = useState(null);

  useEffect(() => {
    if (isFocused) {
      getCoinsPrice();
      // _makePayment();
      // successCallback();
    }
  }, [isFocused, coinsItemObj]);

  setTimeout(() => {
    // setProcessing(true);
    console.log('set timeout.......');
  }, 3000);

  //------------------------------------------GetWallet----------------------------------------------
  const getCoinsPrice = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    axios
      .get(localBaseurl + 'findAllWallet', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(resp => {
        // console.log("find All wallet"+resp.data);

        //console.log(resp.data);

        setCoinsData(resp.data.getWallet);
      })
      .catch(err => {
        console.log('get coin price error', err.response?.data);
      });
    axios
      .get(localBaseurl + 'userGethelpline', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(resp => {
        // console.log(resp.data);
        setCustomerCareNumber(resp.data.getNumber[0]?.number);
      })
      .catch(err => {
        console.log('contact no-->>>', err.response?.data);
      });
  };

  const addPaymentHistory = async data => {
    console.log('Data.......................', data);

    const token = await AsyncStorage.getItem('token');
    let paymentInfo = {
      payment_history: [
        {
          txnId: data.orderKeyId,
          resCode: data.TransactionId,
          txnRef: data.TransactionRefNo,
          status: data.OrderPaymentStatusText,
          price: coinsItemObj.price,
          coins: coinsItemObj.coins,
        },
      ],
    };

    console.log("Payment history data ....upload....", paymentInfo);
    axios
      .put(localBaseurl + 'addpaymenthistory', paymentInfo, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(resp => {
        console.log('add payment history', resp.data);
      })
      .catch(err => {
        console.log('add payment history error', err.response?.data);
      });
  };

  //-----------------------------------------PAYF PAYMENT CHECK STATUS------------------------------------

  const _checkMayStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token 2..................', token);

    //  console.log("item id", item);
    const headers = {Authorization: `Bearer ${token}`};

    try {
      const response = await axios.get(
        `https://api.catchwoo.com/api/orderDetail/` + OrderIdKey,
        {headers},
      );

      //console.log("responses payenmmm",response.data);
    
      if (response.data.OrderPaymentStatusText == 'Paid') {
        setProcessing(false);
        SimpleToast.show('Payment Processed Successfully!', SimpleToast.LONG);
        addPaymentHistory(response.data);
        console.log(
          'ress..............Data..//................',
          response.data,
        );

        successCallback();
      } else {
        SimpleToast.show('Payment Is Pending!', SimpleToast.LONG);
        // addPaymentHistory(response.data.data);
        //successCallback();
      }
    } catch (error) {
      console.log('err...........', error);
    }
  };

  //-------------------------------------------PAYG PAYMENT GATEWAY INTEGRATION-----------------------------------
  const _makePayment = async item => {
    //console.log('item make payment---->>>>>>', item);
    const refId = _makeid(16);
    const date = moment().utcOffset('+05:30').format('YYYY-MM-DD:hh:mm:ss a');
    console.log(date);

    setCoinsItemObj(item);

   // console.log('coinsItemObj-----', coinsItemObj);
  
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log('token,,,,', token);

    //   axios
    //   .put(localBaseurl + `applyNewRecharge`,
    //   {"walletId": coinsItemObj._id},
    //   {headers: { Authorization: `Bearer ${token}`}}
    //   )

    try {
      const response = await axios.post(
        `https://api.catchwoo.com/api/createOrder`,
        {
          RedirectUrl: '',
          OrderAmount: 1.0,
          ProductData: {
            PaymentReason: 'CoinPayment',
            ItemId: '01',
            AppName: 'CatchWoo',
          },
          CustomerData: {
            MobileNo: preData.phone,
            Email: preData.email,
            CustomerId: item._id,
          },
        },
        {headers: {Authorization: `Bearer ${token}`}},
      );

      // Handle response
     console.log('response data......-----', response.data);

      if (response.data.message == 'Payment Url Generated') {
        const link = response.data.paymnetProcessUrl;


        console.log('jkasjaskjfkas Link', link);
        Linking.openURL(link)
          .then(result => {
            console.log('result.....//////////', result);
            setProcessing(true);
            // _checkMayStatus(response.data.orderKeyId);
            setOrderIdKey(response.data.orderKeyId);
          })

          .catch(error => {
            // Handle error
            console.error('Error opening URL:', error);
          });
      }
    } catch (error) {
      // Handle error
      console.error('--===========Err', error);
    }

    // };
  };

  const successCallback = async data => {
    //console.log("PAYMENT SUCCESS--->>>", data);
    console.log('Consdggfgfgef---======++++++', coinsItemObj);
    if (!coinsItemObj) {
      console.log("Coins item didn't update!, Please check state update...");
      return;
    }
    const token = await AsyncStorage.getItem('token');
    console.log('wallet token', token);

    console.log(coinsItemObj._id);

    axios
      .put(
        localBaseurl + `applyNewRecharge`,
        {walletId: coinsItemObj._id},
        {headers: {Authorization: `Bearer ${token}`}},
      )
      .then(async resp => {
        console.log('Recharge-->>', resp.data);
        //navigation.navigate("BottomTabNavigation");
      })
      .catch(err => {
        console.log('recharge error-->>', err.response?.data);
      });
  };

  // const failureCallback = async (data) => {
  //   console.log("PAYMENT FAILURE--->>>", data);
  //   console.log(coinsItemObj);
  //   console.log(coinsItemObj._id);
  //   if(data.message){
  //     SimpleToast.show(data.message, SimpleToast.LONG);
  //   }
  //   else{
  //     await addPaymentHistory(data);
  //     SimpleToast.show("Payment is failed", SimpleToast.LONG)
  //   }
  // };

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

  async function CancelPaymemt() {
    SimpleToast.show('Payment Cancel!', SimpleToast.LONG);
    setProcessing(false);
    setOrderIdKey(null);
  }

  // console.log(preData);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#b15eff" />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {
          isProcessing ? (
            <View>
              <ActivityIndicator size="large" color="blue" />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Processing Payment...
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {OrderIdKey}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    height: 30,
                    width: 150,
                    backgroundColor: Colors.lightBlue,
                    borderRadius: 20,
                    justifyContent: 'center',
                    marginRight: 17,
                  }}
                  onPress={_checkMayStatus}>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    Confirm Payment{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 30,
                    width: 150,
                    backgroundColor: Colors.lightBlue,
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}
                  onPress={CancelPaymemt}>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    Cancel Payment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null
          //: (
          // <Text style>Payment Processed Successfully!</Text>
          // SimpleToast.show("Payment Processed Successfully!", SimpleToast.LONG)

          //)
        }
      </View>

      {isProcessing == false ? (
        <View style={styles.container}>
          <View style={styles.head}>
            <View style={{width: wp('30%'), height: hp('4%')}}>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={{
                  width: wp('8%'),
                  height: hp('4%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="md-chevron-back"
                  size={hp('3.2%')}
                  color="#fff"
                />
                {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: wp('40%'),
                height: hp('4%'),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Roboto-Bold',
                  fontSize: hp('2.5%'),
                  color: '#fff',
                  textAlignVertical: 'center',
                }}>
                My Wallet
              </Text>
            </View>
            <View style={{width: wp('30%'), height: hp('4%')}}></View>
          </View>

          <TouchableOpacity>
            <View
              style={{
                width: wp('97%'),
                height: hp('7%'),
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: hp('1%'),
                borderRadius: hp('1%'),
                backgroundColor: '#FBF2FF',
              }}>
              <View
                style={{
                  height: hp('5%'),
                  width: wp('68%'),
                  justifyContent: 'center',
                  paddingLeft: wp('2%'),
                }}>
                <Text
                  style={{
                    fontSize: hp('1.8%'),
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  My coins
                </Text>
              </View>

              <View
                style={{
                  height: hp('5%'),
                  width: wp('27%'),
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    width: wp('18%'),
                    height: hp('5%'),
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../Assetst/Images/coins.png')}
                    style={{width: hp('2.5%'), height: hp('2.5%')}}
                  />
                  <Text
                    style={{
                      fontSize: hp('1.8%'),
                      color: '#FDBF00',
                      fontWeight: 'bold',
                      marginLeft: wp('1%'),
                    }}>
                    {preData?.total_coins || 0}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Transaction')}>
            <View
              style={{
                width: wp('97%'),
                height: hp('7%'),
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: hp('1%'),
                borderRadius: hp('1%'),
                backgroundColor: '#FBF2FF',
              }}>
              <View
                style={{
                  height: hp('5%'),
                  width: wp('68%'),
                  justifyContent: 'center',
                  paddingLeft: wp('2%'),
                }}>
                <Text
                  style={{
                    fontSize: hp('1.8%'),
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  My Records
                </Text>
              </View>

              <View
                style={{
                  height: hp('5%'),
                  width: wp('27%'),
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    width: wp('18%'),
                    height: hp('5%'),
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={() => props.navigation.navigate('Transaction')}>
                  <Text
                    style={{
                      fontSize: hp('1.8%'),
                      color: '#b15eff',
                      fontWeight: 'bold',
                      marginLeft: wp('1%'),
                    }}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: hp('2.5%'),
              color: '#000',
              fontWeight: 'bold',
              paddingLeft: wp('2.8%'),
              paddingTop: hp('1.5%'),
            }}>
            Recharge
          </Text>

          <View style={{width: wp('100%'), height: hp('62%'), marginTop: 10}}>
            <FlatList
              data={coinsData}
              keyExtractor={(item, index) => index}
              numColumns={2}
              contentContainerStyle={{
                alignItems: 'center',
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    _makePayment(item);
                  }}
                  style={{marginHorizontal: '4%', marginVertical: 5}}>
                  <View
                    style={{
                      width: wp('44%'),
                      height: hp('8.5%'),
                      borderColor: '#FDBF00',
                      borderRadius: hp('1%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: hp('0.1%'),
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        width: wp('18%'),
                        height: hp('3.5%'),
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={require('../Assetst/Images/coins.png')}
                        style={{width: hp('2.5%'), height: hp('2.5%')}}
                      />
                      <Text
                        style={{
                          fontSize: hp('1.8%'),
                          color: '#FDBF00',
                          fontWeight: 'bold',
                          marginLeft: wp('1%'),
                        }}>
                        {item.coins}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: hp('1.8%'),
                        color: '#000',
                        fontWeight: 'bold',
                      }}>
                      INR {item.price}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          

          <Text
            style={{
              fontSize: hp('1.8%'),
              color: '#AEABAB',
              fontWeight: 'bold',
              paddingTop: hp('0.7%'),
              textAlign: 'center',
            }}>
            Contact us if you have any questions.
          </Text>

          <TouchableOpacity
           // onPress={_openDialer}
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              paddingTop: hp('0.5%'),
            }}>
            <Fontisto name="email" size={hp('2%')} color="#000" />
            <Text
              style={{
                fontSize: hp('1.8%'),
                color: '#21C261',
                fontWeight: 'bold',
                textAlignVertical: 'center',
                textDecorationColor: '#21C261',
                textDecorationLine: 'underline',
                marginLeft: wp('1%'),
              }}>
              info@catchwoo.com
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default MyWallet;

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
