import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
const baseUrl = 'http://192.168.43.213:3000' //arif
// const baseUrl = 'http://192.168.0.10:3000' //obed

// const getTherapists = () => {
//   return async (dispatch) => {
//     try {
//       dispatch({
//         type: 'LOADING_GET_THERAPISTS'
//       })
  
//       const res = await fetch(`https://localhost:3000/therapists`)
//       const payload = await res.json()
//       dispatch({
//         type: 'SAVE_THERAPISTS', payload: payload
//       })    
//     } catch (error) {
//       dispatch({
//         type: 'ERROR_GET_THERAPISTS', payload: error
//       })
//     }
//   }
// }

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

export const getTherapists = () => {
  return async (dispatch) => {
    try {
      const token = await SecureStore.getItemAsync('access_token')
      const res = await axios({
        method: 'GET',
        url: `${baseUrl}/therapist`,
        headers: { access_token: token}
      })
      console.log(res.data, 'all therapist')
      // console.log(res.data.data.email, 'email')
      if (res.data) {
        dispatch({
          type: 'SAVE_THERAPISTS',
          payload: res.data
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}
