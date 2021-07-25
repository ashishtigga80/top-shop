import * as ActionTypes from '../redux/ActionTypes';

export const Cart = (state = {
    isLoading: true,
    cart : {},
    shippingdetails: {}
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
      case ActionTypes.SHIPPING_DETAIL:
        return {...state, isLoading: false, shippingdetails: action.payload};  
      case ActionTypes.ORDER_CART_UPDATE:
        return {...state, isLoading: false, cart: action.payload, shippingdetails: {}};    
      default: 
         return state;
   }
}

export default Cart;