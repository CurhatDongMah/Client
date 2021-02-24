import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListClient from './ListClient'

const Stack = createStackNavigator()

export default function Home() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListClient" component={ListClient}/>
    </Stack.Navigator>
  );
}
