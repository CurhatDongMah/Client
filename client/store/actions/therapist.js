import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
const baseUrl = 'http://192.168.43.213:3000' //arif
// const baseUrl = 'http://192.168.0.10:3000' //obed

export const getAllTherapists = () => { // fetch all without any condition
  return async (dispatch) => {
    try {
      const access_token = await SecureStore.getItemAsync('access_token')
      dispatch({
        type: 'LOADING_GET_THERAPISTS'
      })
  
      const res = await axios({
        method: 'GET',
        url: `${baseUrl}/therapist/clients`,
        headers: {access_token}
      })
      dispatch({
        type: 'SAVE_THERAPISTS_ALL', payload: res.data
      }) 
    } catch (error) {
      dispatch({
        type: 'ERROR_GET_THERAPISTS', payload: error
      })
    }
  }
}

export const getTherapists = () => {
  return async (dispatch) => {
    try {
      const access_token = await SecureStore.getItemAsync('access_token')
      dispatch({
        type: 'LOADING_GET_THERAPISTS'
      })
  
      const res = await axios({
        method: 'GET',
        url: `${baseUrl}/client/alltherapists`,
        headers: {access_token}
      })
      dispatch({
        type: 'SAVE_THERAPISTS', payload: res.data
      }) 
    } catch (error) {
      dispatch({
        type: 'ERROR_GET_THERAPISTS', payload: error
      })
    }
  }
}

export const therapistRegister = (payload) => {
  return async (dispatch) => {
    try {
      const resRegister = await axios({
        method: 'POST',
        url: `${baseUrl}/therapist/register`,
        data: payload
      })
      if (resRegister) {
        dispatch({
          type: 'THERAPIST_SUCCESS_REGISTER'
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const therapistLogin = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${baseUrl}/therapist/login`,
        data: payload
      })
      console.log(res.data.access_token, 'access_token')
      console.log(res.data.data.email, 'email')
      if (res.data) {
        await SecureStore.setItemAsync('access_token', res.data.access_token)
        await SecureStore.setItemAsync('email', res.data.data.email)
        dispatch({
          type: 'SAVE_THERAPIST',
          payload: res.data.data
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getOnGoingOrderTherapist = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING_THERAPIST'
      })
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'GET',
        url: `${baseUrl}/therapist/ongoing`,
        headers: {access_token}
      })
      console.log(res.data , 'ongoing order');
      dispatch({
        type: 'SAVE_ON_GOING_THERAPIST',
        payload: res.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export const updateStatusTherapist = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
      dispatch({
        type: 'SET_LOADING_THERAPIST'
      })
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'PATCH',
        url: `${baseUrl}/therapist/status`,
        data: {status: payload},
        headers: {access_token}
      })
      console.log(res.data , 'change status available')
      if (res.data) {
        dispatch({
          type: 'SAVE_STATUS',
          payload: payload
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const getHistoryTherapist = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING_THERAPIST'
      })
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'GET',
        url: `${baseUrl}/therapist/history`,
        headers: {access_token}
      })
      console.log(res.data, 'therapist history');
      dispatch({
        type: 'SAVE_HISTORIES_THERAPIST',
        payload: res.data
      })
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: 'ERROR_GET_CLIENTS', payload: error
      // })
    }
  }
}

export const setCompletedOrderTherapist = (id) => {
  return async (dispatch) => {
    try {
      console.log(id, 'id order');
      const access_token = await SecureStore.getItemAsync('access_token')
      const status = 'completed'
      const res = await axios({
        method: 'PATCH',
        url: `${baseUrl}/therapist/order/${id}`,
        data: {status},
        headers: {access_token}
      })
      console.log(res.data , 'change status complted')
      const resOnGoing = await axios({
        method: 'GET',
        url: `${baseUrl}/therapist/ongoing`,
        headers: {access_token}
      })
      console.log(resOnGoing.data , 'ongoing order');
      dispatch({
        type: 'SAVE_ON_GOING_THERAPIST',
        payload: resOnGoing.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export const handleLogoutTherapist = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING_THERAPIST'
      })
      const access_token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'PATCH',
        url: `${baseUrl}/therapist/status`,
        data: {status: false},
        headers: {access_token}
      })
      console.log(res.data , 'change status false')
      if (res.data) {
        await SecureStore.deleteItemAsync('access_token')
        await SecureStore.deleteItemAsync('email')
      }
    } catch (error) {
      console.log(error);
    }
  }
}
