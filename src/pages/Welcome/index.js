// Component responsible for the main menu and navigation.

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';


export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      
      <ImageBackground 
        source={require('../../img/Loremar.png')} 
        style={styles.logo}
      ></ImageBackground>
      
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('TaskList')}
        >
          <AntDesign name="pushpino" size={34} color="#111111" />
          <Text style={styles.buttonText}>Tarefas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Prospection')}
        >
          <AntDesign name="customerservice" size={34} color="#111111" />
          <Text style={styles.buttonText}>Ligar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f57c51',
    justifyContent: 'flex-end',
  },
  headerBackground: {
    width: '100%',
    height: '40%',
    display: 'flex',
    bottom: '10%',
  },
  logo: {
    bottom: '-37%',
    height: '80%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    
    color: '#f6f8e2',
    position: 'absolute', 
    bottom: '70%', 
  },
  buttons: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f57c51',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    height: '50%',
  },
  button: {
    backgroundColor: '#f6f8e2',
    borderRadius: 50,
    width: '40%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    color: '#111111',
    fontWeight: 'bold',
    alignSelf: 'center',
  }
});