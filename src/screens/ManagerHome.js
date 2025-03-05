// ManagerHome.js
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ManagerHomeStyle from '../styles/ManagerHomeStyle';
import Sidebar from '../components/Sidebar'; // Import Sidebar component

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
      {/* Sidebar Component */}
      <Sidebar options={options} />

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
