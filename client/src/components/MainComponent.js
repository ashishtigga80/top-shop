import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Products from './ProductsComponent';
import Header from './HeaderComponent';

import { fetchProducts, login, isAuthenticated} from '../redux/ActionCreator';

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  login: (username, password) => {dispatch(login(username, password))},
  fetchProducts: () => {dispatch(fetchProducts())},
  isAuthenticated: () => {dispatch(isAuthenticated())}
});

class Main extends Component{

  constructor(props){
    super(props);

    this.isLoggedIn = this.isLoggedIn.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchProducts();
    this.props.isAuthenticated();
  }

  isLoggedIn(){
    return this.props.user.islogin
  }
  
  render(){
    return (
      <>
        <Header user = {this.props.user}/>  
        <Switch>
          <Route exact path="/home" component={() => <Home />}/>
          <Route exact path="/login" component={() => <Login login={this.props.login} user= {this.props.user}/>}/>
          <Route exact path="/products" component={() => <Products products={this.props.products} />}/>
          <Redirect to="/home" />
        </Switch>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));