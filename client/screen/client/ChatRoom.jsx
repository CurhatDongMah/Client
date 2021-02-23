import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import 'firebase/firestore'
import firestore from '../../helpers/FirebaseSVC';
import { useSelector } from 'react-redux';

export default function ChatRoom({ navigation, route }) {
  const therapist = route.params.therapist
  const { client } = useSelector(state => state.client)

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

  return (<>
    <View style={{marginTop: 70, marginLeft: 30}}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>{therapist.fullName}</Text>
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