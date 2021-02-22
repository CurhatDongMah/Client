import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl
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
  const { historiesTherapist, loading } = useSelector(state => state.therapist)
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
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6w',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d7v',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d71',
      title: 'Third Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: 'Third Item',
    },
  ];
  const { clients, error } = useSelector(state => state.client)

  useEffect(() => {
    dispatch(getClients())
  }, [])

  const Item = ( history ) => (
    <View style={{ width: widthWindow * 9 / 10 }}>
      <View style={tailwind('flex flex-row mt-4 rounded-xl py-4 bg-gray-50 justify-start')}>
        <View style={tailwind('px-5 flex items-center justify-center')}>
          <Image 
            style={tailwind('w-12 h-12 rounded-full')}
            source={{
              uri: history.title.Client.photoUrl
            }}
          />
        </View>
        <View style={tailwind('flex items-start justify-center')}>
          <Text 
            numberOfLines={1}
            ellipsizeMode='clip'
            style={tailwind('text-base text-gray-500')}>{history.title.Client.fullName}</Text>
          <Text style={tailwind('text-gray-500')}>27/02/2021</Text>
          <Text style={tailwind('text-gray-500')}>09.00 : 10.00 pm</Text>
          <Text style={tailwind('text-gray-400')}>{history.title.Client.city}</Text>
          <TouchableOpacity
            onPress={async () => navigation.navigate('ChatRoom', { client: history.title.Client })} 
            style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-green-500 border border-r border-green-400')}>
            <Text 
              style={tailwind('text-gray-100')}
            >Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item} />
  );
  if (loading) {
    return <Text style={tailwind('text-gray-400 mt-20')}>Loading ...</Text>
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
      <View style={tailwind('pt-12')}>
        <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>LIST HISTORY</Text>
        {
          historiesTherapist.length ? (
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
          ) : <Text>No History</Text>
        }
      </View>
    </SafeAreaView>
  )
}
