import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import Products from './ProductsComponent';
import Logout from './LogoutComponent';
import Cart from './CartComponent';

import { fetchProducts, login, isAuthenticated, signup, logout, fetchCart} from '../redux/ActionCreator';


const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => ({
  login: (username, password) => {dispatch(login(username, password))},
  signup: (firstname, lastname, username, password) => {dispatch(signup(firstname, lastname, username, password))},
  logout: () => {dispatch(logout())},
  fetchProducts: () => {dispatch(fetchProducts())},
  fetchCart: () => {dispatch(fetchCart())},
  isAuthenticated: () => {dispatch(isAuthenticated())}
});

class Main extends Component{

  constructor(props){
    super(props);

    this.isLoggedIn = this.isLoggedIn.bind(this);
  }
  
  componentDidMount() {
    this.props.isAuthenticated();
    this.props.fetchProducts();
  }

  isLoggedIn(){
    return this.props.user.islogin
  }
  
  render(){
    return (
      <> 
        <Switch>
          <Route exact path="/home" component={() => <Home  user = {this.props.user}/>}/>
          <Route exact path="/login" component={() => <Login login={this.props.login}/>}/>
          <Route exact path="/signup" component={() => <Signup signup={this.props.signup} />}/>
          <Route exact path="/logout" component={() => <Logout logout={this.props.logout} />}/>
          <Route exact path="/products" component={() => <Products products={this.props.products}  user = {this.props.user}/>}/>
          <Route path='/cart' render={props => (this.isLoggedIn() ? <Cart fetchCart ={this.props.fetchCart} cart={this.props.cart} user = {this.props.user}/> : <Redirect to='/login' /> )} />
          <Redirect to="/home" />
        </Switch>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));