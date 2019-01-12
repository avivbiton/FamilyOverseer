import React, { Component } from 'react'
import { connect } from "react-redux";
import { InputControl, ButtonControl } from "../common/FormControls";
import { loginUser } from "../../redux/actions/authActions";

class Login extends Component {


    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {},
            loading: false
        }
    }
    componentWillMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }
    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password
        }

        this.setState({ loading: true });

        this.props.loginUser(data, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors, loading: false });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="display-4 text-center">Login</div>
                        <div className="lead text-center">Fill your login credentials</div>
                        <hr />
                        <form>
                            <InputControl
                                type="text"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                                placeholder="Email"
                                error={this.state.errors.email}
                            />
                            <InputControl
                                type="password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                                placeholder="Password"
                                error={this.state.errors.password}
                            />
                            <ButtonControl
                                classes="btn-block"
                                text={this.state.loading === true ? "Loading..." : "Signup"}
                                id="register"
                                name="register"
                                onClick={this.onSubmit}
                                disabled={this.state.loading}
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

export default connect(mapStateToProps, { loginUser })(Login);
