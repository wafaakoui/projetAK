import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { users } from '../data/data';
import { styles } from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      if (user.role === 'Manager') {
        navigation.navigate('ManagerHome');
      } else if (user.role === 'Staff') {
        navigation.navigate('StaffHome', { chefId: user.id });
      }
    } else {
      Alert.alert('Erreur', 'Identifiants incorrects');
    }
  };
  const handleForgotPassword = () => {
    Alert.alert('Réinitialisation du mot de passe', 'Un lien pour réinitialiser votre mot de passe a été envoyé à votre adresse e-mail.');
    // Tu peux ici ajouter une logique pour envoyer un lien de réinitialisation par email
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Connexion</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupButtonText}>Créer un compte</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;