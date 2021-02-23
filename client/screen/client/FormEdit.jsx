import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import tailwind from 'tailwind-rn'
import { Datepicker } from '@ui-kitten/components'
import { Radio, RadioGroup} from '@ui-kitten/components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { editClient } from '../../store/actions/client'

export default function EditForm({ navigation }) {
  const { temporaryClient } = useSelector(state => state.client)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [birthDate, setBirthDate] = useState(new Date(temporaryClient.birthDate))
  const [value, setValue] = useState({
    fullName: temporaryClient.fullName,
    photoUrl: temporaryClient.photoUrl,
    city: temporaryClient.city,
    birthDate
  })
  const [error, setError] = useState({})
  const dispatch = useDispatch()
  const widthWindow = useWindowDimensions().width
  const now = new Date()
  useEffect(() => {
    if (temporaryClient.gender === 'female') setSelectedIndex(0)
    else setSelectedIndex(1)
  }, [])
  useEffect(() => {
    setValue({...value, birthDate: birthDate})
  }, [birthDate])
  useEffect(() => {
    selectedIndex === 1 ? setValue({...value, gender: 'male'}) : setValue({...value, gender: 'female'})
  }, [selectedIndex])

  const handleChange = (text, name) => {
    setError({})
    setValue({ ...value, [name]: text})
  }
  const handleSubmit = () => {
    if (!value.fullName) setError({...error, fullName: 'Required'})
    else if (!value.photoUrl) setError({...error, photoUrl: 'Required'})
    else if (!value.birthDate) setError({...error, birthDate: 'Required'})
    else if (!value.city) setError({...error, city: 'Required'})
    // else console.log(value, 'edit profile');
    else {
      dispatch(editClient(value, temporaryClient.id))
      navigation.navigate('Profile')
    }
  }
  console.log(temporaryClient, 'di form edit');
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ width: widthWindow * 8 / 10, marginTop: 40}}
      >
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>FULL NAME</Text>
          <TextInput
            value={value.fullName}
            onChangeText={(text) => handleChange(text, 'fullName')}
            style={tailwind('px-3 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
          {
            error.fullName ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.fullName}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>PHOTO URL</Text>
          <TextInput
            value={value.photoUrl}
            onChangeText={(text) => handleChange(text, 'photoUrl')}
            style={tailwind('px-3 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
          {
            error.photoUrl ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.photoUrl}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>BIRTH DATE</Text>
          <Datepicker
            min={new Date(now.getFullYear(), now.getMonth(), now.getDate() - 36000)}
            max={now}
            date={birthDate}
            onSelect={nextDate => setBirthDate(nextDate)}
          />
          {
            error.birthDate ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.birthDate}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>CITY</Text>
          <TextInput
            value={value.city}
            onChangeText={(text) => handleChange(text, 'city')}
            style={tailwind('px-3 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
          {
            error.city ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.city}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => setSelectedIndex(index)}>
          <Radio status='success'>Female</Radio>
          <Radio status='success'>Male</Radio>
        </RadioGroup>
        <TouchableOpacity
          onPress={() => handleSubmit()} 
          style={tailwind('items-center py-3 mt-8 rounded-full bg-green-400')}>
          <Text 
            style={tailwind('text-xl text-gray-100')}
          >EDIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
