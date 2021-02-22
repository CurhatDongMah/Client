import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  TextInput
} from 'react-native';
import { createOrder } from '../../store/actions/client'
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';
import getAge from '../../helpers/getAge'
import curencyFormat from '../../helpers/curencyFormat'
import { Select, SelectItem } from '@ui-kitten/components';

export default function Detail({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const widthWindow = useWindowDimensions().width
  const ARR = [1,2,3,4,5]
  const { therapistDetail } = useSelector(state => state.client)
  const [order, setOrder] = useState({
    price: therapistDetail.price,
    TherapistId: therapistDetail.id,
    totalHour: 1
  })
  const dispatch = useDispatch()
  const handleSelect = (index) => {
    setSelectedIndex(index)
    setOrder({
      ...order, totalHour: Number(index)
    })
  }
  const handleOrder = async () => {
    
    await dispatch(createOrder(order))
    navigation.navigate('ConfirmPayment')
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              !therapistDetail.status ? (
                <View style={{ width: widthWindow * 9 /10}}>
                  <Text style={tailwind('pt-2 text-lg text-gray-600 tracking-wider')}>CREATE ORDER</Text>
                  <View style={tailwind('border border-gray-300 rounded py-2 px-4')}>
                    <View style={tailwind('mt-2 flex flex-row justify-between items-center')}>
                      <View style={tailwind('flex flex-row items-center mx-2 mr-4 ')}>
                        <Text 
                          style={tailwind('text-lg text-yellow-500 font-bold tracking-wider')}
                        >{ curencyFormat(therapistDetail.price) }</Text>
                        <Text style={tailwind('text-gray-400 text-base font-bold')}>/h</Text>
                      </View>
                      <Select
                        style={tailwind('mx-2 ml-4 flex-1')}
                        placeholder='Duration'
                        selectedIndex={selectedIndex}
                        onSelect={index => handleSelect(index) }>
                        <SelectItem title='1 hour'/>
                        <SelectItem title='2 hour'/>
                        <SelectItem title='3 hour'/>
                      </Select>
                    </View>
                    <View style={tailwind('mt-2 flex flex-row justify-between items-center')}>
                      <Text style={tailwind('mx-2 text-lg text-gray-500 tracking-wider font-bold')}>Total</Text>
                      <Text 
                        style={tailwind('mx-2 text-lg text-gray-500 tracking-wider font-bold')}
                      >{ curencyFormat(therapistDetail.price * Number(selectedIndex)) }</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleOrder}
                        style={tailwind('items-center my-3 py-1 px-10 rounded-lg border border-green-400')}>
                        <Text 
                          style={tailwind('text-base text-green-400')}
                        >Book Now</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <Text 
                  style={tailwind('text-base text-gray-400')}
                >Not Available</Text>
              )
            }
          </View>
          <View>
            </View>
              <Text style={tailwind('pt-2 text-lg text-gray-600 tracking-wider')}>PROFILE</Text>
              <View style={{ width: widthWindow * 9 /10}}>
                <View style={tailwind('mt-2')}>
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
                  >{ therapistDetail.about } </Text>
                </View>
                {/* Review */}
                <Text style={tailwind('pt-4 text-lg text-gray-600 tracking-wider')}>REVIEW</Text>
                <View style={tailwind('mt-2')}>
                  <Text style={tailwind('text-lg text-gray-500 tracking-wider')}>Papa Dedeh</Text>
                  <View style={tailwind('flex flex-row items-center py-1')}>
                    {
                      therapistDetail.rating ? (
                        ARR.map(arr => {
                          return therapistDetail.rating >= arr ? (
                            <Ionicons key={arr} style={tailwind('mr-1 text-yellow-400')} name='star'/>
                          ) : (
                            <Ionicons key={arr} style={tailwind('mr-1 text-gray-400')} name='star'/>
                          ) 
                        })
                      ) : <Text>No Review</Text>
                    }
                  </View>
                  <Text 
                    style={tailwind('py-2 text-base text-gray-600 bg-gray-50 p-3 rounded-lg border-b border-gray-100')}
                  >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</Text>
                </View>
                <View style={tailwind('mt-2')}>
                  <Text style={tailwind('text-lg text-gray-500 tracking-wider')}>Mama dedeh</Text>
                  <View style={tailwind('flex flex-row items-center py-1')}>
                    {
                      therapistDetail.rating ? (
                        ARR.map(arr => {
                          return therapistDetail.rating >= arr ? (
                            <Ionicons key={arr} style={tailwind('mr-1 text-yellow-400')} name='star'/>
                          ) : (
                            <Ionicons key={arr} style={tailwind('mr-1 text-gray-400')} name='star'/>
                          ) 
                        })
                      ) : <Text>No Review</Text>
                    }
                  </View>
                  <Text 
                    style={tailwind('py-2 text-base text-gray-600 bg-gray-50 p-3 rounded-lg border-b border-gray-100')}
                  >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</Text>
                </View>
              </View>
          </View>
      </ScrollView>
  </SafeAreaView>
  )
}
