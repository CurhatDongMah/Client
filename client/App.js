import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SigninForm from './screen/SigninForm'
import SignupForm from './screen/client/SignupForm'
import Confirm from './screen/Confirm'
import ClientPage from './screen/client/ClientPage'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signin" component={SigninForm} />
        <Stack.Screen name="Confirm" component={Confirm} />
        <Stack.Screen name="Signup" component={SignupForm} />
        <Stack.Screen name="ClientPage" component={ClientPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
