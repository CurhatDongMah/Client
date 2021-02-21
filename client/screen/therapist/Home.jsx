import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from './Profile'
import FormEdit from './FormEdit'
import ChatRoom from "./ChatRoom";

const Stack = createStackNavigator()

export default function Home() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="TherapistEdit" component={FormEdit}/>
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
}
