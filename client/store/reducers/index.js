import { combineReducers } from 'redux'
import clientReducer from './clientReducer'
import therapistReducer from './therapistReducer'

export default combineReducers({
  client: clientReducer,
  therapist: therapistReducer
})