import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import tailwind from 'tailwind-rn';
import twoDigitFormat from '../helpers/twoDigitFormat'

export default function Profile({ navigation, onGoingOrders, handleChat, handleCompleted }) {
  const widthWindow = useWindowDimensions().width
  return (
    <View style={{ width: widthWindow * 9 / 10 }}>
      <View style={tailwind('border-b border-gray-300 pb-2')}>
        <Text style={tailwind('py-2 text-lg text-gray-600 tracking-wider')}>ON GOING ORDER</Text>
        <View style={tailwind('flex flex-row mt-2 rounded-xl py-4 bg-green-100 justify-start')}>
          <View style={tailwind('px-5 flex items-center justify-center')}>
            <Image 
              style={tailwind('w-12 h-12 rounded-full')}
              source={{
                uri: onGoingOrders[0].Therapist.photoUrl
              }}
            />
          </View>
          <View style={tailwind('flex items-start justify-center')}>
            <Text 
              numberOfLines={1}
              ellipsizeMode='clip'
              style={tailwind('w-32 text-lg text-gray-600')}>{ onGoingOrders[0].Therapist.fullName }</Text>
            <View style={tailwind('flex flex-row')}>
              <Text style={tailwind('text-gray-400 text-base')}>Date: </Text>
              <Text 
                style={tailwind('text-gray-500 text-base')}
              >{ `${twoDigitFormat(new Date(onGoingOrders[0].createdAt).getDate())}/${twoDigitFormat(new Date(onGoingOrders[0].createdAt).getMonth()+1)}/${new Date(onGoingOrders[0].createdAt).getFullYear()}`}</Text>
            </View>
            <View style={tailwind('flex flex-row')}>
              <Text style={tailwind('text-gray-400 text-base')}>Start at: </Text>
              <Text 
                style={tailwind('text-gray-500 text-base')}
              >{ `${twoDigitFormat(new Date(onGoingOrders[0].createdAt).getHours())}:${twoDigitFormat(new Date(onGoingOrders[0].createdAt).getMinutes())}`}</Text>
            </View>
            <View style={tailwind('flex flex-row')}>
              <Text style={tailwind('text-gray-400 text-base')}>Duration: </Text>
              <Text style={tailwind('text-gray-500 text-base')}>{ onGoingOrders[0].totalHour } Hour</Text>
            </View>
          </View>
          <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
            <TouchableOpacity
              onPress={() => handleCompleted(onGoingOrders[0].id)}
              style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-gray-100 border border-r border-green-400')}>
              <Text 
                style={tailwind('text-green-400 text-base')}
              >Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChat()} 
              style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-green-400 border border-r border-green-400')}>
              <Text 
                style={tailwind('text-gray-100 text-base')}
              >Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
