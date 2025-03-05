import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import { restaurants } from '../data/data'; // Importer les données depuis data.js

const RestaurantAuth = () => {
  const navigation = useNavigation();
  const [restaurantUsername, setRestaurantUsername] = useState('');
  const [restaurantPassword, setRestaurantPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Vérification des identifiants du restaurant
  const handleValidateRestaurant = () => {
    if (!restaurantUsername.trim() || !restaurantPassword.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
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
      <Text style={styles.title}>Authentification Restaurant</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur du restaurant"
        value={restaurantUsername}
        onChangeText={setRestaurantUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe du restaurant"
        secureTextEntry
        value={restaurantPassword}
        onChangeText={setRestaurantPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleValidateRestaurant} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Valider</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default RestaurantAuth;
