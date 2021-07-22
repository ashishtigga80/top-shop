import * as ActionTypes from './ActionTypes';
import app from '../config/axiosConfig'
import { history } from '../App';

export const login = (username,password) => (dispatch) => {
  return app({
        method: 'POST',
        url: '/login',
        data: {
          username : username,
          password : password
        }
        })
        .then( response => dispatch(isLogin(response.data)))
        .then(history.push('/home'))
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const isAuthenticated = () => (dispatch) => {
  return app.get('/auth')
        .then( 
          response => {
            console.log(response.data)
            if(response.data.auth){
              dispatch(isLogin(response.data.user))
            }
          }
        )
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const isLogin = (user) => ({
   type: ActionTypes.IS_LOGIN,
   payload: user
})

export const fetchProducts = () => (dispatch) => {
  return fetch('/products')
      .then(response => {
         if(response.ok){
            return response;
         }
         else{
            var error = new Error('Error' + response.status + ':' + response.statusText);
            error.response = response;
            throw error;
         }
      },
      error => {
         var errmess = new Error(error.message)
         throw errmess;
      })
      .then(response => response.json())
      .then(products => dispatch(addProducts(products)))
}

export const addProducts = (products) => ({
   type: ActionTypes.ADD_PRODUCTS,
   payload: products
})

export const productsLoading = () => ({
   type: ActionTypes.PRODUCTS_LOADING
})