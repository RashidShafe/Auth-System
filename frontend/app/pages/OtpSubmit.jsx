import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function OtpSubmit() {

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={{ ...styles.input, marginBottom: 30 }}
                    placeholder='OTP'
                    onChangeText={(text) => setUser({ ...user, password: text })}
                />
                <Button title='Submit' />
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

});