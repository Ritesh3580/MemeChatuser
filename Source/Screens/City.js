import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl, localBaseurl} from '../config/baseurl';
const CitySearch = localBaseurl + 'searchCity/';

const City = props => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [searchTimer, setSearchTimer] = useState(null);
  const [data, setData] = useState([]);

  const searchCityApi = async text => {
    const token = await AsyncStorage.getItem('token');
    console.log(CitySearch);
    axios
      .get(CitySearch + input, {headers: {Authorization: `Bearer ${token}`}})
      .then(res => {
        // console.log(input);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack('Appointment')}
            style={{
              width: wp('8%'),
              height: hp('4%'),
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: wp('1%'),
            }}>
            <Ionicons
              name="md-chevron-back"
              size={hp('3.3%')}
              color="#ffffff"
            />
            {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              fontSize: hp('2.8%'),
              color: '#ffffff',
              textAlignVertical: 'center',
              paddingLeft: wp('37%'),
            }}>
            City
          </Text>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            justifyContent: 'center',
            marginTop: hp('0.5%'),
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Searchbar
            placeholder="search your city"
            // placeholderStyle={styles.placeholderStyle}
            onChangeText={text => {
              if (searchTimer) {
                clearTimeout(searchTimer);
              }
              setInput(text);
              setSearchTimer(
                setTimeout(() => {
                  searchCityApi(text);
                }, 2000),
              );
            }}
            value={input}
            style={{
              width: wp('95%'),
              height: hp('7%'),
              backgroundColor: '#edeef0',
              borderColor: '#c8c9cc',
              borderWidth: wp('0.3%'),
              borderRadius: wp('3%'),
            }}
          />
        </View>

        <View
          style={{
            width: wp('100%'),
            height: hp('75%'),
            backgroundColor: 'pink',
          }}></View>
      </View>
    </SafeAreaView>
  );
};

export default City;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    // backgroundColor:'cyan'
  },
  head: {
    width: wp('100%'),
    height: hp('6%'),
    backgroundColor: '#b15eff',
    flexDirection: 'row',
  },
});
