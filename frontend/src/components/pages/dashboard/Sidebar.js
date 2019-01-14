import React, { Component } from 'react'

class Sidebar extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <div class="p-2"><button type="button" className="btn btn-primary" style={{ width: "150px" }}>Groups</button></div>
        <div class="p-2"><button type="button" className="btn btn-primary" style={{ width: "150px" }}>My Tasks</button></div>
        <div class="p-2"><button type="button" className="btn btn-primary" style={{ width: "150px" }}>Settings</button></div>
      </div>
    )
  }
}
export default Sidebar;
