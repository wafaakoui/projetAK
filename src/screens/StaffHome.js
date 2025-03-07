import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  Animated, 
  Dimensions,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Print from 'expo-print'; 
import { styles } from '../styles/StaffHomeStyles';
import { ticketsData } from '../data/data';

const { width } = Dimensions.get('window'); //obtenir la largeur de l'écran de l'appareil

const StaffHome = ({ route, navigation }) => {
  const { chefId } = route.params || {};
  const [tickets, setTickets] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [printPreviewVisible, setPrintPreviewVisible] = useState(false);
  const [printContent, setPrintContent] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (!chefId) return;

    const chefTickets = ticketsData
      .map(ticket => ({ ...ticket }))
      .filter(ticket => ticket.chefId === chefId && !ticket.isDeleted);

    const filteredTickets = filteredStatus 
      ? chefTickets.filter(ticket => ticket.status === filteredStatus)
      : chefTickets;
    
    setTickets(filteredTickets);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [chefId, filteredStatus]);

  const updateTicketStatus = (ticketId, newStatus) => {
    const ticketIndex = ticketsData.findIndex(t => t.id === ticketId && t.chefId === chefId);
    if (ticketIndex !== -1) {
      ticketsData[ticketIndex].status = newStatus;
      setTickets(prev => {
        const updatedTickets = ticketsData
          .filter(ticket => ticket.chefId === chefId && !ticket.isDeleted)
          .map(ticket => ({
            ...ticket,
            completedAt: ticket.status === 'Terminé' ? new Date().toISOString() : ticket.completedAt
          }));
        
        return filteredStatus 
          ? updatedTickets.filter(ticket => ticket.status === filteredStatus)
          : updatedTickets;
      });
    }
  };

  const markAsCompleted = (ticketId) => {
    updateTicketStatus(ticketId, 'Terminé');
    Alert.alert('Succès', 'Commande marquée comme terminée');
  };

  const confirmDeleteTicket = (ticketId) => {
    setTicketToDelete(ticketId);
    setDeleteModalVisible(true);
  };

  const deleteTicket = () => {
    if (ticketToDelete) {
      const ticketIndex = ticketsData.findIndex(t => t.id === ticketToDelete && t.chefId === chefId);
      if (ticketIndex !== -1) {
        ticketsData[ticketIndex].isDeleted = true;
        setTickets(prev => {
          const updatedTickets = ticketsData
            .filter(ticket => ticket.chefId === chefId && !ticket.isDeleted);
          
          const filteredTickets = filteredStatus 
            ? updatedTickets.filter(ticket => ticket.status === filteredStatus)
            : updatedTickets;
          
          return filteredTickets;
        });
        Alert.alert('Succès', 'Commande supprimée');
      }
      setDeleteModalVisible(false);
      setTicketToDelete(null);
    }
  };

  const printTicket = (ticketId) => {
    console.log('printTicket called with ticketId:', ticketId); // Débogage
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      console.log('Ticket found:', ticket); // Débogage
      setPrintContent([ticket]);
      setPrintPreviewVisible(true);
    } else {
      Alert.alert('Erreur', 'Ticket non trouvé');
    }
  };

  const printAllTickets = () => {
    if (tickets.length === 0) {
      Alert.alert('Information', 'Aucune commande à imprimer');
      return;
    }
    setPrintContent([...tickets]);
    setPrintPreviewVisible(true);
  };

  const handlePrint = async () => {
    console.log('handlePrint called with printContent:', printContent); // Débogage
    try {
      const html = `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #FFF8F0; color: #8B5A2B;">
            ${printContent.map(ticket => `
              <div style="margin-bottom: 20px;">
                <h3 style="color: #E73E01;">Commande #${ticket.orderNumber}</h3>
                <p>Détails: ${ticket.orderDetails}</p>
                <p>Statut: ${ticket.status}</p>
                ${printContent.length > 1 ? '<hr style="border: 1px dashed #E73E01;">' : ''}
              </div>
            `).join('')}
            <p style="text-align: center;">Date: ${new Date().toLocaleString()}</p>
          </body>
        </html>
      `;
      console.log('HTML generated:', html); // Débogage
      await Print.printAsync({
        html,
        printerId: null, // null pour ouvrir le sélecteur d'imprimante
      });
      Alert.alert('Succès', 'Commande(s) envoyée(s) à l\'impression');
    } catch (error) {
      console.error('Print error:', error); // Débogage
      Alert.alert('Erreur', 'Échec de l\'impression: ' + error.message);
    }
    setPrintPreviewVisible(false);
  };

  const renderTicket = ({ item }) => (
    <Animated.View 
      style={[
        styles.ticketContainer,
        item.status === 'Terminé' && styles.completedTicket,
        { opacity: fadeAnim }
      ]}
    >
      <View style={styles.ticketContent}>
        <Text style={styles.orderNumber}>#{item.orderNumber}</Text>
        <Text style={styles.orderDetails}>
          {item.orderDetails.length > 25 
            ? `${item.orderDetails.slice(0, 25)}...` 
            : item.orderDetails}
        </Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.iconButton, item.status === 'Terminé' && styles.disabledButton]}
          onPress={() => markAsCompleted(item.id)}
          disabled={item.status === 'Terminé'}
        >
          <Icon name="check" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => confirmDeleteTicket(item.id)}
          activeOpacity={0.7}
        >
          <Icon name="trash" style={styles.deleteIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => {
            setSelectedTicket(item);
            setModalVisible(true);
          }}
        >
          <Icon name="info" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => printTicket(item.id)} // Déclenche l'impression avec aperçu
          activeOpacity={0.7}
        >
          <Icon name="print" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderModal = () => selectedTicket && (
    <Modal
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Détails</Text>
          <Text style={styles.modalText}>Commande #{selectedTicket.orderNumber}</Text>
          <Text style={styles.modalText}>{selectedTicket.orderDetails}</Text>
          <Text style={styles.modalText}>Statut: ${selectedTicket.status}</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderDeleteModal = () => (
    <Modal
      visible={deleteModalVisible}
      onRequestClose={() => setDeleteModalVisible(false)}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Supprimer cette commande</Text>
          <Text style={styles.modalText}>Êtes-vous sûr de vouloir supprimer cette commande ?</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setDeleteModalVisible(false);
                setTicketToDelete(null);
              }}
            >
              <Text style={styles.modalButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.deleteButtonModal]}
              onPress={deleteTicket}
            >
              <Text style={styles.modalButtonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderPrintPreviewModal = () => (
    <Modal
      visible={printPreviewVisible}
      onRequestClose={() => setPrintPreviewVisible(false)}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Aperçu de l'impression</Text>
          <View style={styles.printContentContainer}>
            {printContent.map((ticket, index) => (
              <View key={ticket.id} style={styles.printTicketItem}>
                <Text style={styles.printText}>Commande #{ticket.orderNumber}</Text>
                <Text style={styles.printText}>Détails: ${ticket.orderDetails}</Text>
                <Text style={styles.printText}>Statut: ${ticket.status}</Text>
                {index < printContent.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
          <Text style={styles.printDate}>Date: ${new Date().toLocaleString()}</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setPrintPreviewVisible(false)}
            >
              <Text style={styles.modalButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.printButtonModal]}
              onPress={handlePrint}
            >
              <Text style={styles.modalButtonText}>Imprimer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Tickets</Text>
      <View style={styles.filterContainer}>
        {['', 'En préparation', 'Terminé'].map(status => (
          <TouchableOpacity
            key={status || 'all'}
            style={[
              styles.filterButton,
              filteredStatus === status && styles.filterButtonActive
            ]}
            onPress={() => setFilteredStatus(status)}
          >
            <Text style={[
              styles.filterText,
              filteredStatus === status && styles.filterTextActive
            ]}>
              {status || 'Tout'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={tickets}
        renderItem={renderTicket}
        keyExtractor={item => item.id}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        ListFooterComponent={
          <TouchableOpacity 
            style={styles.allPrintButton}
            onPress={printAllTickets}
            activeOpacity={0.7}
          >
            <Icon name="print" style={styles.allPrintIcon} />
          </TouchableOpacity>
        }
        ListEmptyComponent={<Text style={styles.emptyText}>Aucun ticket</Text>}
      />
      {renderModal()}
      {renderDeleteModal()}
      {renderPrintPreviewModal()}
    </View>
  );
};

export default StaffHome;