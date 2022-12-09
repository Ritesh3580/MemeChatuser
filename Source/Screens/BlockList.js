import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

const BlockList = props => {
  const [myModal, setMyModal] = useState(false);

  const toggleMyMobile = () => {
    setMyModal(!myModal);
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#b15eff" />
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={{width: wp('33%'), height: hp('4%')}}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack('Settings')}
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
              Block List
            </Text>
          </View>
          <View style={{width: wp('33%'), height: hp('4%')}}></View>
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('12%'),
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#C5D5D6',
            borderBottomWidth: hp('0.2%'),
            marginTop: hp('1%'),
          }}>
          <View
            style={{
              height: hp('9%'),
              width: wp('16%'),
              justifyContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../Assetst/Images/1382726.jpg')}
              style={{
                width: hp('9%'),
                height: hp('9%'),
                borderRadius: hp('9%'),
              }}
            />
          </View>
          <View
            style={{
              height: hp('9%'),
              width: wp('38%'),
              justifyContent: 'center',
              paddingLeft: wp('2.5%'),
            }}>
            <Text style={{fontSize: hp('2.2%'), color: '#000'}}>
              Oliva Martin
            </Text>
          </View>

          {/* <View style={{height:hp('9%'),width:wp('38%'),justifyContent:"center",alignItems:'flex-end',paddingRight:wp('2.5%'),backgroundColor:'green'}}>
                         <TouchableOpacity style={{flexDirection:'row',height:hp('4%'),justifyContent:'center',alignItems:'center'}} onPress={()=>props.navigation.goBack ("City")}>
                         <Text style={{fontSize:hp('2%'),color:'#000000'}}>Delhi</Text>
                         </TouchableOpacity> */}
          {/* </View> */}
          <View
            style={{
              height: hp('9%'),
              width: wp('38%'),
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: wp('2%'),
            }}>
            <TouchableOpacity onPress={toggleMyMobile}>
              <View
                style={{
                  width: wp('22%'),
                  height: hp('4.4%'),
                  backgroundColor: '#66B757',
                  borderColor: '#66B757',
                  borderRadius: hp('2%'),
                  borderWidth: wp('0.2%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp('2%'),
                    color: '#fff',
                    margin: hp('0.5%'),
                  }}>
                  Unblock
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{bottom: 0}}>
        <Modal
          isVisible={myModal}
          animationIn="slideInUp"
          // animationOutTiming={500}
          // animationInTiming={500}
          hideModalContentWhileAnimating={true}
          useNativeDriverForBackdrop={true}
          onBackdropPress={() => setMyModal(false)}
          onSwipeComplete={() => setMyModal(false)}
          swipeDirection={['down']}
          avoidKeyboard={true}
          useNativeDriver={true}
          style={{width: wp('90%')}}>
          <View
            style={{
              width: wp('80%'),
              height: hp('8%'),
              backgroundColor: '#AEAEAE',
              borderRadius: hp('1%'),
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: '#fff', fontWeight: 'bold', fontSize: hp('2%')}}
              numberOfLines={1}>
              Oliva Martin is Unblocked
            </Text>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default BlockList;

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
