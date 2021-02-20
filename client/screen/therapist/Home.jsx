import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from './Profile'

const Stack = createStackNavigator()

export default function Home() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
