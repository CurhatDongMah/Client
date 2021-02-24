const initialState = {
  loading: false,
  error: null,
  errorTherapist: null,
  therapists: [],
  therapist: {},
  status: false,
  successRegisterTherapist: false,
  onGoingOrdersTherapist: [],
  historiesTherapist: [],
  allTherapists: [] // fetch all without any condition
}

const therapistReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'RESET_REGISTER_THERAPIST':
      return {
        ...state,
        successRegisterTherapist: false,
      }

    case 'SET_LOADING_THERAPIST':
      return {
        ...state,
        loading: true
      }
    case 'RESET_LOADING_THERAPIST':
      return {
        ...state,
        loading: false
      }

    case 'SET_ERROR_THERAPIST':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case 'RESET_ERROR_THERAPIST':
      return {
        ...state,
        error: '',
      }
    case 'SAVE_THERAPIST':
      return {
        ...state,
        therapist: action.payload,
        loading: false,
        error: null
      }

    case 'SAVE_THERAPISTS':
      return {
        ...state,
        therapists: action.payload,
        loading: false,
        error: null
      }
    
      case 'SAVE_THERAPISTS_ALL': // fetch all without any condition
      return {
        ...state,
        allTherapists: action.payload,
        loading: false,
        error: null
      }

    case 'LOADING_GET_THERAPISTS':
      return {
        ...state, loading: true
      }

    case 'ERROR_GET_THERAPISTS':
      return {
        ...state, error: action.payload
      }
    case 'THERAPIST_SUCCESS_REGISTER':
      return {
        ...state, 
        successRegisterTherapist: true, 
        loading: false,
        error: null
      }
    case 'SAVE_STATUS':
      return {
        ...state, 
        status: action.payload,
        loading: false,
        error: null
      }
    case 'SAVE_ON_GOING_THERAPIST':
      return {
        ...state,
        onGoingOrdersTherapist: action.payload,
        loading: false,
        error: null
      }
    case 'SAVE_HISTORIES_THERAPIST':
      return {
        ...state,
        historiesTherapist: action.payload,
        loading: false,
        error: null
      }
    default:
      return state
  }
}

export default therapistReducer