import * as ActionTypes from './ActionTypes';
import app from '../config/axiosConfig'
import { history } from '../App';

export const signup = (firstname, lastname, username, password) => (dispatch) => {
  return app({
        method: 'POST',
        url: '/signup',
        data: {
          firstname: firstname,
          lastname: lastname,
          username : username,
          password : password
        }
        })
        .then( response => dispatch(doLogin(response.data)))
        .then(history.push('/home'))
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const login = (username,password) => (dispatch) => {
  return app({
        method: 'POST',
        url: '/login',
        data: {
          username : username,
          password : password
        }
        })
        .then( response => dispatch(doLogin(response.data)))
        .then(history.push('/home'))
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const isAuthenticated = () => (dispatch) => {
  return app.get('/api/auth')
        .then( 
          response => {
            if(response.data.auth){
              dispatch(doLogin(response.data.user))
            }
          }
        )
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const logout = () => (dispatch) => {
  return app({
        method: 'POST',
        url: '/logout'
        })
        .then(dispatch(doLogout()))
        .then(history.push('/home'))
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const doLogin = (user) => ({
   type: ActionTypes.DO_LOGIN,
   payload: user
})

export const doLogout = () => ({
   type: ActionTypes.DO_LOGOUT
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

export const fetchCart = () => (dispatch) => {

  return app.get('/cart')
        .then(response => dispatch(addCart(response.data)))
        .catch((response) => {
          console.log('request failed', response)
  });
}

export const addCart = (cart) => ({
   type: ActionTypes.ADD_CART,
   payload: cart
})

export const cartLoading = () => ({
   type: ActionTypes.CART_LOADING
})

export const addtoCart = (id) => (dispatch) => {
  var urlwithid = '/products/addtocart/' + id 
  return app({
        method: 'POST',
        url: urlwithid
        })
        .then( response => dispatch(updateCart(response.data)))
        .then(history.push('/cart'))
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const deletefromCart = (id) => (dispatch) => {
  var urlwithid = '/products/deletefromcart/' + id 
  return app({
        method: 'DELETE',
        url: urlwithid
        })
        .then( response => dispatch(updateCart(response.data)))
        .then(history.push('/cart'))
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const updateCart = (cart) => ({
   type: ActionTypes.UPDATE_CART,
   payload: cart
})