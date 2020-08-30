import {combineReducers} from 'redux'
import testReducer from './test_reducer.js'

export default combineReducers({
  test:testReducer
})