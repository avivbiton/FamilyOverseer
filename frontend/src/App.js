import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./App.scss";
import { Provider } from "react-redux";

import store from "./redux/store";
import axios from "axios";
import { authorizeTokenFromStorage } from "./Authorization";
import { setUser } from './redux/actions/authActions';


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./components/pages/Landing";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";




class App extends Component {

  constructor() {
    super();
    authorizeTokenFromStorage();
    axios.get("/api/users/current")
      .then(currentUser => {
        store.dispatch(setUser(currentUser.data));
      })
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
