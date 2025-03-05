// Sidebar.js
import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ options }) => {
  const navigation = useNavigation();

  const handleTaskClick = (screen) => {
    navigation.navigate(screen); // Naviguer vers l'écran sélectionné
  };

  return (
    <View style={styles.sidebar}>
      <ScrollView style={styles.sidebarContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.sidebarItem}
            onPress={() => handleTaskClick(option.screen)}
          >
            <FontAwesome5 name={option.icon} size={20} color="#fff" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 60, // Largeur minimisée du sidebar
    backgroundColor: '#333',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
  },
  sidebarContainer: {
    flex: 1,
    width: '100%',
  },
  sidebarItem: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default Sidebar;
