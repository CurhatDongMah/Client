import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
const baseUrl = 'http://192.168.43.213:3000' //arif
// const baseUrl = 'http://192.168.0.10:3000' //obed

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

// export const getOnGoingOrderTherapist = () => {
//   return async (dispatch) => {
//     try {
//       const access_token = await SecureStore.getItemAsync('access_token')
//       const res = await axios({
//         method: 'GET',
//         url: `${baseUrl}/therapist/ongoing`,
//         headers: {access_token}
//       })
//       console.log(res.data , 'ongoing');
//       dispatch({
//         type: 'SAVE_ON_GOING',
//         payload: res.data
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

export const updateStatusTherapist = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
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