import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import tailwind from 'tailwind-rn';
import curencyFormat from '../helpers/curencyFormat'
import twoDigitFormat from '../helpers/twoDigitFormat'

export default function ConfirmPayment({ navigation, therapistDetail, order, handleDelete, handlePayment }) {
  const widthWindow = useWindowDimensions().width 
  return (
    <View style={{ width: widthWindow * 9 /10}}>
      <View style={tailwind('border-2 border-green-400 p-4 py-6 rounded-lg')}>
        <Text style={tailwind('text-2xl my-2 text-gray-600 text-center')}>ORDER DETAIL</Text>
        <View style={tailwind('')}>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Therapist</Text>
          <Text 
            style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
          >{ therapistDetail.fullName }</Text>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Date</Text>
          <Text 
            style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
          >{ `${twoDigitFormat(new Date(order.createdAt).getDate())}/${twoDigitFormat(new Date(order.createdAt).getMonth()+1)}/${new Date(order.createdAt).getFullYear()}`}</Text>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Start at</Text>
          <Text 
            style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
          >{ `${twoDigitFormat(new Date(order.createdAt).getHours())}:${twoDigitFormat(new Date(order.createdAt).getMinutes())}`}</Text>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Duration</Text>
          <Text 
            style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
          >{ order.totalHour } Hour</Text>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Total</Text>
          <Text 
            style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
          >{ curencyFormat(order.totalPrice) }</Text>
        </View>
        </View>
        <View style={tailwind('flex flex-row justify-between mt-4')}>
          <TouchableOpacity
            onPress={() => handleDelete()} delete order
            style={tailwind('items-center my-3 py-1 px-10 rounded-full border border-red-400')}>
            <Text 
              style={tailwind('text-lg text-red-400')}
            >Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePayment()}
            style={tailwind('items-center my-3 py-1 px-10 rounded-full bg-green-400')}>
            <Text 
              style={tailwind('text-lg text-gray-100')}
            >Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
