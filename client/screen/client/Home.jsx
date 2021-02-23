import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile'
import Detail from './Detail'
import Payment from './Payment'
import Success from './Success'
// import ChatRoom from './ChatRoom';
import ConfirmPayment from './ConfirmPayment'
import FormEdit from './FormEdit'

const Stack = createStackNavigator();

export default function Home() {
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ClientEdit" component={FormEdit} />
        <Stack.Screen name="Detail" component={Detail} />
        {/* <Stack.Screen name="ChatRoom" component={ChatRoom} /> */}
        <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Success" component={Success} />
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
