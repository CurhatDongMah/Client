const initialState = {
  loading: false,
  errorClient: null,
  error: null,
  clients: [],
  histories: [],
  client: {},
  temporaryClient: {},
  therapistDetail: {},
  order: {},
  onGoingOrders: [],
  successRegister: false,
  reviews: []
}

const clientReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_LOADING_CLIENT':
      return {
        ...state,
        loading: true,
      }
    
    case 'SET_ERROR_CLIENT':
      return {
        ...state,
        errorClient: action.payload,
        loading: false,
      }

    case 'SAVE_CLIENTS':
      return {
        ...state,
        clients: action.payload,
        loading: false,
        error: null
      }

    case 'SAVE_CLIENT':
      let temporary = JSON.parse(JSON.stringify(action.payload))
      return {
        ...state,
        client: action.payload,
        temporaryClient: temporary,
        loading: false,
        error: null
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
        ...state, successRegister: true,
        loading: false,
        error: null
      }

    case 'SET_THERAPIST':
      return {
        ...state,
        therapistDetail: action.payload,
        loading: false,
        error: null
      }

    case 'CREATE_ORDER':
      return {
        ...state,
        order: action.payload,
        loading: false,
        error: null
      }
    case 'SAVE_HISTORIES':
      return {
        ...state,
        histories: action.payload,
        loading: false,
        error: null
      }
    case 'SAVE_ON_GOING':
      return {
        ...state,
        onGoingOrders: action.payload,
        loading: false,
        error: null
      }
    case 'SAVE_REVIEWS':
      return {
        ...state,
        reviews: action.payload,
        loading: false,
        error: null
      }
    default:
      return state
  }
}

export default clientReducer