import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { InputControl } from '../../common/FormControls';


import { createGroup } from "../../../redux/actions/groupActions";

class NewGroupDisplay extends Component {

    constructor() {
        super();
        this.state = {
            groupName: "",
            errors: {},
            isLoading: false
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
            this.setState({ isLoading: false });
        }
    }

    onCreateClicked = () => {
        this.setState({ isLoading: true });
        this.props.createGroup(this.state.groupName, () => {
            this.setState({ isLoading: false });
            window.location.reload();
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2 className="display-4">New Group</h2>
                </div>
                <div className="row">

                    <form className="form">
                        <InputControl
                            type="text"
                            text="Group Name:"
                            value={this.state.groupName}
                            name="groupName"
                            id="groupName"
                            onChange={this.onChange}
                            error={this.state.errors.name}
                        />
                        <button className="btn btn-success btn-block" type="button" onClick={this.onCreateClicked}
                            disabled={this.state.isLoading}>
                            Create Group</button>
                    </form>
                </div>
            </div>

        )
    }
}


const mapStateToProps = state => ({
    errors: state.errors,
    groups: state.groups
});

export default connect(mapStateToProps, { createGroup })(withRouter(NewGroupDisplay));