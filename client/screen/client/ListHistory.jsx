import React, { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import tailwind from 'tailwind-rn';
import { getHistory, setTherapist, getReview } from '../../store/actions/client'
import ClientHistoryCard from '../../components/ClientHistoryCard'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function ListHistory({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const [refreshing, setRefreshing] = useState(false);
  const { histories, loading: loadingClient, error: errorClient } = useSelector(state => state.client)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHistory())
  }, [])
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(getHistory())
    wait(1000).then(() => setRefreshing(false))
  }, []);
  const handleDetail = (therapist) => {
    dispatch(setTherapist(therapist))
    dispatch(getReview(therapist.id))
    navigation.navigate('Detail')
  }
  console.log(histories, 'ini histories');
  if (loadingClient) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color="34D399" size="large" />
      </View>
    )
  }
  if (errorClient) {
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
      <View style={tailwind('w-full flex flex-row pt-12 pb-6 w-full justify-center border-b-2 border-green-400')}>
        <Text style={tailwind('py-2 text-lg text-gray-500 tracking-wider')}>HISTORY ORDER</Text>
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
          histories.length ? (
            histories.map(history => {
              return (
                <ClientHistoryCard 
                  key={history.id} 
                  history={history}
                  handleDetail={handleDetail}
                  handleReview={() => navigation.navigate('Review')}/>
              )
            })
          ) : <Text style={tailwind('py-4 text-lg text-gray-500 tracking-wider')}>No hisroty order</Text>
        }
      </ScrollView>
    </SafeAreaView>
  )
}
