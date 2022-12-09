import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Feedback = props => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack('Settings')}
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
              size={hp('3.2%')}
              color="#ffffff"
            />
            {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              fontSize: hp('2.5%'),
              color: '#ffffff',
              textAlignVertical: 'center',
              paddingLeft: wp('28%'),
            }}>
            Help & Feedback
          </Text>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('7%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
            marginTop: hp('2.5%'),
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.goBack('City')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Rate us
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.goBack('City')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Feedback
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.goBack('City')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Safety Center
            </Text>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.goBack('City')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Terms of Service
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.goBack('City')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.goBack('City')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Safety Center
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.1%'),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: hp('4%'),
              justifyContent: 'center',
              paddingLeft: wp('4%'),
            }}
            onPress={() => props.navigation.navigate('Delete')}>
            <Text style={{fontSize: hp('2.5%'), color: '#000000'}}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Feedback;

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
  },
});
