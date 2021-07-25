import * as ActionTypes from '../redux/ActionTypes';

export const Cart = (state = {
    isLoading: true,
    cart : {}
   }, action) => {
   switch(action.type){
      case ActionTypes.ADD_CART:
        return {...state, isLoading: false, cart: action.payload};
      case ActionTypes.CART_LOADING:
        return {...state, isLoading: true};
      case ActionTypes.ADD_TO_CART:
        return {...state, isLoading: false, cart: action.payload};
      case ActionTypes.DELETE_FROM_CART:
        return {...state, isLoading: false, cart: action.payload};  
      case ActionTypes.UPDATE_CART:
        return {...state, isLoading: false, cart: action.payload};
      default: 
         return state;
   }
}

export default Cart;