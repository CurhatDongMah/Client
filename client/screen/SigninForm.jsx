import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, Button } from 'react-native'
import tailwind from 'tailwind-rn'


export default function SigninForm({ navigation }) {
  const [name, setName] = useState()
  const [level, setLevel] = useState('client')
  const [error, setError] = useState()
  // const dispatch = useDispatch()
  const handleChange = (text) => {
    setName(text)
    setError('')
  }
  const handleSubmit = () => {
    navigation.navigate('ClientPage')
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center')}>
      <Text style={tailwind('text-center text-3xl text-green-500 font-bold')}>Welcome To</Text>
      <Text style={tailwind('text-center text-3xl text-green-500 font-bold my-2')}>Curhat Dong Mah</Text>
      <TextInput
        onChangeText={ handleChange }
        style={tailwind('w-80 mt-12 text-center content-center py-2 bg-white text-xl text-gray-600 border-2 border-green-500 rounded-xl')}
        value={name}
        placeholder="Insert your name"
      ></TextInput>
      <TextInput
        onChangeText={ handleChange }
        style={tailwind('w-80 mt-12 text-center content-center py-2 bg-white text-xl text-gray-600 border-2 border-green-500 rounded-xl')}
        value={name}
        placeholder="Insert your name"
      ></TextInput>
      {
        error ? <Text style={tailwind('text-sm text-red-400')}>{ error }</Text> : <Text></Text>
      }
      <View style={tailwind('items-center mt-2')}>
        <View style={tailwind('flex-row w-80 justify-center')}>
          {
            level === 'client' ? (
              <TouchableOpacity
                style={tailwind('w-1/3 items-center py-1 rounded-l-xl bg-green-500 border-2 border-r border-green-500')}>
                <Text 
                  style={tailwind('text-xl text-gray-100')}
                >Client</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setLevel('client')}
                style={tailwind('w-1/3 items-center py-1 rounded-l-xl bg-gray-100 border-2 border-r border-green-500')}>
                <Text 
                  style={tailwind('text-xl text-green-500')}
                >Client</Text>
              </TouchableOpacity>
            )
          }
          {
            level === 'therapist' ? (
              <TouchableOpacity
                style={tailwind('w-1/3 items-center py-1 rounded-r-xl bg-green-500 border-2 border-l border-green-500')}>
                <Text 
                  style={tailwind('text-xl text-gray-100')}
                >Therapist</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setLevel('therapist')}
                style={tailwind('w-1/3 items-center py-1 rounded-r-xl bg-gray-100 border-2 border-l border-green-500')}>
                <Text 
                  style={tailwind('text-xl text-green-500')}
                >Therapist</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
        <TouchableOpacity
          onPress={() => handleSubmit()} 
          style={tailwind('w-80 items-center py-3 mt-8 rounded-full bg-green-500 border-2 border-green-500')}>
          <Text 
            style={tailwind('text-xl text-gray-100')}
          >Sign in</Text>
        </TouchableOpacity>
      <Text 
        onPress={() => navigation.navigate('Confirm')}
        style={tailwind('my-8 text-green-500')}
      >Dont have an account?, Sign up</Text>
    </SafeAreaView>
  )
}

