import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import tailwind from 'tailwind-rn'
import { Toggle } from '@ui-kitten/components'
import {
  updateStatusTherapist,
  getOnGoingOrderTherapist,
  setCompletedOrderTherapist
} from '../../store/actions/therapist'
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Detail({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const { therapist, status, onGoingOrdersTherapist, loading, error } = useSelector(state => state.therapist)
  const [checked, setChecked] = useState(false);
  const [client, setClient] = useState({ name: 'Client 1'})
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch()
  const ARR = [1,2,3,4,5]
  useEffect(() => {
    dispatch(getOnGoingOrderTherapist())
  }, [])
  const onCheckedChange = (isChecked) => {
    dispatch(updateStatusTherapist(!checked))
    setChecked(isChecked)
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(getOnGoingOrderTherapist())
    wait(1000).then(() => setRefreshing(false))
  }, []);
  console.log(therapist, 'di profile')
  console.log(status, 'di profile');
  console.log(onGoingOrdersTherapist, 'on going di profile');
  
  if (error) {
    return (
      <View style={tailwind('flex-1 justify-center items-center bg-white')}>
        <Image 
          style={tailwind('w-full h-80')}
          source={require('../../assets/error.png')}
        />
        <Text style={tailwind('py-2 text-lg text-gray-400 font-bold tracking-wider')}>Oppss, something error...</Text>
      </View>
    )
  } else if (loading) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color="34D399" size="large" />
      </View>
    )
  } else {
    return (
      <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
          }
          >
        <View style={tailwind('mt-16 mb-5 border-b-4 border-green-400 pb-4')}>
          <View style={tailwind('flex items-center relative')}>
            <Image 
              style={tailwind('w-24 h-24 rounded-full')}
              source={{
                uri: therapist.photoUrl
              }}
            />
            <Text style={tailwind('text-2xl my-2')}>{ therapist.fullName }</Text>
            <View style={tailwind('flex flex-row items-center')}>
            {
              therapist.rating ? (
                ARR.map(arr => {
                  return therapist.rating >= arr ? (
                    <Ionicons key={arr} style={tailwind('mr-1 text-yellow-400 text-base')} name='star'/>
                  ) : (
                    <Ionicons key={arr} style={tailwind('mr-1 text-gray-400 text-base')} name='star'/>
                  ) 
                })
              ) : (
                <>
                  <Ionicons style={tailwind('mx-1 text-gray-400 text-base')} name='star'/>
                  <Ionicons style={tailwind('mx-1 text-gray-400 text-base')} name='star'/>
                  <Ionicons style={tailwind('mx-1 text-gray-400 text-base')} name='star'/>
                  <Ionicons style={tailwind('mx-1 text-gray-400 text-base')} name='star'/>
                  <Ionicons style={tailwind('mx-1 text-gray-400 text-base')} name='star'/>
                </>
              )
            }
            </View>
            <Toggle 
              style={tailwind('absolute right-6')}
              status='success'
              checked={checked} 
              onChange={onCheckedChange}>
            </Toggle>
          </View>
        </View>
          <View style={{ width: widthWindow * 9 /10}}>
            <View style={tailwind('mt-2')}>
              {
                onGoingOrdersTherapist.length ? (
                  <View style={{ width: widthWindow * 9 / 10 }}>
                    <Text style={tailwind('text-lg text-gray-400 text-center tracking-wider')}>ON GOING</Text>
                    <View style={tailwind('flex flex-row mt-4 rounded-xl py-4 bg-gray-50 justify-start')}>
                      <View style={tailwind('px-5 flex items-center justify-center')}>
                        <Image 
                          style={tailwind('w-12 h-12 rounded-full')}
                          source={{
                            uri: onGoingOrdersTherapist[0].Client.photoUrl
                          }}
                        />
                      </View>
                      <View style={tailwind('flex items-start justify-center')}>
                        <Text 
                          numberOfLines={1}
                          ellipsizeMode='clip'
                          style={tailwind('w-36 text-base text-gray-500')}>{ onGoingOrdersTherapist[0].Client.fullName }</Text>
                        <Text style={tailwind('text-gray-500')}>{ onGoingOrdersTherapist[0].createdAt }</Text>
                        <Text style={tailwind('text-gray-500')}>09.00 : 10.00 pm</Text>
                        <Text style={tailwind('text-gray-400')}>{ onGoingOrdersTherapist[0].Client.fullName }</Text>
                      </View>
                      <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
                        <TouchableOpacity
                          onPress={() => dispatch(setCompletedOrderTherapist(onGoingOrdersTherapist[0].id))}
                          style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-gray-100 border border-r border-green-400')}>
                          <Text 
                            style={tailwind('text-green-400')}
                          >Completed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={async () => navigation.navigate('ChatRoom', { client: onGoingOrdersTherapist[0].Client })} 
                          style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-green-400 border border-r border-green-400')}>
                          <Text 
                            style={tailwind('text-gray-100')}
                          >Chat</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) 
                : <View style={tailwind('flex-1 justify-center items-center bg-white')}>
                    <Image 
                      style={tailwind('w-full h-80')}
                      source={require('../../assets/sad-green.png')}
                    />
                    <Text style={tailwind('py-2 text-lg text-gray-400 font-bold tracking-wider')}>No order yet ...</Text>
                  </View> 
              }
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}