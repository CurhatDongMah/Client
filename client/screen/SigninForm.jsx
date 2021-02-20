import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, useWindowDimensions } from 'react-native'
import tailwind from 'tailwind-rn'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CheckBox } from '@ui-kitten/components';
import { clientLogin } from '../store/actions/client'
import * as SecureStore from 'expo-secure-store';
import { validate } from 'validate.js'
import constraints from '../helpers/constraints'

export default function SigninForm({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({})
  const dispatch = useDispatch()
  const handleChange = (text, name) => {
    setError({})
    setValue({ ...value, [name]: text})
  }
  const handleSubmit = async () => {
    const validateEmail = validate({ emailAddress: value.email }, constraints)
    if (!value.email) setError({...error, email: 'Email must be filled'})
    else if (validateEmail) setError({...error, email: validateEmail.emailAddress[0]})
    else if (!value.password) setError({...error, password: 'Password must be filled'})
    else {
      if (checked) {
        console.log('therapist')
        // if (checked) navigation.navigate('TherapistPage')
      } else {
        await dispatch(clientLogin(value))
        const token = await SecureStore.getItemAsync('access_token')
        if (token) {
          console.log(token, 'login token')
          navigation.navigate('ClientPage')
          setValue({})
        }
      }
    }
  }

  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
      <Ionicons style={tailwind('mx-2 text-green-400 text-4xl')} name='leaf'/>
      <Text style={tailwind('text-center text-3xl text-green-400 font-bold my-2')}>Curhat Dong Mah</Text>
      <View style={{ width: widthWindow * 8 / 10}}>
        <View style={tailwind('mt-5')}>
          <View style={tailwind('flex flex-row items-center')}>
            <Ionicons style={tailwind('mx-1 text-gray-400 text-lg')} name='person'/>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>EMAIL</Text>
          </View>
          <TextInput
            onChangeText={(text) => handleChange(text, 'email')}
            style={tailwind('px-2 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
            value={value.email}
            name='email'
          ></TextInput>
          {
            error.email ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.email}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <View style={tailwind('mt-5')}>
          <View style={tailwind('flex flex-row items-center')}>
            <Ionicons style={tailwind('mx-1 text-gray-400 text-lg')} name='lock-closed'/>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>PASSWORD</Text>
          </View>
          <TextInput
            onChangeText={(text) => handleChange(text, 'password')}
            style={tailwind('px-2 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
            value={value.password}
            name='password'
            secureTextEntry={true}
          ></TextInput>
          {
            error.password ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.password}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
      </View>
      <CheckBox
        style={tailwind('text-green-400 self-start mx-12 mt-2')}
        status='success'
        checked={checked}
        onChange={nextChecked => setChecked(nextChecked)}>
        {`I am Therapist`}
      </CheckBox>
      <View style={{ elevation: 5 }}>
        <TouchableOpacity
          onPress={() => handleSubmit()} 
          style={tailwind('w-80 items-center py-3 mt-8 rounded-full bg-green-400')}>
          <Text 
            style={tailwind('text-xl text-gray-100 tracking-wider')}
          >SIGN IN</Text>
        </TouchableOpacity>
      </View>
      <View style={tailwind('flex flex-row')}>
        <Text style={tailwind('my-5 text-gray-400 text-lg')}>Dont have an account?, </Text>
        <Text 
          onPress={() => navigation.navigate('Confirm')}
          style={tailwind('my-5 text-green-400 text-lg')}
        >Sign up</Text>
      </View>
      <TouchableOpacity
          onPress={async () => await SecureStore.deleteItemAsync('access_token')} 
          style={tailwind('w-80 items-center py-3 mt-8 rounded-full bg-green-400')}>
          <Text 
            style={tailwind('text-xl text-gray-100 tracking-wider')}
          >DELETE TOKEN</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}


