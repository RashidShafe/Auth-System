import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function Login({ navigation }) {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleLogin = ({ navigation }) => {
        // alert(user.password + user.email);
        const apiUrl = 'http://192.168.0.106:8000/sign-in';

        const userData = {
            email: user.email,
            password: user.password,
        };

        axios.post(apiUrl, userData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }


    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder='E-mail'
                    onChangeText={(text) => setUser({ ...user, email: text })}
                />
                <TextInput style={{ ...styles.input, marginBottom: 30 }}
                    placeholder='Password' secureTextEntry={true}
                    onChangeText={(text) => setUser({ ...user, password: text })}
                />
                <Button onPress={handleLogin} title='Log In' />
                <Text style={styles.link} onPress={() => navigation.navigate('Reg')} >No account? Sign-up Now.</Text>
                {/* <Link href="/pages/Reg"> <Text >No account? Sign-up Now.</Text></Link> */}
            </View>
        </View>
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
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    link:{
        marginTop:20,
        color:'blue'
    }

});