import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 55,
    fontWeight: "bold",
    color: "#E73E01",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 15,
    fontFamily: "sans-serif-medium",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  // Titre de la page de connexion
  loginTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "sans-serif-medium",
  },

  // Sous-titre du restaurant
  restaurantSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "sans-serif-medium",
  },

  input: {
    height: 50,
    borderColor: '#E73E01',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: '#E73E01',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
    width: '100%', // Champ de mot de passe avec largeur identique à l'email
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    
  },
  button: {
    backgroundColor: '#E73E01',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#E73E01',  // Couleur rouge comme ton thème
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'sans-serif-medium',
    textDecorationLine: 'underline',  // Pour donner l'aspect d'un lien
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    bottom: 15,
    padding: 5,
  },

});
