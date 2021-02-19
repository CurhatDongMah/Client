import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import tailwind from 'tailwind-rn';

export default function ChatRoom({ navigation, route }) {
  const therapist = route.params.therapist
  console.log(therapist);
  const messages = [
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 3,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 2,
      text: 'qweqweqwe',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]

  const renderSend = () => {
    return (
      <TouchableOpacity
        onPress={() => console.log('send')} 
        style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-green-500 border border-r border-green-400')}>
        <Text 
          style={tailwind('text-gray-100')}
        >Send</Text>
      </TouchableOpacity>
    );
  }

  return (<>
    <View style={{marginTop: 70, marginLeft: 30}}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>{therapist.fullName}</Text>
    </View>
    <GiftedChat
      messages={messages}
      onSend={console.log('send')}
      // renderSend={() => renderSend()}
      />
    </>
  )
}
