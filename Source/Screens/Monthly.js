import React, { useState, useEffect, useRef } from 'react'
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, Linking, ImageBackground, StatusBar, TextInput, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assetst/Constants/Colors';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Monthly = () => {

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={Colors.lightPurples} />
                <ImageBackground source={require('../Assetst/Images/Rectangle298.png')} style={{ width: wp('100%'), height: hp('96%'), justifyContent: 'center' }}>
                    <View style={styles.headerContainer}>
                        <View style={styles.backButton}>
                            <TouchableOpacity>
                                <FontAwesome5 name='chevron-left' size={hp('2.5%')} color='white' style={{ fontWeight: 'bold' }} />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: hp('2.5%'), fontWeight: 'bold', }}>Monthly</Text>
                        </View>
                    </View>

                    <View style={{ width: wp('100%'), height: hp('39%'), }}>
                        <View style={{ width: wp('96%'), height: hp('38%'),  flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                        <View style={{ width: wp('28%'), height: hp('32%'), justifyContent: 'center', marginLeft: hp('1%'), alignItems: 'center',  marginTop: hp('1.8%') }}>
                                <View style={{ width: wp('20%'), height: hp('14.2%'),  justifyContent: 'center', alignItems: 'center',marginTop:hp('1.8%') }}>
                                    <Image source={require('../Assetst/Images/Group1193.png')} style={{ width: hp('8.2%'), height: hp('11.3%'), borderRadius: hp('1%'), }} />
                                </View>
                                <View style={{ width: wp('20%'), height: hp('16%'),  justifyContent: 'center', alignItems: 'center',  }}>
                                    <Text style={{ color: 'black', fontSize: hp('2%'), fontWeight: 'normal', marginTop: hp('0.8%') }}>Julie</Text>
                                    <View style={{ width: wp('14%'), height: hp('3.4%'), flexDirection: 'row', backgroundColor: '#00ddff', justifyContent: 'space-around', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('1%') }}>
                                        <View style={{ width: wp('5%'), height: hp('3%'), borderRadius: hp('2.5%'), backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                                            {/* <FontAwesome name='star' size={hp('2%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                                            <Image source={require('../Assetst/Images/star.png')} style={{ width: hp('2.2%'), height: hp('2.2%'), borderRadius: hp('.1%'), }} />
                                        </View>
                                        <Text style={{ color: 'white', marginRight: hp('0.6%') }}>56</Text>
                                    </View>
                                   
                                    <View style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('0.3%') }}>
                                        <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                    </View>
                                </View>
                            </View>

                            <View style={{ width: wp('30%'), height: hp('34%'), justifyContent: 'center', marginLeft: hp('1%'), alignItems: 'center', }}>
                                <Image source={require('../Assetst/Images/Group1194.png')} style={{ width: hp('14%'), height: hp('18%'), borderRadius: hp('1%'), }} />
                                <View style={{ width: wp('20%'), height: hp('16%'),  justifyContent: 'center', alignItems: 'center', marginTop: hp('0.1%') }}>
                                    <Text style={{ color: 'black', fontSize: hp('2%'), fontWeight: 'normal', marginTop: hp('0.8%') }}>Julie</Text>
                                    <View style={{ width: wp('14%'), height: hp('3.4%'), flexDirection: 'row', backgroundColor: '#00ddff', justifyContent: 'space-around', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('1%') }}>
                                        <View style={{ width: wp('5%'), height: hp('3%'), borderRadius: hp('2.5%'), backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                                            {/* <FontAwesome name='star' size={hp('2%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                                            <Image source={require('../Assetst/Images/star.png')} style={{ width: hp('2.2%'), height: hp('2.2%'), borderRadius: hp('.1%'), }} />
                                        </View>
                                        <Text style={{ color: 'white', marginRight: hp('0.6%') }}>56</Text>
                                    </View>
                                   
                                    <View style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('0.3%') }}>
                                        <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                    </View>
                                </View>
                            </View>

                            <View style={{ width: wp('28%'), height: hp('32%'), justifyContent: 'center', marginLeft: hp('1%'), alignItems: 'center',  marginTop: hp('1.8%') }}>
                                <View style={{ width: wp('20%'), height: hp('14.2%'),  justifyContent: 'center', alignItems: 'center',marginTop:hp('1.8%') }}>
                                    <Image source={require('../Assetst/Images/Group1195.png')} style={{ width: hp('8.2%'), height: hp('11.3%'), borderRadius: hp('1%'), }} />
                                </View>
                                <View style={{ width: wp('20%'), height: hp('16%'), justifyContent: 'center', alignItems: 'center',  }}>
                                    <Text style={{ color: 'black', fontSize: hp('2%'), fontWeight: 'normal', marginTop: hp('0.8%') }}>Julie</Text>
                                    <View style={{ width: wp('14%'), height: hp('3.4%'), flexDirection: 'row', backgroundColor: '#00ddff', justifyContent: 'space-around', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('1%') }}>
                                        <View style={{ width: wp('5%'), height: hp('3%'), borderRadius: hp('2.5%'), backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                                            {/* <FontAwesome name='star' size={hp('2%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                                            <Image source={require('../Assetst/Images/star.png')} style={{ width: hp('2.2%'), height: hp('2.2%'), borderRadius: hp('.1%'), }} />
                                        </View>
                                        <Text style={{ color: 'white', marginRight: hp('0.6%') }}>56</Text>
                                    </View>
                                    {/* <Text style={{ color: 'white', marginRight: hp('0.6%'), marginTop: hp('1%') }}>8,23,412</Text> */}
                                    <View style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('0.3%') }}>
                                        <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={{ width: wp('100%'), height: hp('52%'), marginTop: hp('1%'), backgroundColor: Colors.primaryColor8,borderTopLeftRadius:hp('1%'),borderTopRightRadius:hp('1%') }}>
                        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true} >
                            <View style={{ width: wp('100%'), }}>

                                <View style={{ width: wp('96%'), height: hp('17%'), flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', }}>
                                    <View style={{ width: wp('20%'), height: hp('17%'), justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../Assetst/Images/6.png')} style={{ width: hp('10%'), height: hp('11%'), borderRadius: hp('7%'), }} />
                                        <View style={{ width: wp('14%'), height: hp('3.4%'), backgroundColor: Colors.lightPinks, justifyContent: 'center', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('-2%') }}>
                                            <Text style={{ color: 'white', marginRight: hp('0.6%') }}>live</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: wp('74%'), height: hp('17%'), marginLeft: hp('0.5%'), justifyContent: 'center' }}>
                                        <View style={{ width: wp('73%'), height: hp('8%'), flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View>
                                                <View style={{ width: wp('32%'), height: hp('4%'), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: 'black', fontSize: hp('1.8%'), fontWeight: 'bold', marginLeft: hp('1%') }}>Lisa</Text>
                                                    <View style={{ width: wp('14%'), height: hp('3%'), flexDirection: 'row', backgroundColor: '#00ddff', justifyContent: 'space-around', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('1%') }}>
                                                        <View style={{ width: wp('5%'), height: hp('3%'), borderRadius: hp('2.5%'), backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                                                            {/* <FontAwesome name='star' size={hp('1.5%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                                                            <Image source={require('../Assetst/Images/star.png')} style={{ width: hp('2.2%'), height: hp('2.2%'), borderRadius: hp('.1%'), }} />
                                                        </View>
                                                        <Text style={{ color: 'white', marginRight: hp('0.6%'), fontSize: hp('1.5%') }}>56</Text>
                                                    </View>
                                                </View>
                                                <View style={{ width: wp('32%'), height: hp('3%'), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: Colors.primaryGray, fontSize: hp('1.7%'), fontWeight: 'bold', marginLeft: hp('1%') }}>Recived</Text>

                                                    <Text style={{ color: Colors.lightPinks, marginRight: hp('0.6%'), fontSize: hp('1.5%') }}>8,23,452</Text>

                                                </View>
                                            </View>
                                            <TouchableOpacity style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', }}>
                                                <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ width: wp('96%'), height: hp('17%'), flexDirection: 'row', marginTop: hp('1%'), justifyContent: 'center', alignSelf: 'center', }}>
                                    <View style={{ width: wp('20%'), height: hp('17%'), justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../Assetst/Images/ted.png')} style={{ width: hp('10%'), height: hp('11%'), borderRadius: hp('7%'), }} />
                                        <View style={{ width: wp('14%'), height: hp('3.4%'), backgroundColor: Colors.lightPinks, justifyContent: 'center', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('-2%') }}>
                                            <Text style={{ color: 'white', marginRight: hp('0.6%') }}>live</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: wp('74%'), height: hp('17%'), marginLeft: hp('0.5%'), justifyContent: 'center' }}>
                                        <View style={{ width: wp('73%'), height: hp('8%'), flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View>
                                                <View style={{ width: wp('32%'), height: hp('4%'), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: 'black', fontSize: hp('1.8%'), fontWeight: 'bold', marginLeft: hp('1%') }}>Lisa</Text>
                                                    <View style={{ width: wp('14%'), height: hp('3%'), flexDirection: 'row', backgroundColor: '#00ddff', justifyContent: 'space-around', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('1%') }}>
                                                        <View style={{ width: wp('5%'), height: hp('3%'), borderRadius: hp('2.5%'), backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                                                            {/* <FontAwesome name='star' size={hp('1.5%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                                                            <Image source={require('../Assetst/Images/star.png')} style={{ width: hp('2.2%'), height: hp('2.2%'), borderRadius: hp('.1%'), }} />
                                                        </View>
                                                        <Text style={{ color: 'white', marginRight: hp('0.6%'), fontSize: hp('1.5%') }}>56</Text>
                                                    </View>
                                                </View>
                                                <View style={{ width: wp('32%'), height: hp('3%'), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: Colors.primaryGray, fontSize: hp('1.7%'), fontWeight: 'bold', marginLeft: hp('1%') }}>Recived</Text>

                                                    <Text style={{ color: Colors.lightPinks, marginRight: hp('0.6%'), fontSize: hp('1.5%') }}>8,23,452</Text>

                                                </View>
                                            </View>
                                            <TouchableOpacity style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', }}>
                                                <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ width: wp('96%'), height: hp('17%'), flexDirection: 'row', marginTop: hp('1%'), justifyContent: 'center', alignSelf: 'center', }}>
                                    <View style={{ width: wp('20%'), height: hp('17%'), justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../Assetst/Images/ted-1.png')} style={{ width: hp('10%'), height: hp('11%'), borderRadius: hp('7%'), }} />
                                        <View style={{ width: wp('14%'), height: hp('3.4%'), backgroundColor: Colors.lightPinks, justifyContent: 'center', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('-2%') }}>
                                            <Text style={{ color: 'white', marginRight: hp('0.6%') }}>live</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: wp('74%'), height: hp('17%'), marginLeft: hp('0.5%'), justifyContent: 'center' }}>
                                        <View style={{ width: wp('73%'), height: hp('8%'), flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View>
                                                <View style={{ width: wp('32%'), height: hp('4%'), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: 'black', fontSize: hp('1.8%'), fontWeight: 'bold', marginLeft: hp('1%') }}>Lisa</Text>
                                                    <View style={{ width: wp('14%'), height: hp('3%'), flexDirection: 'row', backgroundColor: '#00ddff', justifyContent: 'space-around', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('1%') }}>
                                                        <View style={{ width: wp('5%'), height: hp('3%'), borderRadius: hp('2.5%'), backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                                                            {/* <FontAwesome name='star' size={hp('1.5%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                                                            <Image source={require('../Assetst/Images/star.png')} style={{ width: hp('2.2%'), height: hp('2.2%'), borderRadius: hp('.1%'), }} />
                                                        </View>
                                                        <Text style={{ color: 'white', marginRight: hp('0.6%'), fontSize: hp('1.5%') }}>56</Text>
                                                    </View>
                                                </View>
                                                <View style={{ width: wp('32%'), height: hp('3%'), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: Colors.primaryGray, fontSize: hp('1.7%'), fontWeight: 'bold', marginLeft: hp('1%') }}>Recived</Text>

                                                    <Text style={{ color: Colors.lightPinks, marginRight: hp('0.6%'), fontSize: hp('1.5%') }}>8,23,452</Text>

                                                </View>
                                            </View>
                                            <TouchableOpacity style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', }}>
                                                <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ width: wp('96%'), height: hp('17%'), flexDirection: 'row', marginTop: hp('1%'), justifyContent: 'center', alignSelf: 'center', }}>
                                    <View style={{ width: wp('20%'), height: hp('17%'), justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../Assetst/Images/ted-3.png')} style={{ width: hp('10%'), height: hp('11%'), borderRadius: hp('7%'), }} />
                                        {/* <View style={{ width: wp('14%'), height: hp('3.4%'), backgroundColor: Colors.lightPinks, justifyContent: 'center', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('-2%') }}>
                                    <Text style={{ color: 'white', marginRight: hp('0.6%') }}>live</Text>
                                </View> */}
                                    </View>
                                    <View style={{ width: wp('74%'), height: hp('17%'), marginLeft: hp('0.5%'), justifyContent: 'center' }}>
                                        <View style={{ width: wp('73%'), height: hp('8%'), flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View>
                                                <View style={{ width: wp('32%'), height: hp('4%'), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: 'black', fontSize: hp('1.8%'), fontWeight: 'bold', marginLeft: hp('1%') }}>Lisa</Text>
                                                    <View style={{ width: wp('14%'), height: hp('3%'), flexDirection: 'row', backgroundColor: '#00ddff', justifyContent: 'space-around', alignItems: 'center', borderRadius: hp('1.8%'), marginTop: hp('1%') }}>
                                                        <View style={{ width: wp('5%'), height: hp('3%'), borderRadius: hp('2.5%'), backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center' }}>
                                                            {/* <FontAwesome name='star' size={hp('1.5%')} color='white' style={{ fontWeight: 'bold', marginLeft: hp('0.5%'), }} /> */}
                                                            <Image source={require('../Assetst/Images/star.png')} style={{ width: hp('2.2%'), height: hp('2.2%'), borderRadius: hp('.1%'), }} />
                                                        </View>
                                                        <Text style={{ color: 'white', marginRight: hp('0.6%'), fontSize: hp('1.5%') }}>56</Text>
                                                    </View>
                                                </View>
                                                <View style={{ width: wp('32%'), height: hp('3%'), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: Colors.primaryGray, fontSize: hp('1.7%'), fontWeight: 'bold', marginLeft: hp('1%') }}>Recived</Text>

                                                    <Text style={{ color: Colors.lightPinks, marginRight: hp('0.6%'), fontSize: hp('1.5%') }}>8,23,452</Text>

                                                </View>
                                            </View>
                                            <TouchableOpacity style={{ width: wp('6%'), height: hp('4%'), justifyContent: 'center', alignItems: 'center', }}>
                                                <Image source={require('../Assetst/Images/plus.png')} style={{ width: hp('3%'), height: hp('3%'), borderRadius: hp('.1%'), }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </ScrollView>
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

       
    },
    headerContainer: {
        width: wp('100%'),
        height: hp('6%'),
        // alignSelf:'center',
        // backgroundColor: Colors.lightPurples
    },
    backButton: {
        flexDirection: 'row',
        width: wp('57%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: hp('2%'),
    },

})

export default Monthly;