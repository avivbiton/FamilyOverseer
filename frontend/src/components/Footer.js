import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (

            <footer className="bg-dark text-white mt-3 text-center fixed-bottom">

                <div className="container">

                    <ul className="list-unstyled list-inline text-center mt-1">
                        <li className="list-inline-item">
                            <a className="btn-floating btn-fb mx-1">
                                <i className="fab fa-facebook-f"> </i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a className="btn-floating btn-tw mx-1">
                                <i className="fab fa-twitter"> </i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a className="btn-floating btn-gplus mx-1">
                                <i className="fab fa-google-plus-g"> </i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a className="btn-floating btn-li mx-1">
                                <i className="fab fa-linkedin-in"> </i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a className="btn-floating btn-dribbble mx-1">
                                <i className="fab fa-dribbble"> </i>
                            </a>
                        </li>
                    </ul>

                </div>
                <div className="footer-copyright text-center mb-2">© 2019 Copyright
                  <a href="http://www.github.com/avivbiton"> Aviv Biton</a>
                </div>

            </footer>

        )
    }
}

export default Footer;
