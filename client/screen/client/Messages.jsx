import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Inbox from './Inbox'
import ChatRoom from './ChatRoom'

const Stack = createStackNavigator();

export default function Messages() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Inbox" component={Inbox} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
      </Stack.Navigator>
  );
}
