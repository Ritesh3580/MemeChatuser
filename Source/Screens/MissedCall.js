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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import axios from 'axios';
import { baseurl } from '../config/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import moment from 'moment';
import { zego_config } from '../config/ZegoConfig';
import Entypo from 'react-native-vector-icons/Entypo';


const MissedCall = props => {

    const [missedCallData, setMissedCallData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [myModal, setMyModal] = useState(false);
    const isFocused = useIsFocused();
    const appData = props.route?.params?.appData;
    // console.log(appData);

    useEffect(() => {
        if (isFocused) {
            _getMissedCall();
        }
    }, [isFocused]);

    const _getMissedCall = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get(baseurl + 'getAllvideocallstatus', { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => {
                // console.log(resp.data);
                let data = resp.data.findUserVideocallstatus?.filter(item => item?.videocallstatus.hasOwnProperty('hostuserId'));
                setMissedCallData(data.reverse());
                setLoading(false);
            })
            .catch(err => {
                console.log(err.resp.data);
                setLoading(false);
                SimpleToast.show('Server error!');
            })
    };

    const toggleMyMobile = () => {
        setMyModal(!myModal);
    };

    async function startCall(targetUser) {
        const token = await AsyncStorage.getItem('token');
        if (targetUser?.userId == '') {
            console.warn('Invalid user id');
            return;
        };
        let randomPromise = Promise.resolve(200);

        axios.all([
            axios.get(baseurl + 'showProfile', { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(baseurl + 'getOneUserProfile/' + targetUser.userId, { headers: { Authorization: `Bearer ${token}` } }),
            randomPromise
        ]).then(responses => {
            if (responses[0]?.data?.total_coins < responses[1]?.data?.getuser?.hostuser_fees) {
                console.log("insufficient coin");
                toggleMyMobile();
                return;
            }
            jumpToCallPage(responses[0]?.data?.userId);
            sendCallInvite({
                roomID: responses[0]?.data?.userId,
                user: responses[0].data,
                targetUserID: targetUser.userId,
            });
        })
            .catch(err => {
                SimpleToast.show("Server down!");
                console.log("get user during video call-->", err.response.data);
            })
    };

    async function jumpToCallPage(roomID) {
        props.navigation.navigate('CallPage', {
            appData: appData,
            roomID: roomID
        });
    };

    const sendCallInvite = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                targetUserID: data.targetUserID,
                callerUserID: data.user.userId,
                callerUserName: data.user.fullName,
                callerIconUrl: "user_image",
                roomID: data.roomID,
                callType: 'Video', // TODO For test only
                role: "1"
            })
        };
        // console.log(requestOptions.body);
        const reps = fetch(`${zego_config.serverUrl}/call_invite`, requestOptions);
        console.log('Send call invite reps: ', reps);
    }


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
                            Missed call
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
                            missedCallData.length == 0 ?
                                <Text style={{ color: '#aaa', textAlign: 'center', marginTop: hp('40%'), fontWeight: '600', fontSize: 15 }}>No data found 😞</Text>
                                :
                                <FlatList
                                    data={missedCallData}
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
                                                        backgroundColor: 'gray',
                                                        borderRadius: 25,
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {
                                                        item?.videocallstatus?.hostuserId?.userImage &&
                                                        <Image
                                                            source={{ uri: item.videocallstatus.hostuserId.userImage }}
                                                            style={{ height: '100%', width: '100%' }}
                                                        />
                                                    }
                                                </View>
                                                <View
                                                    style={{
                                                        marginLeft: 10
                                                    }}
                                                >
                                                    <View>
                                                        <Text style={{ color: '#000', fontWeight: '600', fontSize: 16 }}>{item?.videocallstatus?.hostuserId?.FirstName} {item?.videocallstatus?.hostuserId?.LastName}</Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}
                                                    >
                                                        <MaterialIcons name='missed-video-call' color={'red'} size={20} />
                                                        <Text style={{ color: '#000', fontSize: 14, marginLeft: 5 }}>{moment(item?.videocallstatus?.time).format('DD/MM/YYYY, hh:mm a')}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                onPress={async () => {
                                                    await AsyncStorage.setItem('targetUser', JSON.stringify(item?.videocallstatus?.hostuserId));
                                                    startCall(item?.videocallstatus?.hostuserId);
                                                }}
                                            >
                                                <Image
                                                    source={require('../Assetst/Images/Group42.png')}
                                                    style={{ width: hp('6%'), height: hp('6%') }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                    }
                </View>
                <Modal
                    isVisible={myModal}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight"
                    // animationOutTiming={500}
                    // animationInTiming={500}
                    hideModalContentWhileAnimating={true}
                    useNativeDriverForBackdrop={true}
                    onBackdropPress={() => setMyModal(false)}
                    onSwipeComplete={() => setMyModal(false)}
                    swipeDirection={['down']}
                    avoidKeyboard={true}
                    useNativeDriver={true}
                    style={{
                        width: wp('100%'),
                        alignSelf: 'center',
                        height: hp('100%'),
                    }}>
                    <View
                        style={{
                            width: wp('65%'),
                            height: hp('45%'),
                            backgroundColor: 'white',
                            borderRadius: hp('1.8%'),
                            alignSelf: 'center',
                        }}>
                        <View
                            style={{
                                width: wp('60%'),
                                height: hp('4%'),
                                alignSelf: 'center',
                                alignItems: 'flex-end',
                                marginTop: hp('0.5%'),
                            }}>
                            <TouchableOpacity
                                onPress={() => setMyModal(false)}
                                style={{
                                    width: wp('8%'),
                                    height: hp('4%'),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Entypo
                                    name="circle-with-cross"
                                    size={hp('3.6%')}
                                    color="#949894"
                                />
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                height: 90,
                                width: 90,
                                borderRadius: 45,
                                alignSelf: 'center',
                                marginTop: '0.5%',
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                overflow: 'hidden',
                                elevation: 9,
                                backgroundColor: '#fff',
                            }}>
                            <Image
                                source={{ uri: appData?.user?.imageUrl }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                color: '#949894',
                                fontWeight: 'bold',
                                fontSize: hp('2.2%'),
                                marginTop: hp('1.5%'),
                                textAlign: 'center',
                            }}>
                            Your Balance
                        </Text>
                        <View
                            style={{
                                alignItems: 'center',
                                // width: wp('18%'),
                                height: hp('5%'),
                                justifyContent: 'center',
                                flexDirection: 'row',
                                alignSelf: 'center',
                            }}>
                            <Image
                                source={require('../Assetst/Images/coins.png')}
                                style={{ width: hp('2.8%'), height: hp('2.8%') }}
                            />
                            <Text
                                style={{
                                    fontSize: hp('2%'),
                                    color: '#FDBF00',
                                    fontWeight: 'bold',
                                    marginLeft: wp('1%'),
                                }}>
                                {appData?.user?.total_coins} coins
                            </Text>
                        </View>

                        <Text
                            style={{
                                color: '#949894',
                                fontWeight: 'bold',
                                fontSize: hp('1.5%'),
                                marginTop: hp('1%'),
                                textAlign: 'center',
                                // marginHorizontal:10
                            }}
                        >
                            For Safe private calls,you will be charged
                        </Text>
                        <Text
                            style={{
                                color: '#949894',
                                fontWeight: 'bold',
                                fontSize: hp('1.5%'),
                                textAlign: 'center',
                                // marginHorizontal:10
                            }}
                        >
                            {appData?.user?.hostuser_fees} coins per minute
                        </Text>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('MyWallet', appData?.user)}
                            style={{
                                height: hp('5%'),
                                width: wp('45%'),
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: hp('3%'),
                                alignSelf: 'center',
                                borderColor: '#b15eff',
                                marginTop: hp('2%'),

                                borderWidth: hp('0.2%'),
                            }}>
                            <Text style={{
                                fontSize: hp('2%'),
                                fontWeight: 'bold',
                                color: '#000'
                            }}>Get coins</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default MissedCall;

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
