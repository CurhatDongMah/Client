import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function Review({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const { therapistDetail } = useSelector(state => state.client)
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
      <View style={{ width: widthWindow * 9 / 10}}>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>SHARE YOUR EXPERIENCE</Text>
          <TextInput
            onChange={(text) => setReview(text)}
            multiline={true}
            numberOfLines={5}
            style={tailwind('py-2 bg-gray-50 text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>GIVE RATING</Text>
          <View style={tailwind('flex flex-row items-center py-2')}>
            <Ionicons style={tailwind('mx-2 text-yellow-500 text-2xl')} name='star'/>
            <Ionicons style={tailwind('mx-2 text-yellow-500 text-2xl')} name='star'/>
            <Ionicons style={tailwind('mx-2 text-yellow-500 text-2xl')} name='star'/>
            <Ionicons style={tailwind('mx-2 text-yellow-500 text-2xl')} name='star'/>
            <Ionicons style={tailwind('mx-2 text-gray-400 text-2xl')} name='star'/>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={tailwind('my-8 items-center py-2 px-10 rounded-full bg-green-400')}>
          <Text 
            style={tailwind('text-xl text-gray-100')}
          >Send Review</Text>
        </TouchableOpacity>
      </View>
  </SafeAreaView>
  )
}
