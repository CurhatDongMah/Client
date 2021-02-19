import React from 'react'
import { SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function Success({ navigation }) {
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center')}>
      <View style={tailwind('p-20 bg-green-500 rounded-full')}>
        <Text style={tailwind('text-gray-100')}>Oke</Text>
      </View>
      <Text style={tailwind('my-5 text-2xl')}>Your booking is success</Text>
    </SafeAreaView>
  )
}
