import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/AppStyles';

const ManagerHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenue, Manager</Text>
    </View>
  );
};

export default ManagerHome;
