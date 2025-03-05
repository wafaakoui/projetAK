// UserManagement.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Animated, StyleSheet, Alert } from 'react-native';
import Sidebar from '../components/Sidebar';  // Import the Sidebar component

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: '1', name: 'Alice', role: 'Manager', password: 'password123' },
    { id: '2', name: 'Bob', role: 'Staff', password: 'password456' },
  ]);

  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  const [fadeAnim] = useState(new Animated.Value(0)); // Animation for fading in

  // Show the animation when the component mounts
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Sidebar options with no text, only icons
  const sidebarOptions = [
    { icon: 'users', screen: 'UserManagement' },
    { icon: 'tasks', screen: 'CategoryAssignment' },
    { icon: 'utensils', screen: 'MenuManagement' },
  ];

  // Add or update user
  const handleAddOrUpdateUser = () => {
    if (newUserName && newUserRole && newUserPassword) {
      if (editingUser) {
        // Update user
        const updatedUsers = users.map((user) =>
          user.id === editingUser.id ? { ...user, name: newUserName, role: newUserRole, password: newUserPassword } : user
        );
        setUsers(updatedUsers);
        setEditingUser(null);
      } else {
        // Add new user
        const newUser = { id: (users.length + 1).toString(), name: newUserName, role: newUserRole, password: newUserPassword };
        setUsers([...users, newUser]);
      }
      setNewUserName('');
      setNewUserRole('');
      setNewUserPassword('');
    } else {
      Alert.alert('Erreur', 'Veuillez entrer un nom, un rôle et un mot de passe.');
    }
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const editUser = (user) => {
    setNewUserName(user.name);
    setNewUserRole(user.role);
    setNewUserPassword(user.password);
    setEditingUser(user);
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userText}>{item.name} - Mot de passe : {item.password} - Rôle : {item.role}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => editUser(item)}>
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteUser(item.id)}>
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sidebar Component */}
      <Sidebar options={sidebarOptions} />

      {/* Main Content */}
      <View style={styles.content}>
        <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
          <Text style={styles.header}>Gérer les Utilisateurs</Text>
        </Animated.View>

        <TextInput
          style={styles.input}
          placeholder="Nom de l'utilisateur"
          value={newUserName}
          onChangeText={setNewUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe de l'utilisateur"
          value={newUserPassword}
          onChangeText={setNewUserPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Rôle de l'utilisateur"
          value={newUserRole}
          onChangeText={setNewUserRole}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddOrUpdateUser}>
          <Text style={styles.buttonText}>{editingUser ? 'Modifier' : 'Ajouter'} un utilisateur</Text>
        </TouchableOpacity>

        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E73E01',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#E73E01',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#E73E01',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  userItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF3ED',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userText: {
    fontSize: 16,
    color: '#E73E01',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#FFB74D',
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
  },
});

export default UserManagement;
