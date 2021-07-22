import * as ActionTypes from '../redux/ActionTypes';

export const User = (state = {
    islogin : false,
    user: {}
   }, action) => {
   switch(action.type){
      case ActionTypes.IS_LOGIN:
        return {...state, islogin: true}
      default: 
        return state;
   }
}

export default User;