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
        .then(response => history.push("/login"))
        .catch((error) => {
          console.log('MAMA', error.response)
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
        .then(dispatch(userLoading()))
        .then(res => {
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

export const userLoading = () => ({
   type: ActionTypes.USER_LOADING
})

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
        .then(dispatch(cartLoading()))
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
        .then(response => dispatch(addtoCartState(response.data)))
        .then(history.push('/cart'))
        .catch((res) => {
          console.log('request failed', res)
        });
}

export const addtoCartState =  (cart) => ({
  type:ActionTypes.ADD_TO_CART,
  payload: cart
})

export const deletefromCart = (id) => (dispatch) => {
  var urlwithid = '/products/deletefromcart/' + id 
  return axios({
        method: 'DELETE',
        url: urlwithid
        })
        .then(dispatch(cartLoading()))
        .then(response => dispatch(deletefromCartState(response.data)))
        .then(history.push('/cart'))
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const deletefromCartState =  (cart) => ({
  type:ActionTypes.DELETE_FROM_CART,
  payload: cart
})


export const updateCart = (id, quantity) => (dispatch) => {
  var urlwithid = '/products/updatecart/' + id + '/?quantity=' + quantity;
  return axios({
        method: 'PUT',
        url: urlwithid
        })
        .then(dispatch(cartLoading()))
        .then(response => dispatch(updateCartState(response.data)))
        .then(history.push('/cart'))
        .catch((response) => {
          console.log('request failed', response)
        });
}

export const updateCartState =  (cart) => ({
  type:ActionTypes.UPDATE_CART,
  payload: cart
})

export const orderCartUpdate = (cart) => ({
   type: ActionTypes.ORDER_CART_UPDATE,
   payload: cart
})








export const shippingDetails =  (details) => ({
  type:ActionTypes.SHIPPING_DETAIL,
  payload: details
})

export const checkout = (id, source, shippingdetails) => dispatch => {
    axios.post("/cart/checkout/pay", {source, shippingdetails})
        .then(dispatch(ordersLoading()))
        .then((response) => {
          dispatch(addtoOrders(response.data))
          dispatch(orderCartUpdate(response.data.cart))
        })
        .then(history.push('/orders'))
        .catch(err => console.log("This is the error",err));
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

export const addtoOrders = (order) => ({
  type: ActionTypes.ADD_TO_ORDERS,
  payload: order
})