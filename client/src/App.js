import React, { Component } from 'react';
import Main from './components/MainComponent';
import { Router } from 'react-router-dom';
import { doLogin, doLogout } from './redux/ActionCreator';
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import "./App.css";
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
const createBrowserHistory = require("history").createBrowserHistory;
export const history = createBrowserHistory()

const store = ConfigureStore();

if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      store.dispatch(doLogin(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      
      if (decoded.exp < currentTime) {
      // Logout user
        store.dispatch(doLogout());

      // Redirect to login
        window.location.href = "./login";
      }
}

class App extends Component{
  
  render(){
    return (
       <Provider store={store}>
         <Router history={history}>
            <div>
               <Main/>
            </div>
         </Router>
      </Provider>
    );
  }
}

export default App;
