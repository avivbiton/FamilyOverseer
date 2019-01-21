import React, { Component } from 'react'
import GroupsDisplay from './GroupsDisplay';
import NewGroupDisplay from './NewGroup';
import PendingInvites from '../PendingInvites';

class Sidebar extends Component {
  constructor(onChange) {
    super();
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <div className="p-2">
          <button type="button" className="btn btn-primary" style={{ width: "150px" }}
            onClick={() => this.props.onChange(NewGroupDisplay)} >
            New Group
        </button>
        </div>
        <div className="p-2">
          <button type="button" className="btn btn-primary" style={{ width: "150px" }}
            onClick={() => this.props.onChange(GroupsDisplay)} >
            Groups
        </button>
        </div>
        <div className="p-2">
          <button type="button" className="btn btn-primary" style={{ width: "150px" }}
            onClick={() => this.props.onChange(PendingInvites)} >
            Pending Invites
        </button>
        </div>
      </div>
    )
  }
}
export default Sidebar;
