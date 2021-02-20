import axios from 'axios'
import * as SecureStore from 'expo-secure-store';

const getClients = () => {
  return async () => {
    try {
      dispatch({
        type: 'LOADING_GET_CLIENTS'
      })
  
      const res = await fetch(`https://localhost:3000/clients`)
      const payload = await res.json()
      dispatch({
        type: 'SAVE_CLIENTS', payload: payload
      })    
    } catch (error) {
      dispatch({
        type: 'ERROR_GET_CLIENTS', payload: error
      })
    }
  }
}

const clientRegister = (payload) => {
  return async (dispatch) => {
    try {
      const resRegister = await axios({
        method: 'POST',
        url: `http://192.168.43.213:3000/client/register`,
        data: payload
      })
      if (resRegister) {
        dispatch({
          type: 'SUCCESS_REGISTER'
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
        url: `http://192.168.43.213:3000/client/login`,
        data: payload
      })
      console.log(res.data.access_token, 'access_token')
      console.log(res.data.email, 'email')
      if (res.data) {
        await SecureStore.setItemAsync('access_token', res.data.access_token)
        await SecureStore.setItemAsync('email', res.data.email)
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export {
  getClients,
  clientRegister
}