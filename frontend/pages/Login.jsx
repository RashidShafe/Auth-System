import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleLogin =() => {
        // alert(user.password + user.email);
        const apiUrl = 'http://192.168.0.16:8000/sign-in';

        // Create a data object with the user's email and password
        const userData = {
            email: user.email,
            password: user.password,
        };

        // Send a POST request using Axios
        axios.post(apiUrl, userData)
            .then(response => {
                // Handle the response data here (e.g., authentication success or error)
                console.log(response.data);
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error(error);
            });
    }


    return (
        <View style={styles.form}>
            <TextInput style={styles.input}
                placeholder='E-mail'
                onChangeText={(text) => setUser({ ...user, email: text })}
            />
            <TextInput style={styles.input}
                placeholder='Password' secureTextEntry={true}
                onChangeText={(text) => setUser({ ...user, password: text })}
            />
            <Button onPress={handleLogin} title='Log In' />
            <Text onPress={() => {}}>No account? Sign-up Now.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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

});