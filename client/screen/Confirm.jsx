import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, Button } from 'react-native'
import tailwind from 'tailwind-rn'


export default function Confirm({ navigation }) {
  return (
    <SafeAreaView style={tailwind('flex-1 justify-center items-center')}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={tailwind('w-80 items-center py-3 mt-8 rounded-full bg-green-500 border-2 border-green-500')}>
        <Text 
          style={tailwind('text-xl text-gray-100')}
        >I am Client</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tailwind('w-80 items-center py-3 mt-8 rounded-full bg-green-500 border-2 border-green-500')}>
        <Text 
          style={tailwind('text-xl text-gray-100')}
        >I am Therapist</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
