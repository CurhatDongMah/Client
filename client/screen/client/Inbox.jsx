import React, { useEffect } from 'react'
import { 
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions
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
  const query = messagesRef.limit(25); // sort isi collectionnya
  const [messages] = useCollectionData(query, { idField: '_id' })
  const dispatch = useDispatch()
  const { allTherapists, error, loading } = useSelector(state => state.therapist)
  let chatWith = []

  useEffect(() => {
    dispatch(getAllTherapists())
  }, [])


  if (messages && allTherapists) {
    for (let i = 0; i < messages.length; i++) {
      const roomIdEmailFromFirebase = messages[i]._id.split('-');
      if(roomIdEmailFromFirebase[0] === client.email) {
        console.log(roomIdEmailFromFirebase[1]);
        let therapist = allTherapists[allTherapists.findIndex(therapist => therapist.email === roomIdEmailFromFirebase[1])]
        chatWith.push(therapist)        
      }
    }
    console.log(chatWith);
  }

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
        </View>
        <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
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



  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error</Text>
      </View>
    )
  } else if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading</Text>
      </View>
    )
  } else {
    if (!chatWith.length) {
      return (
        <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
          <View style={tailwind('flex flex-row pt-16 pb-8 w-full justify-center border-b-4 border-green-400')}>
            <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>Inbox</Text>
          </View>
          <View style={tailwind('flex flex-row pt-16 pb-8 w-full justify-center')}>
            <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>Empty :(</Text>
          </View>
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
          <View style={tailwind('flex flex-row pt-16 pb-8 w-full justify-center border-b-4 border-green-400')}>
            <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>Inbox</Text>
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
