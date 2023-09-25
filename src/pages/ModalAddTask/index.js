// This is the modal component for adding a new task on de database

import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ModalComponent({ isVisible, onClose, currentId, initialNome, initialTelefone }) {
  const [dateTime, setDateTime] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState(initialNome);
  const [telefone, setTelefone] = useState(initialTelefone);
  const [estado, setEstado] = useState('pendente');

  
  const handleInputChange = (text) => {
    // Remove not number
    const cleanedText = text.replace(/[^0-9]/g, '');

    // Set date and  time in the right format
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

  // Send data to node server, append data for tasklist to database  
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
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalBox}>
        <View style={styles.modalBody}>
            <TextInput
            placeholder="Nome"
            style={styles.modalTextPlace}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            placeholder="Telefone"
            style={styles.modalTextPlace}
            value={telefone}
            onChangeText={setTelefone}
          />
          <TextInput
            placeholder="DD-MM-AAAA HH:MM"
            style={styles.modalTextPlace}
            value={dateTime}
            onChangeText={handleInputChange}
          />
          <TextInput
            placeholder="Descrição"
            style={styles.modalTextPlace}
            value={descricao}
            onChangeText={setDescricao}
          />
            <View style={styles.buttons}>
                <TouchableOpacity 
                style={styles.buttonAdd} 
                
                onPress={() => {
                    try {
                        handleAddTask();
                        onClose();
                      
                    } catch (error) {
                      console.log('Erro ao apertar no não', error);
                    }}}
                >
                    <AntDesign name="pluscircleo" size={34} color="#FFF" />
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>

            
                <TouchableOpacity
                style={styles.buttonCancel}
                onPress={onClose}
                >
                    <AntDesign name="back" size={34} color="#FFF" />
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBox: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalBody: {
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10,
  },
  modalTextPlace: {
    backgroundColor: '#e0ddca',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    fontWeight: 'bold',
    width: 'auto',
    height: 'auto',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#f57c51',
    borderRadius: 50,
    width: '50%',
    height: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%'
  },
  buttonAdd: {
    backgroundColor: '#f57c51',
    borderRadius: 50,
    width: '50%',
    height: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
});