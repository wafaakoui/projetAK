// StaffHomeStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      column: {
        width: '30%',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginHorizontal: 5,
      },
      chefTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      },
      ticketContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
      },
      selectedTicket: {
        borderWidth: 2,
        borderColor: '#4CAF50',
      },
      orderNumber: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      orderDetails: {
        fontSize: 14,
      },
      status: {
        fontSize: 14,
        marginTop: 5,
      },
      finishButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
    });