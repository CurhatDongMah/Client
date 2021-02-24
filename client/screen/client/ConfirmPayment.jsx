import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  SafeAreaView,
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import tailwind from 'tailwind-rn';
import curencyFormat from '../../helpers/curencyFormat'
import { deleteOrder } from '../../store/actions/client'
import OrderDetail from '../../components/OrderDetail'

export default function ConfirmPayment({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const { therapistDetail, order, loading: loadingClient, error: errorClient } = useSelector(state => state.client)
  const dispatch = useDispatch()
  const handleDelete = async () => {
    await dispatch(deleteOrder(order.id))
    navigation.navigate('ListTherapist')
  }
  if (loadingClient) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color="34D399" size="large" />
      </View>
    )
  }
  if (errorClient) {
    return (
      <View style={tailwind('flex-1 justify-center items-center bg-white')}>
        <Image 
          style={tailwind('w-full h-80')}
          source={require('../../assets/error.png')}
        />
        <Text style={tailwind('py-2 text-lg text-gray-400 font-bold tracking-wider')}>Oppss, something error...</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
      <OrderDetail 
        therapistDetail={therapistDetail}
        order={order}
        handleDelete={handleDelete}
        handlePayment={() => navigation.navigate('Payment')}
      />
    </SafeAreaView>
  )
}
