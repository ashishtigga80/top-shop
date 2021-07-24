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
      default: 
         return state;
   }
}

export default Cart;