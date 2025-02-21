import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Button, Alert, Animated } from 'react-native';
import { ticketsData } from '../data/data';
import { styles } from '../styles/StaffHomeStyles';

const StaffHome = ({ route }) => {
  const { chefId } = route.params;
  const [tickets, setTickets] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Animation pour l'affichage des tickets

  useEffect(() => {
    const chefTickets = ticketsData.filter(ticket => ticket.chefId === chefId);
    if (filteredStatus) {
      const filteredTickets = chefTickets.filter(ticket => ticket.status === filteredStatus);
      setTickets(filteredTickets);
    } else {
      setTickets(chefTickets);
    }

    // Animation d'apparition des tickets
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [chefId, filteredStatus]);

  const markAsCompleted = (ticketId) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: 'Terminé' };
      }
      return ticket;
    });
    setTickets(updatedTickets);
  };

  const cancelTicket = (ticketId) => {
    Alert.alert(
      'Annuler la commande',
      'Êtes-vous sûr de vouloir annuler cette commande ?',
      [
        { text: 'Non', onPress: () => {} },
        { text: 'Oui', onPress: () => {
            // Filtrer les tickets pour supprimer celui sélectionné
            const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
            setTickets(updatedTickets);  // Mettre à jour l'état des tickets
          }
        }
      ]
    );
  };

  const renderTicket = (ticket) => (
    <Animated.View style={[styles.ticketContainer, ticket.status === 'Terminé' ? styles.completedTicket : null, { opacity: fadeAnim }]}>
      <Text style={styles.orderNumber}>Commande: {ticket.orderNumber}</Text>
      <Text style={styles.orderDetails}>{ticket.orderDetails}</Text>
      <Text style={styles.status}>Statut: {ticket.status}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => markAsCompleted(ticket.id)}
        disabled={ticket.status === 'Terminé'}>
        <Text style={styles.buttonText}>Marquer comme prêt</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => cancelTicket(ticket.id)}>
        <Text style={styles.buttonText}>Annuler commande</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { setSelectedTicket(ticket); setModalVisible(true); }}>
        <Text style={styles.buttonText}>Voir détails</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderModal = () => {
    if (!selectedTicket) return null;
    return (
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Détails de la commande</Text>
            <Text style={styles.modalText}>Numéro de commande: {selectedTicket.orderNumber}</Text>
            <Text style={styles.modalText}>Pizza: {selectedTicket.orderDetails}</Text>
            <Text style={styles.modalText}>Statut: {selectedTicket.status}</Text>
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Tickets</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilteredStatus('')}>
          <Text style={styles.filterButton}>Tous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilteredStatus('En attente')}>
          <Text style={styles.filterButton}>En attente</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilteredStatus('En préparation')}>
          <Text style={styles.filterButton}>En préparation</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilteredStatus('Terminé')}>
          <Text style={styles.filterButton}>Terminé</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tickets}
        renderItem={({ item }) => renderTicket(item)}
        keyExtractor={(item) => item.id}
        numColumns={3} // Afficher les tickets en deux colonnes
      />

      {renderModal()}
    </View>
  );
};

export default StaffHome;