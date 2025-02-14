// src/components/KitchenDashboard.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/AppStyles';

export default function KitchenDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Kitchen Dashboard</Text>
    </View>
  );
}
