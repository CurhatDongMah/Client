import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { TouchableOpacity, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'base-64';
import tailwind from 'tailwind-rn';
import { setOnGoingOrder } from '../../store/actions/client'

// const orderId = new Date().getTime()

export default function App({ navigation }) {
	const [mid, setMid] = useState(false)
  const [complete, setComplete] = useState(false)
	const { therapistDetail, client, order } = useSelector(state => state.client)
  console.log(therapistDetail, 'di payment');
	const dispatch = useDispatch()
  useEffect(() => {
    console.log('change')
  }, [mid.redirect_url])
	useEffect(() => {
    midtrans()
    .then(data => {
      console.log(data)
      setMid(data)
    })
    .catch(err => {
      console.log(err)
    })
	}, [])
	async function midtrans() {
		const url = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
		const serverKey = 'SB-Mid-server-Q9D7Se5Y3_wBnvNBq-4GEme5:';
		const base64Key = base64.encode(serverKey);

		const data = {
			transaction_details: {
				order_id: order.id,
				gross_amount: therapistDetail.price,
			},
			item_details: [
				{
					id: therapistDetail.id,
					price: therapistDetail.price,
					quantity: 1,
					name: therapistDetail.fullName
				}
			],
			customer_details: {
				fullName: client.fullName,
				email: client.email
			},
		};

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + base64Key,
			},
			body: JSON.stringify(data),
		});
		return response.json();
	}

  async function check() {
		const url = `https://api.sandbox.midtrans.com/v2/${order.id}/status`;
		const serverKey = 'SB-Mid-server-Q9D7Se5Y3_wBnvNBq-4GEme5:';
		const base64Key = base64.encode(serverKey);

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + base64Key,
			},
		});
		return response.json();
	}
	return (
    <>
      <WebView
        source={{
          uri: mid.redirect_url,
        }}
        style={tailwind('flex-1 justify-center items-center mt-6')}
      />
      <TouchableOpacity
        onPress={() => {
          check().then((data) => {
            console.log(data.status_code)
            if (data.status_code == 200) {
              setComplete(true)
							// change status order to on going
							dispatch(setOnGoingOrder(order.id))
              navigation.navigate('Success')
            } else {
							alert('Your payment has not been complete')
						}
          })
        }}
        style={tailwind('absolute p-5 h-20 w-20 bottom-16 right-5 flex justify-center items-center bg-gray-800 bg-opacity-80 rounded-full')}>
        <Text 
          style={tailwind('text-base text-gray-100')}
        >Done</Text>
      </TouchableOpacity>
    </>
	);
}

