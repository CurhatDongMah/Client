import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import tailwind from 'tailwind-rn'
import { Datepicker } from '@ui-kitten/components'
import { Radio, RadioGroup} from '@ui-kitten/components';


export default function SignupForm({ navigation }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [date, setDate] = React.useState(new Date())
  const [name, setName] = useState()
  const [gender, setGender] = useState('female')
  const [error, setError] = useState()
  const widthWindow = useWindowDimensions().width
  // const dispatch = useDispatch()
  const handleChange = (text) => {
    setName(text)
    setError('')
  }
  const handleSubmit = () => {
    navigation.navigate('TherapistPage')
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ width: widthWindow * 8 / 10, marginTop: 40 }}
      >
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>FULL NAME</Text>
          <TextInput
            style={tailwind('text-center content-center py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>EMAIL</Text>
          <TextInput
            style={tailwind('text-center content-center py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>PASSWORD</Text>
          <TextInput
            style={tailwind('text-center content-center py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>PHOTO URL</Text>
          <TextInput
            style={tailwind('text-center content-center py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>BIRTH DATE</Text>
          <Datepicker
            date={date}
            onSelect={nextDate => setDate(nextDate)}
          />
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>CITY</Text>
          <TextInput
            style={tailwind('text-center content-center py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>LICENSE URL</Text>
          <TextInput
            style={tailwind('text-center content-center py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>PRICE</Text>
          <TextInput
            style={tailwind('text-center content-center py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>ABOUT</Text>
          <TextInput
            style={tailwind('text-center content-center py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
        </View>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => setSelectedIndex(index)}>
          <Radio status='success' style={tailwind('text-2xl')}>Female</Radio>
          <Radio status='success'>Male</Radio>
        </RadioGroup>
          <TouchableOpacity
            onPress={() => handleSubmit()} 
            style={tailwind('items-center py-3 mt-8 rounded-full bg-green-400')}>
            <Text 
              style={tailwind('text-xl text-gray-100')}
            >SIGN UP</Text>
          </TouchableOpacity>
          <Text 
            onPress={() => navigation.navigate('Signin')}
            style={tailwind('my-5 text-gray-300 text-lg')}
          >Already have an account?, Sign in</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

