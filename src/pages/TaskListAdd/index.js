// Component responsible for adding new task on the database 

import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  TextInput,
  ImageBackground
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function TaskListAdd({ navigation }) {
  const [dateTime, setDateTime] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const estado = 'pendente';
  const [descricao, setDescricao] = useState('') ;

  const handleInputChange = (text) => {
    // Remove not number character
     const cleanedText = text.replace(/[^0-9]/g, '');
  
     // Format date and time as we expect
     let formattedText = '';
  
     if (cleanedText.length > 0) {
       formattedText += cleanedText.substring(0, Math.min(2, cleanedText.length));
  
       if (cleanedText.length >= 3) {
         formattedText += '-' + cleanedText.substring(2, Math.min(4, cleanedText.length));
       }
       if (cleanedText.length >= 5) {
         formattedText += '-' + cleanedText.substring(4, Math.min(8, cleanedText.length));
       }
       if (cleanedText.length >= 9) {
         formattedText += ' ' + cleanedText.substring(8, Math.min(10, cleanedText.length));
  
    
         if (cleanedText.length >= 11) {
           formattedText += ':' + cleanedText.substring(10, Math.min(12, cleanedText.length));
         }
       }
     }
  
     setDateTime(formattedText);
 };

 // Function responsible for send data to backend
  const handleAddTask = () => {
    const data = {
      nome: nome,
      descricao: descricao,
      data: dateTime,
      estado: estado,
      telefone: telefone,
    };

    fetch('yourIp:PORT/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigation.navigate('TaskList');
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../img/geometric.jpg')}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />
      <View style={styles.inputPlaces}>
        <TextInput
          placeholder="Nome"
          style={styles.textPlace}
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          placeholder="Telefone"
          style={styles.textPlace}
          value={telefone}
          onChangeText={setTelefone}
        />
        <TextInput
          placeholder="Data e hora DD-MM-AAAA HH:MM"
          style={styles.textPlace}
          value={dateTime}
          onChangeText={handleInputChange}
        />
        <TextInput
          placeholder="Descrição"
          style={styles.textPlace}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => navigation.navigate('TaskList')}
        >
          <AntDesign name="back" size={34} color="#FFF" />
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddTask}>
          <AntDesign name="pluscircleo" size={34} color="#FFF" />
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputPlaces: {
    marginTop: '15%',
  },
  textPlace: {
    backgroundColor: '#e0ddca',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#f57c51',
    borderRadius: 50,
    width: '50%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAdd: {
    backgroundColor: '#f57c51',
    borderRadius: 50,
    width: '50%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
});