import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E50914', // Rouge
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#E50914',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E50914',
    borderRadius: 5,
  },
  passwordInput: {
    height: 50,
    flex: 1, // Prend tout l'espace disponible
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#E50914', // Rouge
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#E50914',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '80%',
  },
  signupButtonText: {
    color: '#E50914',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
