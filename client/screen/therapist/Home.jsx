import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile'

const Stack = createStackNavigator();

export default function Home() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Profile" component={Profile} />
        {/* <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Success" component={Success} /> */}
      </Stack.Navigator>
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
