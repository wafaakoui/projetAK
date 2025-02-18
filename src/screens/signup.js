import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    // Simuler une inscription réussie
    Alert.alert('Succès', 'Compte créé avec succès !');
    navigation.navigate('Login'); // Redirige vers la page de connexion après l'inscription
  };
  const handleForgotPassword = () => {
    Alert.alert('Réinitialisation du mot de passe', 'Un lien pour réinitialiser votre mot de passe a été envoyé à votre adresse e-mail.');
      // Tu peux ici ajouter une logique pour envoyer un lien de réinitialisation par email
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#E50914" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signupButtonText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
