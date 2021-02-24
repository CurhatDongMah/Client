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
import curencyFormat from '../../helpers/curencyFormat'
import { FancyAlert } from 'react-native-expo-fancy-alerts'

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
    if (onGoingOrdersTherapist.length) {
      toggleAlert()
    } else {
      dispatch(updateStatusTherapist(!checked))
      setChecked(isChecked)
    }
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(getOnGoingOrderTherapist())
    wait(1000).then(() => setRefreshing(false))
  }, [])
  
  // fancy alert
  const [visible, setVisible] = useState(false)
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible)
  }, [visible])
  
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
        <View style={tailwind('mt-16 mb-2 border-b-2 border-green-400 pb-4 relative px-2')}>
          <View style={tailwind('flex flex-row items-center')}>
            <Image 
              style={tailwind('w-20 h-20 rounded-full')}
              source={{
                uri: therapist.photoUrl
              }}
            />
            <View style={tailwind('px-6')}>
              <Text style={tailwind('text-2xl my-2 text-gray-600')}>{ therapist.fullName }</Text>
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
              <Text style={tailwind('text-lg my-2 text-gray-400')}>{ therapist.city }</Text>
            </View>
            <Toggle 
              style={tailwind('absolute right-6 top-2')}
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
                    <View style={tailwind('border border-green-400 px-5 py-2 rounded-lg my-2')}>
                      <View style={tailwind('flex flex-row items-center justify-start')}>
                        <Image 
                          style={tailwind('w-12 h-12 rounded-full')}
                          source={{
                            uri: onGoingOrdersTherapist[0].Client.photoUrl
                          }}
                        />
                        <View style={tailwind('flex items-start justify-center px-6')}>
                          <Text 
                            numberOfLines={1}
                            ellipsizeMode='clip'
                            style={tailwind('w-36 text-base text-gray-500 text-xl')}>{ onGoingOrdersTherapist[0].Client.fullName }</Text>
                          <Text style={tailwind('text-gray-400 text-lg')}>{ onGoingOrdersTherapist[0].Client.gender }</Text>
                          <Text style={tailwind('text-gray-400 text-lg')}>{ onGoingOrdersTherapist[0].Client.city }</Text>
                        </View>
                      </View>
                      <View style={tailwind('')}>
                        <View style={tailwind('mt-2')}>
                          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Date</Text>
                          <Text 
                            style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
                          >{ `${new Date(onGoingOrdersTherapist[0].createdAt).getDate()}/${new Date(onGoingOrdersTherapist[0].createdAt).getMonth()+1}/${new Date(onGoingOrdersTherapist[0].createdAt).getFullYear()}`}</Text>
                        </View>
                        <View style={tailwind('mt-2')}>
                          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Start at</Text>
                          <Text 
                            style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
                          >{ `${new Date(onGoingOrdersTherapist[0].createdAt).getHours()}:${new Date(onGoingOrdersTherapist[0].createdAt).getMinutes()}`}</Text>
                        </View>
                        <View style={tailwind('mt-2')}>
                          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Duration</Text>
                          <Text 
                            style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
                          >{ onGoingOrdersTherapist[0].totalHour } Hour</Text>
                        </View>
                        <View style={tailwind('mt-2')}>
                          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>Total</Text>
                          <Text 
                            style={tailwind('py-2 text-base text-gray-500 border-b border-gray-100')}
                          >{ curencyFormat(onGoingOrdersTherapist[0].totalPrice) }</Text>
                        </View>
                      </View>
                      <View style={tailwind('flex flex-row justify-between mt-4')}>
                        <TouchableOpacity
                          onPress={() => dispatch(setCompletedOrderTherapist(onGoingOrdersTherapist[0].id))}
                          style={tailwind('items-center my-3 py-1 px-10 rounded-lg border border-green-400')}>
                          <Text 
                            style={tailwind('text-base text-green-400')}
                          >Complete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={async () => navigation.navigate('Messages', { screen: 'ChatRoom', params: {client: onGoingOrdersTherapist[0].Client },})} 
                          style={tailwind('items-center my-3 py-1 px-10 rounded-lg bg-green-400')}>
                          <Text 
                            style={tailwind('text-base text-gray-100')}
                          >Chat</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) 
                : <View style={tailwind('mt-8 flex-1 justify-center items-center bg-white')}>
                    <Image 
                      style={tailwind('w-full h-80')}
                      source={require('../../assets/sad-green.png')}
                    />
                    <Text style={tailwind('py-2 text-lg text-green-400 font-bold tracking-wider')}>No order yet ...</Text>
                  </View> 
              }
            </View>
          </View>
          <FancyAlert
            visible={visible}
            icon={<View 
              style={tailwind('flex flex-1 justify-center items-center w-full rounded-full bg-red-500')}
            ><Text style={tailwind('text-white text-2xl')}>X</Text></View>}
            style={{ backgroundColor: 'white' }}
          >
            <Text style={tailwind('mb-2 text-lg text-gray-500')}>You still have ongoing order</Text>
            <TouchableOpacity
              onPress={toggleAlert}
              style={tailwind('items-center my-3 py-1 px-10 rounded-lg border border-red-400')}>
              <Text 
                style={tailwind('text-base text-red-400')}
              >Oke</Text>
            </TouchableOpacity>
          </FancyAlert>
        </ScrollView>
      </SafeAreaView>
    )
  }
}