import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Searchbar } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assetst/Constants/Colors';
const GirlsHistory = (props) => {

    return (
        <TouchableOpacity
            key={props._key}
            style={{
                width: hp('10%'),
                height: hp('10%'),
                borderRadius: hp('10%'),
                backgroundColor: Colors.verylightGray,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#b15eff',
                marginHorizontal: wp('2%')
            }}
            onPress={props.click ? props.click : () => { }}
        >
            <Image
                source={{uri:props.img}}
                style={{
                    width: hp('8%'),
                    height: hp('8%'),
                    borderRadius: hp('8%'),
                    resizeMode: 'cover'
                }}

            />
        </TouchableOpacity>

    )
}


export default GirlsHistory;