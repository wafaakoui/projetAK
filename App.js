import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Signup from './src/screens/signup'; 
import ManagerHome from './src/screens/ManagerHome';
import StaffHome from './src/screens/StaffHome';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="ManagerHome" component={ManagerHome} />
        <Stack.Screen
          name="StaffHome"
          component={StaffHome}
          initialParams={{ chefName: 'Chef Pizza' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
