import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Animated, StatusBar, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assetst/Constants/Colors';
import AllHostScreen from '../Screens/AllHostScreen';
import FollwersScreen from '../Screens/FollowersScreen';
import FollowingScreen from '../Screens/FollowingScreen';
import FriendsScreen from '../Screens/FriendsScreen';

const Tab = createMaterialTopTabNavigator();


function FollowsFollowers(props) {

    return (
        <View style={{ flex: 1 }}>
            {/* <StatusBar translucent backgroundColor="transparent" /> */}
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: wp('2.9%'), fontWeight: '600' },
                    // tabBarItemStyle: { width: wp(26) },
                    // tabBarStyle: { backgroundColor: Colors.pink },
                }}>
                <Tab.Screen
                    name="AllHost"
                    component={AllHostScreen}
                    initialParams={props.route.params}
                />
                <Tab.Screen
                    name="Followers"
                    component={FollwersScreen}
                    initialParams={props.route.params}
                />
                <Tab.Screen
                    name="Followings"
                    component={FollowingScreen}
                    initialParams={props.route.params}
                />
                <Tab.Screen
                    name="Friends"
                    component={FriendsScreen}
                    initialParams={props.route.params}
                />
            </Tab.Navigator>
        </View>
    );
}

export {
    FollowsFollowers
};