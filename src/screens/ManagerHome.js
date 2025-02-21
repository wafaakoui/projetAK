import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import ManagerHomeStyle from '../styles/ManagerHomeStyle'; // Importing style file

const ManagerHome = () => {
  const navigation = useNavigation();
  const [selectedTask, setSelectedTask] = useState(null); // For managing task click

  const options = [
    { title: 'Gérer les utilisateurs', icon: 'users', screen: 'UserManagement' },
    { title: 'Assignation des catégories pour les stations', icon: 'tasks', screen: 'CategoryAssignment' },
    { title: 'Gestion du menu', icon: 'utensils', screen: 'MenuManagement' },
  ];

  // Handle task click
  const handleTaskClick = (screen) => {
    setSelectedTask(screen); // Update selected task to show details
    navigation.navigate(screen); // Navigate to the respective screen
  };

  return (
    <View style={ManagerHomeStyle.container}>
      <View style={ManagerHomeStyle.sidebar}>
        <ScrollView style={ManagerHomeStyle.sidebarContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={ManagerHomeStyle.sidebarItem}
              onPress={() => handleTaskClick(option.screen)}
            >
              <FontAwesome5 name={option.icon} size={20} color="#fff" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={ManagerHomeStyle.content}>
        {selectedTask ? (
          <Text style={ManagerHomeStyle.selectedTaskText}>
            Tâche sélectionnée : {selectedTask}
          </Text>
        ) : (
          <Text style={ManagerHomeStyle.header}>Bienvenue, Manager</Text>
        )}
      </View>
    </View>
  );
};

export default ManagerHome;
