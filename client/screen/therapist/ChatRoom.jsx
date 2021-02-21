import React from 'react'
import { Text, View } from 'react-native';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import 'firebase/firestore'
import firestore from '../../helpers/FirebaseSVC';
import { useSelector } from 'react-redux';

export default function ChatRoom({ navigation, route }) {
  const client = route.params.client
  const { therapist } = useSelector(state => state.therapist)

  const roomId = client.email + "-" + therapist.email

  const messagesRef = firestore.collection('ChatRoom').doc(roomId).collection(roomId); // ambil collectionnya
  const query = messagesRef.orderBy('createdAt', 'desc').limit(25); // sort isi collectionnya
  const [messages] = useCollectionData(query, { idField: '_id' });


  const sendMessage = async (user, message, roomId) => {
    const messagesRef = firestore.collection('ChatRoom').doc(roomId).collection(roomId); // ambil collectionnya
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
      _id: therapist.email,
      name: therapist.fullName,
      avatar: therapist.photoUrl,
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
        _id: therapist.email,
        name: therapist.fullName,
        avatar: therapist.photoUrl
      }}
      />
    </>
  )
}