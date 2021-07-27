import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import Home from './HomeComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import Products from './ProductsComponent';
import Logout from './LogoutComponent';
import Cart from './CartComponent';
import ProductDetail from './ProductDetailComponent';
import PrivateRoute from './PrivateRouteComponent';
import Checkout from './CheckoutComponent';
import Order from './OrderComponent';
import OrderDetail from './OrderDetailComponent';
import Payment from './PaymentComponent';

import { fetchProducts, login, signup, logout, fetchCart, addtoCart, deletefromCart, updateCart, checkout, fetchOrders, shippingDetails} from '../redux/ActionCreator';


const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    cart: state.cart,
    order: state.order,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => {dispatch(login(email, password))},
  signup: (firstname, lastname, email, password) => {dispatch(signup(firstname, lastname, email, password))},
  logout: () => {dispatch(logout())},
  fetchProducts: () => {dispatch(fetchProducts())},
  fetchOrders: () => {dispatch(fetchOrders())},
  fetchCart: () => {dispatch(fetchCart())},
  addtoCart: (id) => {dispatch(addtoCart(id))},
  deletefromCart: (id) => {dispatch(deletefromCart(id))},
  updateCart: (id, quantity) => {dispatch(updateCart(id, quantity))},
  shippingDetails: (shippingdetails) => {dispatch(shippingDetails(shippingdetails))},
  checkout: (id, token, shippingdetails) => {dispatch(checkout(id, token, shippingdetails))}
});

class Main extends Component{

  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchOrders();
    this.props.fetchCart();
  }

  
  render(){
    return (
      <> 
        <Switch>
          <Route exact path="/home" component={() => <Home  user = {this.props.user}/>}/>
          <Route exact path="/login" component={() => <Login login={this.props.login} error={this.props.error}/>}/>
          <Route exact path="/signup" component={() => <Signup signup={this.props.signup} error={this.props.error}/>}/>
          <Route exact path="/logout" component={() => <Logout logout={this.props.logout} />}/>
          <Route exact path="/products" component={() => <Products products={this.props.products}  user = {this.props.user}/>}/>
          <Route exact path="/products/:id" component={() => <ProductDetail products={this.props.products} addtoCart = {this.props.addtoCart} user = {this.props.user}/>}/>
          <PrivateRoute exact path='/cart' component={() => <Cart cart={this.props.cart} fetchCart = {this.props.fetchCart} user = {this.props.user}
                                                                  deletefromCart ={this.props.deletefromCart}  updateCart ={this.props.updateCart} /> }/>
          <PrivateRoute exact path='/cart/checkout' component={() => <Checkout cart={this.props.cart} user = {this.props.user} shippingDetails = {this.props.shippingDetails}/> }/>
          <PrivateRoute exact path='/cart/checkout/pay' component={() => <Payment cart={this.props.cart} user = {this.props.user} checkout={this.props.checkout}/> }/>
          <PrivateRoute exact path='/orders' component={() => <Order order={this.props.order} user = {this.props.user}/> }/>
          <PrivateRoute exact path='/orders/:id' component={() => <OrderDetail order={this.props.order} user = {this.props.user}/> }/>
          <Redirect to="/home" />
        </Switch>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));