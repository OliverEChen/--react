import {INCREMENT,DECREMENT} from './action_types.js'
let initState = 0
export default function operateCount(preState=initState,action) {
  console.log('-------',action);
  const {type,data} = action
  let newState
  switch (type) {
    case INCREMENT:
      newState = preState+data
      return newState
    case DECREMENT:
      newState = preState-data
      return newState
  
    default:
      return preState
  }
}