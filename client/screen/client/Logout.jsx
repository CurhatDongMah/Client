import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import tailwind from 'tailwind-rn'

export default function Logout({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={async () => {
          await SecureStore.deleteItemAsync('access_token')
          navigation.navigate('Signin')
        }} 
        style={tailwind('w-80 items-center py-3 mt-8 rounded-full bg-red-400')}>
        <Text 
          style={tailwind('text-xl text-gray-100 tracking-wider')}
        >LOGOUT</Text>
      </TouchableOpacity>
    </View>
  )
}
