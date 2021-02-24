import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  useWindowDimensions,
  RefreshControl,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import { getClients } from '../../store/actions/client';
import { getHistoryTherapist } from '../../store/actions/therapist'
import TherapistHistoryCard from '../../components/TherapistHistoryCard'
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ListHistory({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const [refreshing, setRefreshing] = useState(false);
  const { historiesTherapist, loading, error } = useSelector(state => state.therapist)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHistoryTherapist())
  }, [])
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(getHistoryTherapist())
    wait(1000).then(() => setRefreshing(false))
  }, []);
    useEffect(() => {
    dispatch(getClients())
  }, [])

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
          <View style={tailwind('flex flex-row pt-12 pb-6 w-full justify-center border-b-2 border-green-400 mb-2')}>
            <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>HISTORY</Text>
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
              historiesTherapist.length ? (
                historiesTherapist.map(history => {
                  return (
                    <TherapistHistoryCard 
                      key={history.id}
                      history={history}
                      handleChat={async () => navigation.navigate('Messages', { screen: 'ChatRoom', params: {client: history.Client }})}
                    />
                  ) 
                })
              ) : <Text style={tailwind('py-4 text-lg text-gray-500 tracking-wider')}>No history order</Text>
            }
          </ScrollView>
      </SafeAreaView>
    )
  }
}
