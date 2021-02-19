import React from 'react'
import { SafeAreaView, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function ListHistory({ navigation }) {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6w',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d7v',
      title: 'Third Item',
    },
  ];

  const Item = ({ title }) => (
    <View style={tailwind('flex flex-row my-2 rounded-xl py-6 bg-white w-80 justify-center')}>
      <View>
        <Image 
          style={tailwind('w-20 h-20 rounded-full')}
          source={{
            uri: 'https://picsum.photos/id/237/200/300'
          }}
        />
      </View>
      <View style={tailwind('flex items-center justify-center px-10')}>
        <Text style={tailwind('text-2xl')}>John Doe</Text>
        <View style={tailwind('flex flex-row items-center')}>
          <Ionicons name='star' color='yellow'/>
          <Ionicons name='star' color='yellow'/>
          <Ionicons name='star' color='yellow'/>
          <Ionicons name='star' color='yellow'/>
          <Ionicons name='star' color='yellow'/>
        </View>
        <Text style={tailwind('text-lg text-gray-400')}>IDR 100.000/h</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Review')} 
          style={tailwind('items-center py-1 px-6 rounded-full bg-green-500 border-2 border-green-500')}>
          <Text 
            style={tailwind('text-xl text-gray-100')}
          >Give Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  return (
    <SafeAreaView style={tailwind('flex-1 items-center')}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}
