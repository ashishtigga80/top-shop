import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import Products from './ProductsComponent';

import { fetchProducts} from '../redux/ActionCreator';

const mapStateToProps = state => {
     return {
        products: state.products
     }
}

const mapDispatchToProps = dispatch => ({
  
    fetchProducts: () => {dispatch(fetchProducts())}
  
  });

class Main extends Component{
  constructor(props){
    super(props);
  
  }

  componentDidMount() {
      this.props.fetchProducts();
   }

  render(){
      return (
      <div>
        <Switch>
          <Route exact path="/" component={() => <Home />}/>
          <Route exact path="/products" component={() => <Products products={this.props.products}/>}/>
          <Redirect to="/" />
        </Switch>
      </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));