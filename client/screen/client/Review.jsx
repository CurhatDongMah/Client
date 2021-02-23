import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';
import { createReview } from '../../store/actions/client'

export default function Review({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [error, setError] = useState({})
  const { therapistDetail } = useSelector(state => state.client)
  const dispatch = useDispatch()
  const ARR = [1,2,3,4,5]
  const handleChange = (text) => {
    setReview(text)
  }
  const handleSubmit = () => {
    if (!review) setError({...error, review: 'Cannot post a blank review'})
    else {
      dispatch(createReview({
        rating,
        review,
        TherapistId: therapistDetail.id
      }))
      navigation.navigate('ListHistory')
    }
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
      <View style={{ width: widthWindow * 9 / 10}}>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>SHARE YOUR EXPERIENCE</Text>
          <TextInput
            onChangeText={(text) => handleChange(text)}
            multiline={true}
            style={tailwind('py-2 px-3 bg-gray-50 text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>GIVE RATING</Text>
          <View style={tailwind('flex flex-row items-center justify-center py-3')}>
            {
              ARR.map(arr => {
                return rating >= arr ? (
                  <Ionicons 
                  onPress={() => setRating(arr)}
                    key={arr} style={tailwind('mx-2 text-yellow-400 text-2xl')} name='star'
                  />
                ) : (
                  <Ionicons 
                    onPress={() => setRating(arr)}
                    key={arr} style={tailwind('mx-2 text-gray-400 text-2xl')} name='star'
                  />
                ) 
              })
            }
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={tailwind('my-8 items-center py-2 px-10 rounded-full bg-green-400')}>
          <Text 
            style={tailwind('text-xl text-gray-100')}
          >Send Review</Text>
        </TouchableOpacity>
      </View>
  </SafeAreaView>
  )
}
