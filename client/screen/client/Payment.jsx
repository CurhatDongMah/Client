import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'base-64';
import tailwind from 'tailwind-rn';
import { setOnGoingOrder } from '../../store/actions/client'

export default function App({ navigation }) {
	const [mid, setMid] = useState(false)
	const { therapistDetail, client, order } = useSelector(state => state.client)
	const dispatch = useDispatch()
	useEffect(() => {
    midtrans()
    .then(data => {
      setMid(data)
    })
    .catch(err => {
      alert(err)
    })
	}, [])
	// web view to react
	const webviewRef = useRef(null);
	function LoadingIndicatorView() {
    return (
			<View style={tailwind('flex-1 justify-center items-center')}>
				<ActivityIndicator color="34D399" size="large" />
			</View>
    );
  }
	async function midtrans() {
		const url = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
		const serverKey = 'SB-Mid-server-Q9D7Se5Y3_wBnvNBq-4GEme5:';
		const base64Key = base64.encode(serverKey);

		const data = {
			transaction_details: {
				order_id: order.id+77,
				gross_amount: order.totalPrice,
			},
			item_details: [
				{
					id: therapistDetail.id,
					price: therapistDetail.price,
					quantity: order.totalHour,
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
		const url = `https://api.sandbox.midtrans.com/v2/${order.id+77}/status`;
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
		!mid ? (
			<View style={tailwind('flex-1 justify-center items-center')}>
				<ActivityIndicator color="34D399" size="large" />
			</View>
		) : (
			<>
				<WebView
					source={{
						uri: mid.redirect_url,
					}}
					style={tailwind('flex-1 justify-center items-center mt-6')}
					renderLoading={LoadingIndicatorView}
          startInLoadingState={true}
					ref={webviewRef}
					onNavigationStateChange={(event) => {
						console.log(event);
						check().then((data) => {
							console.log(data.status_code)
							if (data.status_code == 200) {
								dispatch(setOnGoingOrder(order.id))
								navigation.navigate('Success')
							} 
						})
					}}
				/>
			</>
		)
	);
}
