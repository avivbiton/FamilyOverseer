import React, { Component } from 'react'
import { connect } from 'react-redux';


import { inviteUserToGroup } from "../../redux/actions/groupActions";
import { InputControl } from "../common/FormControls";

class InviteToGroup extends Component {


    constructor() {
        super();

        this.state = {
            errors: {},
            userEmail: "",
            isLoading: false,
            inviteSent: undefined
        }
    }

    componentDidMount() {
        const groupId = this.props.match.params.id;
        this.setState({ groupId: groupId });

    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isLoading: false, errors: nextProps.errors });
    }

    onInviteClicked = () => {
        this.setState({ isLoading: true });
        this.props.inviteUserToGroup(this.state.groupId, this.state.userEmail, (userInvitedName) => {
            this.setState({ inviteSent: userInvitedName, isLoading: false });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2 className="display-4">Send Invite</h2>
                </div>
                <div className="row">

                    <form className="form">
                        <InputControl
                            type="text"
                            text="User Email:"
                            value={this.state.userEmail}
                            name="userEmail"
                            id="userEmail"
                            onChange={this.onChange}
                            error={this.state.errors.userEmail}
                        />
                        <button className="btn btn-success btn-block" type="button" onClick={this.onInviteClicked}
                            disabled={this.state.isLoading}>
                            Invite</button>
                    </form>

                    {this.state.inviteSent ?
                        <div>Invitation sent to {this.state.inviteSent}</div> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

    errors: state.errors,
    groups: state.groups
});

export default connect(mapStateToProps, { inviteUserToGroup })(InviteToGroup);
