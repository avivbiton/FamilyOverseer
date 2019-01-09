import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./components/pages/Landing";
import Register from "./components/pages/Register";


// TODO: Add redux

class App extends Component {
  render() {
    return (
      <Router>
        <div>

          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
