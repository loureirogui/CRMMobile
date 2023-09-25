// This is the component desired to make faster prospection and selling calls.
// Rendering api with prospects infos and with less than 5 touches, make a call.
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput,
  Modal, ImageBackground } from 'react-native';
import axios from 'axios';
import Communications from 'react-native-communications';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalAddTask from '../ModalAddTask';


export default function Prospection({navigation}) {
  const [data, setData] = useState(null);
  const [currentId, setCurrentId] = useState(854);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreButtons, setShowMoreButtons] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTask, setModalTask] = useState(false);

  // Logic for rescheduling contact through prospection
  const openModal = () => {
    setModalTask(true);
  };

  const closeModal = () => {
    setModalTask(false);
  };

  

  // Filter ans render data by prospect's ID

  useEffect(() => {
    fetchData();
  }, [currentId]);

  const fetchData = async () => {
    setIsLoading(true); // Set Loading state while loking for data
    try {
      const response = await axios.get('yourIp:PORT/etc');
      const upaData = response.data;
      const dataById = upaData.find(item => item.id === currentId);
      setData(dataById);
      setIsLoading(false); 
    } catch (error) {
      console.log('Error fetching data from the API', error);
      setIsLoading(false); 
    }
  };

  const handleIdInputChange = (newId) => {  // Handle changing id by textInput instead of navigation buttons
    
    setCurrentId(newId === '' || isNaN(newId) ? null : parseInt(newId));
  };

  const renderData = () => {  
    if (currentId === null || isNaN(currentId)) {
      return <Text>ID inválido</Text>;
    }

    if (isLoading) {
      return <Text style={styles.callButtonText}>Carregando...</Text>; 
    }

    if (data) { 
      return (
        <>
          <TextInput
            style={styles.input}
            placeholder='Nome'
            value={data.Nome}
          />
          <TextInput
            style={styles.input}
            placeholder='telefone'
            value={data.Telefone}
            onChangeText={setPhoneNumber}
          /> 
          
        </>
      );
    } else {
      return (
        <Text style={styles.callButtonText}>Não localizei o cliente no banco de dados</Text>
      );
    }
  };

  return (
    <View style={styles.container}>

      <ImageBackground 
        source={require('../../img/geometric.jpg')} 
        style={{width: '100%', height: '100%', position: 'absolute'}}
      />

      <StatusBar />

      <View style={styles.header}>

        <TouchableOpacity onPress={() => setCurrentId(prevId => prevId - 1)}>
          <Icon name="arrow-left" size={40} color='#f57c51'/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Icon name="home" size={40} color='#f57c51'/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentId(prevId => prevId + 1)}>
          <Icon name="arrow-right" size={40} color='#f57c51'/>
        </TouchableOpacity>

      </View>

      <SafeAreaView>
        <TextInput
          style={styles.idInput}
          placeholder='id'
          value={currentId !== null ? currentId.toString() : ''}
          onChangeText={handleIdInputChange}
        />
        {renderData()}
      </SafeAreaView>

      <TouchableOpacity
        style={styles.callButton}
        onPress={() => {
          try {
            setModalVisible(true); // Open modal for handle call infos
            setShowMoreButtons(false); // Keep showmorebutttons off while not answer the phone call
            Communications.phonecall(data?.Telefone || '', true); // Open phone dialler for start comunication faster
          } catch (error) {
            console.log('Something went wrong with the call', error); 
          }
        }}
      >
        <Text style={styles.callButtonText}>Ligar</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <ImageBackground 
            source={require('../../img/geometric.jpg')} 
            style={{width: '100%', height: '100%', position: 'absolute'}}
          />
          <Text style={styles.modalHeader}>Em Ligação...</Text>
          <Text style={styles.modalAskOne}> Atendeu? </Text>
          <View style={styles.modalAskGrade}>
            <TouchableOpacity
              style={styles.modalAnswerYes}
              onPress={() => setShowMoreButtons(true)}
            >
              <Text style={styles.modalAnswerYesText}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalAnswerNo}
              onPress={() => {
                try {
                  setShowMoreButtons(false);
                  setModalVisible(false);
                } catch (error) {
                  console.log('Erro ao apertar no não', error);
                }
              }}
            >
              <Text style={styles.modalAnswerNoText}>Não</Text>
            </TouchableOpacity>
          </View>

          {showMoreButtons && (
            <View style={styles.moreButtonsContainer}>
              <TouchableOpacity style={styles.moreButtonSold}>
                <Icon name="add-shopping-cart" size={40} color='#f6f8e2'/>
                <Text style={styles.moreButtonText}>Realizar Venda</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.moreButtonNo}>
                <Icon name="thumb-down" size={40} color='#f6f8e2'/>
                <Text style={styles.moreButtonText}>Hoje Não</Text>
              </TouchableOpacity>
fornecendorgi
              <TouchableOpacity style={styles.moreButtonFuture}
                onPress={openModal}
              >
                <Icon name="pending" size={40} color='#f6f8e2'/>
                <Text style={styles.moreButtonText}>Ligar outro dia</Text>
              </TouchableOpacity>


 
              <ModalAddTask // Open modal for addtask easier providing name and phone number to make faster record
              isVisible={modalTask} 
              onClose={closeModal} 
              currentId={currentId} 
              initialNome={data?.Nome} 
              initialTelefone={data?.Telefone} 
              />

            </View>
          )}
          <TouchableOpacity
              style={styles.callButton}
              onPress={() => {
                try {
                  setShowMoreButtons(false); 
                  setModalVisible(false);
                } catch (error) {
                  console.log('Erro ao tentar fechar modal', error);
                }
              }}
            >
              <Text style={styles.callButtonText}>Fechar</Text>
            </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f57c51',
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
  idInput:{
    marginStart: '5%',
    marginTop: '5%',
    backgroundColor: '#f6f8e2',
    maxHeight: '11%',
    minHeight: '10%',
    width: '30%',
    borderRadius: 12,
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginStart: '5%',
    marginTop: '5%',
    backgroundColor: '#f6f8e2',
    height: '15%',
    width: '90%',
    borderRadius: 12,
    marginLeft: '5%',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  callButton: {      
    marginLeft: '5%',
    height: '8%',
    width: '90%',
    backgroundColor: '#f57c51',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
    modalContainer: {
      flex: 1, 
    },
    modalHeader: {
      fontWeight: 'bold',
      fontSize: 25,
      color: '#f6f8e2',
      alignSelf: 'center',
      marginTop: '5%',
    },
    modalAskOne: {
      fontWeight: 'bold',
      fontSize: 25,
      marginLeft: '15%',
      color: '#f6f8e2',
    },
    modalSubmit: {
      margin: '5%',
      height: '10%',
      width: '90%',
      backgroundColor: '#f57c51',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      marginTop: '-10%',
    },
    modalSubmitText: {
      color: '#f6f8e2',
      fontWeight: 'bold',
    },
    modalAskGrade: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: '14%',
      margin: '5%',
      marginTop: 1,
      marginBottom: 10,
    },
    modalAnswerYes: {
      backgroundColor: '#f6f8e2',
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      height: 40,
      width: 120,
    },
    modalAnswerYesText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#111111',
    },
    modalAnswerNo: {
      backgroundColor: '#f6f8e2',
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      height: 40,
      width: 120,
    },
    modalAnswerNoText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#111111',
    },
    moreButtonsContainer: {
      flexDirection: 'column',
      margin: '5%',
      
    },
    moreButtonSold: {
      backgroundColor: '#f57c51',
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      height: '15%',
      width: 300,
      margin: '5%',
    },
    moreButtonNo: {
      backgroundColor: '#f57c51',
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      height: '15%',
      width: 300,
      margin: '5%',
    },
    moreButtonFuture: {
      backgroundColor: '#f57c51',
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      height: '15%',
      width: 300,
      margin: '5%',
    },
    moreButtonText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#f6f8e2',
    },
});