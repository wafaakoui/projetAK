import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles as appStyles } from '../styles/AppStyles'; // Importer les styles depuis AppStyles.js
import { users } from '../data/data'; // Importation des utilisateurs depuis data.js
import { FontAwesome } from '@expo/vector-icons'; // Importation des icônes

const Login = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const restaurantName = route.params?.restaurantName || ''; // Récupération du nom du restaurant
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const savedUser = await AsyncStorage.getItem('lastUsername');
      if (savedUser) setEmail(savedUser);
    };
    loadUserData();
  }, []);

  const validateInputs = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'L\'email est requis.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Veuillez entrer un email valide.';
    }

    if (!password.trim()) {
      errors.password = 'Le mot de passe est requis.';
    } else if (password.length < 6) {
      errors.password = 'Le mot de passe doit comporter au moins 6 caractères.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    const user = users.find((usr) => usr.email === email && usr.password === password);

    if (user) {
      await AsyncStorage.setItem('lastUsername', email);
      Alert.alert('Succès', `Bienvenue, ${user.name} (${user.role}) au restaurant ${restaurantName}`);

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
    <View style={appStyles.container}>
      <Text style={appStyles.loginTitle}>Connexion</Text>
      <Text style={appStyles.restaurantSubtitle}>Restaurant: {restaurantName}</Text>

      {/* Champ Email */}
      <TextInput
        style={[appStyles.input, errors.email && { borderColor: 'red' }]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {errors.email && <Text style={appStyles.errorText}>{errors.email}</Text>}

      {/* Champ Mot de passe */}
      <View style={appStyles.passwordContainer}>
        <TextInput
          style={[appStyles.passwordInput, errors.password && { borderColor: 'red' }]}
          placeholder="Mot de passe"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        {/* Icône œil pour afficher/masquer le mot de passe */}
        <TouchableOpacity
          style={appStyles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#E73E01" />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={appStyles.errorText}>{errors.password}</Text>}

      {/* Bouton de connexion */}
      <TouchableOpacity style={appStyles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={appStyles.buttonText}>Se connecter</Text>}
      </TouchableOpacity>

      {/* Lien pour réinitialiser le mot de passe */}
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={appStyles.forgotPasswordText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
