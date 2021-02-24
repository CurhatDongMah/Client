import React, { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import tailwind from 'tailwind-rn';
import { getHistory, setTherapist, getReview } from '../../store/actions/client'
import ClientHistoryCard from '../../components/ClientHistoryCard'
// import minuteFormat from '../../helpers/minuteFormat';

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
              // return <View  key={history.id} style={{ width: widthWindow * 9 / 10 }}>
              //   <View style={tailwind('flex flex-row my-2 rounded-xl py-4 bg-gray-100 justify-start')}>
              //     <View style={tailwind('px-5 flex items-center justify-center')}>
              //       <Image 
              //         style={tailwind('w-12 h-12 rounded-full')}
              //         source={{
              //           uri: history.Therapist.photoUrl
              //         }}
              //       />
              //     </View>
              //     <View style={tailwind('flex items-start justify-center')}>
              //       <Text 
              //         numberOfLines={1}
              //         ellipsizeMode='clip'
              //         style={tailwind('w-32 text-lg text-gray-600')}>{ history.Therapist.fullName }</Text>
              //       <Text style={tailwind('text-gray-500')}>Date: { `${new Date(history.createdAt).getDate()}/${new Date(history.createdAt).getMonth()+1}/${new Date(history.createdAt).getFullYear()}`}</Text>  
              //       <Text style={tailwind('text-gray-500')}>Start at: { `${new Date(history.createdAt).getHours()} : ${minuteFormat(new Date(history.createdAt).getMinutes())}`}</Text>
              //       <Text style={tailwind('text-gray-500')}>Duration: { history.totalHour } Hour</Text>
              //     </View>
              //     <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
              //       <TouchableOpacity
              //         onPress={() => handleDetail(history.Therapist)}
              //         style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-green-400')}>
              //         <Text 
              //           style={tailwind('text-gray-100')}
              //         >Reorder</Text>
              //       </TouchableOpacity>
              //       <TouchableOpacity
              //         onPress={() => navigation.navigate('Review')}
              //         style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-gray-100 border border-r border-green-400')}>
              //         <Text 
              //           style={tailwind('text-green-400')}
              //         >Add Review</Text>
              //       </TouchableOpacity>
              //     </View>
              //   </View>
              // </View>
            })
          ) : <Text style={tailwind('py-4 text-lg text-gray-500 tracking-wider')}>No hisroty order</Text>
        }
      </ScrollView>
    </SafeAreaView>
  )
}
