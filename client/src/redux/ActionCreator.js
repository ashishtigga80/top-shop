import * as ActionTypes from './ActionTypes';

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