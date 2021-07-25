import * as ActionTypes from '../redux/ActionTypes';

export const User = (state = {
    islogin : false,
    userloading: false,
    user: {}
   }, action) => {
   switch(action.type){
      case ActionTypes.DO_LOGIN:
        return {...state, islogin: true, userloading:false, user: action.payload}  
      case ActionTypes.USER_LOADING:
        return {...state, userloading:true }    
      case ActionTypes.DO_LOGOUT:
        return {...state, islogin: false, user: {}}  
      default: 
        return state;
   }
}

export default User;