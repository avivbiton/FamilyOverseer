import React, { Component } from 'react'
import { connect } from "react-redux";
import { InputControl, ButtonControl } from "../common/FormControls";

import { registerUser } from "../../redux/actions/authActions";

class Register extends Component {

    //TODO: Display loading wheel while the registration is in progress.
    //TODO: Add input validation

    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            errors: {}
        }
    }

    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        this.props.registerUser(data, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="display-4 text-center">Signup</div>
                        <div className="lead text-center">Create your account for FREE!</div>
                        <hr />
                        <form>
                            <InputControl
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.onInputChange}
                                placeholder="First Name"
                            />
                            <InputControl
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.onInputChange}
                                placeholder="Last Name"
                            />
                            <InputControl
                                type="email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                                placeholder="Email Address"
                            />
                            <InputControl
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                                placeholder="Password"
                                description="Password must contain at least 6 characters."
                            />
                            <InputControl
                                type="password"
                                id="passwordConfirm"
                                name="passwordConfirm"
                                value={this.state.passwordConfirm}
                                onChange={this.onInputChange}
                                placeholder="Confirm Password"
                            />
                            <ButtonControl
                                classes="btn-block"
                                text="Signup"
                                id="register"
                                name="register"
                                onClick={this.onSubmit}
                            />
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);