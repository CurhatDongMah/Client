import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, Button } from 'react-native'
import tailwind from 'tailwind-rn'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Confirm({ navigation }) {
  return (
    <SafeAreaView style={tailwind('flex-1 justify-center items-center bg-white')}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignupClient')}
        style={tailwind('w-full items-center py-48 bg-gray-50')}>
          <View style={tailwind('flex flex-row items-center')}>
            <Ionicons style={tailwind('mx-2 text-gray-500 text-3xl')} name='person'/>
            <Text style={tailwind('mx-2 text-2xl text-gray-500 tracking-wider')}>I AM A CLIENT</Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignupTherapist')}
        style={tailwind('w-full items-center py-48 bg-green-400 border border-green-400')}>
        <View style={tailwind('flex flex-row items-center')}>
          <Ionicons style={tailwind('mx-2 text-gray-100 text-3xl')} name='leaf'/>
          <Text style={tailwind('mx-2 text-2xl text-gray-100 tracking-wider')}>I AM A THERAPIST</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
