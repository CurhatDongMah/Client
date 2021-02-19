const initialState = {
  clients: [],
  loading: false,
  error: null,
}

const clientReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SAVE_CLIENTS':
      return {
        ...state,
        clients: action.payload,
        loading: false,
      }

    case 'LOADING_GET_CLIENTS':
      return {
        ...state, loading: true
      }

    case 'ERROR_GET_CLIENTS':
      return {
        ...state, error: action.payload
      }
  
    default:
      return state
  }
}

export default clientReducer