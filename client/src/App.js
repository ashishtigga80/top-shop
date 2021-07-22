import React, { Component } from 'react';
import Main from './components/MainComponent';
import { Router } from 'react-router-dom';
import "./App.css";
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
const createBrowserHistory = require("history").createBrowserHistory;
export const history = createBrowserHistory()

const store = ConfigureStore();
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
