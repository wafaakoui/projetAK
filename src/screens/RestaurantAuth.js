import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import { restaurants } from '../data/data'; // Importer les données depuis data.js
import Icon from 'react-native-vector-icons/FontAwesome'; // Importer l'icône FontAwesome

const RestaurantAuth = () => {
  const navigation = useNavigation();
  const [restaurantUsername, setRestaurantUsername] = useState('');
  const [restaurantPassword, setRestaurantPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe
  const [errors, setErrors] = useState({}); // Pour stocker les erreurs de saisie

  // Fonction pour valider les champs
  const validateInputs = () => {
    const errors = {};
    if (!restaurantUsername.trim()) {
      errors.username = 'Le nom d\'utilisateur est requis.';
    }
    if (!restaurantPassword.trim()) {
      errors.password = 'Le mot de passe est requis.';
    } else if (restaurantPassword.length < 6) { // Vérifier que le mot de passe est assez long
      errors.password = 'Le mot de passe doit comporter au moins 6 caractères.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0; 
  };

  // Vérification des identifiants du restaurant
  const handleValidateRestaurant = () => {
    // Valider les entrées avant de continuer
    if (!validateInputs()) {
      return; // Si les entrées ne sont pas valides, ne pas continuer
    }

    setIsLoading(true);

    const restaurant = restaurants.find(
      (resto) => resto.username === restaurantUsername && resto.password === restaurantPassword
    );

    if (restaurant) {
      // Sauvegarder le nom du restaurant dans AsyncStorage
      AsyncStorage.setItem('restaurantName', restaurant.name);
      // Naviguer vers la page de connexion avec le nom du restaurant
      navigation.navigate('Login', { restaurantName: restaurant.name });
    } else {
      Alert.alert('Erreur', 'Identifiants du restaurant invalides.');
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>Authentification Restaurant</Text>

      {/* Champ Nom d'utilisateur */}
      <TextInput
        style={[styles.input, errors.username && { borderColor: 'red' }]} // Afficher un style différent si erreur
        placeholder="Nom d'utilisateur du restaurant"
        value={restaurantUsername}
        onChangeText={setRestaurantUsername}
        autoCapitalize="none"
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>} {/* Afficher l'erreur */}

      {/* Champ Mot de passe */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, errors.password && { borderColor: 'red' }]} // Mot de passe avec style spécifique
          placeholder="Mot de passe du restaurant"
          secureTextEntry={!showPassword} // Si showPassword est false, le texte est masqué
          value={restaurantPassword}
          onChangeText={setRestaurantPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)} // Toggle de l'état showPassword
        >
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#E50914" />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>} {/* Afficher l'erreur */}

      {/* Bouton de validation */}
      <TouchableOpacity style={styles.button} onPress={handleValidateRestaurant} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Valider</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default RestaurantAuth;
