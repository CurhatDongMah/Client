import React from 'react'
import { Image, SafeAreaView } from 'react-native'
import spinner from '../assets/loading.gif'
import tailwind from 'tailwind-rn'

export default function Spinner() {
  return (
    <SafeAreaView style={tailwind('flex justify-center items-center')}>
      <Image 
        style={tailwind('w-24 h-24')}
        source={{
          uri: spinner
        }}
      />
    </SafeAreaView>
  )
}
