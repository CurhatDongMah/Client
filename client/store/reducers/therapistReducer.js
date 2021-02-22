const initialState = {
  loading: false,
  error: null,
  therapists: [],
  therapist: {},
  status: false,
  successRegister: false,
  onGoingOrdersTherapist: [],
  historiesTherapist: []
}

const therapistReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_LOADING_THERAPIST':
      return {
        ...state,
        loading: true
      }

    case 'SAVE_THERAPIST':
      return {
        ...state,
        therapist: action.payload,
        loading: false
      }

    case 'SAVE_THERAPISTS':
      return {
        ...state,
        therapists: action.payload,
        loading: false
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
        ...state, successRegister: true
      }
    case 'SAVE_STATUS':
      return {
        ...state, 
        status: action.payload,
        loading: false
      }
    case 'SAVE_ON_GOING_THERAPIST':
      return {
        ...state,
        onGoingOrdersTherapist: action.payload,
        loading: false
      }
    case 'SAVE_HISTORIES_THERAPIST':
      return {
        ...state,
        historiesTherapist: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default therapistReducer