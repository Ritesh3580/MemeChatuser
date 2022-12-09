import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Switch,
  ImageBackground,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseurl, localBaseurl, token } from '../config/baseurl';
const profileEditUrl =
  localBaseurl + 'finduserallfollow/62a8197dba6594efca308cfb';
const ProfileFriendUrl =
  localBaseurl + 'finduserAllfriends/62a8197dba6594efca308cfb';
const fillDataUrl = localBaseurl + 'showProfile';

import Modal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';

const ProfileEdit = props => {
  const [switchValue, setSwitchValue] = useState(false);
  const [followers, setFollowers] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [friendData, setFriendData] = useState(null);
  const [id, setId] = useState([]);
  const [userImage, setUserImage] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      showProfile();
    }
  }, [isFocused]);

  const toggleSwitch = value => {
    setSwitchValue(value);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const TakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: wp('30%'),
      height: hp('15%'),
      cropping: true,
    }).then(async image => {
      // console.log(image);
      setUserImage(image);
      await postUploadDocument(image)
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
    }).then(async image => {
      // console.log(image);
      setUserImage(image);
      await postUploadDocument(image)
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
  const getFriends = async (id) => {
    axios.get(localBaseurl + 'finduserAllfriends/' + id).then(res => {
      setFriendData(res.data);
      console.log("Friends-->>", res.data);
    })
      .catch(err => {
        console.log("get friends err-->>", err.response.data);
      })
  };

  //   data&&console.log(data)

  // const getFollows = async(id) => {
  //   axios.get(localBaseurl+'finduserallfollow/'+id).then(res => {
  //     setFollowers(res.data);
  //     // console.log("Follows-->>>>",res.data);
  //   })
  //   .catch(err=>{
  //     console.log("get follows err-->>",err.response.data);
  //   })
  // };

  const showProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(fillDataUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then(async res => {
        // console.log('jidsaidfsj', res.data);
        // setFriendData(res.data);
        setProfile(res.data);
        setId(res.data);
        await getFriends(res.data._id);
        // await getFollows(res.data._id);
      })
      .catch(err => {
        console.log("show profile err-->>", err.response.data);
      })
  };

  const postUploadDocument = async (image) => {
    toggleModal();
    SimpleToast.show("Uploading...", SimpleToast.LONG);
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    // const token = JSON.parse(tokenObj);
    const axiosConfig = {
      Authorization: `Bearer ${token}`,
    };
    axiosConfig['Content-type'] = 'multipart/form-data'; // add new key and its value to a object
    // console.log(axiosConfig);
    var filename = image?.path?.replace(/^.*[\\\/]/, '');
    let newFormData = new FormData();
    newFormData.append('image', {
      name: filename,
      type: image.mime,
      uri:
        Platform.OS === 'android'
          ? image.path
          : image.path.replace('file://', ''),
    });
    try {
      const response = await axios({
        url: localBaseurl + 'updateProfileUser',
        headers: axiosConfig,
        data: newFormData,
        method: 'PUT',
      });

      console.log('upload image RESSS====>>>>', response.data);
      SimpleToast.show("Successfully uploaded", SimpleToast.LONG);
    } catch (error) {
      console.log('upload image errror --->>> ', error.response?.data);
      SimpleToast.show("Sorry!, got some error...", SimpleToast.LONG);
    }
  };
  //data&&console.log(friendData)

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#ff0090" />

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
        style={{ alignSelf: 'center' }}>
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
                backgroundColor: '#b15eff',
                borderRadius: hp('1.5%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#fff' }}>Take Photo From Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ChoosePhotoFromGalery}
              style={{
                width: wp('80%'),
                height: hp('7%'),
                backgroundColor: '#b15eff',
                borderRadius: hp('1.5%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12,
              }}>
              <Text style={{ color: '#fff' }}>Choose Photo From Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(!isModalVisible)}
              style={{
                width: wp('80%'),
                height: hp('7%'),
                backgroundColor: '#b15eff',
                borderRadius: hp('1.5%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12,
              }}>
              <Text style={{ color: '#fff' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.head}>
          <LinearGradient
            colors={['#ff0099', '#922ABE']}
            style={{ height: hp('28%'), width: wp('100%') }}>
            <View
              style={{
                width: wp('100%'),
                height: hp('7%'),
                alignItems: 'center',
                justifyContent: 'center',
                //backgroundColor: 'blue',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: hp('2.8%'),
                  color: '#fff',
                  textAlignVertical: 'center',
                }}>
                Profile
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            width: wp('40%'),
            height: hp('27%'),
            alignSelf: 'center',
            marginTop: hp('-10%'),
            alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: 'purple',
          }}>
          {!userImage ?
            profile?.imageUrl ?
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}
              style={{
                width: hp('16%'),
                height: hp('16%'),
                borderRadius: hp('2%'),
                borderColor: '#fff',
                borderWidth: wp('1.2%'),
              }}>
                <Image
                  source={{ uri: profile?.imageUrl }}
                  style={{ width: '100%', height: '100%', borderRadius: 10 }}
                />
              </TouchableOpacity>
              :
              (
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                    // postUploadDocument();
                  }}
                  style={{
                    width: hp('16%'),
                    height: hp('16%'),
                    borderRadius: hp('2%'),
                    borderColor: '#000',
                    borderWidth: wp('0.5%'),
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal();
                    }}
                    style={{
                      backgroundColor: '#000',
                      height: 40,
                      width: 40,

                      borderRadius: 40 / 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FontAwesome name="camera" size={18} color="#fff" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ) : (
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                }}
                style={{
                  width: hp('16%'),
                  height: hp('16%'),
                  borderRadius: hp('2%'),
                  borderColor: '#fff',
                  borderWidth: wp('1.2%'),
                }}>
                <Image
                  source={{ uri: userImage?.path }}
                  style={{ width: '100%', height: '100%', borderRadius: 10 }}
                />
              </TouchableOpacity>
            )}

          <View
            style={{
              width: wp('38%'),
              height: hp('3.2%'),
              marginTop: hp('0.5%'),
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp('2%'),
                color: '#000',
                textAlignVertical: 'center',
              }}>
              {profile && profile.fullName}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('exc')}
              style={{
                width: wp('7%'),
                height: hp('3%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="edit" size={hp('2.5%')} color="#000" />
              {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp('2%'),
                color: '#000',
                textAlignVertical: 'center',
              }}>
              {data && data.userage}
            </Text>
          </View>
          <View
            style={{
              width: wp('40%'),
              height: hp('3.6%'),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontWeight: 'normal',
                fontSize: hp('2%'),
                color: '#000',
                textAlignVertical: 'center',
              }}>
              {id && id.userId}
            </Text>
            <TouchableOpacity>
              <View
                style={{
                  width: wp('12%'),
                  height: hp('3%'),
                  borderColor: '#8D8B8B',
                  borderRadius: hp('2%'),
                  borderWidth: wp('0.2%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: wp('2%'),
                }}>
                <Text
                  style={{
                    fontSize: hp('1.5%'),
                    color: '#8D8B8B',
                    textAlignVertical: 'center',
                  }}>
                  Copy
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: wp('82%'),
            height: hp('7%'),
            justifyContent: 'space-between',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp('1%'),
          }}>
          <TouchableOpacity>
            <View
              style={{
                width: wp('34%'),
                height: hp('5%'),
                borderColor: '#8D8B8B',
                borderRadius: hp('1%'),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8e8ff',
              }}>
              <Text
                style={{
                  fontSize: hp('2%'),
                  color: '#000',
                  textAlignVertical: 'center',
                }}>
                Followers {profile?.followers?.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                width: wp('34%'),
                height: hp('5%'),
                borderColor: '#8D8B8B',
                borderRadius: hp('1%'),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8e8ff',
              }}>
              <Text
                style={{
                  fontSize: hp('2%'),
                  color: '#000',
                  textAlignVertical: 'center',
                }}>
                Friends {friendData?.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ width: wp('100%'), height: hp('40%') }}>
          <View
            style={{
              width: wp('95%'),
              height: hp('8%'),
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: hp('2%'),
            }}>
            <Image
              source={require('../Assetst/Images/Group12.png')}
              style={{
                width: hp('5%'),
                height: hp('5%'),
                marginLeft: wp('1.5%'),
              }}
            />
            <TouchableOpacity
              style={{
                height: hp('5%'),
                width: wp('60%'),
                justifyContent: 'center',
                paddingLeft: wp('1%'),
              }}
              onPress={() => props.navigation.navigate('MyWallet', profile)}>
              <View
                style={{
                  height: hp('5%'),
                  width: wp('60%'),
                  justifyContent: 'center',
                  paddingLeft: wp('1%'),
                }}>
                <Text
                  style={{
                    fontSize: hp('2%'),
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  My Wallet
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                height: hp('5%'),
                width: wp('25%'),
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                paddingRight: wp('1%'),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  width: wp('25%'),
                  height: hp('5%'),
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    height: hp('5%'),
                    justifyContent: 'center',
                    width: wp('25%'),
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                  }}
                  onPress={() => props.navigation.navigate('MyWallet', profile)}>
                  <View
                    style={{
                      alignItems: 'center',
                      width: wp('20%'),
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
                        textAlignVertical: 'center',
                      }}>
                      {profile?.coins || 0}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      width: wp('5%'),
                      height: hp('5%'),
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Ionicons
                      name="md-chevron-forward"
                      size={hp('3.2%')}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              width: wp('97%'),
              height: hp('8%'),
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Image
              source={require('../Assetst/Images/Group13.png')}
              style={{
                width: hp('5%'),
                height: hp('5%'),
                marginLeft: wp('1.5%'),
              }}
            />
            <TouchableOpacity
              style={{
                height: hp('5%'),
                width: wp('60%'),
                justifyContent: 'center',
                paddingLeft: wp('1%'),
              }}
              onPress={() => props.navigation.navigate('Settings')}>
              <View
                style={{
                  height: hp('5%'),
                  width: wp('60%'),
                  justifyContent: 'center',
                  paddingLeft: wp('1%'),
                }}>
                <Text
                  style={{
                    fontSize: hp('2%'),
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  Settings
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: hp('5%'),
                width: wp('25%'),
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: wp('1%'),
              }}>
              <TouchableOpacity
                style={{
                  height: hp('5%'),
                  justifyContent: 'center',
                  width: wp('25%'),
                  alignItems: 'flex-end',
                }}
                onPress={() => props.navigation.navigate('Settings')}>
                <Ionicons
                  name="md-chevron-forward"
                  size={hp('3.2%')}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: wp('97%'),
              height: hp('8%'),
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Image
              source={require('../Assetst/Images/Group14.png')}
              style={{
                width: hp('5%'),
                height: hp('5%'),
                marginLeft: wp('1.5%'),
              }}
            />
            <TouchableOpacity
              style={{
                height: hp('5%'),
                width: wp('60%'),
                justifyContent: 'center',
                paddingLeft: wp('1%'),
              }}
              onPress={() => props.navigation.navigate('Refer&earn')}>
              <View
                style={{
                  height: hp('5%'),
                  width: wp('60%'),
                  justifyContent: 'center',
                  paddingLeft: wp('1%'),
                }}>
                <Text
                  style={{
                    fontSize: hp('2%'),
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  Invite & Earn
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: hp('5%'),
                width: wp('25%'),
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: wp('1%'),
              }}>
              <TouchableOpacity
                style={{
                  height: hp('5%'),
                  justifyContent: 'center',
                  width: wp('25%'),
                  alignItems: 'flex-end',
                }}
                onPress={() => props.navigation.navigate('Refer&earn')}>
                <Ionicons
                  name="md-chevron-forward"
                  size={hp('3.2%')}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  head: {
    width: wp('100%'),
    height: hp('28%'),
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
{
  /* <TouchableOpacity
              style={{
                height: hp('16%'),
                width: wp('30%'),
                justifyContent: 'center',
                // alignSelf: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
                marginTop: hp('-26%'),
              }}
              onPress={toggleModal}>
              {image == '' ? (
                <View
                  style={{
                    width: wp('13%'),
                    height: hp('12%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    //backgroundColor: 'blue',
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
                    //backgroundColor: 'skyblue',
                  }}></ImageBackground>
              )}
            </TouchableOpacity> */
}
