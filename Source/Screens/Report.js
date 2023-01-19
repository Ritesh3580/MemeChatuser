import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import { localBaseurl } from '../config/baseurl';
import ImagePicker from 'react-native-image-crop-picker';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Colors from '../Assetst/Constants/Colors';
import SimpleToast from 'react-native-simple-toast';



const Report = ({ navigation, route }) => {

  const preData = route.params;
  const targetUser = preData?.user;
  const [checked, setChecked] = React.useState('');
  const [doc, setDoc] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  // const [checked, setChecked] = React.useState('second');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      showProfile();
    }
  }, [isFocused]);

  const showProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(localBaseurl + 'showProfile', { headers: { Authorization: `Bearer ${token}` } })
      .then(async res => {
        setProfile(res.data);
        // console.log(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("show profile err-->>", err.response.data);
        setLoading(false);
      })
  };


  const ChoosePhotoFromGalery = () => {
    ImagePicker.openPicker({
      width: wp('30%'),
      height: hp('15%'),
      cropping: true,
    }).then(async image => {
      setDoc(image);
    }).catch(err => console.log("img picker-->>", err))
  };

  const reportPerson = async () => {
    if (!profile._id || !targetUser || !checked || !doc) {
      return;
    };
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    const axiosConfig = {
      Authorization: `Bearer ${token}`,
    };
    axiosConfig['Content-type'] = 'multipart/form-data';

    var filename = doc?.path?.replace(/^.*[\\\/]/, '');
    let newFormData = new FormData();
    newFormData.append('iamge', {
      name: filename,
      type: doc.mime,
      uri:
        Platform.OS === 'android'
          ? doc.path
          : doc.path.replace('file://', ''),
    });
    newFormData.append('Choose_the_Reason', checked);
    newFormData.append('userId', profile._id);
    newFormData.append('targetId', targetUser._id);
    try {
      const response = await axios({
        url: localBaseurl + 'addreport',
        headers: axiosConfig,
        data: newFormData,
        method: 'POST',
      });

      console.log("report-->>", response.data);
        SimpleToast.show('Successfully reported...');
        // navigation.navigate('BottomTabNavigation');
    } catch (error) {
      console.log('report --->>', error.response?.data);
      SimpleToast.show("Sorry!, got some error...", SimpleToast.LONG);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={{ width: wp('33%'), height: hp('4%') }}>
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
            style={{ width: wp('33%'), height: hp('4%'), alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: hp('2.5%'),
                color: '#fff',
                textAlignVertical: 'center',
              }}>
              Report
            </Text>
          </View>
          <View style={{ width: wp('33%'), height: hp('4%') }}></View>
        </View>
        {
          loading ?
            <ActivityIndicator
              style={{ marginTop: '20%' }}
              size={40}
              color={Colors.darkPurple}
            />
            :
            <>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: hp('2.4%'),
                  color: '#000',
                  textAlignVertical: 'center',
                  paddingLeft: wp('3.5%'),
                  paddingTop: hp('2%'),
                }}>
                Choose the Reason{' '}
              </Text>

              <View
                style={{ width: wp('100%'), height: hp('31%'), marginTop: hp('1.5%') }}>
                <Pressable
                  onPress={() => setChecked(' Spam or Fraud')}
                  style={{
                    width: wp('100%'),
                    height: hp('5%'),
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: hp('4%'),
                      width: wp('45%'),
                      justifyContent: 'center',
                      paddingLeft: wp('4%'),
                    }}>
                    <Text
                      style={{
                        fontSize: hp('2%'),
                        color: '#9B999B',
                        fontWeight: 'normal',
                      }}
                      numberOfLines={1}>
                      Spam or Fraud
                    </Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: wp('2.5%'),
                      width: hp('3.6%'),
                      height: hp('3.6%'),
                      borderRadius: hp('3.6%'),
                    }}>
                    <RadioButton
                      value=" Spam or Fraud"
                      status={checked === ' Spam or Fraud' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked(' Spam or Fraud')}
                    />
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => setChecked('Gambling issue')}
                  style={{
                    width: wp('100%'),
                    height: hp('5%'),
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: hp('4%'),
                      width: wp('45%'),
                      justifyContent: 'center',
                      paddingLeft: wp('4%'),
                    }}>
                    <Text
                      style={{
                        fontSize: hp('2%'),
                        color: '#9B999B',
                        fontWeight: 'normal',
                      }}
                      numberOfLines={1}>
                      Gambling issue
                    </Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: wp('2.5%'),
                      width: hp('3.6%'),
                      height: hp('3.6%'),
                      borderRadius: hp('3.6%'),
                    }}>
                    <RadioButton
                      value="Gambling issue"
                      status={checked === 'Gambling issue' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked('Gambling issue')}
                    />
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => setChecked(' Verbal Harassment')}
                  style={{
                    width: wp('100%'),
                    height: hp('5%'),
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: hp('4%'),
                      width: wp('45%'),
                      justifyContent: 'center',
                      paddingLeft: wp('4%'),
                    }}>
                    <Text
                      style={{
                        fontSize: hp('2%'),
                        color: '#9B999B',
                        fontWeight: 'normal',
                      }}
                      numberOfLines={1}>
                      Verbal Harassment
                    </Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: wp('2.5%'),
                      width: hp('3.6%'),
                      height: hp('3.6%'),
                      borderRadius: wp('3.6%'),
                    }}>
                    <RadioButton
                      value=" Verbal Harassment"
                      status={
                        checked === ' Verbal Harassment' ? 'checked' : 'unchecked'
                      }
                      onPress={() => setChecked(' Verbal Harassment')}
                    />
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => setChecked('Nudity or inappropriate')}
                  style={{
                    width: wp('100%'),
                    height: hp('5%'),
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: hp('4%'),
                      width: wp('55%'),
                      justifyContent: 'center',
                      paddingLeft: wp('4%'),
                    }}>
                    <Text
                      style={{
                        fontSize: hp('2%'),
                        color: '#9B999B',
                        fontWeight: 'normal',
                      }}
                      numberOfLines={1}>
                      Nudity or inappropriate
                    </Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: wp('2.5%'),
                      width: hp('3.6%'),
                      height: hp('3.6%'),
                      borderRadius: hp('3.6%'),
                    }}>
                    <RadioButton
                      value="Nudity or inappropriate"
                      status={
                        checked === 'Nudity or inappropriate'
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => setChecked('Nudity or inappropriate')}
                    />
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => setChecked('Violation of rule')}
                  style={{
                    width: wp('100%'),
                    height: hp('5%'),
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: hp('4%'),
                      width: wp('45%'),
                      justifyContent: 'center',
                      paddingLeft: wp('4%'),
                    }}>
                    <Text
                      style={{
                        fontSize: hp('2%'),
                        color: '#9B999B',
                        fontWeight: 'normal',
                      }}
                      numberOfLines={1}>
                      Violation of rule
                    </Text>
                  </View>
                  <View
                    style={{
                      width: hp('3.6%'),
                      height: hp('3.6%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: wp('2.5%'),
                      borderRadius: hp('3.6%'),
                    }}>
                    <RadioButton
                      value="Violation of rule"
                      status={
                        checked === 'Violation of rule' ? 'checked' : 'unchecked'
                      }
                      onPress={() => setChecked('Violation of rule')}
                    />
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => setChecked(' Others')}
                  style={{
                    width: wp('100%'),
                    height: hp('5%'),
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: hp('4%'),
                      width: wp('45%'),
                      justifyContent: 'center',
                      paddingLeft: wp('4%'),
                    }}>
                    <Text
                      style={{
                        fontSize: hp('2%'),
                        color: '#9B999B',
                        fontWeight: 'normal',
                      }}
                      numberOfLines={1}>
                      Others
                    </Text>
                  </View>

                  <View
                    style={{
                      width: hp('3.6%'),
                      height: hp('3.6%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: wp('2.5%'),
                      borderRadius: hp('3.6%'),
                    }}>
                    <RadioButton
                      value=" Others"
                      status={checked === ' Others' ? 'checked' : 'unchecked'}
                      onPress={() => setChecked(' Others')}
                    />
                  </View>
                </Pressable>
              </View>

              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: hp('2%'),
                  color: '#9B999B',
                  textAlignVertical: 'center',
                  paddingLeft: wp('3.5%'),
                  paddingTop: hp('2%'),
                }}
                numberOfLines={1}>
                Report attachment (Please upload the screenshot of chat
              </Text>
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: hp('2%'),
                  color: '#9B999B',
                  textAlignVertical: 'center',
                  paddingLeft: wp('3%'),
                }}
                numberOfLines={1}>
                {' '}
                content or record video evidence.){' '}
              </Text>
              <View
                style={{
                  width: wp('100%'),
                  height: hp('17%'),
                  paddingLeft: wp('3.2%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={ChoosePhotoFromGalery}>
                  <View
                    style={{
                      width: wp('22%'),
                      height: hp('12%'),
                      backgroundColor: '#C3C0C3',
                      borderRadius: wp('2%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo name="plus" size={hp('10%')} color="#9B999B" />
                  </View>
                </TouchableOpacity>
                {
                  doc &&
                  <Image
                    source={{ uri: doc.path }}
                    style={{
                      height: wp('24%'),
                      width: wp('22%'),
                      borderRadius: 6,
                      overflow: 'hidden',
                      marginLeft: 10
                    }}
                  />
                }
              </View>

              <View
                style={{
                  height: hp('10%'),
                  width: wp('90%'),
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp('12.5%'),
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
                  onPress={reportPerson}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontFamily: 'Roboto-Bold',
                      fontSize: hp('2.2%'),
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </>
        }
      </View>
    </SafeAreaView>
  );
};

export default Report;

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
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#C5D5D6',
    borderBottomWidth: hp('0.1%'),
    elevation: 10,
  },
});
