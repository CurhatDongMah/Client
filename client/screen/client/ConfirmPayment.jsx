import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function ConfirmPayment({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const { therapistDetail, order } = useSelector(state => state.client)
  console.log(therapistDetail, 'di detail');
  console.log(order, 'ini order');
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
      <View style={tailwind('flex items-center')}>
        <Image 
          style={tailwind('w-24 h-24 rounded-full')}
          source={{
            uri: 'https://placeimg.com/140/140/any'
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
        <Text style={tailwind('text-2xl my-2')}>Total: IDR {order.totalPrice}</Text>
        <Text style={tailwind('text-2xl my-2')}>Duration: {order.totalHour} Hour</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Payment')}
          style={tailwind('items-center my-3 py-1 px-10 rounded-full bg-green-400')}>
          <Text 
            style={tailwind('text-base text-gray-100')}
          >Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => navigation.navigate('Payment')} delete order
          style={tailwind('items-center my-3 py-1 px-10 rounded-full bg-red-400')}>
          <Text 
            style={tailwind('text-base text-gray-100')}
          >Cancel</Text>
        </TouchableOpacity>
      </View>
  </SafeAreaView>
  )
}
