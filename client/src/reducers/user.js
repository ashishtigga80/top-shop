import * as ActionTypes from '../redux/ActionTypes';

export const User = (state = {
    islogin : false,
    user: {}
   }, action) => {
   switch(action.type){
      case ActionTypes.DO_LOGIN:
        return {...state, islogin: true, user: action.payload}
      case ActionTypes.DO_LOGOUT:
        return {...state, islogin: false, user: {}}  
      default: 
        return state;
   }
}

export default User;