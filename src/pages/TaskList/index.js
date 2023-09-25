// This is the component responsible for render and manipulate tasklist api
// Also uses comunication to quickly start a prospection call
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import Communications from 'react-native-communications';
import axios from 'axios';

export default function TaskList({ navigation }) {
  const [data, setData] = useState([]);
  const [Describ, setDescrib] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  // Get data from database if the item is 'pendente'
  const fetchData = async () => {
    try {
      const response = await axios.get('yourIp:PORT/taskList');
      const pendenteData = response.data.filter(item => item.estado === 'pendente');
      setData(pendenteData);
    } catch (error) {
      console.log('Erro ao obter dados da API', error);
    }
  };
  // Here we change the state of the task to 'concluído' to stop rendering the item on the component but
  // not removing the item from the database. 
  const updateTaskState = async (taskOs) => {
    try {
      await axios.put(`yourIp:PORT/updateTaskState/${taskOs}`, { newState: 'concluído' });
      fetchData(); // We call fetchData again to upload data
      setDescrib(false); // Close modal
    } catch (error) {
      console.error('Error updating task state:', error.response.data.error);
    }
  };

  const renderData = () => {
    return data.map((item, index) => (
      <TouchableOpacity
        style={styles.taskView}
        key={index}
        onPress={() => openModal(item)}
      >
        <Text style={styles.taskViewText}>{item.nome}</Text>
        <Text style={styles.taskViewText}>{item.data}</Text>
      </TouchableOpacity>
    ));
  };

  const openModal = (item) => {
    setDescrib(true);
    setSelectedItem(item);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../img/geometric.jpg')}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonHome}
          onPress={() => navigation.navigate('TaskListAdd')}
        >
          <AntDesign name="addusergroup" size={34} color="#f57c51" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonHome}
          onPress={() => navigation.navigate('Welcome')}
        >
          <AntDesign name="home" size={34} color="#f57c51" />
        </TouchableOpacity>
      </View>

      <ScrollView>{renderData()}</ScrollView>

      <Modal
        visible={Describ}
        onRequestClose={() => setDescrib(false)}>
        <View style={styles.modalContent}>
          <ImageBackground
            source={require('../../img/geometric.jpg')}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          />
          {selectedItem && (
            <>
              <View style={styles.container}>
                <Text style={styles.textPlace}>{selectedItem.os}</Text>
                <Text style={styles.textPlace}>{selectedItem.nome}</Text>
                <Text style={styles.textPlace}>{selectedItem.data}</Text>
                <Text style={styles.textPlace}>{selectedItem.descricao}</Text>
                <Text style={styles.textPlace}>{selectedItem.telefone}</Text>
              </View>
            </>
          )}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                try {
                  Communications.phonecall(selectedItem?.telefone || '', true);
                } catch (error) {
                  console.log('Erro ao tentar ligar', error);
                }
              }}>
              <Text style={styles.buttonText}>Ligar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (selectedItem) {
                  updateTaskState(selectedItem.os);
                } else {
                  console.log('Nenhum item selecionado para atualização');
                }
              }}>
              <Text style={styles.buttonText}>Concluir Tarefa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setDescrib(false)}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f6f8e2',
    width: '100%',
    height: '12%',
    alignItems: 'flex-end',
    borderRadius: 12,
  },
  buttonHome: {
    marginTop: '15%',
  },
  idInput: {},
  input: {},
  taskView: {
    backgroundColor: '#e0ddca',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  taskViewText: {
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f57c51',
  },
  textPlace: {
    backgroundColor: '#e0ddca',
    margin: 10,
    padding: 10,
    borderRadius: 12,
    fontWeight: 'bold',
    minWidth: '90%',
    minHeight: '8%',
  },
  buttons: {
    marginBottom: '5%',
  },
  button: {
    backgroundColor: '#f6f8e2',
    borderRadius: 50,
    minWidth: '50%',
    minHeight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginTop: '5%',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#111111',
  },
});