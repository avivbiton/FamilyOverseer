import React, { Component, } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from '../redux/actions/authActions';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            authorized: false
        }
    }
    componentDidMount() {
        this.setState({ authorized: this.props.auth.isAuthenticated });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.setState({ authorized: nextProps.auth.isAuthenticated });
        }
    }
    render() {

        let user = this.props.auth.user;

        const unauthorizedContent =
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Signup</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>;



        const authorizedContent =
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Welcome, {user.firstName} {user.lastName}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={logoutUser(this.props.history)}>Logout</Link>
                </li>
            </ul>
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
                <Link className="navbar-brand" to="/">Family Overseer</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {this.state.authorized ? authorizedContent : unauthorizedContent}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact-us">Contact Us </Link>
                        </li>
                    </ul>

                </div>
            </nav >
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Navbar);
