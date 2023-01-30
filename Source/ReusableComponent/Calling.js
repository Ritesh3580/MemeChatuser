import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

export default function Calling() {
    return (
        <Modal
            avoidKeyboard={true}
            useNativeDriver={true}
        >
            <View style={{ height: 100, width: '80%', borderRadius: 4, flexDirection: 'row', backgroundColor: '#fff' }}>
                <MaterialIcons name='call-end' color={'blue'} size={30} />
                <Text style={{ color: '#000', marginLeft: 20 }}>Calling...</Text>
            </View>
        </Modal>
    );
}