import * as ActionTypes from '../redux/ActionTypes';

export const User = (state = {
    islogin : false,
    user: {}
   }, action) => {
   switch(action.type){
      case ActionTypes.IS_LOGIN:
        return {...state, islogin: true, user: action.payload}
      default: 
        return state;
   }
}

export default User;