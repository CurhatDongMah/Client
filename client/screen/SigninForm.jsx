import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, useWindowDimensions } from 'react-native'
import tailwind from 'tailwind-rn'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CheckBox } from '@ui-kitten/components';

export default function SigninForm({ navigation }) {
  const [checked, setChecked] = React.useState(false);
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [role, setRole] = useState('client')
  const [error, setError] = useState()
  const widthWindow = useWindowDimensions().width
  // const dispatch = useDispatch()
  const handleChange = (text) => {
    setName(text)
    setError('')
  }
  const handleSubmit = () => {
    if (checked) navigation.navigate('TherapistPage')
    else navigation.navigate('ClientPage')
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
            onChangeText={(text) => setEmail(text)}
            style={tailwind('px-2 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
            value={email}
          ></TextInput>
        </View>
        <View style={tailwind('mt-5')}>
          <View style={tailwind('flex flex-row items-center')}>
            <Ionicons style={tailwind('mx-1 text-gray-400 text-lg')} name='lock-closed'/>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>PASSWORD</Text>
          </View>
          <TextInput
            onChangeText={ (text) => setPassword(text) }
            style={tailwind('px-2 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
            value={password}
            secureTextEntry={true}
          ></TextInput>
        </View>
      </View>
      {
        error ? <Text style={tailwind('text-sm text-red-400')}>{ error }</Text> : <Text></Text>
      }
      <CheckBox
        style={tailwind('text-green-400 self-start mx-12')}
        status='success'
        checked={checked}
        onChange={nextChecked => setChecked(nextChecked)}>
        {`I am Therapist`}
      </CheckBox>
      {/* <View style={tailwind('mt-2')}>
        <View style={tailwind('flex-row justify-start')}>
          {
            role === 'client' ? (
              <TouchableOpacity
                style={tailwind('w-1/3 items-center py-1 rounded-l-full bg-green-400 border border-r border-green-400')}>
                <Text 
                  style={tailwind('text-xl text-gray-100')}
                >Client</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setRole('client')}
                style={tailwind('w-1/3 items-center py-1 rounded-l-full bg-gray-100 border border-r border-green-400')}>
                <Text 
                  style={tailwind('text-xl text-green-400')}
                >Client</Text>
              </TouchableOpacity>
            )
          }
          {
            role === 'therapist' ? (
              <TouchableOpacity
                style={tailwind('w-1/3 items-center py-1 rounded-r-full bg-green-400 border border-l border-green-400')}>
                <Text 
                  style={tailwind('text-xl text-gray-100')}
                >Therapist</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setRole('therapist')}
                style={tailwind('w-1/3 items-center py-1 rounded-r-full bg-gray-100 border border-l border-green-400')}>
                <Text 
                  style={tailwind('text-xl text-green-400')}
                >Therapist</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View> */}
        <View style={{ elevation: 5 }}>
          <TouchableOpacity
            onPress={() => handleSubmit()} 
            style={tailwind('w-80 items-center py-3 mt-8 rounded-full bg-green-400')}>
            <Text 
              style={tailwind('text-xl text-gray-100 tracking-wider')}
            >SIGN IN</Text>
          </TouchableOpacity>
        </View>
      <Text 
        onPress={() => navigation.navigate('Confirm')}
        style={tailwind('my-5 text-gray-400 text-lg')}
      >Dont have an account?, Sign up</Text>
    </SafeAreaView>
  )
}


