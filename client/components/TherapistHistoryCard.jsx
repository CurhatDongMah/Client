import React, { useState, useEffect, useCallback } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import tailwind from 'tailwind-rn';
import twoDigitFormat from '../helpers/twoDigitFormat';

export default function ListHistory({ navigation, history, handleChat }) {
  const widthWindow = useWindowDimensions().width
  return (
    <View key={history.id} style={{ width: widthWindow * 9 / 10 }}>
    <View style={tailwind('flex flex-row my-2 rounded-xl py-2 bg-gray-100 justify-start')}>
      <View style={tailwind('px-5 flex items-center justify-center')}>
        <Image 
          style={tailwind('w-12 h-12 rounded-full')}
          source={{
            uri: history.Client.photoUrl
          }}
        />
      </View>
      <View style={tailwind('flex items-start justify-center px-2')}>
        <Text 
          numberOfLines={1}
          ellipsizeMode='clip'
          style={tailwind('w-24 text-lg text-gray-500')}>{history.Client.fullName}</Text>
        <Text style={tailwind('text-gray-400 text-base')}>{history.Client.city}</Text>
        <TouchableOpacity
          onPress={() => handleChat()} 
          style={tailwind('items-center my-1 px-6 rounded border border-r border-green-400')}>
          <Text 
            style={tailwind('text-green-400')}
          >Chat</Text>
        </TouchableOpacity>
      </View>
      <View style={tailwind('mx-2 border-l border-gray-200 px-3 flex justify-center')}>
        <Text style={tailwind('text-gray-500 text-base')}>Date: { `${twoDigitFormat(new Date(history.createdAt).getDate())}/${twoDigitFormat(new Date(history.createdAt).getMonth()+1)}/${new Date(history.createdAt).getFullYear()}`}</Text>
        <Text style={tailwind('text-gray-500 text-base')}>Start at: { `${twoDigitFormat(new Date(history.createdAt).getHours())} : ${twoDigitFormat(new Date(history.createdAt).getMinutes())}`}</Text>
        <Text style={tailwind('text-gray-500 text-base')}>Duration: { history.totalHour } Hour</Text>
      </View>
    </View>
  </View>
  )
}
