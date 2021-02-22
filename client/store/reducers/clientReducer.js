const initialState = {
  loading: false,
  error: null,
  clients: [],
  histories: [],
  client: {},
  therapistDetail: {},
  order: {},
  onGoingOrders: [],
  successRegister: false
}

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'SAVE_CLIENTS':
      return {
        ...state,
        clients: action.payload,
        loading: false,
      }

    case 'SAVE_CLIENT':
      return {
        ...state,
        client: action.payload,
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
  
    case 'CLIENT_SUCCESS_REGISTER':
      return {
        ...state, successRegister: true
      }

    case 'SET_THERAPIST':
      return {
        ...state,
        therapistDetail: action.payload,
        loading: false,
      }

    case 'CREATE_ORDER':
      return {
        ...state,
        order: action.payload,
        loading: false,
      }
    case 'SAVE_HISTORIES':
      return {
        ...state,
        histories: action.payload,
        loading: false,
      }
    case 'SAVE_ON_GOING':
      return {
        ...state,
        onGoingOrders: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default clientReducer