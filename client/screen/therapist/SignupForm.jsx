import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, Button } from 'react-native'
import tailwind from 'tailwind-rn'


export default function SignupForm({ navigation }) {
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
    // if (name) {
    //   dispatch(setPlayer({
    //     name,
    //     level
    //   }))
    //   setName('')
    //   setLevel('easy')
    //   navigation.navigate('Game')
    // } else {
    //   setError('are you an alien?, please insert your name')
    // }
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center')}>
      <TextInput
        onChangeText={ handleChange }
        style={tailwind('w-80 my-3 text-center content-center py-2 bg-white text-xl text-gray-600 border-2 border-green-500 rounded-xl')}
        placeholder="Username"
      ></TextInput>
      <TextInput
        onChangeText={ handleChange }
        style={tailwind('w-80 my-3 text-center content-center py-2 bg-white text-xl text-gray-600 border-2 border-green-500 rounded-xl')}
        placeholder="Email"
      ></TextInput>
      <TextInput
        onChangeText={ handleChange }
        style={tailwind('w-80 my-3 text-center content-center py-2 bg-white text-xl text-gray-600 border-2 border-green-500 rounded-xl')}
        placeholder="Password"
      ></TextInput>
      <TextInput
        onChangeText={ handleChange }
        style={tailwind('w-80 my-3 text-center content-center py-2 bg-white text-xl text-gray-600 border-2 border-green-500 rounded-xl')}
        placeholder="Photo Url"
      ></TextInput>
      <TextInput
        onChangeText={ handleChange }
        style={tailwind('w-80 my-3 text-center content-center py-2 bg-white text-xl text-gray-600 border-2 border-green-500 rounded-xl')}
        placeholder="Birthdate"
      ></TextInput>
      <TextInput
        onChangeText={ handleChange }
        style={tailwind('w-80 my-3 text-center content-center py-2 bg-white text-xl text-gray-600 border-2 border-green-500 rounded-xl')}
        placeholder="City"
      ></TextInput>
      <View style={tailwind('items-center mt-2')}>
        <View style={tailwind('flex-row w-80 justify-center')}>
          {
            level === 'client' ? (
              <TouchableOpacity
                style={tailwind('w-1/3 items-center py-1 rounded-l-xl bg-green-500 border-2 border-r border-green-500')}>
                <Text 
                  style={tailwind('text-xl text-gray-100')}
                >Female</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setLevel('client')}
                style={tailwind('w-1/3 items-center py-1 rounded-l-xl bg-gray-100 border-2 border-r border-green-500')}>
                <Text 
                  style={tailwind('text-xl text-green-500')}
                >Female</Text>
              </TouchableOpacity>
            )
          }
          {
            level === 'therapist' ? (
              <TouchableOpacity
                style={tailwind('w-1/3 items-center py-1 rounded-r-xl bg-green-500 border-2 border-l border-green-500')}>
                <Text 
                  style={tailwind('text-xl text-gray-100')}
                >Male</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setLevel('therapist')}
                style={tailwind('w-1/3 items-center py-1 rounded-r-xl bg-gray-100 border-2 border-l border-green-500')}>
                <Text 
                  style={tailwind('text-xl text-green-500')}
                >Male</Text>
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
          >Sign up</Text>
        </TouchableOpacity>
      <Text 
        onPress={() => navigation.navigate('Signin')}
        style={tailwind('my-8 text-green-500')}
      >Already have an account, Sign In</Text>
    </SafeAreaView>
  )
}

