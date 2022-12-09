import React, { useEffect } from 'react';
//import React in our code.
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
//import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
//import Axios from './screens/Axios';
//import Sample from './screens/Sample';
//import all the components we are going to use.


const GoogleLogin = () => {
    // useEffect(() => {
    //     GoogleSignin.configure();
    // }, [])

    // import statusCodes along with GoogleSignin


    // Somewhere in your code
    const googleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("userInfo", userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error)
                // play services not available or outdated
            } else {
                console.log(error)
                // some other error happened
            }
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>

                <TouchableOpacity style={styles.button} >
                    <Text>Google Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    button: {
        width: '30%',
        height: '7%',
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    }
});


export default GoogleLogin;