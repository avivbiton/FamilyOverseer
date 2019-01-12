import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            authorized: false
        }
    }



    updateAuthorizedState(authObject) {

        this.setState({ authorized: authObject.isAuthenticated });

    }

    componentDidMount() {
        this.updateAuthorizedState(this.props.auth);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.updateAuthorizedState(nextProps.auth);
        }
    }

    render() {

        const unauthContent =
            <div>
                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
            </div>
        const authContent =
            <div>
                <p className="lead">Welcome, {this.props.auth.user.firstName} {this.props.auth.user.lastName}</p>
                <Link to="/dashboard" className="btn btn-lg btn-info">Dashboard</Link>
            </div>

        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Family Overseer</h1>
                                <p className="lead"> Simple and elegant task manager for your family and friends.</p>
                                <hr />
                                {this.state.authorized ? authContent : unauthContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);
