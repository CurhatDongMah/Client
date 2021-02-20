import React, { useState } from 'react'
import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';
import { Toggle } from '@ui-kitten/components';

export default function Detail({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const [checked, setChecked] = useState(false);
  const [client, setClient] = useState({ name: 'Client 1'})
  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
  return (
    <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
        <View style={tailwind('mt-16 relative mb-5')}>
          <View style={tailwind('flex items-center')}>
            <Image 
              style={tailwind('w-24 h-24 rounded-full')}
              source={{
                uri: 'https://picsum.photos/id/237/200/300'
              }}
            />
            <Text style={tailwind('text-2xl my-2')}>John Doe</Text>
            <View style={tailwind('flex flex-row items-center')}>
              <Ionicons style={tailwind('mx-1 text-yellow-500 text-base')} name='star'/>
              <Ionicons style={tailwind('mx-1 text-yellow-500 text-base')} name='star'/>
              <Ionicons style={tailwind('mx-1 text-yellow-500 text-base')} name='star'/>
              <Ionicons style={tailwind('mx-1 text-yellow-500 text-base')} name='star'/>
              <Ionicons style={tailwind('mx-1 text-yellow-500 text-base')} name='star'/>
            </View>
            <Text 
              onPress={() => navigation.navigate('TherapistEdit')}
              style={tailwind('text-green-400 text-base')}>Edit Profile</Text>
            <Toggle 
              style={tailwind('absolute -right-24')}
              status='success'
              checked={checked} 
              onChange={onCheckedChange}>
            </Toggle>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: widthWindow * 9 /10}}>
            <View style={tailwind('mt-5')}>
              <View style={tailwind('flex flex-row justify-between px-4')}>
                <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>REQUESTS</Text>
                <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>|</Text>
                <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>ON GOING</Text>
              </View>
              {
                client.name ? (
                  <View style={{ width: widthWindow * 9 / 10 }}>
                    <View style={tailwind('flex flex-row mt-4 rounded-xl py-4 bg-gray-50 justify-start')}>
                      <View style={tailwind('px-5 flex items-center justify-center')}>
                        <Image 
                          style={tailwind('w-12 h-12 rounded-full')}
                          source={{
                            uri: 'https://picsum.photos/id/237/200/300'
                          }}
                        />
                      </View>
                      <View style={tailwind('flex items-start justify-center')}>
                        <Text 
                          numberOfLines={1}
                          ellipsizeMode='clip'
                          style={tailwind('w-36 text-base text-gray-500')}>Client 1</Text>
                        <Text style={tailwind('text-gray-500')}>27/02/2021</Text>
                        <Text style={tailwind('text-gray-500')}>09.00 : 10.00 pm</Text>
                        <Text style={tailwind('text-gray-400')}>Jakarta</Text>
                      </View>
                      <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
                        <TouchableOpacity
                          style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-green-400')}>
                          <Text 
                            style={tailwind('text-gray-100')}
                          >Continue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-gray-100 border border-r border-green-400')}>
                          <Text 
                            style={tailwind('text-green-400')}
                          >Chat</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) : <Text>No Patient</Text>
              }
            </View>
          </View>
        </ScrollView>
  </SafeAreaView>
  )
}