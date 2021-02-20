import axios from 'axios'

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
      const res = await axios({
        method: 'POST',
        url: `http://192.168.43.213:3000/client/register`,
        data: payload
      })
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
}

export {
  getClients,
  clientRegister
}