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
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '../../helpers/FirebaseSVC'
import { useCollectionData, useDocumentOnce } from "react-firebase-hooks/firestore";
import 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTherapists } from '../../store/actions/therapist';
import tailwind from 'tailwind-rn';


export default function Inbox({navigation}) {
  const widthWindow = useWindowDimensions().width
  const { client } = useSelector(state => state.client)
  const messagesRef = firestore.collection('ChatRoom') // ambil collectionnya
  const query = messagesRef.limit(50); // sort isi collectionnya
  const [messages, loadingCollection] = useCollectionData(query, { idField: '_id' })
  const dispatch = useDispatch()
  const { allTherapists, error, loading } = useSelector(state => state.therapist)
  let chatWith = []
  
  useEffect(() => {
    dispatch(getAllTherapists())
  }, [])

  if (!messages || !allTherapists) {
    return (null)
  } else if (messages.length >= 0 && allTherapists) {
    for (let i = 0; i < messages.length; i++) {
      const roomIdEmailFromFirebase = messages[i]._id.split('-');
      if(roomIdEmailFromFirebase[0] === client.email) {
        console.log(roomIdEmailFromFirebase[1]);
        let therapist = allTherapists[allTherapists.findIndex(therapist => therapist.email === roomIdEmailFromFirebase[1])]
        therapist.lastMessage = messages[i].lastMessage
        chatWith.push(therapist)        
      }
    }
  }

  const Item = ({ therapist }) => (
    <TouchableOpacity onPress={async () => navigation.navigate('ChatRoom', { therapist })}>
      <View style={{ width: widthWindow * 9 / 10 }}>
        <View style={tailwind('flex flex-row my-2 rounded-xl py-4 bg-gray-100 justify-start')}>
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
              style={tailwind('w-36 text-lg text-gray-700')}>{therapist.fullName}</Text>
          <Text 
              numberOfLines={1}
              ellipsizeMode='clip'
              style={tailwind('w-36 text-base text-gray-500')}>{therapist.lastMessage}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item therapist={item} />
  );



  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error</Text>
      </View>
    )
  } else if (loading || loadingCollection) {
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
            <Text style={tailwind('py-2 text-lg text-gray-500 tracking-wider')}>INBOX</Text>
          </View>
          <View style={tailwind('flex-1 justify-center items-center bg-white')}>
            <Image 
              style={tailwind('w-full h-80')}
              source={require('../../assets/sad-green.png')}
            />
            <Text style={tailwind('py-2 text-lg text-gray-400 font-bold tracking-wider')}>Empty . . .</Text>
          </View>
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
          <View style={tailwind('flex flex-row pt-12 pb-6 w-full justify-center border-b-2 border-green-400')}>
            <Text style={tailwind('py-2 text-lg text-gray-500 tracking-wider')}>INBOX</Text>
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
