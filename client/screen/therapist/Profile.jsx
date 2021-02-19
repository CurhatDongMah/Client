import React, { useState } from 'react'
import { SafeAreaView, Text, View, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tailwind from 'tailwind-rn';
import { Toggle } from '@ui-kitten/components';

export default function Profile({ navigation }) {

  const [checked, setChecked] = useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
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
          onPress={() => navigation.navigate('Detail')} 
          style={tailwind('items-center py-1 px-6 rounded-full bg-green-500 border-2 border-green-500')}>
          <Text 
            style={tailwind('text-xl text-gray-100')}
          >Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  return (
    <SafeAreaView style={tailwind('flex-1 items-center')}>
      <View style={tailwind('flex flex-row py-8 bg-white w-full justify-center')}>
        <View>
          <Image 
            style={tailwind('w-20 h-20 rounded-full')}
            source={{
              uri: 'https://picsum.photos/id/237/200/300'
            }}
          />
        </View>
        <View style={tailwind('flex items-center justify-center px-10')}>
          <Toggle checked={checked} onChange={onCheckedChange}>
            {`Checked: ${checked}`}
          </Toggle>
          <Text style={tailwind('text-2xl')}>John Doe</Text>
          <Text style={tailwind('text-lg')}>Jakarta</Text>
          <Text style={tailwind('text-lg text-gray-400')}>Male</Text>
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});