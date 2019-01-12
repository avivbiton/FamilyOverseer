import React, { Component } from 'react'
import { connect } from "react-redux";
import { InputControl, ButtonControl } from "../common/FormControls";

import { registerUser } from "../../redux/actions/authActions";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            errors: {},
            loading: false,
            signupReady: true
        }
    }

    verifyPasswordsMatch = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    passwordConfirm: "Passwords do not match"
                }

            })
            return false;
        }
        else {
            this.setState({
                errors: {
                    ...this.state.errors,
                    passwordConfirm: undefined
                }
            })
            return true;
        }
    }


    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.setState({ signupReady: this.verifyPasswordsMatch() });
        });
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
        this.setState({ loading: true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
                loading: false
            });
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
                                error={this.state.errors.firstName}
                            />
                            <InputControl
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.onInputChange}
                                placeholder="Last Name"
                                error={this.state.errors.lastName}
                            />
                            <InputControl
                                type="email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                                placeholder="Email Address"
                                error={this.state.errors.email}
                            />
                            <InputControl
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                                placeholder="Password"
                                description="Password must contain at least 6 characters."
                                error={this.state.errors.password}
                            />
                            <InputControl
                                type="password"
                                id="passwordConfirm"
                                name="passwordConfirm"
                                value={this.state.passwordConfirm}
                                onChange={this.onInputChange}
                                placeholder="Confirm Password"
                                error={this.state.errors.passwordConfirm}
                            />

                            <ButtonControl
                                classes="btn-block"
                                text={this.state.loading === true ? "Loading..." : "Signup"}
                                id="register"
                                name="register"
                                onClick={this.onSubmit}
                                disabled={(this.state.loading === false && this.state.signupReady === true) ? false : true}
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