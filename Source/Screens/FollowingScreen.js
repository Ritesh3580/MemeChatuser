import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from "react-native-paper";
import { heightPercentageToDP } from "react-native-responsive-screen";
import SimpleToast from "react-native-simple-toast";
import Colors from "../Assetst/Constants/Colors";
import { localBaseurl } from "../config/baseurl";

let host_user_URL = localBaseurl + 'findHostuser';
let user_URL = localBaseurl + 'showProfile';



export default function FollowingScreen(props) {

    const appData = props.route.params?.appData;
    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (isFocused) {
            userProfile();
        }
    }, [isFocused]);

    // const fetchURL = (url) => axios.get(url);


    async function userProfile() {
        const token = await AsyncStorage.getItem('token');
        let randomPromise = Promise.resolve(200);

        axios.all([
            axios.get(user_URL, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(host_user_URL, { headers: { Authorization: `Bearer ${token}` } }),
            randomPromise
        ])
            .then((responses) => {
                let arr = [];
                setUserData(responses[0].data);
                responses[1].data?.forEach(item => {
                    if (responses[0].data?.followings?.includes(item._id)) {
                        arr.push(item);
                    }
                });
                setData(arr);
                setLoading(false);
                userProfile();
            })
            .catch(err => {
                console.log('axios all promise error---->>>>', err.response?.data);
                setLoading(false);
                SimpleToast.show("Something error occured!", SimpleToast.LONG);
            });
    };

    const submit_unFollow = async (host) => {
        SimpleToast.show("Please wait...");
        const token = await AsyncStorage.getItem('token');
        let body = {
            followers: host?._id
        };
        axios({
            url: localBaseurl + 'userunFollowapi',
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
            data: body
        }).then(resp => {
            console.log("submit unfollow--->>>", resp.data);
            SimpleToast.show("Success");
            userProfile();
        }).catch(err => {
            console.log("submit unfollow--->>>", err.response.data);
            SimpleToast.show("Something error occured!");
        })
    };

    return (
        <View style={{ flex: 1 }}>
            {
                loading ?
                    <ActivityIndicator style={{ marginTop: heightPercentageToDP(40) }} size={30} />
                    :
                    data.length === 0 ?
                        <Text style={{ color: Colors.gray, fontWeight: '600', textAlign: 'center', marginTop: heightPercentageToDP(40), fontSize: 16 }}>No Data Availabe!</Text>
                        :
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => index}
                            ItemSeparatorComponent={() => (
                                <View style={{ borderWidth: 0.5, borderColor: Colors.gray, backgroundColor: Colors.gray, marginLeft: 15 }} />
                            )}
                            renderItem={({ item, index }) => (
                                <Pressable
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 10,
                                        paddingVertical: 10
                                    }}
                                    onPress={() => {
                                        let navData = {
                                            appData: appData,
                                            roomID: props.route?.params?.roomID,
                                            user: item,
                                        };
                                        props.navigation.navigate('ProfileDetails', navData);
                                    }}
                                >
                                    <View style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        backgroundColor: "#aaa",
                                        overflow: 'hidden'
                                    }}>
                                        {
                                            item.userImage &&
                                            <Image
                                                source={{ uri: item.userImage }}
                                                style={{ height: '100%', width: '100%' }}
                                            />
                                        }
                                    </View>
                                    <View style={{ marginLeft: 10, width: '60%' }}>
                                        <Text style={{ color: "#000", fontWeight: '500' }}>{item.FirstName} {item.LastName}, {item.age}</Text>
                                        <Text style={{ color: "#000", fontSize: 12 }}>{item.city}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => submit_unFollow(item)}
                                        style={{
                                            backgroundColor: Colors.primary,
                                            paddingVertical: 3,
                                            paddingHorizontal: 15,
                                            borderRadius: 4,
                                            position: 'absolute',
                                            right: 10
                                        }}
                                    >
                                        <Text style={{ color: Colors.white }}>Unfollow</Text>
                                    </TouchableOpacity>
                                </Pressable>
                            )}
                        />
            }
        </View>
    )
}