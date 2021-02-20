const initialState = {
  therapists: [],
  loading: false,
  error: null,
  successRegister: false
}

const therapistReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SAVE_THERAPISTS':
      return {
        ...state,
        therapists: action.payload,
        loading: false,
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
    default:
      return state
  }
}

export default therapistReducer