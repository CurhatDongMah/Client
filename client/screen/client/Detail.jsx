import React from 'react'
import { SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function Detail({ navigation }) {
  return (
    <SafeAreaView style={tailwind('flex-1 items-center')}>
    <View style={tailwind('flex flex-row py-8 bg-white w-full justify-center')}>
      <View>
        <Image 
          style={tailwind('w-20 h-20 rounded-full')}
          source={{
            uri: 'https://picsum.photos/id/237/200/300'
          }}
        />
      </View>
      <View style={tailwind('flex items-center justify-center px-10')}>
        <Text style={tailwind('text-2xl')}>John Doe</Text>
        <View style={tailwind('flex flex-row items-center')}>
          <Ionicons name='star' color='yellow'/>
          <Ionicons name='star' color='yellow'/>
          <Ionicons name='star' color='yellow'/>
          <Ionicons name='star' color='yellow'/>
          <Ionicons name='star' color='yellow'/>
        </View>
        <Text style={tailwind('text-lg text-gray-400')}>Male</Text>
        <Text style={tailwind('text-lg text-gray-400')}>IDR 100.000/h</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Payment')}
          style={tailwind('items-center py-1 px-10 rounded-full bg-green-500 border-2 border-green-500')}>
          <Text 
            style={tailwind('text-xl text-gray-100')}
          >Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={tailwind('self-start p-10 text-xl')}>
      <Text>Licensed: </Text>
      <View>
        <Text>Baladaskjddsdsakdsa</Text>
      </View>
      <Text>About</Text>
    </View>
  </SafeAreaView>
  )
}
