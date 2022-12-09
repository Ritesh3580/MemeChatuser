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
} from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { localBaseurl } from '../config/baseurl';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNUpiPayment from 'react-native-upi-payment';

import { _makeid } from '../ReusableComponent/U_ID';
import { PAYEE_NAME, VPA } from '../config/PaymentInfo';
import SimpleToast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';

const MyWallet = props => {

  const preData = props.route?.params;
  // console.log(preData);

  const [coinsData, setCoinsData] = useState([]);
  const [coinsItemObj, setCoinsItemObj] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getCoinsPrice();
    }
  }, [isFocused]);

  const getCoinsPrice = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    axios.get(localBaseurl + 'findAllWallet', { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => {
        // console.log(resp.data);
        setCoinsData(resp.data.getWallet);
      })
      .catch(err => {
        console.log("get coin price error", err.response?.data);
      })
  };

  const addPaymentHistory = async(data) => {
    const token = await AsyncStorage.getItem('token');
    let paymentInfo = {
      "payment_history": [{
        "txnId": data.txnId,
        "resCode": data.responseCode,
        "txnRef": data.txnRef,
        "status": data.Status,
        "price": coinsItemObj.price,
        "coins": coinsItemObj.coins
      }]
    };
    axios.put(localBaseurl + 'addpaymenthistory', { headers: { Authorization: `Bearer ${token}` }, paymentInfo })
      .then(resp => {
        console.log("add payment history", resp.data);
      })
      .catch(err => {
        console.log("add payment history error", err.response?.data);
      })
  };


  const _makePayment = (item) => {
    const refId = _makeid(16);
    setCoinsItemObj(item);
    RNUpiPayment.initializePayment({
      vpa: VPA, // it should be a merchant upi
      payeeName: PAYEE_NAME,
      amount: item.price,
      transactionRef: refId
    }, successCallback, failureCallback);
  };

  const successCallback = async (data) => {
    console.log("PAYMENT SUCCESS--->>>", data);
    if (!coinsItemObj) {
      console.log("Coins item didn't update!, Please check state update...");
      return;
    };
    const token = await AsyncStorage.getItem('token');
    axios.put(localBaseurl + 'applyNewRecharge', { headers: { Authorization: `Bearer ${token}` } }, { "walletId": coinsItemObj.coins })
      .then(async resp => {
        console.log("Recharge-->>", resp.data);
        await addPaymentHistory(data);
      })
      .catch(err => {
        console.log("recharge error-->>", err.response?.data);
      })
  };

  const failureCallback = async (data) => {
    console.log("PAYMENT FAILURE--->>>", data);
    if(data.message){
      SimpleToast.show(data.message, SimpleToast.LONG);
    }
    else{
      await addPaymentHistory(data);
      SimpleToast.show("Payment is failed", SimpleToast.LONG)
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={{ width: wp('30%'), height: hp('4%') }}>
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
            style={{ width: wp('40%'), height: hp('4%'), alignItems: 'center' }}>
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
          <View style={{ width: wp('30%'), height: hp('4%') }}></View>
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
                  style={{ width: hp('2.5%'), height: hp('2.5%') }}
                />
                <Text
                  style={{
                    fontSize: hp('1.8%'),
                    color: '#FDBF00',
                    fontWeight: 'bold',
                    marginLeft: wp('1%'),
                  }}>
                  {preData.coins || 0}
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

        <View style={{ width: wp('100%'), height: hp('41%'), marginTop: 10 }}>
          <FlatList
            data={coinsData}
            keyExtractor={(item, index) => index}
            numColumns={2}
            contentContainerStyle={{
              alignItems: 'center'
            }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() => { _makePayment(item) }}
                style={{ marginHorizontal: '4%', marginVertical: 5 }}
              >
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
                      style={{ width: hp('2.5%'), height: hp('2.5%') }}
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
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            paddingTop: hp('0.5%'),
          }}>
          <Feather name="headphones" size={hp('2%')} color="#000" />
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
            Customer Services.
          </Text>
        </TouchableOpacity>
      </View>
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
