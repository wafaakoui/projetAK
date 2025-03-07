import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert, Animated, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/Sidebar'; // Vérifie le bon chemin

const CategoryAssignment = () => {
  const navigation = useNavigation();
  const [stations, setStations] = useState(['Station 1', 'Station 2']);
  const [newStationName, setNewStationName] = useState('');
  const [isAddingStation, setIsAddingStation] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState('');
  const [editedName, setEditedName] = useState('');

  // Animation du titre
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Ajouter une station
  const addStation = () => {
    if (!newStationName.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un nom valide pour la station.");
      return;
    }
    setStations([...stations, newStationName.trim()]);
    setNewStationName('');
    setIsAddingStation(false);
  };

  // Supprimer une station avec confirmation
  const removeStation = (station) => {
    Alert.alert(
      "Confirmation",
      `Voulez-vous vraiment supprimer "${station}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setStations((prevStations) => prevStations.filter((item) => item !== station));
            Alert.alert("Succès", `"${station}" a été supprimée.`);
          },
        },
      ]
    );
  };

  // Mettre en pause une station
  const pauseStation = (station) => {
    Alert.alert(
      "Mise en Pause",
      `"${station}" a été mise en pause.`,
      [{ text: "OK" }]
    );
  };

  // Ouvrir le modal de modification
  const openEditModal = (station) => {
    setSelectedStation(station);
    setEditedName(station);
    setEditModalVisible(true);
  };

  // Modifier une station
  const updateStation = () => {
    if (!editedName.trim()) {
      Alert.alert("Erreur", "Le nom de la station ne peut pas être vide.");
      return;
    }
    setStations(stations.map((station) => (station === selectedStation ? editedName.trim() : station)));
    setEditModalVisible(false);
  };

  const options = [
    { icon: 'users', screen: 'UserManagement' },
    { icon: 'tasks', screen: 'CategoryAssignment' },
    { icon: 'utensils', screen: 'MenuManagement' },
  ];

  return (
    <View style={styles.container}>
      <Sidebar options={options} />

      <View style={styles.content}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.header}>Assignation des Catégories</Text>
        </Animated.View>

        <ScrollView style={styles.stationsList}>
          {stations.map((station, index) => (
            <View key={index} style={styles.stationItem}>
              <Text style={styles.stationText}>{station}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => pauseStation(station)} style={styles.button}>
                  <FontAwesome5 name="pause-circle" size={20} color="orange" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeStation(station)} style={styles.button}>
                  <FontAwesome5 name="trash" size={20} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openEditModal(station)} style={styles.button}>
                  <FontAwesome5 name="edit" size={20} color="blue" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {isAddingStation ? (
          <View style={styles.addStationContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nom de la station"
              value={newStationName}
              onChangeText={setNewStationName}
            />
            <TouchableOpacity onPress={addStation} style={styles.addButton}>
              <Text style={styles.addButtonText}>Ajouter Station</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsAddingStation(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsAddingStation(true)} style={styles.addButton}>
            <Text style={styles.addButtonText}>Ajouter une station</Text>
          </TouchableOpacity>
        )}

        {/* Modal pour modifier une station */}
        <Modal visible={editModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Modifier la station</Text>
              <TextInput
                style={styles.input}
                value={editedName}
                onChangeText={setEditedName}
              />
              <TouchableOpacity onPress={updateStation} style={styles.updateButton}>
                <Text style={styles.addButtonText}>Enregistrer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#fff' },
  content: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#E73E01', textAlign: 'center', marginBottom: 20 },
  stationsList: { marginBottom: 20 },
  stationItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  stationText: { fontSize: 18, color: '#333' },
  buttonsContainer: { flexDirection: 'row', alignItems: 'center' },
  button: { marginHorizontal: 10 },
  addButton: { backgroundColor: '#E73E01', paddingVertical: 12, borderRadius: 5, alignItems: 'center' },
  addButtonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  addStationContainer: { marginVertical: 20 },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, marginBottom: 15, paddingLeft: 10, borderRadius: 5 },
  cancelButton: { backgroundColor: '#bbb', paddingVertical: 10, borderRadius: 5, alignItems: 'center' },
  cancelButtonText: { fontSize: 16, color: '#fff' },

  /* Modal Style */
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  updateButton: { backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 5, alignItems: 'center', width: '100%' },
});

export default CategoryAssignment;
