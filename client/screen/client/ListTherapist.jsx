import React, { useEffect, useState, useCallback } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  useWindowDimensions,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import tailwind from 'tailwind-rn';
import { useDispatch, useSelector } from 'react-redux';
import { getTherapists } from '../../store/actions/therapist';
import { setTherapist, getOnGoingOrder, setCompletedOrder, getReview } from '../../store/actions/client'
import TherapistCard from '../../components/TherapistCard'
import ClientOngoingOrder from '../../components/ClientOngoingOrder'
import Ionicons from 'react-native-vector-icons/Ionicons'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function ListTherapist({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const { client, onGoingOrders, loading: loadingClient, error: errorClient } = useSelector(state => state.client)
  const { therapists, error: errorTherapist, loading: loadingTherapist } = useSelector(state => state.therapist)
  const dispatch = useDispatch()
  // pull refresh
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(getTherapists())
    dispatch(getOnGoingOrder())
    wait(1000).then(() => setRefreshing(false))
  }, []);
  const ARR = [1,2,3,4,5]
  const handleDetail = (therapist) => {
    dispatch(setTherapist(therapist))
    dispatch(getReview(therapist.id))
    navigation.navigate('Detail')
  }

  const handleChat = (therapist) => {
    navigation.navigate('Messages', {screen: 'ChatRoom', params: { therapist }})
  }

  useEffect(() => {
    dispatch(getTherapists())
    dispatch(getOnGoingOrder())
  }, [])
  
  if (loadingClient || loadingTherapist) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color="34D399" size="large" />
      </View>
    )
  }
  if (errorClient || errorTherapist) {
    return (
      <View style={tailwind('flex-1 justify-center items-center bg-white')}>
        <Image 
          style={tailwind('w-full h-80')}
          source={require('../../assets/error.png')}
        />
        <Text style={tailwind('py-2 text-lg text-gray-400 font-bold tracking-wider')}>Oppss, something error...</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
      <View style={tailwind('flex flex-row px-10 pt-14 pb-6 w-full justify-start border-b-2 border-green-400')}>
        <View>
          <Image 
            style={tailwind('w-16 h-16 rounded-full')}
            source={{
              uri: client.photoUrl
            }}
          />
        </View>
        <View style={tailwind('flex items-start justify-center px-6')}>
          <Text style={tailwind('text-2xl text-gray-600')}>{ client.fullName }</Text>
          <View style={tailwind('flex flex-row')}>
            <View style={tailwind('flex flex-row')}>
              <Ionicons style={tailwind('mr-1 text-gray-400 text-base')} name='location'/>
              <Text style={tailwind('text-lg text-gray-500')}>{ client.city }</Text>
            </View>
            <Text style={tailwind('text-lg text-gray-500')}> | </Text>
            <Text style={tailwind('text-lg text-gray-500 capitalize')}>{ client.gender }</Text>
          </View>
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
        {
          onGoingOrders.length ? (
            <ClientOngoingOrder 
              onGoingOrders={onGoingOrders}
              handleChat={async () => navigation.navigate('Messages', {screen: 'ChatRoom', params: {therapist: onGoingOrders[0].Therapist }})}
              handleCompleted={(payload) => dispatch(setCompletedOrder(payload))}
            />
          ) : <></>
        }
        <View style={tailwind('mb-4')}>
          <Text style={tailwind('pt-2 text-lg text-gray-600 tracking-wider')}>CHOOSE A THERAPIST</Text>
          {
            therapists.map(therapist => {
              return (
                <TherapistCard 
                  key={therapist.id} 
                  therapist={therapist}
                  handleDetail={handleDetail}
                  handleChat={handleChat}/>
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
