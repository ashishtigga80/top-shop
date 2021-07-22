import { createStore, combineReducers, applyMiddleware} from 'redux';
import Products from "../reducers/products";
import User from "../reducers/user";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () =>{
   const store = createStore(combineReducers({
         products: Products,
         user: User
      }),
      applyMiddleware(thunk, logger) );

   return store;
}