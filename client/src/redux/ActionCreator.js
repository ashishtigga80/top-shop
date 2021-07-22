import * as ActionTypes from './ActionTypes';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001';

export const login = (username,password) => (dispatch) => {
  return axios({
        method: 'POST',
        url: '/login',
        data: {
          username : username,
          password : password
        }
        }).then( response => {
          console.log('User Login', response)
        })
        .then(dispatch(isLogin())
        ).catch((response) => {
          console.log('request failed', response)
        });
}

export const isLogin = () => ({
   type: ActionTypes.IS_LOGIN
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