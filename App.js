import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import ManagerDashboard from './src/components/ManagerDashboard';
import KitchenDashboard from './src/components/KitchenDashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Eatorder KDS', headerStyle: { backgroundColor: '#D32F2F' }, headerTintColor: 'white' }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: 'Eatorder KDS', headerStyle: { backgroundColor: '#D32F2F' }, headerTintColor: 'white' }}
        />
        <Stack.Screen
          name="ManagerDashboard"
          component={ManagerDashboard}
          options={{ title: 'Manager Dashboard', headerStyle: { backgroundColor: '#D32F2F' }, headerTintColor: 'white' }}
        />
        <Stack.Screen
          name="KitchenDashboard"
          component={KitchenDashboard}
          options={{ title: 'Kitchen Dashboard', headerStyle: { backgroundColor: '#D32F2F' }, headerTintColor: 'white' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
