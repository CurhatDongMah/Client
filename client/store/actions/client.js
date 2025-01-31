import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
// const baseUrl = 'http://192.168.43.213:3000' //arif
// const baseUrl = 'http://192.168.0.10:3000' //obed
// const baseUrl = 'http://192.168.8.104:3000' //riva
const baseUrl = 'https://mysterious-badlands-19833.herokuapp.com'

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
      dispatch({
        type: 'SET_LOADING_CLIENT'
      })
      dispatch({
        type: 'RESET_ERROR_CLIENT'
      })
      dispatch({
        type: 'RESET_REGISTER_CLIENT'
      })
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
      console.log(error.response);
      dispatch({
        type: 'SET_ERROR_CLIENT',
        payload: error.response.data.message[0]
      })
    }
  }
}

export const clientLogin = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_ERROR_CLIENT',
        payload: null
      })
      dispatch({
        type: 'SET_LOADING_CLIENT'
      })
      const res = await axios({
        method: 'POST',
        url: `${baseUrl}/client/login`,
        data: payload
      })
      if (res.data) {
        await SecureStore.setItemAsync('access_token', res.data.access_token)
        dispatch({
          type: 'SET_CLIENT_SIGNIN'
        })
        dispatch({
          type: 'SAVE_CLIENT',
          payload: res.data.data
        })
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'SET_ERROR_CLIENT',
        payload: error.response.data.message
      })
    }
  }
}

export const clientLogout = () => {
  return async (dispatch) => {
    await SecureStore.deleteItemAsync('access_token')
    dispatch({
      type: 'RESET_CLIENT_SIGNIN'
    })
  }
}

export const editClient = (payload, id)=> {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING_CLIENT'
      })
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'PUT',
        url: `${baseUrl}/client/${id}`,
        headers: {access_token},
        data: payload
      })
      console.log(res.data , 'success edit');
      dispatch({
        type: 'SAVE_CLIENT',
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: 'SET_ERROR_CLIENT',
        payload: error.response.data.message
      })
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

export const resetRegister = () => {
  return (dispatch) => {
    dispatch({
      type: 'RESET_REGISTER'
    })
  }
}

export const resetErrorClient = () => {
  return (dispatch) => {
    dispatch({
      type: 'RESET_ERROR_CLIENT'
    })
  }
}

export const createOrder = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload, 'order nih');
      dispatch({
        type: 'SET_LOADING_CLIENT'
      })
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
      dispatch({
        type: 'SET_ERROR_CLIENT',
        payload: error.response.data.message
      })
    }
  }
}

export const deleteOrder = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING_CLIENT'
      })
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'DELETE',
        url: `${baseUrl}/client/order/${id}`,
        headers: { access_token }
      })
      dispatch({
        type: 'RESET_LOADING_CLIENT'
      })
    } catch (error) {
      dispatch({
        type: 'SET_ERROR_CLIENT',
        payload: error.response.data.message
      })
    }
  }
}

export const getHistory = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING_CLIENT'
      })
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
        type: 'SET_ERROR_CLIENT',
        payload: error.response.data.message
      })
    }
  }
}

export const getOnGoingOrder = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING_CLIENT'
      })
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
      dispatch({
        type: 'SET_ERROR_CLIENT',
        payload: error.response.data.message
      })
    }
  }
}

export const setOnGoingOrder = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING_CLIENT'
      })
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
      dispatch({
        type: 'SET_ERROR_CLIENT',
        payload: error.response.data.message
      })
    }
  }
}

export const setCompletedOrder = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING_CLIENT'
      })
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
      const resHistory = await axios({
        method: 'GET',
        url: `${baseUrl}/client/history`,
        headers: {access_token}
      })
      dispatch({
        type: 'SAVE_HISTORIES',
        payload: resHistory.data
      })
      dispatch({
        type: 'SAVE_ON_GOING',
        payload: resOnGoing.data
      })
      console.log(resOnGoing.data , 'ongoing');
    } catch (error) {
      dispatch({
        type: 'SET_ERROR_CLIENT',
        payload: error.response.data.message
      })
    }
  }
}

export const createReview = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING_CLIENT'
      })
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'POST',
        url: `${baseUrl}/client/review`,
        data: payload,
        headers: { access_token }
      })
      dispatch({
        type: 'RESET_LOADING_CLIENT'
      })
    } catch (error) {
      dispatch({
        type: 'SET_ERROR_CLIENT',
        payload: error.response.data.message
      })
    }
  }
}

export const getReview = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING_CLIENT'
      })
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'GET',
        url: `${baseUrl}/client/review/${id}`,
        headers: { access_token }
      })
      console.log(res.data, 'review di action');
      dispatch({
        type: 'SAVE_REVIEWS',
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: 'SET_ERROR_CLIENT',
        payload: error.response.data.message
      })
    }
  }
}


export {
  getClients
}