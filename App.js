import React from 'react';
import { View, Text } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from "./src/styles/AppStyles";

import RestaurantAuth from './src/screens/RestaurantAuth';
import Login from './src/screens/Login';

import ManagerHome from './src/screens/ManagerHome';
import StaffHome from './src/screens/StaffHome';
import UserManagement from './src/screens/UserManagement';
import CategoryAssignment from './src/screens/CategoryAssignment';
import MenuManagement from './src/screens/MenuManagement';
import ResetPassword from './src/screens/ResetPassword';  

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.appContainer}>
      <Text style={styles.appTitle}>EatOrder KDS</Text> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="RestaurantAuth">
          <Stack.Screen name="RestaurantAuth" component={RestaurantAuth} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
         
          <Stack.Screen name="ManagerHome" component={ManagerHome} />
          <Stack.Screen name="UserManagement" component={UserManagement} />
          <Stack.Screen name="CategoryAssignment" component={CategoryAssignment} />
          <Stack.Screen name="MenuManagement" component={MenuManagement} />
          <Stack.Screen name="StaffHome" component={StaffHome} initialParams={{ chefName: 'Chef Pizza' }} />
        </Stack.Navigator>
      </NavigationContainer>  
    </View>
  );
}
 