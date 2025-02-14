import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/AppStyles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null); // Pour stocker le rôle sélectionné

  const handleLogin = () => {
    if (!email || !password || !role) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs et sélectionner un rôle');
      return;
    }
    console.log('Email:', email);
    console.log('Mot de passe:', password);
    console.log('Rôle:', role);

    // Navigation selon le rôle
    if (role === 'Manager') {
      navigation.navigate('ManagerDashboard');
    } else if (role === 'Kitchen Staff') {
      navigation.navigate('KitchenDashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      {/* Sélection du rôle */}
      <View style={styles.roleSelectionContainer}>
        <Text style={styles.subtitle}>Sélectionnez votre rôle</Text>
        <TouchableOpacity
          style={[styles.roleButton, role === 'Manager' && styles.selectedRole]}
          onPress={() => setRole('Manager')}
        >
          <Text style={styles.buttonText}>Manager</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'Kitchen Staff' && styles.selectedRole]}
          onPress={() => setRole('Kitchen Staff')}
        >
          <Text style={styles.buttonText}>Kitchen Staff</Text>
        </TouchableOpacity>
      </View>

      {/* Formulaire de connexion */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}
