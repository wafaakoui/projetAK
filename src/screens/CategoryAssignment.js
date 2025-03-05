import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/Sidebar';  // Adjust the import path according to your folder structure

const CategoryAssignment = () => {
  const navigation = useNavigation();
  const [stations, setStations] = useState(['Station 1', 'Station 2']);
  const [newStationName, setNewStationName] = useState('');
  const [isAddingStation, setIsAddingStation] = useState(false);

  // Create an animated value
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial value is 0 (invisible)

  // Fade-in animation for the header title
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade to full opacity
      duration: 1000, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [fadeAnim]);

  // Add a station
  const addStation = () => {
    if (!newStationName) {
      Alert.alert("Erreur", "Veuillez entrer un nom pour la station.");
      return;
    }
    setStations([...stations, newStationName]);
    setNewStationName('');
    setIsAddingStation(false);
  };

  // Remove a station
  const removeStation = (station) => {
    setStations(stations.filter((item) => item !== station));
  };

  // Pause a station
  const pauseStation = (station) => {
    alert(`Station ${station} is now paused.`);
  };

  // Update station name
  const updateStation = (oldStation, newName) => {
    const updatedStations = stations.map((station) =>
      station === oldStation ? newName : station
    );
    setStations(updatedStations);
  };

  const options = [
    { icon: 'users', screen: 'UserManagement' },
    { icon: 'tasks', screen: 'CategoryAssignment' },
    { icon: 'utensils', screen: 'MenuManagement' },
  ];

  return (
    <View style={styles.container}>
      {/* Sidebar Component */}
      <Sidebar options={options} />

      <View style={styles.content}>
        {/* Animated header */}
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
                <TouchableOpacity onPress={() => {
                  const newName = prompt('Enter new name for the station', station);
                  if (newName) updateStation(station, newName);
                }} style={styles.button}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E73E01',
    textAlign: 'center',
    marginBottom: 20,
  },
  stationsList: {
    marginBottom: 20,
  },
  stationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  stationText: {
    fontSize: 18,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#E73E01',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  addStationContainer: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#bbb',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CategoryAssignment;
