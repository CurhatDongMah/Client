import React, { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import tailwind from 'tailwind-rn';
import twoDigitFormat from '../helpers/twoDigitFormat'

export default function ListHistory({ navigation, history, handleDetail, handleReview }) {
  const widthWindow = useWindowDimensions().width
  return (
      <View style={{ width: widthWindow * 9 / 10 }}>
        <View style={tailwind('flex flex-row my-2 rounded-xl py-4 bg-gray-100 justify-start')}>
          <View style={tailwind('px-5 flex items-center justify-center')}>
            <Image 
              style={tailwind('w-14 h-14 rounded-full')}
              source={{
                uri: history.Therapist.photoUrl
              }}
            />
          </View>
          <View style={tailwind('flex items-start justify-center')}>
            <Text 
              numberOfLines={1}
              ellipsizeMode='clip'
              style={tailwind('w-32 text-lg text-gray-600')}>{ history.Therapist.fullName }</Text>
            <Text style={tailwind('text-gray-500 text-base')}>Date: { `${twoDigitFormat(new Date(history.createdAt).getDate())}/${twoDigitFormat(new Date(history.createdAt).getMonth()+1)}/${new Date(history.createdAt).getFullYear()}`}</Text>  
            <Text style={tailwind('text-gray-500 text-base')}>Start at: { `${twoDigitFormat(new Date(history.createdAt).getHours())} : ${twoDigitFormat(new Date(history.createdAt).getMinutes())}`}</Text>
            <Text style={tailwind('text-gray-500 text-base')}>Duration: { history.totalHour } Hour</Text>
          </View>
          <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
            <TouchableOpacity
              onPress={() => handleDetail(history.Therapist)}
              style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-green-400')}>
              <Text 
                style={tailwind('text-gray-100 text-base')}
              >Reorder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleReview()}
              style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-gray-100 border border-r border-green-400')}>
              <Text 
                style={tailwind('text-green-400 text-base')}
              >Add Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  )
}
