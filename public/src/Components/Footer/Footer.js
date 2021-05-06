import React, { Component } from 'react';
import './footer.css'
class Footer extends Component {

    render() {
        return (
            <footer className="page-footer blue">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">MovieDB</h5>
                            <p className="grey-text text-lighten-4">Home of all things Cinema</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Links</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="https://github.com/sanyam-2001">Github Profile</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2021 MIT License
            <a className="grey-text text-lighten-4 right" href="https://github.com/sanyam-2001">Repository</a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;