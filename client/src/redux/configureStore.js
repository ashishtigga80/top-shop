import { createStore, combineReducers, applyMiddleware} from 'redux';
import Products from "../reducers/products";
import User from "../reducers/user";
import Cart from "../reducers/cart";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () =>{
   const store = createStore(combineReducers({
         products: Products,
         user: User,
         cart: Cart
      }),
      applyMiddleware(thunk, logger) );

   return store;
}