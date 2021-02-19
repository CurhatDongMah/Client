import React from 'react'
import { SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function Review({ navigation }) {
  return (
    <SafeAreaView style={tailwind('flex-1 items-center')}>
    <Text>Review Page</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate('Home')}
      style={tailwind('items-center py-1 px-10 rounded-full bg-green-500 border-2 border-green-500')}>
      <Text 
        style={tailwind('text-xl text-gray-100')}
      >Send Review</Text>
    </TouchableOpacity>
  </SafeAreaView>
  )
}
