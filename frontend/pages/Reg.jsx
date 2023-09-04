import { View, Text, TextInput,StyleSheet,Button } from 'react-native'
import React from 'react'

export default function Reg() {
  return (
    <View style={styles.form}>
            <TextInput style={styles.input} placeholder='Full Name' />
            <TextInput style={styles.input} placeholder='E-mail' />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} />
            <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry={true} />
            <Button title='Register' />
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