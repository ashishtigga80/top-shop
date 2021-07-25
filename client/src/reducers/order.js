import * as ActionTypes from '../redux/ActionTypes';

export const Order = (state = {
    isLoading: true,
    orders : [{}]
   }, action) => {
   switch(action.type){
      case ActionTypes.ADD_ORDERS:
        return {...state, isLoading: false, orders: action.payload};
      case ActionTypes.ORDERS_LOADING:
        return {...state, isLoading: true};
      default: 
         return state;
   }
}

export default Order;