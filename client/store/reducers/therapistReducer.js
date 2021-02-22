const initialState = {
  therapists: [],
  therapist: {},
  status: false,
  loading: false,
  error: null,
  successRegister: false
}

const therapistReducer = (state = initialState, action) => {
  switch (action.type) {

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
        ...state, status: action.payload
      }
    default:
      return state
  }
}

export default therapistReducer