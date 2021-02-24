import React, {  useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import tailwind from 'tailwind-rn'
import { ScrollView } from 'react-native-gesture-handler';
import getAge from '../../helpers/getAge';
import curencyFormat from '../../helpers/curencyFormat'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FancyAlert } from 'react-native-expo-fancy-alerts'
import { handleLogoutTherapist, handleLogoutTherpaist } from '../../store/actions/therapist'


export default function Profile({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const { therapist, loading, error} = useSelector(state => state.therapist)
  const dispatch = useDispatch()

  // fancy allert
  const [visible, setVisible] = useState(false);
  const toggleAlert = useCallback(() => {
    setVisible(!visible);
  }, [visible])

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
        <View style={tailwind('flex flex-row px-10 pt-16 pb-6 w-full justify-start border-b-2 border-green-400 relative')}>
          <View>
            <Image 
              style={tailwind('w-16 h-16 rounded-full')}
              source={{
                uri: therapist.photoUrl
              }}
            />
          </View>
          <View style={tailwind('flex items-start justify-center px-6')}>
            <Text style={tailwind('text-2xl text-gray-600')}>{ therapist.fullName }</Text>
            <View style={tailwind('flex flex-row items-center justify-center')}>
              <Ionicons style={tailwind('text-green-400 text-xl')} name='people'/>
              <Text 
              onPress={() => navigation.navigate('TherapistEdit')}
              style={tailwind('text-green-400 text-lg ml-1')}
            >Edit Profile</Text>
            </View>
          </View>
          <Ionicons 
            onPress={async () => {
              toggleAlert()
            }} 
            style={tailwind('absolute top-14 right-4 text-red-400 text-3xl')} name='power-sharp'
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
              >{therapist.email}</Text>
            </View>
            <View style={tailwind('mt-2')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Age</Text>
              <Text 
                style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
              >{getAge(therapist.birthDate)}</Text>
            </View>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Gender</Text>
              <Text 
                style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
              >{therapist.gender}</Text>
            </View>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>City</Text>
              <Text 
                style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
              >{therapist.city}</Text>
            </View>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Price per Hour</Text>
              <Text 
                style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
              >{curencyFormat(therapist.price)}</Text>
            </View>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>About</Text>
              <Text 
                style={tailwind('py-2 text-lg text-gray-500 border-b border-gray-100')}
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
                  dispatch(handleLogoutTherapist())
                  toggleAlert()
                  navigation.navigate('Signin')
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
}
