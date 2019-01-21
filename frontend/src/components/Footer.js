import React, { Component } from 'react'

class Footer extends Component {
    render() {

        return (
            <footer className="footer bg-dark text-white">
                <div className="container text-center">
                    <ul className="list-unstyled list-inline text-center">
                        <li className="list-inline-item">
                            <a href="http://www.google.com" className="btn-floating btn-fb mx-1">
                                <i className="fab fa-facebook-f"> </i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="http://www.google.com" className="btn-floating btn-tw mx-1">
                                <i className="fab fa-twitter"> </i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="http://www.google.com" className="btn-floating btn-gplus mx-1">
                                <i className="fab fa-google-plus-g"> </i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://www.linkedin.com/in/aviv-biton-8746b5162/" className="btn-floating btn-li mx-1">
                                <i className="fab fa-linkedin-in"> </i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://github.com/avivbiton" className="btn-floating btn-dribbble mx-1">
                                <i className="fab fa-github"> </i>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        )
    }
}

export default Footer;
