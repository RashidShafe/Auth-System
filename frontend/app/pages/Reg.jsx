import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function Reg({ navigation }) {
    const [regUser, setregUser] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPass: ''
    });

    const handleReg = () => {
        const apiUrl = 'http://192.168.0.106:8000/create-user';

        axios.post(apiUrl, regUser)
            .then(response => {
                console.log(response.data);
                navigation.navigate('OtpSubmit');
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder='Full Name' onChangeText={(text) => setregUser({ ...regUser, fullname: text })} />
                <TextInput style={styles.input} placeholder='E-mail' onChangeText={(text) => setregUser({ ...regUser, email: text })} />
                <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text) => setregUser({ ...regUser, password: text })} />
                <TextInput style={{ ...styles.input, marginBottom: 30 }} placeholder='Confirm Password' secureTextEntry={true} onChangeText={(text) => setregUser({ ...regUser, confirmPass: text })} />

                <Button title='Register' onPress={handleReg} />
                <Text style={styles.link} onPress={() => navigation.navigate('Login')} >Log In Now.</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: "80%",
    },
    input: {
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    link:{
        marginTop:20,
        color:'blue'
    }
});