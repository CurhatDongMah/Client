import React from 'react'
import { Text, ActivityIndicator, View } from 'react-native';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import 'firebase/firestore'
import firestore from '../../helpers/FirebaseSVC';
import { useSelector } from 'react-redux';
import tailwind from 'tailwind-rn'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ChatRoom({ navigation, route }) {
  const therapist = route.params.therapist
  const { client, loading: loadingClient, error: errorClient } = useSelector(state => state.client)

  const roomId = client.email + "-" + therapist.email

  const messagesRef = firestore.collection('ChatRoom').doc(roomId).collection(roomId); // ambil collectionnya
  const query = messagesRef.orderBy('createdAt', 'desc').limit(100); // sort isi collectionnya
  const [messages] = useCollectionData(query, { idField: '_id' })


  const sendMessage = async (user, message, roomId) => {
    const { _id, text, createdAt } = message[0]
    const roomMessage = firestore.collection('ChatRoom').doc(roomId)
    await roomMessage.set({
      createdAt: Date.parse(createdAt),
      therapistEmail: therapist.email,
      clientEmail: client.email,
      lastMessage: text
    })
    .then(ref => console.log('message room created'))
    .catch(err => console.log('message not sent'))
    const messagesRef = firestore.collection('ChatRoom').doc(roomId).collection(roomId); // ambil collectionnya
    await messagesRef.add({
      _id,
      text,
      createdAt: Date.parse(createdAt),
      user
    })
      .then(ref => console.log('message sent'))
      .catch(err => console.log('message not sent'))
  }

  function handleSendMessage (message) {
    const user = {
      _id: client.email,
      name: client.fullName,
      avatar: client.photoUrl,
    }
    sendMessage(user, message, roomId)
  }
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
  return (<>
      <View style={tailwind('flex flex-row pt-12 pb-6 w-full justify-center border-b-2 border-green-400 relative')}>
        <Text style={tailwind('py-2 text-lg text-gray-600')}>{ therapist.fullName }</Text>
        <Ionicons 
          onPress={() => navigation.navigate('Inbox')}
          style={tailwind('mx-1 text-green-400 text-3xl absolute bottom-6 left-2')} name='arrow-back'
        />
      </View>
    <GiftedChat
      messages={messages}
      onSend={message => handleSendMessage(message)}
      user={{
        _id: client.email,
        name: client.fullName,
        avatar: client.photoUrl
      }}
      />
    </>
  )
}