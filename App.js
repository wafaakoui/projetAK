import React from 'react';
import { View, Text } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from "./src/styles/AppStyles";




import Login from './src/screens/Login';
import Signup from './src/screens/signup'; 
import ManagerHome from './src/screens/ManagerHome';
import StaffHome from './src/screens/StaffHome';
import UserManagement from './src/screens/UserManagement';
import CategoryAssignment from './src/screens/CategoryAssignment';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.appContainer}>
    <Text style={styles.appTitle}>EatOrder</Text> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="ManagerHome" component={ManagerHome} />
        <Stack.Screen name="UserManagement" component={UserManagement} />
        <Stack.Screen name="CategoryAssignment" component={CategoryAssignment} />
        <Stack.Screen name="StaffHome" component={StaffHome} initialParams={{ chefName: 'Chef Pizza' }} />

      </Stack.Navigator>
    </NavigationContainer>  
  </View>
  );
}