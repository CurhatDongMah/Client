import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
const baseUrl = 'http://192.168.43.213:3000' //arif
// const baseUrl = 'http://192.168.0.10:3000' //obed

const getClients = () => {
  return async (dispatch) => {
    try {
      const access_token = await SecureStore.getItemAsync('access_token')
      dispatch({
        type: 'LOADING_GET_CLIENTS'
      })
  
      const res = await axios({
        method: 'GET',
        url: `${baseUrl}/client/all`,
        headers: {access_token}
      })
      dispatch({
        type: 'SAVE_CLIENTS', payload: res.data
      })    
    } catch (error) {
      dispatch({
        type: 'ERROR_GET_CLIENTS', payload: error
      })
    }
  }
}

export const clientRegister = (payload) => {
  return async (dispatch) => {
    try {
      const resRegister = await axios({
        method: 'POST',
        url: `${baseUrl}/client/register`,
        data: payload
      })
      if (resRegister) {
        dispatch({
          type: 'CLIENT_SUCCESS_REGISTER'
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const clientLogin = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${baseUrl}/client/login`,
        data: payload
      })
      console.log(res.data)
      console.log(res.data.access_token, 'access_token')
      console.log(res.data.data.email, 'email')
      if (res.data) {
        await SecureStore.setItemAsync('access_token', res.data.access_token)
        dispatch({
          type: 'SAVE_CLIENT',
          payload: res.data.data
        })
      }
    } catch (error) {
      console.log(error, 'action');
    }
  }
}

export const setTherapist = (payload) => {
  return (dispatch) => {
    console.log(payload);
    dispatch({
      type: 'SET_THERAPIST',
      payload: payload
    })
  }
}

export const createOrder = (payload) => {
  return async (dispatch) => {
    try {
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'POST',
        url: `${baseUrl}/client/order`,
        data: { TherapistId: payload },
        headers: { access_token }
      })
      console.log(res.data, 'order di action');
      dispatch({
        type: 'CREATE_ORDER',
        payload: res.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export {
  getClients
}