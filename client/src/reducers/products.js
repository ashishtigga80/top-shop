import * as ActionTypes from '../redux/ActionTypes';

export const Products = (state = {
    isLoading: true,
    products : []
   }, action) => {
   switch(action.type){
      case ActionTypes.ADD_PRODUCTS:
         return {...state, isLoading: false, products: action.payload};
      case ActionTypes.PRODUCTS_LOADING:
         return {...state, isLoading: true,  products: []};   
      default: 
         return state;
   }
}

export default Products;