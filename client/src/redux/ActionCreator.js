import * as ActionTypes from './ActionTypes';
import { history } from '../App';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const signup = (firstname, lastname, email, password) => (dispatch) => {
  return axios({
        method: 'POST',
        url: '/signup',
        data: {
          firstname: firstname,
          lastname: lastname,
          email : email,
          password : password
        }
        })
        .then(history.replace('/login'))
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const login = (email,password) => (dispatch) => {
  return axios({
        method: 'POST',
        url: '/login',
        data: {
          email : email,
          password : password
        }
        })
        .then(res => {
          // Save to localStorage

          // Set token to localStorage
          console.log(res)
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          // Set token to Auth header
          setAuthToken(token);
          // Decode token to get user data
          const decoded = jwt_decode(token);
          // Set current user
          dispatch(doLogin(decoded));
          history.replace('/home');
        })
        .catch((response) => {
          console.log('request failed', response)
        });
}


export const logout = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(doLogout());
  history.replace('/home')
}

export const doLogin = (user) => ({
   type: ActionTypes.DO_LOGIN,
   payload: user
})

export const doLogout = () => ({
   type: ActionTypes.DO_LOGOUT
})







export const fetchProducts = () => (dispatch) => {
  
  return axios.get('/products')
        .then(dispatch(productsLoading()))
        .then(response => dispatch(addProducts(response.data)))
        .catch((response) => {
          console.log('request failed', response)
  });
}

export const addProducts = (products) => ({
   type: ActionTypes.ADD_PRODUCTS,
   payload: products
})

export const productsLoading = () => ({
   type: ActionTypes.PRODUCTS_LOADING
})



export const fetchCart = () => (dispatch) => {

  return axios.get('/cart')
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
  return axios({
        method: 'POST',
        url: urlwithid
        })
        .then(dispatch(cartLoading()))
        .then(dispatch(fetchCart()))
        .then(history.push('/cart'))
        .catch((res) => {
          console.log('request failed', res)
        });
}

export const deletefromCart = (id) => (dispatch) => {
  var urlwithid = '/products/deletefromcart/' + id 
  return axios({
        method: 'DELETE',
        url: urlwithid
        })
        .then(dispatch(cartLoading()))
        .then(dispatch(fetchCart()))
        .then(history.push('/cart'))
        .catch((response) => {
          console.log('request failed', response)
        });
}


export const updateCart = (id, quantity) => (dispatch) => {
  var urlwithid = '/products/updatecart/' + id + '/?quantity=' + quantity;
  return axios({
        method: 'PUT',
        url: urlwithid
        })
        .then(dispatch(cartLoading()))
        .then(dispatch(fetchCart()))
        .then(history.push('/cart'))
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const checkout = (id, source) => dispatch => {
    axios.post(`/cart/checkout/pay/${id}`, {source})
        .then(res => console.log(res))
        .then(dispatch(fetchOrders()))
        .then(history.push('/home'))
        .catch(err => console.log(err));
}

export const fetchOrders = () => (dispatch) => {

  return axios.get('/orders')
        .then(dispatch(ordersLoading()))
        .then(response => dispatch(addOrders(response.data)))
        .catch((response) => {
          console.log('request failed', response)
  });
}

export const addOrders= (orders) => ({
   type: ActionTypes.ADD_ORDERS,
   payload: orders
})

export const ordersLoading = () => ({
   type: ActionTypes.ORDERS_LOADING
})