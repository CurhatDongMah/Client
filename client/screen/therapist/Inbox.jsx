import React, { useEffect } from 'react'
import { 
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator
 } from 'react-native';
import firestore from '../../helpers/FirebaseSVC'
import { useCollectionData } from "react-firebase-hooks/firestore";
import 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import { getClients } from '../../store/actions/client';


export default function Inbox({navigation}) {
  const widthWindow = useWindowDimensions().width
  const { therapist, loading: therapistLoading, error: errorTherapist } = useSelector(state => state.therapist)
  const messagesRef = firestore.collection('ChatRoom') // ambil collectionnya
  const query = messagesRef.limit(50); // sort isi collectionnya
  const [messages, loadingCollection] = useCollectionData(query, { idField: '_id' })
  const dispatch = useDispatch()
  const { clients, error: errorClient, loading: clientLoading } = useSelector(state => state.client)
  let chatWith = []

  useEffect(() => {
    dispatch(getClients())
  }, [])


  if (!messages || !clients) {
    return (null)
  } else if (messages.length >= 0 && clients) {
    for (let i = 0; i < messages.length; i++) {
      const roomIdEmailFromFirebase = messages[i]._id.split('-');
      if(roomIdEmailFromFirebase[1] === therapist.email) {
        let client = clients[clients.findIndex(client => client.email === roomIdEmailFromFirebase[0])]
        client.lastMessage = messages[i].lastMessage
        console.log(client);
        chatWith.push(client)        
      }
    }
  }

  const Item = ({ client }) => (
    <TouchableOpacity onPress={async () => navigation.navigate('ChatRoom', { client })} >
      <View style={{ width: widthWindow * 9 / 10 }}>
        <View style={tailwind('flex flex-row mt-4 rounded-xl py-4 bg-gray-100 justify-start')}>
          <View style={tailwind('px-5 flex items-center justify-center')}>
            <Image 
              style={tailwind('w-12 h-12 rounded-full')}
              source={{
                uri: client.photoUrl
              }}
            />
          </View>
          <View style={tailwind('flex items-start justify-center')}>
            <Text 
              numberOfLines={1}
              ellipsizeMode='clip'
              style={tailwind('w-36 text-base text-black')}>{client.fullName}</Text>
            <Text 
              numberOfLines={1}
              ellipsizeMode='clip'
              style={tailwind('w-36 text-base text-gray-500')}>{client.lastMessage}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderItem = ({ item }) => (
    <Item client={item} />
  )

  if (errorTherapist || errorClient) {
    return (
      <View style={tailwind('flex-1 justify-center items-center bg-white')}>
        <Image 
          style={tailwind('w-full h-80')}
          source={require('../../assets/error.png')}
        />
        <Text style={tailwind('py-2 text-lg text-gray-400 font-bold tracking-wider')}>Oppss, something error...</Text>
      </View>
    )
  } else if (therapistLoading || clientLoading || loadingCollection) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color="34D399" size="large" />
      </View>
    )
  } else {
    if (!chatWith.length) {
      return (
        <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
          <View style={tailwind('flex flex-row pt-12 pb-6 w-full justify-center border-b-2 border-green-400')}>
            <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>INBOX</Text>
          </View>
          <View style={tailwind('flex-1 justify-center items-center bg-white')}>
            <Image 
              style={tailwind('w-full h-80')}
              source={require('../../assets/empty.png')}
            />
            <Text style={tailwind('py-2 text-lg text-green-400 font-bold tracking-wider')}>No order yet ...</Text>
          </View> 
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
          <View style={tailwind('flex flex-row pt-12 pb-6 w-full justify-center border-b-2 border-green-400')}>
            <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>INBOX</Text>
          </View>
          <FlatList
              style={tailwind('mb-5')}
              data={chatWith}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
      ) 
    }
  }

}
