import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { createOrder } from '../../store/actions/client'
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';
import getAge from '../../helpers/getAge'

export default function Detail({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const ARR = [1,2,3,4,5]
  const { therapistDetail } = useSelector(state => state.client)
  const dispatch = useDispatch()
  const handleOrder = async () => {
    await dispatch(createOrder(therapistDetail.id))
    navigation.navigate('ConfirmPayment')
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
        <View style={tailwind('mt-16')}>
          <View style={tailwind('flex items-center')}>
            <Image 
              style={tailwind('w-24 h-24 rounded-full')}
              source={{
                uri: 'https://placeimg.com/140/140/any'
              }}
            />
            <Text style={tailwind('text-2xl my-2 text-gray-600')}>{ therapistDetail.fullName }</Text>
            <View style={tailwind('flex flex-row items-center')}>
              {
                therapistDetail.rating ? (
                  ARR.map(arr => {
                    return therapistDetail.rating >= arr ? (
                      <Ionicons key={arr} style={tailwind('mr-1 text-yellow-400 text-base')} name='star'/>
                    ) : (
                      <Ionicons key={arr} style={tailwind('mr-1 text-gray-400 text-base')} name='star'/>
                    ) 
                  })
                ) : <Text>No Review</Text>
              }
            </View>
            {
              therapistDetail.status ? (
                <TouchableOpacity
                  onPress={handleOrder}
                  style={tailwind('items-center my-3 py-1 px-10 rounded-full bg-green-400')}>
                  <Text 
                    style={tailwind('text-base text-gray-100')}
                  >Book Now</Text>
                </TouchableOpacity>
              ) : (
                <Text 
                  style={tailwind('text-base text-gray-400')}
                >Not Available</Text>
                // <TouchableOpacity
                //   style={tailwind('items-center my-3 py-1 px-10 rounded-full bg-green-400')}>
                // </TouchableOpacity>
              )
            }
          </View>
        </View>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: widthWindow * 8 /10}}>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Age</Text>
              <Text 
                style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
              >{ getAge(therapistDetail.birthDate)} years old</Text>
            </View>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Gender</Text>
              <Text 
                style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
              >{ therapistDetail.gender }</Text>
            </View>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>City</Text>
              <Text 
                style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
              >{ therapistDetail.city }</Text>
            </View>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>About</Text>
              <Text 
                style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
              >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</Text>
            </View>
            <View style={tailwind('mt-5')}>
              <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>About</Text>
              <Text 
                style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
              >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</Text>
            </View>
          </View>
      </ScrollView>
  </SafeAreaView>
  )
}
