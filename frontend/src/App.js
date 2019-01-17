import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./App.scss";
import { Provider } from "react-redux";
import { shim } from "promise.prototype.finally";


// Redux and global functions imports
import store from "./redux/store";
import axios from "axios";
import { authorizeTokenFromStorage, removeAuthorization } from "./Authorization";
import { setUser } from './redux/actions/authActions';

// Components imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./components/pages/Landing";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from './components/pages/dashboard/Dashboard';
import LoadingSpinner from './components/common/LoadingSpinner';
import GroupPage from './components/pages/GroupPage';

// shim is for the .finally on promise import
shim();

class App extends Component {

  constructor() {

    super();
    this.state = { isLoading: true }
  }


  componentWillMount() {
    this.applyAuthorization();
  }

  applyAuthorization() {
    const hasToken = authorizeTokenFromStorage();
    if (hasToken) {
      axios.get("/api/users/current")
        .then(currentUser => {
          store.dispatch(setUser(currentUser.data));
        }).catch(() => removeAuthorization())
        .finally(() => this.setState({ isLoading: false }));

    } else {
      this.setState({ isLoading: false })
    }
  }

  render() {

    if (this.state.isLoading) {
      return (
        <div className="text-center display-2">
          <h1>Loading...</h1>
          <LoadingSpinner />
        </div>
      )
    }

    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/group/:id" component={GroupPage} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
