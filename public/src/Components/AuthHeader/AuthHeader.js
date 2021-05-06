import React, { Component } from 'react';
import Logo from './logo.png';
import './AuthHeader.css'
class AuthHeader extends Component {
    render() {
        return (
            <div className="">
                <div className="mainContainer w-80">
                    <div className="imgContainer">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="titleContainer">
                        MovieDB
                </div>
                </div>
                <hr />
            </div>
        );
    }
}

export default AuthHeader;