import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
//import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleToast from 'react-native-simple-toast';
import {baseurl, localBaseurl, token} from '../config/baseurl';
import { useIsFocused } from '@react-navigation/native';

const Edit = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [data, setData] = useState(null);
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [id, setId] = useState('');
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [selectedRelationship, setselectedRelationship] = useState('');
  const isFocused = useIsFocused();

  useEffect(()=>{
    if(route.params?.city){
      // console.log("city from city-->>",route.params.city);
      if(route.params.city?.name){
        let _loc = route.params.city.name +", " + route.params.city.state;
        setLocation(_loc);
      }
      else{
        setLocation(route.params.city);
      }
    }
  },[route.params?.city]);

  useEffect(() => {
    if(isFocused){
      _getUserProfile();
    }
  }, [isFocused]);

  const _getUserProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(localBaseurl + 'showProfile', {headers: {Authorization: `Bearer ${token}`}})
      .then(res => {
        setProfile(res.data);
        setName(res.data.fullName);
        setId(res.data.userId);
        setGender(res.data.gender);
        setPhoneNo(res.data.phone);
        !route.params?.city && setLocation(res.data.city);
        setEmail(res.data.emailId);
        setDate(res.data.dateOfBirth);
        res.data.relationshipStatus && setselectedRelationship(res.data.relationshipStatus);
      });
  };

  const nameUser = E => {
    setName(E.nativeEvent.text);
  };

  const realtionShip = R => {
    setselectedRelationship(R);
  };


  const _updateProfile = async () => {
    if (selectedRelationship == '') {
      alert('Select your relationship status');
      return;
    }
    const token = await AsyncStorage.getItem('token');
    const userData = {
      fullName: name,
      city: location,
      relationshipStatus: selectedRelationship
    };
    axios
      .put(localBaseurl + 'updateduserPeofile', userData, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        SimpleToast.show('Successfully Updated');
        navigation.navigate('ProfileEdit');
      });
  };


  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={{width: wp('33%'), height: hp('4%')}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
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
            style={{width: wp('33%'), height: hp('4%'), alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.5%'),
                color: '#fff',
                textAlignVertical: 'center',
              }}>
              Edit
            </Text>
          </View>
          <View style={{width: wp('33%'), height: hp('4%')}}></View>
        </View>
        <TouchableOpacity>
          <View
            style={{
              width: wp('100%'),
              height: hp('7%'),
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#C5D5D6',
              borderBottomWidth: hp('0.1%'),
            }}>
            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                paddingLeft: wp('2.5%'),
              }}>
              <Text style={{fontSize: hp('2%'), color: '#999999'}}>
                NickName
              </Text>
            </View>

            <View style={{height: hp('5%'), width: wp('40%')}}>
              {/* <Text style={{fontSize:hp('2%'),color:'#000000'}}>Moni</Text> */}
              <TextInput
                placeholder=""
                placeholderTextColor="gray"
                style={{
                  fontSize: hp('2%'),
                  width: wp('38%'),
                  height: hp('6%'),
                  textAlign: 'right',
                  color: '#000000',
                }}
                onChange={E => nameUser(E)}
                defaultValue={name}
              />
            </View>
            {/* //onChangeText={text => setProfileName(text)}
                        // keyboardType='email-address'
                        // onChangeText={handleChange('email')}
                        // onBlur={handleBlur('email')}
                        // value={values.email} */}
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              paddingLeft: wp('2.5%'),
            }}>
            <Text style={{fontSize: hp('2%'), color: '#999999'}}>Id</Text>
          </View>

          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: wp('2.5%'),
            }}>
            <TouchableOpacity
              onPress={()=>Clipboard.setString(profile?.userId || '')}
              style={{
                flexDirection: 'row',
                height: hp('4%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: hp('2%'),
                  color: '#000000',
                  marginRight: wp('1.2%'),
                }}>
                {profile && profile.userId}
              </Text>
              <MaterialIcons
                name="content-copy"
                size={hp('2.1%')}
                color="#000000"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('40%'),
              justifyContent: 'center',
              paddingLeft: wp('2.5%'),
            }}>
            <Text style={{fontSize: hp('2%'), color: '#999999'}}>Email</Text>
          </View>

          <View
            style={{
              height: hp('5%'),
              width: wp('55%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: wp('2.5%'),
            }}>
            <Text
              style={{fontSize: hp('2%'), color: '#000000'}}
              numberOfLines={1}>
              {profile && profile.emailId}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              paddingLeft: wp('2.5%'),
            }}>
            <Text style={{fontSize: hp('2%'), color: '#999999'}}>
              Phone No.
            </Text>
          </View>

          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: wp('2.5%'),
            }}>
            <Text style={{fontSize: hp('2%'), color: '#000000'}}>
              {profile && profile.phone}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              paddingLeft: wp('2.5%'),
            }}>
            <Text style={{fontSize: hp('2%'), color: '#999999'}}>Gender</Text>
          </View>

          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: wp('2.5%'),
            }}>
            <Text style={{fontSize: hp('2%'), color: '#000000'}}>
              {profile && profile.gender}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              paddingLeft: wp('2.5%'),
            }}>
            <Text style={{fontSize: hp('2%'), color: '#999999'}}>
              Date Of Birth
            </Text>
          </View>

          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: wp('2.5%'),
            }}>
            <Text style={{fontSize: hp('2%'), color: '#000000'}}>
              {profile && profile.dateOfBirth}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <View
            style={{
              width: wp('100%'),
              height: hp('7%'),
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#C5D5D6',
              borderBottomWidth: hp('0.1%'),
            }}>
            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                paddingLeft: wp('2.5%'),
              }}>
              <Text style={{fontSize: hp('2%'), color: '#999999'}}>
                Location
              </Text>
            </View>

            <View
              style={{
                height: hp('5%'),
                width: wp('45%'),
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: wp('2.5%'),
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  height: hp('4%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('City',location)}>
                <Text style={{fontSize: hp('2%'), color: '#000000'}}>
                  {profile && location}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
          }}>
          <View
            style={{
              height: hp('5%'),
              width: wp('45%'),
              justifyContent: 'center',
              paddingLeft: wp('2.5%'),
            }}>
            <Text style={{fontSize: hp('2%'), color: '#999999'}}>
              RelationShip
            </Text>
          </View>

          <TouchableOpacity>
            <Picker
              style={styles.inputTxt4}
              selectedValue={selectedRelationship}
              // onValueChange={(itemValue, itemIndex) => setselectedRelationship(itemValue)}
              onValueChange={R => realtionShip(R)}>
              <Picker.Item
                label="Status"
                value=""
                style={{
                  fontSize: hp('2%'),
                  color: '#b15eff',
                  fontWeight: 'bold',
                }}
              />
              <Picker.Item
                label="Married"
                value="Married"
                style={{fontSize: hp('1.8%')}}
              />
              <Picker.Item
                label="Unmarried"
                value="Unmarried"
                style={{fontSize: hp('1.8%')}}
              />
              <Picker.Item
                label="Engaged"
                value="Engaged"
                style={{fontSize: hp('1.8%')}}
              />
              <Picker.Item
                label="Other"
                value="Other"
                style={{fontSize: hp('1.8%')}}
              />
            </Picker>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: wp('100%'),
            height: hp('29%'),
            alignItems: 'center',
            marginTop: hp('2%'),
          }}>
          <TouchableOpacity
            style={{
              width: wp('80%'),
              height: hp('7.4%'),
              backgroundColor: 'white',
              borderRadius: hp('3.5%'),
              backgroundColor: '#b15eff',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: hp('20%'),
            }}
            onPress={_updateProfile}>
            <Text
              style={{
                color: '#ffffff',
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.2%'),
              }}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Edit;

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
  inputTxt4: {
    width: wp('32%'),
    height: hp('5%'),
    color: "#000",
    borderRadius: hp('2%'),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
