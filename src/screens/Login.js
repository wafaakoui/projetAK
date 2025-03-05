import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import { users } from '../data/data'; // Importation des utilisateurs depuis data.js

const Login = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const restaurantName = route.params?.restaurantName || ''; // Nom du restaurant transmis depuis RestaurantAuth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Charger le dernier utilisateur enregistré
  useEffect(() => {
    const loadUserData = async () => {
      const savedUser = await AsyncStorage.getItem('lastUsername');
      if (savedUser) setEmail(savedUser);
    };
    loadUserData();
  }, []);

  // Vérification des identifiants utilisateur
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);

    // Chercher l'utilisateur avec l'email et le mot de passe
    const user = users.find(
      (usr) => usr.email === email && usr.password === password
    );

    if (user) {
      await AsyncStorage.setItem('lastUsername', email); // Sauvegarde du dernier utilisateur connecté
      Alert.alert('Succès', `Bienvenue, ${user.name} (${user.role}) au restaurant ${restaurantName}`);
      
      // Naviguer en fonction du rôle
      if (user.role === 'Manager') {
        navigation.replace('ManagerHome');
      } else if (user.role === 'Staff') {
        navigation.replace('StaffHome', { chefId: user.id });
      }
    } else {
      Alert.alert('Erreur', 'Identifiants incorrects.');
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <Text style={styles.subtitle}>Restaurant: {restaurantName}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Se connecter</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default Login;
