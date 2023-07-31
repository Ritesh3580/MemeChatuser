import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import { baseurl, token, localBaseurl } from '../config/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
const deleteAPI = localBaseurl + 'deleteuserProfile';

const Delete = props => {

  const [checked, setChecked] = React.useState('');


  const confirmDelete = async () => {
    if (!checked) {
      return;
    };
    const token = await AsyncStorage.getItem('token');
    axios
      .delete(deleteAPI, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        SimpleToast.show('Account is Deleted successfully');
        console.log("Delete account--->>", response.data);
        props.navigation.replace('LoginWithPhone');
        // setData(response.data);
        //.then(() => setStatus('Delete successful'));
      })
      .catch(err => {
        console.log("Delete account-->>", err.response.data);
        SimpleToast.show('Something went wrong!');
      })
  };

  const _deleteAccount = async () => {
    if (!checked) {
      return;
    };
    Alert.alert(
      "Delete your account!",
      "Your account will be deleted permanently...",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: confirmDelete }
      ]
    );
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={{ width: wp('25%'), height: hp('4%') }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack('Feedback')}
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
            style={{ width: wp('50%'), height: hp('4%'), alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.5%'),
                color: '#fff',
                textAlignVertical: 'center',
              }}>
              Delete Account
            </Text>
          </View>
          <View style={{ width: wp('25%'), height: hp('4%') }}></View>
        </View>
        <View
          style={{
            height: hp('12%'),
            width: wp('95%'),
            padding: wp('2.2%'),
            marginTop: hp('1.2%'),
            alignSelf: 'center'
          }}>
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              fontSize: hp('2.5%'),
              color: '#000',
            }}>
            Delete Your Account
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Normal',
              fontSize: hp('1.8%'),
              color: '#929394',
              marginTop: hp('0.7%'),
            }}
            numberOfLines={1}>
            If you want to permanently delete your CatchWoo Acoount, let{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Normal',
              fontSize: hp('1.8%'),
              color: '#929394',
            }}
            numberOfLines={1}>
            us know.
          </Text>
        </View>
        <Pressable
          onPress={() => setChecked('first')}
          style={{
            height: hp('15%'),
            width: wp('95%'),
            marginTop: hp('1.8%'),
            alignSelf: 'center',
            borderRadius: hp('1.5%'),
            borderWidth: hp('0.2%'),
            borderColor: '#c0c2c4',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: wp('90%'),
              height: hp('4%'),
              alignSelf: 'center',
              marginTop: hp('1.8%'),
            }}>
            <View
              style={{
                width: wp('9%'),
                height: hp('4%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              // onChange={d => deleteAcc(d)}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.3%'),
                color: '#000',
                textAlignVertical: 'center',
                marginLeft: wp('1%'),
              }}>
              Delete Account
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              fontSize: hp('2%'),
              color: '#929394',
              textAlignVertical: 'center',
              marginLeft: wp('12.5%'),
            }}>
            This is permanent.
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Normal',
              fontSize: hp('1.5%'),
              color: '#000',
              textAlignVertical: 'center',
              marginLeft: wp('12.5%'),
            }}
            numberOfLines={1}>
            When you delete your account, you won't be able to
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Normal',
              fontSize: hp('1.5%'),
              color: '#000',
              textAlignVertical: 'center',
              marginLeft: wp('12.5%'),
            }}
            numberOfLines={1}>
            retrieve your data or your account.
          </Text>
        </Pressable>

        <View
          style={{
            height: hp('10%'),
            width: wp('90%'),
            alignSelf: 'center',
            marginTop: hp('44%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: wp('85%'),
              height: hp('7.4%'),
              backgroundColor: 'white',
              borderRadius: hp('2%'),
              backgroundColor: '#b15eff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={confirmDelete}>
            <Text
              style={{
                color: '#ffffff',
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.2%'),
              }}>
              Continue Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Delete;

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
