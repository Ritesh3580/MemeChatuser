import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseurl, localBaseurl } from '../config/baseurl';
import { useEffect } from 'react';

const City = props => {

  const [input, setInput] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTimer, setSearchTimer] = useState(null);
  const [cityData, setCityData] = useState([]);

  let preData_location = props.route.params;

  useEffect(() => {
    getCities();
  }, []);

  const getCities = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(baseurl + 'citiesUser', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        let RES_DATA = res.data;
        let f_preData = preData_location.split(',');
        // setCityData(res.data);
        res.data.some(item => {
          if (item.name == f_preData[0]) {
            setSelectedItem(item);
          } else {}
        })
        let F_DATA = RES_DATA.sort((a, b) => {
          return a.name == f_preData[0] ? -1 : 1
        });
        setCityData(F_DATA);
        // console.log(res.data);
      })
      .catch(err => console.log("get city-->>", err.response.data));
  };

  const searchCityApi = async text => {
    if (text) {
      const token = await AsyncStorage.getItem('token');
      axios
        .get(baseurl + "searchCityuser/" + text, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setCityData(res.data.data);
        })
        .catch(err => console.log(err));
    }
    else {
      getCities();
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate({
                name: 'exc',
                params: { city: selectedItem },
                merged: true
              })
            }}
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
              // if (searchTimer) {
              //   clearTimeout(searchTimer);
              // }
              // setInput(text);
              // setSearchTimer(
              //   setTimeout(() => {
              //     searchCityApi(text);
              //   }, 2000),
              // );
              setInput(text);
              searchCityApi(text);
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
        <FlatList
          data={cityData}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}
          ItemSeparatorComponent={() => (
            <View style={{ height: 5, }} />
          )}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => setSelectedItem(item)}
              style={{
                paddingLeft: 15,
                paddingVertical: 10,
                backgroundColor: selectedItem && selectedItem.id == item.id ? "#b15eff" : "#fff",
                elevation: 7,
                borderRadius: 5,
                marginHorizontal: 10
              }}
            >
              <Text style={{ color: selectedItem && selectedItem.id == item.id ? "#fff" : "#000", fontSize: 15, fontWeight: '600' }}>{item.name}, {item.state}</Text>
            </Pressable>
          )}
        />

        {/* <View
          style={{
            width: wp('100%'),
            height: hp('80%'),
            top:'-8%',
          }}>
          <SearchableDropDown
            onTextChange={(text) => {}}
            // Listner on the searchable input
            onItemSelect={(item) => {
              props.navigation.navigate({
                name: 'exc',
                params: {city: item},
                merged: true
              })
            }}
            // Called after the selection
            containerStyle={{ paddingHorizontal: 5 }}
            // Suggestion container style
            textInputStyle={{
              // Inserted text style
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#FAF7F6',
              color: "#000",
              marginBottom: 20
            }}
            itemStyle={{
              // Single dropdown item style
              padding: 10,
              marginTop: 2,
              backgroundColor: '#FAF9F8',
              borderColor: '#bbb',
              borderWidth: 1,
            }}
            itemTextStyle={{
              // Text style of a single dropdown item
              color: '#222',
            }}
            itemsContainerStyle={{
              // Items container style you can pass maxHeight
              // To restrict the items dropdown hieght
              // maxHeight: '60%',
            }}
            items={cityData}
            // Mapping of item array
            // defaultIndex={2}
            // Default selected item index
            placeholder="Search you city..."
            placeholderTextColor="#aaa"
            // place holder for the search input
            resPtValue={false}
            // Reset textInput Value with true and false state
            underlineColorAndroid="transparent"
          // To remove the underline from the android input
          />
        </View> */}
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
