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
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import minuteFormat from '../../helpers/minuteFormat';
import { getClients } from '../../store/actions/client';
import { getHistoryTherapist } from '../../store/actions/therapist'
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

  // const Item = ( history ) => (
  //   <View style={{ width: widthWindow * 9 / 10 }}>
  //     <View style={tailwind('flex flex-row my-2 rounded-xl py-2 bg-gray-100 justify-start')}>
  //       <View style={tailwind('px-5 flex items-center justify-center')}>
  //         <Image 
  //           style={tailwind('w-12 h-12 rounded-full')}
  //           source={{
  //             uri: history.Client.photoUrl
  //           }}
  //         />
  //       </View>
  //       <View style={tailwind('flex items-start justify-center px-2')}>
  //         <Text 
  //           numberOfLines={1}
  //           ellipsizeMode='clip'
  //           style={tailwind('w-24 text-lg text-gray-500')}>{history.title.Client.fullName}</Text>
  //         <Text style={tailwind('text-gray-400 text-base')}>{history.title.Client.city}</Text>
  //         <TouchableOpacity
  //           onPress={async () => navigation.navigate('Messages', { screen: 'ChatRoom', params: {client: history.title.Client }})} 
  //           style={tailwind('items-center my-1 px-6 rounded border border-r border-green-400')}>
  //           <Text 
  //             style={tailwind('text-green-400')}
  //           >Chat</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={tailwind('mx-2 border-l border-gray-200 px-3 flex justify-center')}>
  //         <Text style={tailwind('text-gray-500 text-base')}>Date: { `${new Date(history.title.createdAt).getDate()}/${new Date(history.title.createdAt).getMonth()+1}/${new Date(history.title.createdAt).getFullYear()}`}</Text>
  //         <Text style={tailwind('text-gray-500 text-base')}>Start at: { `${new Date(history.title.createdAt).getHours()} : ${new Date(history.title.createdAt).getMinutes()}`}</Text>
  //         <Text style={tailwind('text-gray-500 text-base')}>Duration: { history.title.totalHour } Hour</Text>
  //       </View>
  //     </View>
  //   </View>
  // );

  // const renderItem = ({ item }) => (
  //   <Item title={item} />
  // );

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
                    <View key={history.id} style={{ width: widthWindow * 9 / 10 }}>
                      <View style={tailwind('flex flex-row my-2 rounded-xl py-2 bg-gray-100 justify-start')}>
                        <View style={tailwind('px-5 flex items-center justify-center')}>
                          <Image 
                            style={tailwind('w-12 h-12 rounded-full')}
                            source={{
                              uri: history.Client.photoUrl
                            }}
                          />
                        </View>
                        <View style={tailwind('flex items-start justify-center px-2')}>
                          <Text 
                            numberOfLines={1}
                            ellipsizeMode='clip'
                            style={tailwind('w-24 text-lg text-gray-500')}>{history.Client.fullName}</Text>
                          <Text style={tailwind('text-gray-400 text-base')}>{history.Client.city}</Text>
                          <TouchableOpacity
                            onPress={async () => navigation.navigate('Messages', { screen: 'ChatRoom', params: {client: history.Client }})} 
                            style={tailwind('items-center my-1 px-6 rounded border border-r border-green-400')}>
                            <Text 
                              style={tailwind('text-green-400')}
                            >Chat</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={tailwind('mx-2 border-l border-gray-200 px-3 flex justify-center')}>
                          <Text style={tailwind('text-gray-500 text-base')}>Date: { `${new Date(history.createdAt).getDate()}/${new Date(history.createdAt).getMonth()+1}/${new Date(history.createdAt).getFullYear()}`}</Text>
                          <Text style={tailwind('text-gray-500 text-base')}>Start at: { `${new Date(history.createdAt).getHours()} : ${minuteFormat(new Date(history.createdAt).getMinutes())}`}</Text>
                          <Text style={tailwind('text-gray-500 text-base')}>Duration: { history.totalHour } Hour</Text>
                        </View>
                      </View>
                    </View>
                  ) 
                })
              ) : <Text style={tailwind('py-4 text-lg text-gray-500 tracking-wider')}>No history order</Text>
            }
          </ScrollView>
          {/* {
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
          } */}
      </SafeAreaView>
    )
  }
}
