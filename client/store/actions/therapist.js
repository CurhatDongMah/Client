const getTherapists = () => {
  return async () => {
    try {
      dispatch({
        type: 'LOADING_GET_THERAPISTS'
      })
  
      const res = await fetch(`https://localhost:3000/therapists`)
      const payload = await res.json()
      dispatch({
        type: 'SAVE_THERAPISTS', payload: payload
      })    
    } catch (error) {
      dispatch({
        type: 'ERROR_GET_THERAPISTS', payload: error
      })
    }
  }
}

export {
  getTherapists
}