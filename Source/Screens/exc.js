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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl, localBaseurl, token} from '../config/baseurl';

const profileEditProfile =
  localBaseurl + 'updateduserPeofile/62a8197dba6594efca308cfb';
const fillDataUrl = localBaseurl + 'showProfile';

const Edit = ({navigation, props}) => {
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

  const nameUser = E => {
    setName(E.nativeEvent.text);
  };

  const realtionShip = R => {
    setselectedRelationship(R);
  };

  const userData = {
    fullName: name,
  };

  const api = async () => {
    alert('api call');
    const token = await AsyncStorage.getItem('token');
    console.log('nikal yaha se', profileEditProfile, userData);
    axios
      .put(profileEditProfile, userData, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        navigation.navigate('ProfileEdit');
        setData(res.data);
        console.log(res.data);
        alert('updated');
      });
  };
  const api1 = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(fillDataUrl, {headers: {Authorization: `Bearer ${token}`}})
      .then(res => {
        console.log('jatnisfdaeslc', res.data);
        setProfile(res.data);
        setName(res.data.fullName);
        setId(res.data.userId);
        setGender(res.data.gender);
        setPhoneNo(res.data.phone);
        setLocation(res.data.city);
        setEmail(res.data.emailId);
        setDate(res.data.dateOfBirth);
      });
  };
  useEffect(() => {
    api1();
  }, []);

  const valid = () => {
    if (selectedRelationship == '') {
      alert('Select Your Gender');
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={{width: wp('33%'), height: hp('4%')}}>
            <TouchableOpacity
              onPress={() => navigation.goBack('ProfileEdit')}
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
                value={profile && name}
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
                onPress={() => props.navigation.navigate('City')}>
                <Text style={{fontSize: hp('2%'), color: '#000000'}}>
                  {profile && profile.city}
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
                value="Status"
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
            onPress={api}>
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

    borderRadius: hp('2%'),

    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
