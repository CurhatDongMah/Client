import React from 'react'
import { useSelector } from 'react-redux'
import { Text, View, SafeAreaView, useWindowDimensions, Image, ActivityIndicator  } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import tailwind from 'tailwind-rn'
import { ScrollView } from 'react-native-gesture-handler';
import getAge from '../../helpers/getAge';
import curencyFormat from '../../helpers/curencyFormat';


export default function Logout({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const { therapist, loading, error} = useSelector(state => state.therapist)

  if (error) {
    return (
      <View style={tailwind('flex-1 justify-center items-center bg-white')}>
        <Image 
          style={tailwind('w-full h-80')}
          source={require('../../assets/error.png')}
        />
        <Text style={tailwind('py-2 text-lg text-gray-400 font-bold tracking-wider')}>Oppss, something error...</Text>
      </View>
    )
  } else if (loading) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color="34D399" size="large" />
      </View>
    )
  } else {
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
                uri: therapist.photoUrl
              }}
            />
          </View>
          <View style={tailwind('flex items-start justify-center px-6')}>
            <Text style={tailwind('text-2xl text-gray-600')}>{ therapist.fullName }</Text>
            <Text 
              onPress={() => navigation.navigate('TherapistEdit')}
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
            >{therapist.email}</Text>
          </View>
          <View style={tailwind('mt-2')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Age</Text>
            <Text 
              style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
            >{getAge(therapist.birthDate)}</Text>
          </View>
          <View style={tailwind('mt-5')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Gender</Text>
            <Text 
              style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
            >{therapist.gender}</Text>
          </View>
          <View style={tailwind('mt-5')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>City</Text>
            <Text 
              style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
            >{therapist.city}</Text>
          </View>
          <View style={tailwind('mt-5')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Price per Hour</Text>
            <Text 
              style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
            >{curencyFormat(therapist.price)}</Text>
          </View>
          <View style={tailwind('mt-5')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>About</Text>
            <Text 
              style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
            >{therapist.about}</Text>
          </View>
          <View style={tailwind('mt-5')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>License</Text>
            <Image 
              style={tailwind('w-full h-80')}
              source={{
                uri: therapist.licenseUrl
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    )
  }


}
