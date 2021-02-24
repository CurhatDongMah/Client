import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ListTherapist from './ListTherapist'
import Detail from './Detail'
import Payment from './Payment'
import Success from './Success'
import ConfirmPayment from './ConfirmPayment'

const Stack = createStackNavigator();

export default function Home() {
  console.log('home');
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="ListTherapist" component={ListTherapist} />
        <Stack.Screen name="Detail" component={Detail} />
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
