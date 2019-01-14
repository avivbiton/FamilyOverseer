import React, { Component } from 'react'
import Sidebar from "./Sidebar";

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md">
            <Sidebar />
          </div>
          <div className="col-md-7">
            <h1>Content here</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
