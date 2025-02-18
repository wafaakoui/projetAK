import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#E73E01',  // Couleur Corail
  },
  input: {
    height: 50,
    borderColor: '#E73E01',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
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
  signupButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#E73E01',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#E73E01',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
