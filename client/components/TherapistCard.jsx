import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';
import curencyFormat from '../helpers/curencyFormat'

export default function TherapistCard({ therapist, handleDetail, handleChat }) {
  const widthWindow = useWindowDimensions().width
  const ARR = [1,2,3,4,5]
  return (
    <View style={{ width: widthWindow * 9 / 10 }}>
      <View style={tailwind('flex flex-row mt-4 rounded-xl py-4 bg-gray-100 justify-start')}>
        <View style={tailwind('px-5 flex items-center justify-center')}>
          <Image 
            style={tailwind('w-12 h-12 rounded-full')}
            source={{
              uri: therapist.photoUrl
            }}
          />
        </View>
        <View style={tailwind('flex items-start justify-center')}>
          <Text 
            numberOfLines={1}
            ellipsizeMode='clip'
            style={tailwind('w-36 text-base text-gray-600')}>{therapist.fullName}</Text>
          <View style={tailwind('flex flex-row items-center')}>
            {
              therapist.rating ? (
                ARR.map(arr => {
                  return therapist.rating >= arr ? (
                    <Ionicons key={arr} style={tailwind('mr-1 text-yellow-400 text-base')} name='star'/>
                  ) : (
                    <Ionicons key={arr} style={tailwind('mr-1 text-gray-400 text-base')} name='star'/>
                  ) 
                })
              ) : <Text>No Review</Text>
            }
          </View>
          <View style={tailwind('flex flex-row items-center justify-center')}>
            <View style={tailwind('flex flex-row justify-center items-center')}>
              <Ionicons style={tailwind('mr-1 text-gray-400 text-base')} name='location'/>
              <Text style={tailwind('text-gray-500')}>{ therapist.city }</Text>
            </View>
            <Text style={tailwind('text-gray-500 mx-2')}> | </Text>
            <Text style={tailwind('text-gray-500 capitalize')}>{ therapist.gender }</Text>
          </View>
          <Text style={tailwind('text-yellow-400 text-base font-bold')}>{ curencyFormat(therapist.price) }/h</Text>
        </View>
        <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
          <TouchableOpacity
            onPress={() => handleDetail(therapist)}
            style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-gray-100 border border-r border-green-400')}>
            <Text 
              style={tailwind('text-green-400')}
            >Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleChat(therapist)} 
            style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-green-400 border border-r border-green-400')}>
            <Text 
              style={tailwind('text-gray-100')}
            >Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

