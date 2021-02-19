import React from 'react'
import { SafeAreaView, Text, View, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function Detail() {
  return (
    <SafeAreaView style={tailwind('flex-1 items-center')}>
      <Text>Ini Detail</Text>
    </SafeAreaView>
  )
}
