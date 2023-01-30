import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React from 'react';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import axios from 'axios';
import { baseurl } from '../config/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';

const AdminNotification = props => {

    const [adminNotificationData, setAdminNotificationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            _getNotificationData();
        }
    }, [isFocused]);

    const _getNotificationData = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get(baseurl + 'getUserallNotification', { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => {
                let data = resp.data.getallnotification.filter(item => item.hasOwnProperty('title') && item.hasOwnProperty('body') && item.body);
                setAdminNotificationData(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                SimpleToast.show('Server error!');
            })
    };




    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.head}>
                    <View
                        style={{
                            width: wp('33%'),
                            height: hp('4%'),
                            //backgroundColor: 'green',
                        }}>
                        <TouchableOpacity
                            onPress={() => props.navigation.goBack('Messages')}
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
                        style={{
                            width: wp('33%'),
                            height: hp('4%'),
                            alignItems: 'center',
                            //backgroundColor: 'pink',
                        }}>
                        <Text
                            style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: hp('2.5%'),
                                color: '#fff',
                                textAlignVertical: 'center',
                            }}>
                            Notification
                        </Text>
                    </View>
                    <View
                        style={{
                            width: wp('33%'),
                            height: hp('4%'),
                            //backgroundColor: 'purple',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingRight: wp('2%'),
                        }}>
                        <TouchableOpacity
                            disabled
                            style={{
                                width: wp('8%'),
                                height: hp('4%'),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}></TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        height: hp('90%'),
                        width: wp('100%'),
                        backgroundColor: '#fff',
                    }}
                >
                    {
                        loading ?
                            <ActivityIndicator style={{ marginTop: hp(40) }} size={40} />
                            :
                            adminNotificationData.length == 0 ?
                                <Text style={{ color: '#aaa', textAlign: 'center', marginTop: hp('40%'), fontWeight: '600', fontSize: 15 }}>No data found 😞</Text>
                                :
                                <FlatList
                                    data={adminNotificationData}
                                    keyExtractor={(item, index) => index}
                                    contentContainerStyle={{
                                        paddingVertical: 20,
                                        paddingHorizontal: 10
                                    }}
                                    ItemSeparatorComponent={() => (
                                        <View style={{ height: 15 }} />
                                    )}
                                    renderItem={({ item, index }) => (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        height: 50,
                                                        width: 50,
                                                        backgroundColor: '#b15eff',
                                                        borderRadius: 25,
                                                        // overflow: 'hidden'
                                                    }}
                                                >
                                                </View>
                                                <View>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            width: '87%',
                                                            justifyContent: 'space-between',
                                                            marginLeft: 10
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                width: '45%'
                                                            }}
                                                        >
                                                            {
                                                                item.title  ?
                                                                <Text style={{ color: '#000', fontWeight: '600' }}>{item.title}</Text>
                                                                :
                                                                <Text style={{ color: '#000', fontWeight: '600' }}>Untitled</Text>
                                                            }
                                                        </View>
                                                        <View
                                                            style={{
                                                                width: '50%'
                                                            }}
                                                        >
                                                            <Text style={{ color: '#aaa' }}>{moment(item.time).format('DD/MM/YYYY, hh:mm a')}</Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginLeft: 10,
                                                            width: '82%'
                                                        }}
                                                    >
                                                        <Text style={{color:'#000'}}>{item.body}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
                    }
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AdminNotification;

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
        justifyContent: 'center',
        alignItems: 'center',
    },
});
