import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import tailwind from 'tailwind-rn';
import { useState } from 'react';
import 'firebase/firestore'
import firestore from '../../helpers/FirebaseSVC';


export default function ChatRoom({ navigation, route }) {
  const therapist = route.params.therapist
  const roomId = 'masuk'

  const messagesRef = firestore.collection(roomId); // ambil collectionnya
  const query = messagesRef.orderBy('createdAt').limit(25); // sort isi collectionnya
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [messageId, setMessageId] = useState('');


  async function sendMessage (user, message, roomId) {
    const messagesRef = firestore.collection(roomId); // ambil collectionnya
    await messagesRef.add({
      user
    })
      .then(ref => setMessageId(ref.id))
  console.log(messageId);
    await messagesRef.doc(messageId)
      .set({
        _id: messageId,
        text: message[0].text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }, { merge: true })
  }

  function handleSendMessage (message) {
    const user = {
      _id: 1,
      name: "userclient 1",
      avatar: 'https://placeimg.com/140/140/any',
    }

    console.log(user, message, roomId);
    sendMessage(user, message, roomId)
  }

  return (<>
    <View style={{marginTop: 70, marginLeft: 30}}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>{therapist.fullName}</Text>
    </View>
    <GiftedChat
      messages={messages}
      onSend={message => handleSendMessage(message)}
      />
    </>
  )
}