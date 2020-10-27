import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import GuillotineMenu from './src/screens/GuillotineMenu';

const Stack = createStackNavigator();

export default function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Tutorial 1">
        <Stack.Screen name="Tutorial 1" component={GuillotineMenu}/>       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

