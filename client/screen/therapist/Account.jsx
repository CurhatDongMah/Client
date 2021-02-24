import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from './Profile'
import FormEdit from './FormEdit'

const Stack = createStackNavigator()

export default function Account() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="TherapistEdit" component={FormEdit}/>
    </Stack.Navigator>
  );
}

