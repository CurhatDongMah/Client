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
  ActivityIndicator
} from 'react-native';
import tailwind from 'tailwind-rn';
import { getHistory, setTherapist } from '../../store/actions/client'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function ListHistory({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const [refreshing, setRefreshing] = useState(false);
  const { histories, loadingClient } = useSelector(state => state.client)
  console.log(histories, 'list');
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHistory())
  }, [])
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(getHistory())
    wait(2000).then(() => setRefreshing(false))
  }, []);
  const handleDetail = (therapist) => {
    dispatch(setTherapist(therapist))
    navigation.navigate('Detail')
  }
  
  const Item = ( history ) => (
    <View style={{ width: widthWindow * 9 / 10 }}>
      <View style={tailwind('flex flex-row mt-4 rounded-xl py-4 bg-gray-100 justify-start')}>
        <View style={tailwind('px-5 flex items-center justify-center')}>
          <Image 
            style={tailwind('w-12 h-12 rounded-full')}
            source={{
              uri: history.title.Therapist.photoUrl
            }}
          />
        </View>
        <View style={tailwind('flex items-start justify-center')}>
          <Text 
            numberOfLines={1}
            ellipsizeMode='clip'
            style={tailwind('w-32 text-base text-gray-500')}>{ history.title.Therapist.fullName }</Text>
          <Text style={tailwind('text-gray-500')}>Date: { `${new Date(history.title.createdAt).getDate()}/${new Date(history.title.createdAt).getMonth()+1}/${new Date(history.title.createdAt).getFullYear()}`}</Text>  
          <Text style={tailwind('text-gray-500')}>Start at: { `${new Date(history.title.createdAt).getHours()} : ${new Date(history.title.createdAt).getMinutes()}`}</Text>
          <Text style={tailwind('text-gray-500')}>Duration: { history.title.totalHour } Hour</Text>
          <Text style={tailwind('text-gray-400')}>{ history.title.Therapist.city }</Text>
        </View>
        <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
          <TouchableOpacity
            onPress={() => handleDetail(history.title.Therapist)}
            style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-green-400')}>
            <Text 
              style={tailwind('text-gray-100')}
            >Reorder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Review')}
            style={tailwind('items-center mt-2 py-1 px-2 rounded-lg bg-gray-100 border border-r border-green-400')}>
            <Text 
              style={tailwind('text-green-400')}
            >Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item} />
  );

    
  if (loadingClient) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color="34D399" size="large" />
      </View>
    )
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
      <View style={tailwind('pt-12')}>
        <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>LIST HISTORY</Text>
        <FlatList
          style={tailwind('mb-5')}
          data={histories}
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
      </View>
    </SafeAreaView>
  )
}
