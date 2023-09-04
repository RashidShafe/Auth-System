import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'

export default function Login() {
    return (
        <View style={styles.form}>
            <TextInput style={styles.input} placeholder='E-mail' />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} />
            <Button color="" title='Log In' />
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