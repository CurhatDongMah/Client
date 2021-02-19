import React from 'react'
import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function Detail({ navigation }) {
  const widthWindow = useWindowDimensions().width
  return (
    <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
        <View style={tailwind('mt-16')}>
          <View style={tailwind('flex items-center')}>
            <Image 
              style={tailwind('w-24 h-24 rounded-full')}
              source={{
                uri: 'https://picsum.photos/id/237/200/300'
              }}
            />
            <Text style={tailwind('text-2xl my-2')}>John Doe</Text>
            <View style={tailwind('flex flex-row items-center')}>
              <Ionicons style={tailwind('mx-1 text-yellow-500 text-base')} name='star'/>
              <Ionicons style={tailwind('mx-1 text-yellow-500 text-base')} name='star'/>
              <Ionicons style={tailwind('mx-1 text-yellow-500 text-base')} name='star'/>
              <Ionicons style={tailwind('mx-1 text-yellow-500 text-base')} name='star'/>
              <Ionicons style={tailwind('mx-1 text-yellow-500 text-base')} name='star'/>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Payment')}
              style={tailwind('items-center my-3 py-1 px-10 rounded-full bg-green-400')}>
              <Text 
                style={tailwind('text-base text-gray-100')}
              >Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: widthWindow * 8 /10}}>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Age</Text>
              <Text 
                style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
              >45 year old</Text>
            </View>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Gender</Text>
              <Text 
                style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
              >Female</Text>
            </View>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>City</Text>
              <Text 
                style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
              >Jakarta</Text>
            </View>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>About</Text>
              <Text 
                style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
              >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</Text>
            </View>
          </View>
      </ScrollView>
  </SafeAreaView>
  )
}
