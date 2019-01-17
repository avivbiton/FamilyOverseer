import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


import LoadingSpinner from "../../common/LoadingSpinner";

import { getUserGroups } from "../../../redux/actions/groupActions";

class GroupsDisplay extends Component {

    constructor() {
        super();
        this.state = {
            groups: [],
            loading: true
        }
    }


    componentDidMount() {
        if (this.props.auth.isAuthenticated === false) {
            this.props.history.push("/login");
        }

        this.props.getUserGroups();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.groups.allGroups) {
            this.setState({ groups: nextProps.groups.allGroups, loading: false });
        }
    }

    onTableRowClicked(group) {
        this.props.history.push(`/group/${group._id}`);
    }

    renderGroupRow(g, index) {
        return (
            <tr key={index} onClick={() => this.onTableRowClicked(g)}>
                <td>{g.name}</td>
                <td>{g.members.length} Members</td>
                <td>{g.activeTasks.length} Active Tasks</td>
            </tr>)
    }

    render() {

        const loadingContent =
            <div className="text-center">
                <LoadingSpinner />
                Loading groups...
        </div>

        const tableContent =
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Members</th>
                        <th>Tasks</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.groups.map((group, index) => this.renderGroupRow(group, index))}
                </tbody>
            </table>


        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="text-center display-3 mb-4">Your Groups</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {this.state.loading ? loadingContent : tableContent}
                    </div>
                </div>
            </div>
        )
    }
}




const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    groups: state.groups
});

export default connect(mapStateToProps, { getUserGroups })(withRouter(GroupsDisplay));