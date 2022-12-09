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
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assetst/Constants/Colors';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MonthDateYearField} from 'react-native-datefield';
import moment from 'moment';
import axios from 'axios';
import {baseurl, token, localBaseurl} from '../config/baseurl';
const profileDataUrl = localBaseurl + 'register_with_phone';

const ProfileScreen = ({route, navigation}) => {
  const [date, setDate] = useState();
  const [profileName, setProfileName] = useState('');
  const [city, setCity] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [open, setOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [color, setColor] = useState(true);
  const [myColor, setMyColor] = useState(false);
  //    const { tokenIdName } = route.params;

  const Male = () => {
    setColor(true);
    setMyColor(false);
  };
  const Female = () => {
    setMyColor(true);
    setColor(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const TakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: wp('30%'),
      height: hp('15%'),
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      if (image) {
        setModalVisible(false);
      }
      // this.bs.current.snapTo(1);
    });
  };

  const ChoosePhotoFromGalery = () => {
    ImagePicker.openPicker({
      width: wp('30%'),
      height: hp('15%'),
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      if (image) {
        setModalVisible(false);
      }
      // this.bs.current.snapTo(1);
    });
  };

  const ProfilePicSet = () => {
    if (image) {
      setModalVisible(false);
    }
  };

  const validForm = () => {
    const reg = /^[6-9]{1}[0-9]{9}$/;
    const rule = /^[a-zA-Z ]{2,40}$/;

    if (rule.test(profileName) == '') {
      alert('Enter the  Name');
    } else {
      alert('Form Submitted Successfully');
      navigation.navigate('FollowNext');
    }
  };
  // const fDate=(text)=>{
  //     console.log("111",text)
  // }
  const [isCheckSelected, setCheckSelected] = useState(1);
  const products = [
    {
      id: 1,
      name: 'Male',
    },
    {
      id: 2,
      name: 'Female',
    },
  ];
  const checkClick = name => {
    setCheckSelected(name);
  };
  const Selector = () => {
    setSelected(!selected);
  };
  const userProfileData = async () => {
    let p = date;
    p = p.split('/');
    p = p.join('-');
    // console.log(p);
    const userData = {
      fullName: profileName,
      dateOfBirth: date,
      gender: isCheckSelected,
      city: city,
    };
    // console.log(userData);
    const token = await AsyncStorage.getItem('token');
    axios
      .post(profileDataUrl, userData, {
        headers: {Authorization: 'Bearer ' + token},
      })
      .then(response => {
        // console.log('cdnsvjdfvsnjkdfnvjkdfnv', profileDataUrl, userData);
        // console.log('data is coming');
        // console.log(response.data);
        if (response.data.status) {
          alert('profile data submitted  successful');
          navigation.navigate('BottomTabNavigation')
          // navigation.navigate('FollowNext');
        } else {
          alert('user is alredy register');
          navigation.navigate('BottomTabNavigation');
        }
      })
      .catch(err=>{
        console.log(err);
      })
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.lightPurples} />

        <Modal
          isVisible={isModalVisible}
          animationOutTiming={900}
          animationInTiming={900}
          hideModalContentWhileAnimating={true}
          useNativeDriverForBackdrop={true}
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['down']}
          avoidKeyboard={true}
          useNativeDriver={true}
          style={{alignSelf: 'center'}}>
          <View
            style={{
              width: wp('100%'),
              height: hp('50%'),
              alignItems: 'center',
              marginTop: hp('50%'),
              borderTopLeftRadius: hp('4%'),
              borderTopRightRadius: hp('4%'),
              backgroundColor: 'white',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: 'gray',
                width: wp('30%'),
                borderRadius: hp('1.5%'),
                marginTop: hp('2%'),
              }}></View>
            <View
              style={{
                width: wp('100%'),
                height: hp('14%'),
                marginTop: hp('5%'),
                padding: wp('2.5%'),
              }}>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  fontWeight: 'bold',
                  color: 'black',
                  marginBottom: hp('1%'),
                  paddingLeft: wp('1%'),
                }}>
                Upload Photo
              </Text>
            </View>

            <View
              style={{
                width: wp('100%'),
                height: hp('9%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={TakePhotoFromCamera}
                style={{
                  width: wp('80%'),
                  height: hp('7%'),
                  backgroundColor: Colors.lightPurples,
                  borderRadius: hp('1.5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: Colors.white}}>
                  Take Photo From Camera
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={ChoosePhotoFromGalery}
                style={{
                  width: wp('80%'),
                  height: hp('7%'),
                  backgroundColor: Colors.lightPurples,
                  borderRadius: hp('1.5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <Text style={{color: Colors.white}}>
                  Choose Photo From Galery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
                style={{
                  width: wp('80%'),
                  height: hp('7%'),
                  backgroundColor: Colors.lightPurples,
                  borderRadius: hp('1.5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <Text style={{color: Colors.white}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View
          style={{
            width: wp('100%'),
            height: hp('25%'),
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: 'green',
          }}>
          <TouchableOpacity
            style={{
              height: hp('16%'),
              width: wp('30%'),
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
              // marginTop: hp('1%')
            }}
            onPress={toggleModal}>
            {image == '' ? (
              <View
                style={{
                  width: wp('13%'),
                  height: hp('12%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'blue',
                }}>
                <Image
                  source={require('../Assetst/Images/6.png')}
                  style={{
                    width: hp('12%'),
                    height: hp('12%'),
                    borderRadius: hp('1%'),
                  }}
                />
              </View>
            ) : (
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{
                  height: hp('15%'),
                  width: wp('25%'),
                  marginTop: hp('0.5%'),
                  alignItems: 'center',
                  borderRadius: hp('1%'),
                  backgroundColor: 'gray',
                  backgroundColor: 'skyblue',
                }}></ImageBackground>
            )}
          </TouchableOpacity>
          <View
            style={{
              width: wp('100%'),
              height: hp('4%'),
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp('0.3%'),
            }}>
            <Text
              style={{
                color: Colors.primaryGray,
                fontSize: hp('2.2%'),
                fontWeight: 'normal',
              }}>
              Upload your photo
            </Text>
          </View>
        </View>

        <View
          style={{
            width: wp('100%'),
            height: hp('12%'),
            marginTop: hp('0.5%'),
            // backgroundColor: 'pink',
          }}>
          <View
            style={{
              width: wp('96%'),
              height: hp('4%'),
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: hp('0.3%'),
            }}>
            <Text
              style={{
                color: "#000",
                fontSize: hp('2.2%'),
                marginLeft: hp('0.3%'),
                fontWeight: 'normal',
              }}>
              Enter Your Name
            </Text>
          </View>
          <View
            style={{
              width: wp('96%'),
              alignSelf: 'center',
              // backgroundColor: Colors.primaryColor8,
              borderRadius: hp('1.5%'),
              borderWidth: 1,
              borderColor: Colors.darkPurple,
              height: hp('7%'),
              marginTop: hp('0.3%'),
            }}>
            <TextInput
              placeholder="Joseph Harris"
              placeholderTextColor="gray"
              style={{
                fontSize: hp('2.2%'),
                width: wp('96%'),
                alignSelf: 'center',
                height: hp('7%'),
                marginLeft: hp('2%'),
                color: '#000'
              }}
              onChangeText={text => setProfileName(text)}
              // keyboardType='email-address'
              // onChangeText={handleChange('email')}
              // onBlur={handleBlur('email')}
              // value={values.email}
            />
          </View>
        </View>

        <View
          style={{width: wp('100%'), height: hp('12%'), marginTop: hp('0.5%')}}>
          <View
            style={{
              width: wp('96%'),
              height: hp('4%'),
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: hp('0.3%'),
            }}>
            <Text
              style={{
                color: "#000",
                fontSize: hp('2.2%'),
                marginLeft: hp('0.3%'),
                fontWeight: 'normal',
              }}>
              Date of Birth
            </Text>
          </View>
          <View
            style={{
              width: wp('96%'),
              height: hp('7%'),
              marginTop: hp('0.3%'),
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: Colors.darkPurple,
              borderWidth: 2,
              alignSelf: 'center',
              borderRadius: hp('1.5%'),
            }}>
            <MonthDateYearField
              style={{
                width: wp('22%'),
                borderRadius: 8,
                borderColor: '#cacaca',
                borderWidth: 1,
                color:'##000'
              }}
              //onSubmit={(value) => console.log(value)}
              handleErrors={() => console.log('ERROR')}
              maximumDate={new Date()}
              minimumDate={new Date(1950, 4, 21)}
              // onSubmit={(text) => setDate(moment(text).format("MonthDateYear"))}
              // onSubmit={(value) => console.log('MonthDateYearField', value)}
              onSubmit={value => {
                // console.log(value);
                setDate(moment(value).format('MM/DD/YYYY'))
              }}
              // onSubmit={(text) => fDate(text)}
            />
          </View>
        </View>

        <View
          style={{width: wp('100%'), height: hp('12%'), marginTop: hp('0.5%')}}>
          <View
            style={{
              width: wp('96%'),
              height: hp('4%'),
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: hp('0.3%'),
            }}>
            <Text
              style={{
                color: "#000",
                fontSize: hp('2.2%'),
                marginLeft: hp('0.3%'),
                fontWeight: 'normal',
              }}>
              Choose Your City
            </Text>
          </View>
          <View
            style={{
              width: wp('96%'),
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.primaryColor8,
              borderRadius: hp('1.5%'),
              borderWidth: 1,
              borderColor: Colors.darkPurple,
              height: hp('7%'),
              marginTop: hp('0.3%'),
            }}>
            <TextInput
              placeholder="New Delhi"
              placeholderTextColor="black"
              style={{
                fontSize: hp('2.2%'),
                width: wp('80%'),
                alignSelf: 'center',
                height: hp('7%'),
                marginLeft: hp('2%'),
              }}
              onChangeText={text => setCity(text)}
            />
            <TouchableOpacity
              style={{
                width: wp('12%'),
                height: hp('6%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: hp('1%'),
              }}
              onPress={() => navigation.navigate('City')}>
              <AntDesign name="caretdown" color="black" size={hp('2.5%')} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{width: wp('100%'), height: hp('14%'), marginTop: hp('0.5%')}}>
          <View
            style={{
              width: wp('96%'),
              height: hp('4%'),
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: hp('0.3%'),
            }}>
            <Text
              style={{
                color: "#000",
                fontSize: hp('2.2%'),
                marginLeft: hp('0.3%'),
                fontWeight: 'normal',
              }}>
              Gender
            </Text>
          </View>
          <View
            style={{
              width: wp('96%'),
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              height: hp('8%'),
              marginTop: hp('0.5%'),
              alignItems: 'center',
            }}>
            {products.map(val => {
              return (
                <TouchableOpacity
                  key={val.name}
                  onPress={checkClick.bind(this, val.name)}>
                  <View
                    style={{
                      width: wp('42%'),
                      height: hp('7%'),
                      borderRadius: hp('1%'),
                      // marginLeft: hp('2.8%'),
                      backgroundColor:
                        val.name == isCheckSelected
                          ? Colors.lightPurples
                          : 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: wp('0.4%'),
                      borderColor: Colors.darkPurple,
                      // flexDirection: 'row'
                    }}>
                    <Text
                      style={{
                        color:
                          val.name == isCheckSelected
                            ? 'white'
                            : Colors.lightPurples,
                        fontWeight: 'bold',
                      }}>
                      {val.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            {/* <TouchableOpacity 
                         value={selectedGender}
                        onPress={(value) => console.log(value)}
                            // onValueChange={text => setSelectedGender(text)}
                            style={{ backgroundColor: color ? Colors.lightPurples : "white", width: wp('40%'), height: hp('7%'), alignItems: 'center', justifyContent: 'center', borderRadius: hp('1%'), marginLeft: hp('0.3%'), borderWidth: 1, borderColor: Colors.darkPurple }} >
                            <Text style={{ fontWeight: 'bold', fontSize: hp('1.8%'), color: color ? "white" : Colors.lightPurples }}>Male</Text>
                        </TouchableOpacity>


                        <TouchableOpacity 
                           value={selectedGender}
                            onPress={(value) => console.log(value)}
                            style={{ backgroundColor: myColor ? Colors.lightPurples : "white", width: wp('40%'), height: hp('7%'), alignItems: 'center', justifyContent: 'center', borderRadius: hp('1%'), marginRight: hp('0.3%'), borderWidth: 1, borderColor: Colors.darkPurple }}>
                            <Text style={{ fontWeight: 'bold', fontSize: hp('1.8%'), color: myColor ? "white" : Colors.lightPurples }}>Female</Text>
                        </TouchableOpacity> */}
          </View>
        </View>
        {/* <View style={{ width: wp('100%'), height: hp('6%'), marginTop: hp('1%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'center',backgroundColor:'green'}}> */}
        {/* {products.map((val) => {
                                        return (
                                            <TouchableOpacity key={val.name} onPress={checkClick.bind(this, val.name)}>
                                                <View style={{
                                                    width: wp('22%'),
                                                    height: hp('5.5%'),
                                                    borderRadius: hp('1%'),
                                                    marginLeft: hp('2.8%'),
                                                    backgroundColor: val.name == isCheckSelected ? '#2581d4' : "white",
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    // flexDirection: 'row'
                                                }}>
                                                    <Text style={{ color: val.name == isCheckSelected ? 'white' : "#2581d4", fontWeight: 'bold' }}>{val.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })} */}
        {/* </View> */}
        <TouchableOpacity
          onPress={userProfileData}
          style={{
            width: wp('96%'),
            height: hp('7%'),
            backgroundColor: Colors.lightPurples,
            alignSelf: 'center',
            marginTop: hp('12%'),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: hp('1.5%'),
          }}>
          <Text
            style={{fontWeight: 'bold', fontSize: hp('1.8%'), color: 'white'}}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),

    backgroundColor: Colors.primaryColor8,
  },
  inputBorder: {
    width: wp('22%'),

    //borderColor:'#b15eff',
    borderRadius: wp('2%'),
    marginLeft: 2,
    marginRight: 2,
    // borderWidth:1
  },
});

export default ProfileScreen;
