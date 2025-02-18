import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles/StaffHomeStyles'; 

const ticketsData = [
    { id: '1', orderNumber: '123', orderDetails: 'Pizza Margherita', status: 'En attente', chef: 'Chef A' },
    { id: '2', orderNumber: '124', orderDetails: 'Pizza Pepperoni', status: 'En préparation', chef: 'Chef B' },
    { id: '3', orderNumber: '125', orderDetails: 'Pizza Végétarienne', status: 'Terminé', chef: 'Chef A' },
    { id: '4', orderNumber: '126', orderDetails: 'Pizza Hawaïenne', status: 'En attente', chef: 'Chef C' },
    { id: '5', orderNumber: '127', orderDetails: 'Pizza Quatre Saisons', status: 'En préparation', chef: 'Chef B' },
  ];
  
  // Fonction pour organiser les tickets par cuisinier
  const organizeByChef = (tickets) => {
    const chefs = {};
  
    tickets.forEach(ticket => {
      if (!chefs[ticket.chef]) {
        chefs[ticket.chef] = [];
      }
      chefs[ticket.chef].push(ticket);
    });
  
    return chefs;
  };
  
  const StaffHome = () => {
    const [tickets, setTickets] = useState(ticketsData);
    const [selectedTicket, setSelectedTicket] = useState(null); // Suivi du ticket sélectionné
  
    const ticketsByChef = organizeByChef(tickets);
  
    // Fonction pour marquer un ticket comme "Terminé"
    const markAsCompleted = () => {
      if (selectedTicket) {
        const updatedTickets = tickets.map(ticket => {
          if (ticket.id === selectedTicket.id) {
            return { ...ticket, status: 'Terminé' }; // Mettre à jour le statut
          }
          return ticket;
        });
        setTickets(updatedTickets);
        setSelectedTicket(null); // Réinitialiser la sélection
      }
    };
  
    // Fonction pour afficher chaque ticket dans une colonne
    const renderTicket = (ticket) => (
      <View style={[styles.ticketContainer, selectedTicket && selectedTicket.id === ticket.id ? styles.selectedTicket : null]}>
        <TouchableOpacity onPress={() => setSelectedTicket(ticket)}>
          <Text style={styles.orderNumber}>Commande: {ticket.orderNumber}</Text>
          <Text style={styles.orderDetails}>Pizza: {ticket.orderDetails}</Text>
          <Text style={styles.status}>Statut: {ticket.status}</Text>
        </TouchableOpacity>
      </View>
    );}
export default StaffHome;
