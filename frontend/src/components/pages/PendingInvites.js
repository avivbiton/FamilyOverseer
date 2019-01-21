import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserPendingInvites } from "../../redux/actions/authActions";
import { acceptGroupInvite, declineGroupInvite } from "../../redux/actions/groupActions";
import LoadingSpinner from '../common/LoadingSpinner';


class PendingInvites extends Component {

    constructor() {
        super();
        this.state = { pendingInvites: [], isLoading: true };
    }



    componentDidMount() {
        if (this.props.auth.isAuthenticated === false) {
            this.props.history.push("/");
        }
        this.props.getUserPendingInvites();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.pendingInvites) {

            this.setState({ pendingInvites: nextProps.auth.pendingInvites, isLoading: false })
        }
    }


    onAccept = (groupId) => {
        this.removeInviteVisually(groupId);
        this.props.acceptGroupInvite(groupId);
    }

    onDecline = (groupId) => {
        this.removeInviteVisually(groupId);
        this.props.declineGroupInvite(groupId);
    }

    removeInviteVisually = (groupId) => {
        const index = this.state.pendingInvites.findIndex(i => groupId === i._id);
        let pendingInvites = this.state.pendingInvites;
        pendingInvites.splice(index, 1);
        this.setState({ pendingInvites: pendingInvites });
    }


    renderInviteRow = (invite, key) => {
        return (
            <div key={key} className="media text-muted pt-3">
                <svg className="bd-placeholder-img mr-2 rounded" width="40" height="40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect fill="#007bff" width="100%" height="100%" /><text fill="#007bff" dy=".3em" x="50%" y="50%">32x32</text></svg>
                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <strong className="text-gray-dark">{invite.name}</strong>
                        <div>
                            <button className="btn btn-success mr-1" onClick={() => this.onAccept(invite._id)}>Accept</button>
                            <button className="btn btn-danger" onClick={() => this.onDecline(invite._id)}>Decline</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }


    renderNoPendingInvites() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3 className="mb-3">You have no pending invites</h3>
                        <Link to="/dashboard"><button className="btn btn-info btn-lg">Back to dashboard</button></Link>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let pendingInvites = [];
        if (this.state.pendingInvites)
            pendingInvites = this.state.pendingInvites;
        //  if (pendingInvites.length === 0) return this.renderNoPendingInvites();
        if (this.state.isLoading) return <div className="text-center"><LoadingSpinner /></div>
        return (
            <main role="main" className="container">
                <div className="my-3 p-3 bg-white rounded shadow-sm">
                    <h6 className="border-bottom border-gray pb-2 mb-0">Pending Invites</h6>
                    {pendingInvites.map((invite, index) => this.renderInviteRow(invite, index))}
                </div>
                <div className="float-right">

                    <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>Back to dashboard</button>
                </div>
            </main>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getUserPendingInvites, acceptGroupInvite, declineGroupInvite })(PendingInvites);
