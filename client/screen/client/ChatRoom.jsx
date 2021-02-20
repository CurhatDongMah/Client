import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import tailwind from 'tailwind-rn';
import { useState } from 'react';
import 'firebase/firestore'
import firestore from '../../helpers/FirebaseSVC';
import firebase from 'firebase'

export default function ChatRoom({ navigation, route }) {
  const therapist = route.params.therapist
  const roomId = therapist.fullName

  const messagesRef = firestore.collection(roomId); // ambil collectionnya
  const query = messagesRef.orderBy('createdAt', 'desc').limit(25); // sort isi collectionnya
  const [messages] = useCollectionData(query, { idField: '_id' });


  const sendMessage = async (user, message, roomId) => {
    const messagesRef = firestore.collection(roomId); // ambil collectionnya
    const { _id, text, createdAt } = message[0]
    await messagesRef.add({
      _id,
      text,
      createdAt: Date.parse(createdAt),
      user
    })
      .then(ref => console.log(ref._id))
      .catch(err => console.log(err))
  }

  function handleSendMessage (message) {
    const user = {
      _id: 1,
      name: "userclient 1",
      avatar: 'https://placeimg.com/140/140/any',
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
      />
    </>
  )
}