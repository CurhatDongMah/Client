import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home'
import History from './History'
import Messages from './Messages'
import Account from './Account'

const Tab = createBottomTabNavigator();

export default function TherapistPage() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'History') {
              iconName = focused ? 'list' : 'list';
            } else if (route.name === 'Messages') {
              iconName = focused ? 'ios-chatbox' : 'ios-chatbox';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person' : 'person';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#34D399',
          inactiveTintColor: '#9CA3AF',
          showLabel: false,
          style: { borderTopColor: '#34D399', borderTopWidth: 2 }
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Messages" component={Messages} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
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
