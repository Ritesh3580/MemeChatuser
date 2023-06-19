import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import React, { useState } from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import { baseurl, localBaseurl, token } from '../config/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assetst/Constants/Colors';
const search = localBaseurl + 'getoneHostuser/';

const SearchPerson = props => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [searchTimer, setSearchTimer] = useState(null);
  // console.log(props.route.params);
  const hostData = props.route.params?.host;
  // const filterHostData = props.route.params?.host;
  const appData = props.route.params?.appData;
  const roomID = props.route.params?.roomID;

  const [filterHostData, setFilterHostData] = useState(hostData);



  const search = (val) => {
    // console.log(val);
    if (val) {
      const newData = hostData.filter((item) => {
        const itemData = item.FirstName ? item.FirstName.toUpperCase() : ''.toUpperCase();
        // console.log(itemData);
        const textData = val.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilterHostData(newData);
    }
    else {
      setFilterHostData(hostData);
      setInput(val);
    }
  };


  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View
          style={{
            width: wp('96%'),
            height: hp('6%'),
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              width: wp('10%'),
              height: hp('6%'),
              alignItems: 'center',
              justifyContent: 'center',
              //backgroundColor:'pink'
            }}
            onPress={() => props.navigation.navigate('BottomTabNavigation')}>
            <FontAwesome5Icon
              name="angle-left"
              size={hp('2.8%')}
              style={{ color: '#000' }}
            />
          </TouchableOpacity>
          <View
            style={{
              width: wp('10%'),
              height: hp('6%'),
              //flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              //backgroundColor: 'pink',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Messages1')}>
              <FontAwesome5Icon
                name="bell"
                size={hp('2.2%')}
                style={{ color: '#000' }}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => props.navigation.navigate('SearchPerson')}>
              <FontAwesome5Icon
                name="search"
                size={hp('2.5%')}
                style={{color: '#000'}}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('6.5%'),
            justifyContent: 'center',

            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Searchbar
            placeholder="Search"
            // placeholderStyle={styles.placeholderStyle}
            onChangeText={text => {
              search(text);
              // console.log(text);
            }}
            defaultValue={input}
            style={{
              width: wp('94%'),
              height: hp('5.8%'),
              backgroundColor: '#fff',
              borderColor: '#c8c9cc',
              borderWidth: wp('0.3%'),
              borderRadius: wp('3%'),
            }}
          />
        </View>
        <View
          style={{
            height: hp('86.2%'),
            width: wp('100%'),
            backgroundColor: '#fff',
            marginTop: hp('0.8%'),
          }}>
          <FlatList
            data={filterHostData}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  let navData = {
                    appData: appData,
                    roomID: roomID,
                    user: item,
                  };
                  props.navigation.navigate('ProfileDetails', navData);
                }}>
                <View
                  style={{
                    height: hp('7%'),
                    width: wp('100%'),
                    // backgroundColor: 'purple',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: item.userImage }}
                    style={{
                      width: wp('10%'),
                      height: wp('10%'),
                      borderRadius: wp('10%'),
                      marginLeft: wp('5%'),
                      backgroundColor: 'pink'
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontWeight: 'bold',
                      marginLeft: 6,
                    }}>
                    {item.FirstName} {item.LastName}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchPerson;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  head: {
    width: wp('100%'),
    height: hp('6%'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
