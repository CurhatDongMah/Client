import React, { useEffect, useState, useCallback } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
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
import Ionicons from 'react-native-vector-icons/Ionicons'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Profile({ navigation }) {
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          />
        }
      >
        <View style={tailwind('flex flex-row px-5 pt-16 pb-8 w-full justify-start border-b-2 border-green-400')}>
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
              <Text style={tailwind('text-lg text-gray-500 mx-2')}> | </Text>
              <Text style={tailwind('text-lg text-gray-500 capitalize')}>{ client.gender }</Text>
            </View>
          </View>
        </View>
        {
          onGoingOrders.length ? (
            <View style={{ width: widthWindow * 9 / 10 }}>
              <View style={tailwind('border-b border-gray-300 pb-2')}>
                <Text style={tailwind('py-2 text-lg text-gray-600 tracking-wider')}>ON GOING ORDER</Text>
                <View style={tailwind('flex flex-row mt-2 rounded-xl py-4 bg-green-100 justify-start')}>
                  <View style={tailwind('px-5 flex items-center justify-center')}>
                    <Image 
                      style={tailwind('w-12 h-12 rounded-full')}
                      source={{
                        uri: onGoingOrders[0].Therapist.photoUrl
                      }}
                    />
                  </View>
                  <View style={tailwind('flex items-start justify-center')}>
                    <Text 
                      numberOfLines={1}
                      ellipsizeMode='clip'
                      style={tailwind('w-32 text-base text-gray-600')}>{ onGoingOrders[0].Therapist.fullName }</Text>
                    <View style={tailwind('flex flex-row')}>
                      <Text style={tailwind('text-gray-400')}>Date: </Text>
                      <Text 
                        style={tailwind('text-gray-500')}
                      >{ `${new Date(onGoingOrders[0].createdAt).getDate()}/${new Date(onGoingOrders[0].createdAt).getMonth()+1}/${new Date(onGoingOrders[0].createdAt).getFullYear()}`}</Text>
                    </View>
                    <View style={tailwind('flex flex-row')}>
                      <Text style={tailwind('text-gray-400')}>Start at: </Text>
                      <Text 
                        style={tailwind('text-gray-500')}
                      >{ `${new Date(onGoingOrders[0].createdAt).getHours()}:${new Date(onGoingOrders[0].createdAt).getMinutes()}`}</Text>
                    </View>
                    <View style={tailwind('flex flex-row')}>
                      <Text style={tailwind('text-gray-400')}>Duration: </Text>
                      <Text style={tailwind('text-gray-500')}>{ onGoingOrders[0].totalHour } Hour</Text>
                    </View>
                  </View>
                  <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
                    <TouchableOpacity
                      onPress={() => dispatch(setCompletedOrder(onGoingOrders[0].id))}
                      style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-gray-100 border border-r border-green-400')}>
                      <Text 
                        style={tailwind('text-green-400')}
                      >Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => navigation.navigate('Messages', {screen: 'ChatRoom', params: {therapist: onGoingOrders[0].Therapist }})} 
                      style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-green-400 border border-r border-green-400')}>
                      <Text 
                        style={tailwind('text-gray-100')}
                      >Chat</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
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
