import * as ActionTypes from '../redux/ActionTypes';

export const Order = (state = {
    isLoading: true,
    orders : []
   }, action) => {
   switch(action.type){
      case ActionTypes.ADD_ORDERS:
        return {...state, isLoading: false, orders: action.payload};
      case ActionTypes.ORDERS_LOADING:
        return {...state, isLoading: true};
      case ActionTypes.ADD_TO_ORDERS:
        return {orders: [...state.orders, action.payload.order]};  
      default: 
         return state;
   }
}

export default Order;