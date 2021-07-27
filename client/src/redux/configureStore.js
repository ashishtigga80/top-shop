import { createStore, combineReducers, applyMiddleware} from 'redux';
import Products from "../reducers/products";
import User from "../reducers/user";
import Error from "../reducers/error";
import Cart from "../reducers/cart";
import Order from "../reducers/order";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () =>{
   const store = createStore(combineReducers({
         products: Products,
         user: User,
         cart: Cart,
         order: Order,
         error: Error
      }),
      applyMiddleware(thunk, logger) );

   return store;
}