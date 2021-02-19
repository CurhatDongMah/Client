import React from 'react'
import { SafeAreaView, Text, View, Image, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';

export default function Profile({ navigation }) {
  const widthWindow = useWindowDimensions().width
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
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f61',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d7b',
      title: 'Third Item',
    },
  ];

  const Item = ({ title }) => (
    <View style={{ width: widthWindow * 9 / 10 }}>
      <View style={tailwind('flex flex-row mt-4 rounded-xl py-4 bg-gray-50 justify-start')}>
        <View style={tailwind('px-5 flex items-center justify-center')}>
          <Image 
            style={tailwind('w-12 h-12 rounded-full')}
            source={{
              uri: 'https://picsum.photos/id/237/200/300'
            }}
          />
        </View>
        <View style={tailwind('flex items-start justify-center')}>
          <Text 
            numberOfLines={1}
            ellipsizeMode='clip'
            style={tailwind('w-36 text-base text-gray-500')}>Mama Dedeh Alexandersdsdsdadsas</Text>
          <View style={tailwind('flex flex-row items-center')}>
            <Ionicons style={tailwind('mr-1 text-yellow-500 text-base')} name='star'/>
            <Ionicons style={tailwind('mr-1 text-yellow-500 text-base')} name='star'/>
            <Ionicons style={tailwind('mr-1 text-yellow-500 text-base')} name='star'/>
            <Ionicons style={tailwind('mr-1 text-yellow-500 text-base')} name='star'/>
            <Ionicons style={tailwind('mr-1 text-yellow-500 text-base')} name='star'/>
          </View>
          <Text style={tailwind('text-gray-400')}>Jakarta</Text>
        </View>
        <View style={tailwind('mx-2 border-l border-gray-200 px-3')}>
          <Text style={tailwind('text-gray-500')}>IDR 100.000/h</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail')}
            style={tailwind('items-center mt-2 py-1 px-4 rounded-lg bg-gray-100 border border-r border-green-400')}>
            <Text 
              style={tailwind('text-green-400')}
            >Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  return (
    <SafeAreaView style={tailwind('flex-1 items-center bg-white')}>
      <View style={tailwind('flex flex-row pt-16 pb-8 w-full justify-center border-b-4 border-green-400')}>
        <View>
          <Image 
            style={tailwind('w-20 h-20 rounded-full')}
            source={{
              uri: 'https://picsum.photos/id/237/200/300'
            }}
          />
        </View>
        <View style={tailwind('flex items-center justify-center px-10')}>
          <Text style={tailwind('text-2xl text-gray-500')}>John Doe</Text>
          <Text style={tailwind('text-lg text-gray-500')}>Jakarta</Text>
          <Text style={tailwind('text-lg text-gray-500')}>Male</Text>
        </View>
      </View>
      <Text style={tailwind('py-2 text-lg text-gray-400 tracking-wider')}>CHOOSE A THERAPIST</Text>
      <FlatList
        style={tailwind('')}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}
