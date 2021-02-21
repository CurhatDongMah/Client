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
  RefreshControl
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';
import { getHistory } from '../../store/actions/client'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function ListHistory({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const [refreshing, setRefreshing] = useState(false);
  const { histories } = useSelector(state => state.client)
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

  const Item = ( history ) => (
    <View style={{ width: widthWindow * 9 / 10 }}>
      <View style={tailwind('flex flex-row mt-4 rounded-xl py-4 bg-gray-50 justify-start')}>
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
          <Text style={tailwind('text-gray-500')}>{ history.title.Therapist.createdAt }</Text>
          <Text style={tailwind('text-gray-500')}>{ history.title.Therapist.updatedAt }</Text>
          <Text style={tailwind('text-gray-400')}>{ history.title.Therapist.city }</Text>
        </View>
        <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail')}
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
            >Give a Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item} />
  );
  return (
    <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
      <View style={tailwind('pt-12')}>
        <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>LIST HISTORY</Text>
        <FlatList
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
