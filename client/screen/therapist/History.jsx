import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import { getClients } from '../../store/actions/client';
import { getHistoryTherapist } from '../../store/actions/therapist'
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ListHistory({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const [refreshing, setRefreshing] = useState(false);
  const { historiesTherapist, loading, error } = useSelector(state => state.therapist)
  console.log(historiesTherapist, 'list history');
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHistoryTherapist())
  }, [])
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(getHistoryTherapist())
    wait(2000).then(() => setRefreshing(false))
  }, []);
    useEffect(() => {
    dispatch(getClients())
  }, [])

  const Item = ( history ) => (
    <View style={{ width: widthWindow * 8 / 10 }}>
      <View style={tailwind('flex flex-row mt-4 rounded-xl py-4 bg-gray-50 justify-start mb-5')}>
        <View style={tailwind('px-5 flex items-center justify-center')}>
          <Image 
            style={tailwind('w-12 h-12 rounded-full')}
            source={{
              uri: history.title.Client.photoUrl
            }}
          />
        </View>
        <View style={tailwind('flex items-start justify-center px-3')}>
          <Text 
            numberOfLines={1}
            ellipsizeMode='clip'
            style={tailwind('text-base text-gray-500')}>{history.title.Client.fullName}</Text>

          <Text style={tailwind('text-gray-400')}>{history.title.Client.city}</Text>
          <TouchableOpacity
            onPress={async () => navigation.navigate('ChatRoom', { client: history.title.Client })} 
            style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-green-500 border border-r border-green-400')}>
            <Text 
              style={tailwind('text-gray-100')}
            >Chat</Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind('mx-2 border-l border-gray-200 px-3 flex items-center justify-center')}>
          <Text style={tailwind('text-gray-500')}>Date: { `${new Date(history.title.createdAt).getDate()}/${new Date(history.title.createdAt).getMonth()+1}/${new Date(history.title.createdAt).getFullYear()}`}</Text>
          <Text style={tailwind('text-gray-500')}>Start at: { `${new Date(history.title.createdAt).getHours()} : ${new Date(history.title.createdAt).getMinutes()}`}</Text>
          <Text style={tailwind('text-gray-500')}>Duration: { history.title.totalHour } Hour</Text>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item} />
  );

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
          <View style={tailwind('flex flex-row pt-16 pb-8 w-full justify-center border-b-4 border-green-400')}>
            <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>List History</Text>
          </View>
          {
            historiesTherapist.length 
              ? (
                <FlatList
                  data={historiesTherapist}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                  }
                />
              ) 
              : <Text>No History</Text>
          }
      </SafeAreaView>
    )
  }
}
