import { View, Text, TextInput,StyleSheet,Button } from 'react-native'
import React from 'react'
import { useState } from 'react';
import axios  from 'axios';

export default function Reg() {
    const [regUser, setregUser] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPass:''
    });

    const handleReg =() => {
        // alert(user.password + user.email);
        const apiUrl = 'http://192.168.0.16:8000/create-user';

        // Send a POST request using Axios
        axios.post(apiUrl, regUser)
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
            <TextInput style={styles.input} placeholder='Full Name' onChangeText={(text) => setregUser({ ...regUser, fullname: text })}/>
            <TextInput style={styles.input} placeholder='E-mail' onChangeText={(text) => setregUser({ ...regUser, email: text })}/>
            <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text) => setregUser({ ...regUser, password: text })}/>
            <TextInput style={{...styles.input, marginBottom:30}} placeholder='Confirm Password' secureTextEntry={true} onChangeText={(text) => setregUser({ ...regUser, confirmPass: text })}/>
            <Button title='Register' onPress={handleReg} />
        </View>
  )
}

const styles = StyleSheet.create({
    form: {
        width: "80%",
    },
    input: {
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    
});