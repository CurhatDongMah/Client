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

export {
  getClients
}