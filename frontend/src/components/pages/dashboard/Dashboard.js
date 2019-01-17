import React, { Component } from 'react'
import Sidebar from "./Sidebar";
import GroupsDisplay from "./GroupsDisplay";


class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      currentPage: GroupsDisplay
    }
  }
  updatePage(newPage) {
    this.setState({ currentPage: newPage });
  }

  render() {
    const PageDisplay = this.state.currentPage;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1">
            <Sidebar onChange={this.updatePage.bind(this)} />
          </div>
          <div className="col-md">
            <PageDisplay />
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
