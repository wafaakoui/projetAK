import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D32F2F',  // Rouge
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  roleSelectionContainer: {
    marginBottom: 30,
  },
  roleButton: {
    backgroundColor: '#f8d7da',  // Fond léger pour les boutons
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRole: {
    backgroundColor: '#D32F2F', // Fond rouge pour le rôle sélectionné
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',  // Texte blanc
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#D32F2F',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#D32F2F', // Rouge pour le bouton principal
    paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: '#D32F2F', // Lien rouge pour "Créer un compte"
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default styles;
