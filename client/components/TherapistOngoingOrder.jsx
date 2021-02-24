import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import tailwind from 'tailwind-rn'
import curencyFormat from '../helpers/curencyFormat'
import twoDigitFormat from '../helpers/twoDigitFormat'

export default function Detail({ navigation, onGoingOrdersTherapist, handleCompleted, handleChat }) {
  const widthWindow = useWindowDimensions().width
  return (
    <View style={{ width: widthWindow * 9 / 10 }}>
      <Text style={tailwind('text-xl text-gray-400 text-center tracking-wider py-2')}>ON GOING</Text>
      <View style={tailwind('border-2 border-green-400 px-5 py-2 rounded-lg my-2')}>
        <View style={tailwind('flex flex-row items-center justify-start border-b pb-3 border-gray-300')}>
          <Image 
            style={tailwind('w-12 h-12 rounded-full')}
            source={{
              uri: onGoingOrdersTherapist[0].Client.photoUrl
            }}
          />
          <View style={tailwind('flex items-start justify-center px-6')}>
            <Text style={tailwind('text-xl text-gray-600')}>{ onGoingOrdersTherapist[0].Client.fullName }</Text>
            <View style={tailwind('flex flex-row')}>
              <View style={tailwind('flex flex-row')}>
                <Ionicons style={tailwind('mr-1 text-gray-400 text-lg')} name='location'/>
                <Text style={tailwind('text-lg text-gray-500')}>{ onGoingOrdersTherapist[0].Client.city }</Text>
              </View>
              <Text style={tailwind('text-lg text-gray-200 mx-1')}> | </Text>
              <Text style={tailwind('text-lg text-gray-500 capitalize')}>{ onGoingOrdersTherapist[0].Client.gender }</Text>
            </View>
          </View>
        </View>
        <View style={tailwind('')}>
          <View style={tailwind('mt-2')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Date</Text>
            <Text 
              style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
            >{ `${twoDigitFormat(new Date(onGoingOrdersTherapist[0].createdAt).getDate())}/${twoDigitFormat(new Date(onGoingOrdersTherapist[0].createdAt).getMonth()+1)}/${new Date(onGoingOrdersTherapist[0].createdAt).getFullYear()}`}</Text>
          </View>
          <View style={tailwind('mt-2')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Start at</Text>
            <Text 
              style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
            >{ `${twoDigitFormat(new Date(onGoingOrdersTherapist[0].createdAt).getHours())}:${twoDigitFormat(new Date(onGoingOrdersTherapist[0].createdAt).getMinutes())}`}</Text>
          </View>
          <View style={tailwind('mt-2')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Duration</Text>
            <Text 
              style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
            >{ onGoingOrdersTherapist[0].totalHour } Hour</Text>
          </View>
          <View style={tailwind('mt-2')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Total</Text>
            <Text 
              style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
            >{ curencyFormat(onGoingOrdersTherapist[0].totalPrice) }</Text>
          </View>
        </View>
        <View style={tailwind('flex flex-row justify-between mt-4')}>
          <TouchableOpacity
            onPress={() => handleCompleted(onGoingOrdersTherapist[0].id)}
            style={tailwind('items-center my-3 py-1 px-10 rounded-lg border border-green-400')}>
            <Text 
              style={tailwind('text-lg text-green-400')}
            >Complete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleChat()} 
            style={tailwind('items-center my-3 py-1 px-10 rounded-lg bg-green-400')}>
            <Text 
              style={tailwind('text-lg text-gray-100')}
            >Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

