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
import TherapistOngoingOrder from '../../components/TherapistOngoingOrder'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ListClient({ navigation }) {
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
        <View style={tailwind('w-full px-8 pt-14 pb-6 border-b-2 border-green-400 relative')}>
          <View style={tailwind('flex flex-row items-center')}>
            <Image 
              style={tailwind('w-16 h-16 rounded-full')}
              source={{
                uri: therapist.photoUrl
              }}
            />
            <View style={tailwind('flex items-start justify-center px-6')}>
              <Text style={tailwind('text-2xl text-gray-600')}>{ therapist.fullName }</Text>
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
              <View style={tailwind('flex flex-row')}>
                <View style={tailwind('flex flex-row')}>
                  <Ionicons style={tailwind('mr-1 text-gray-400 text-base')} name='location'/>
                  <Text style={tailwind('text-lg text-gray-500')}>{ therapist.city }</Text>
                </View>
                <Text style={tailwind('text-lg text-gray-200 mx-2')}> | </Text>
                <Text style={tailwind('text-lg text-gray-500 capitalize')}>{ therapist.gender }</Text>
              </View>
            </View>
            <Toggle 
              style={tailwind('absolute -right-3 bottom-1')}
              status='success'
              checked={checked} 
              onChange={onCheckedChange}>
            </Toggle>
          </View>
        </View>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
          }
          >
          <View style={{ width: widthWindow * 9 /10}}>
            <View style={tailwind('mt-2')}>
              {
                onGoingOrdersTherapist.length ? (
                  <TherapistOngoingOrder 
                    onGoingOrdersTherapist={onGoingOrdersTherapist}
                    handleCompleted={(payload) => dispatch(setCompletedOrderTherapist(payload))}
                    handleChat={async () => navigation.navigate('Messages', { screen: 'ChatRoom', params: {client: onGoingOrdersTherapist[0].Client },})}
                  />
                ) 
                : <View style={tailwind('mt-16 flex-1 justify-center items-center bg-white')}>
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