import React, { useState, useEffect, useRef } from 'react'
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, Linking, ImageBackground, StatusBar } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assetst/Constants/Colors';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
const WaitingForAcceptCall = (props) => {


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={Colors.lightPurples} />
                <ImageBackground source={require('../Assetst/Images/6.png')} style={{ width: wp('100%'), height: hp('100%'), }}>
                    <View style={{ width: wp('100%'), height: hp('6%'),  justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                        <Text style={{ color: 'white', fontSize: hp('2.5%'), fontWeight: 'normal' }}>Waiting For Accept Call</Text>
                    </View>

                    <View style={{ width: wp('55%'), height: hp('22%'), alignSelf: 'center', marginTop: hp('2%'), alignItems: 'center' }}>
                        <View style={{ width: wp('50%'), height: hp('20%'), alignSelf: 'center', marginTop: hp('1%'), alignItems: 'center' }}>
                            <Image source={require('../Assetst/Images/6.png')} style={{ width: hp('10%'), height: hp('9.8%'), borderRadius: hp('7%'), borderWidth: 2, borderColor: 'white' }} />
                            <View style={{ width: wp('48%'), height: hp('8%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                                <Text style={{ color: 'white', fontSize: hp('2.5%') }}>Aru Rawat, 24</Text>
                                <View style={{ width: wp('48%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: hp('2%') }}>New Delhi  </Text>
                                    <View style={{ width: wp('5%'), height: hp('3%'), borderRadius: hp('2.5%'), alignItems: 'center', justifyContent: 'center' }}>
                                        {/* <FontAwesome name='star' size={hp('1.5%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                                        <Image source={require('../Assetst/Images/map.png')} style={{ width: hp('2.2%'), height: hp('2.2%'), borderRadius: hp('.1%'), }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: wp('70%'), height: hp('7%'), justifyContent: 'center', alignSelf: 'center', marginTop: hp('35%'), alignItems: 'center', borderRadius: hp('3.5%'), borderWidth: 1, borderColor: 'white' }}>
                        <Text style={{ color: 'white', fontSize: hp('2%') }}>Near by people Calling You</Text>
                    </View>

                    <View style={{ width: wp('100%'), height: hp('12%'), justifyContent: 'center',  marginTop: hp('5%'), alignItems: 'center',  }}>
                        <View style={{ width: wp('85%'), height: hp('8%'), flexDirection:'row',justifyContent: 'space-between', padding:wp('5%'),  alignItems: 'center',  }}>
                            <TouchableOpacity style={{ width: wp('5%'), height: hp('3%'), borderRadius: hp('2.5%'), alignItems: 'center', justifyContent: 'center' }}onPress={() => props.navigation.goBack("Home")}>
                                {/* <FontAwesome name='star' size={hp('1.5%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                                <Image source={require('../Assetst/Images/end-call.png')} style={{ width: hp('6%'), height: hp('6%'),  }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: wp('5%'), height: hp('3%'), borderRadius: hp('2.5%'), alignItems: 'center', justifyContent: 'center' }}onPress={() => props.navigation.navigate("VideoCallBlur")}>
                                {/* <FontAwesome name='star' size={hp('1.5%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                                <Image source={require('../Assetst/Images/callpick.png')} style={{ width: hp('6%'), height: hp('6%'),  }} />
                            </TouchableOpacity>
                        </View>
                    </View>


                </ImageBackground>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        width: wp('100%'),
        height: hp('100%'),

        // backgroundColor: Colors.primaryColor9    w
    },

})

export default WaitingForAcceptCall;