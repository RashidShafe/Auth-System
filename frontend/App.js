import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './app/pages/Login';
import Reg from './app/pages/Reg';
import OtpSubmit from './app/pages/OtpSubmit';

import { useState } from 'react';

export default function App() {
  const Stack = createStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator style={styles.container} initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Reg" component={Reg} options={{ headerShown: false }}/>
          <Stack.Screen name="OtpSubmit" component={OtpSubmit} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
