import React from 'react'
import { SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function Success({ navigation }) {
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
      <View style={tailwind('p-6 bg-green-500 rounded-full')}>
        <Ionicons style={tailwind('mx-1 text-gray-100 text-4xl font-bold')} name='checkmark'/>
      </View>
      <Text style={tailwind('my-5 text-3xl')}>Your booking is completed</Text>
      <Text style={tailwind('text-lg text-gray-400 text-center w-80')}>Your request sent to the psychologist you can contact with consultant according date and time</Text>
      <Text 
        onPress={() => navigation.navigate('Profile')}
        style={tailwind('my-5 text-green-400 text-xl')}
      >Back to Home</Text>
    </SafeAreaView>
  )
}
