import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
const baseUrl = 'http://192.168.43.213:3000' //arif
// const baseUrl = 'http://192.168.0.10:3000' //obed
// const baseUrl = 'http://192.168.8.104:3000' //riva

const getClients = () => {
  return async (dispatch) => {
    try {
      const access_token = await SecureStore.getItemAsync('access_token')
      dispatch({
        type: 'LOADING_GET_CLIENTS'
      })
  
      const res = await axios({
        method: 'GET',
        url: `${baseUrl}/therapist/clients`,
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
      console.log(payload, 'order');
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'POST',
        url: `${baseUrl}/client/order`,
        data: payload,
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

export const getHistory = () => {
  return async (dispatch) => {
    try {
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'GET',
        url: `${baseUrl}/client/history`,
        headers: {access_token}
      })
      dispatch({
        type: 'SAVE_HISTORIES',
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: 'ERROR_GET_CLIENTS', payload: error
      })
    }
  }
}

export const getOnGoingOrder = () => {
  return async (dispatch) => {
    try {
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'GET',
        url: `${baseUrl}/client/ongoing`,
        headers: {access_token}
      })
      console.log(res.data , 'ongoing');
      dispatch({
        type: 'SAVE_ON_GOING',
        payload: res.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export const setOnGoingOrder = (id) => {
  return async (dispatch) => {
    try {
      console.log(id, 'id order');
      const access_token = await SecureStore.getItemAsync('access_token')
      const status = 'ongoing'
      const res = await axios({
        method: 'PATCH',
        url: `${baseUrl}/client/order/${id}`,
        data: {status},
        headers: {access_token}
      })
      console.log(res.data , 'change status ongoing')
      const resOnGoing = await axios({
        method: 'GET',
        url: `${baseUrl}/client/ongoing`,
        headers: {access_token}
      })
      dispatch({
        type: 'SAVE_ON_GOING',
        payload: resOnGoing.data
      })
      console.log(resOnGoing.data , 'ongoing');
    } catch (error) {
      console.log(error);
    }
  }
}

export const setCompletedOrder = (id) => {
  return async (dispatch) => {
    try {
      console.log(id, 'id order');
      const access_token = await SecureStore.getItemAsync('access_token')
      const status = 'completed'
      const res = await axios({
        method: 'PATCH',
        url: `${baseUrl}/client/order/${id}`,
        data: {status},
        headers: {access_token}
      })
      console.log(res.data , 'change status complted')
      const resOnGoing = await axios({
        method: 'GET',
        url: `${baseUrl}/client/ongoing`,
        headers: {access_token}
      })
      dispatch({
        type: 'SAVE_ON_GOING',
        payload: resOnGoing.data
      })
      console.log(resOnGoing.data , 'ongoing');
    } catch (error) {
      console.log(error);
    }
  }
}

export const createReview = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'POST',
        url: `${baseUrl}/client/review`,
        data: payload,
        headers: { access_token }
      })
      console.log(res.data, 'review di action');
      // dispatch({
      //   type: 'CREATE_REVIEW',
      //   payload: res.data
      // })
    } catch (error) {
      console.log(error);
    }
  }
}


export {
  getClients
}