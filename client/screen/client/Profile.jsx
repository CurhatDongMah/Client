import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import tailwind from 'tailwind-rn'
import * as SecureStore from 'expo-secure-store'
import getAge from '../../helpers/getAge'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FancyAlert } from 'react-native-expo-fancy-alerts'
import { clientLogout } from '../../store/actions/client'

export default function Profile({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const { client, loading: loadingClient, error: errorClient } = useSelector(state => state.client)
  const dispatch = useDispatch()
  // fancy allert
  const [visible, setVisible] = useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible])

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
      <View style={tailwind('flex flex-row px-10 pt-14 pb-6 w-full justify-start border-b-2 border-green-400 relative')}>
        <View>
          <Image 
            style={tailwind('w-16 h-16 rounded-full')}
            source={{
              uri: client.photoUrl
            }}
          />
        </View>
        <View style={tailwind('flex items-start justify-center px-6')}>
          <Text style={tailwind('text-2xl text-gray-600')}>{ client.fullName }</Text>
          <View style={tailwind('flex flex-row items-center justify-center')}>
            <Ionicons style={tailwind('text-green-400 text-xl')} name='people'/>
            <Text 
            onPress={() => navigation.navigate('ClientEdit')}
            style={tailwind('text-green-400 text-lg ml-1')}
          >Edit Profile</Text>
          </View>
        </View>
        <Ionicons 
          onPress={async () => {
            toggleAlert()
          }} 
          style={tailwind('absolute top-14 right-8 text-red-400 text-3xl')} name='power-sharp'
        />
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ width: widthWindow * 9 / 10}}
      >
      <View style={tailwind('mt-5')}>
        <View style={tailwind('mt-2')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Email</Text>
          <Text 
            style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
          >{client.email}</Text>
        </View>
        <View style={tailwind('mt-2')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Age</Text>
          <Text 
            style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
          >{getAge(client.birthDate)}</Text>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Gender</Text>
          <Text 
            style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
          >{client.gender}</Text>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>City</Text>
          <Text 
            style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
          >{client.city}</Text>
        </View>
      </View>
      <FancyAlert
					visible={visible}
					icon={<View 
						style={tailwind('flex flex-1 justify-center items-center w-full rounded-full bg-red-500')}
					><Text style={tailwind('text-white text-2xl')}>!</Text></View>}
					style={{ backgroundColor: 'white' }}
				>
          <Text style={tailwind('mb-2 text-lg text-gray-500')}>Are you sure want to logout?</Text>
          <View style={tailwind('flex flex-row ')}>
            <TouchableOpacity
              onPress={() => {
                toggleAlert()
                dispatch(clientLogout())
              }} 
              style={tailwind('items-center my-3 py-1 px-5 mx-2 rounded-lg border border-red-500')}>
              <Text 
                style={tailwind('text-lg text-red-500')}
              >OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleAlert} 
              style={tailwind('items-center my-3 py-1 px-5 mx-2 rounded-lg border border-red-500 bg-red-500')}>
              <Text 
                style={tailwind('text-lg text-gray-100')}
              >Cancel</Text>
            </TouchableOpacity>
          </View>
        </FancyAlert>
    </ScrollView>
  </SafeAreaView>
  )
}
