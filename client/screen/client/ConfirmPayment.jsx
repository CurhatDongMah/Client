import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import tailwind from 'tailwind-rn';
import curencyFormat from '../../helpers/curencyFormat'
import { deleteOrder } from '../../store/actions/client'

export default function ConfirmPayment({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const { therapistDetail, order, loadingClient } = useSelector(state => state.client)
  const dispatch = useDispatch()
  console.log(therapistDetail, 'di detail');
  console.log(order, 'ini order');
  const handleDelete = async () => {
    await dispatch(deleteOrder(order.id))
    navigation.navigate('Profile')
  }
  if (loadingClient) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color="34D399" size="large" />
      </View>
    )
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
      <View style={{ width: widthWindow * 9 /10}}>
        <View style={tailwind('border border-gray-400 p-4 py-6 rounded')}>
          <Text style={tailwind('text-2xl my-2 text-gray-600 text-center')}>ORDER DETAIL</Text>
          <View style={tailwind('')}>
          <View style={tailwind('mt-5')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Therapist</Text>
            <Text 
              style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
            >{ therapistDetail.fullName }</Text>
          </View>
          <View style={tailwind('mt-5')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Date</Text>
            <Text 
              style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
            >{ `${new Date(order.createdAt).getDate()}/${new Date(order.createdAt).getMonth()+1}/${new Date(order.createdAt).getFullYear()}`}</Text>
          </View>
          <View style={tailwind('mt-5')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Start at</Text>
            <Text 
              style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
            >{ `${new Date(order.createdAt).getHours()}:${new Date(order.createdAt).getMinutes()}`}</Text>
          </View>
          <View style={tailwind('mt-5')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Duration</Text>
            <Text 
              style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
            >{ order.totalHour } Hour</Text>
          </View>
          <View style={tailwind('mt-5')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Total</Text>
            <Text 
              style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
            >{ curencyFormat(order.totalPrice) }</Text>
          </View>
          </View>
          <View style={tailwind('flex flex-row justify-between mt-4')}>
            <TouchableOpacity
              onPress={handleDelete} delete order
              style={tailwind('items-center my-3 py-1 px-10 rounded-full border border-red-400')}>
              <Text 
                style={tailwind('text-base text-red-400')}
              >Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Payment')}
              style={tailwind('items-center my-3 py-1 px-10 rounded-full bg-green-400')}>
              <Text 
                style={tailwind('text-base text-gray-100')}
              >Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View style={tailwind('flex items-center')}>
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
      </View> */}
  </SafeAreaView>
  )
}
