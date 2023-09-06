import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './pages/Login';
import Reg from './pages/Reg';
import { useState } from 'react';

export default function App() {
  

  return (
    <View style={styles.container}>
      <Text>Shafe vai the great!</Text>
      {/* <Login /> */}
      <Reg />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
