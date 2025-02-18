import { StyleSheet } from 'react-native';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E73E01',
    marginBottom: 20,
  },
  ticketContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  completedTicket: {
    backgroundColor: '#FAD8CC',  // Greenish background for completed tickets
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDetails: {
    fontSize: 14,
    color: '#555',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E73E01',
  },
  button: {
    backgroundColor: '#E73E01',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  printButton: {
    backgroundColor: '#28a745',  // Green background for the print button
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDetailsButton: {
    textDecorationLine: 'underline',
    color: '#007bff', // Blue color for view details
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  filterButton: {
    fontSize: 14,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E73E01',
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
  }
};

