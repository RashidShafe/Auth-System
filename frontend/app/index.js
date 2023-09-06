import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './pages/Login';
import Reg from './pages/Reg';

import { useState } from 'react';

export default function App() {
  const [toggle, setToggle] = useState(true);

  const move = () => {
    setToggle(!toggle);
  }
  return (
    <View style={styles.container}>
      <Text>Shafe vai the great!</Text>
      {toggle ? <Login /> : <Reg />}
      {toggle ?
        <Text style={styles.link} onPress={move}>No account? Sign-up Now </Text> :
        <Text style={styles.link} onPress={move}>Already have an account.</Text>
      }
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
  link: {
    marginTop: 10,
    padding: 20,
    color: 'blue'
  }
});
