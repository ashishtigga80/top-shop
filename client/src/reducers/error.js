import * as ActionTypes from '../redux/ActionTypes';

export const Error = (state = {
    message: ''
   }, action) => {
   switch(action.type){
      case ActionTypes.SET_ERROR:
        return {...state, message: action.payload};
       case ActionTypes.CLEAR_ERROR:
        return {...state, message: ''};  
      default: 
         return state;
   }
}

export default Error;