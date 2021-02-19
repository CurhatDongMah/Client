import React from 'react'
import { SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function Payment({ navigation }) {
  return (
    <SafeAreaView style={tailwind('flex-1 items-center mt-32')}>
    <Text>Payment</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate('Success')}
      style={tailwind('items-center py-1 px-10 rounded-full bg-green-500 border-2 border-green-500')}>
      <Text 
        style={tailwind('text-xl text-gray-100')}
      >Confirm</Text>
    </TouchableOpacity>
  </SafeAreaView>
  )
}
