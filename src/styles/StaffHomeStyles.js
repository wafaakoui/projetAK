import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E73E01',
    marginBottom: 20,
    textAlign: 'center',
  },
  ticketContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,  // Pour Android
    marginHorizontal: 8,
  },
  completedTicket: {
    backgroundColor: '#FAD8CC',
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  orderDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E73E01',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#E73E01',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  printButton: {
    backgroundColor: '#28a745',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDetailsButton: {
    textDecorationLine: 'underline',
    color: '#007bff',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  filterButton: {
    fontSize: 16,
    color: '#E73E01',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E73E01',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#E73E01',
    padding: 10,
    borderRadius: 5,
  },
});



