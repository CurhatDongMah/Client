import React, { useEffect, useState, useCallback } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { getTherapists } from '../../store/actions/therapist';
import { setTherapist, getOnGoingOrder, setCompletedOrder } from '../../store/actions/client';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Profile({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const { client, onGoingOrders } = useSelector(state => state.client)
  const [refreshing, setRefreshing] = useState(false);
  console.log(onGoingOrders, 'di profile');
  console.log(onGoingOrders.length, 'di profile');
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    dispatch(getTherapists())
    dispatch(getOnGoingOrder())
    wait(2000).then(() => setRefreshing(false))
  }, []);
  const ARR = [1,2,3,4,5]
  const dispatch = useDispatch()
  const { therapists, error, loading } = useSelector(state => state.therapist)
  const handleDetail = (therapist) => {
    dispatch(setTherapist(therapist))
    navigation.navigate('Detail')
  }

  useEffect(() => {
    dispatch(getTherapists())
    dispatch(getOnGoingOrder())
  }, [])

  const Item = ({ therapist }) => (
    <View style={{ width: widthWindow * 9 / 10 }}>
      <View style={tailwind('flex flex-row mt-4 rounded-xl py-4 bg-gray-50 justify-start')}>
        <View style={tailwind('px-5 flex items-center justify-center')}>
          <Image 
            style={tailwind('w-12 h-12 rounded-full')}
            source={{
              uri: therapist.photoUrl
            }}
          />
        </View>
        <View style={tailwind('flex items-start justify-center')}>
          <Text 
            numberOfLines={1}
            ellipsizeMode='clip'
            style={tailwind('w-36 text-base text-gray-500')}>{therapist.fullName}</Text>
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
              ) : <Text>No Review</Text>
            }
          </View>
          <Text style={tailwind('text-gray-400')}>Jakarta</Text>
          <Text style={tailwind('text-gray-500')}>IDR {therapist.price}/h</Text>
        </View>
        <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
          <TouchableOpacity
            onPress={() => handleDetail(therapist)}
            style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-gray-100 border border-r border-green-400')}>
            <Text 
              style={tailwind('text-green-400')}
            >Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => navigation.navigate('ChatRoom', { therapist })} 
            style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-green-400 border border-r border-green-400')}>
            <Text 
              style={tailwind('text-gray-100')}
            >Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item therapist={item} />
  );
  return (
    <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
      <View style={tailwind('flex flex-row pt-16 pb-8 w-full justify-center border-b-4 border-green-400')}>
        <View>
          <Image 
            style={tailwind('w-20 h-20 rounded-full')}
            source={{
              uri: client.photoUrl
            }}
          />
        </View>
        <View style={tailwind('flex items-center justify-center px-10')}>
          <Text style={tailwind('text-2xl text-gray-600')}>{ client.fullName }</Text>
          <Text style={tailwind('text-lg text-gray-500')}>{ client.city }</Text>
          <Text style={tailwind('text-lg text-gray-500')}>{ client.gender }</Text>
        </View>
      </View>
      {
        onGoingOrders.length ? (
          <View style={{ width: widthWindow * 9 / 10 }}>
            <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>ON GOING</Text>
            <View style={tailwind('flex flex-row mt-4 rounded-xl py-4 bg-gray-50 justify-start')}>
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
                  style={tailwind('w-32 text-base text-gray-500')}>{ onGoingOrders[0].Therapist.fullName }</Text>
                <Text style={tailwind('text-gray-500')}>{ onGoingOrders[0].Therapist.createdAt }</Text>
                <Text style={tailwind('text-gray-500')}>{ onGoingOrders[0].Therapist.updatedAt }</Text>
                <Text style={tailwind('text-gray-400')}>{ onGoingOrders[0].Therapist.city }</Text>
              </View>
              <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
                <TouchableOpacity
                  onPress={() => dispatch(setCompletedOrder(onGoingOrders[0].id))}
                  style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-gray-100 border border-r border-green-400')}>
                  <Text 
                    style={tailwind('text-green-400')}
                  >Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => navigation.navigate('ChatRoom', { therapist: onGoingOrders[0].Therapist })} 
                  style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-green-400 border border-r border-green-400')}>
                  <Text 
                    style={tailwind('text-gray-100')}
                  >Chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <>
            <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>CHOOSE A THERAPIST</Text>
            <FlatList
              style={tailwind('mb-5')}
              data={therapists}
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
          </>
        )
      }
    </SafeAreaView>
  )
}
