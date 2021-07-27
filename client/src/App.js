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
      const token = localStorage.jwtToken;
      setAuthToken(token);

      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000; 

      if (decoded.exp < currentTime) {
        store.dispatch(doLogout());
        history.push('/login')
      }
      else{
        store.dispatch(doLogin(decoded));
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
