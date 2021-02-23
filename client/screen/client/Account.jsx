import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
  Image,
  ActivityIndicator
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import tailwind from 'tailwind-rn'
import * as SecureStore from 'expo-secure-store';
import getAge from '../../helpers/getAge'

export default function Account({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const { client, loading: loadingClient, error: errorClient } = useSelector(state => state.client)
  if (loadingClient) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color="34D399" size="large" />
      </View>
    )
  }
  if (errorClient) {
    return (
      <View style={tailwind('flex-1 justify-center items-center bg-white')}>
        <Image 
          style={tailwind('w-full h-80')}
          source={require('../../assets/error.png')}
        />
        <Text style={tailwind('py-2 text-lg text-gray-400 font-bold tracking-wider')}>Oppss, something error...</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{ width: widthWindow * 9 / 10}}
    >
      <View style={tailwind('flex flex-row pt-16 pb-8 w-full justify-start border-b-2 border-green-400')}>
        <View>
          <Image 
            style={tailwind('w-20 h-20 rounded-full')}
            source={{
              uri: client.photoUrl
            }}
          />
        </View>
        <View style={tailwind('flex items-start justify-center px-6')}>
          <Text style={tailwind('text-2xl text-gray-600')}>{ client.fullName }</Text>
          <Text 
            onPress={() => navigation.navigate('ClientEdit')}
            style={tailwind('text-green-400 text-base')}
          >Edit Profile</Text>
          <Text 
            onPress={async () => {
              await SecureStore.deleteItemAsync('access_token')
              navigation.navigate('Signin')
            }} 
            style={tailwind('text-red-400 text-base mt-2')}
          >Logout</Text>
        </View>
      </View>
      <View style={tailwind('mt-5')}>
        <View style={tailwind('mt-2')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Email</Text>
          <Text 
            style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
          >{client.email}</Text>
        </View>
        <View style={tailwind('mt-2')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Age</Text>
          <Text 
            style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
          >{getAge(client.birthDate)}</Text>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Gender</Text>
          <Text 
            style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
          >{client.gender}</Text>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>City</Text>
          <Text 
            style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
          >{client.city}</Text>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}
