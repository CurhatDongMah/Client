import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home'
import History from './History'
import Inbox from './Inbox'
import Logout from './Logout'

const Tab = createBottomTabNavigator()

export default function ClientPage({ navigation }) {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'History') {
              iconName = focused ? 'list' : 'list';
            } else if (route.name === 'Inbox') {
              iconName = focused ? 'ios-chatbox' : 'ios-chatbox';
            } else if (route.name === 'Logout') {
              iconName = focused ? 'person' : 'person';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#00af91',
          inactiveTintColor: '#e7e6e1',
          showLabel: false
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Inbox" component={Inbox} />
        <Tab.Screen name="Logout" component={Logout} />
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