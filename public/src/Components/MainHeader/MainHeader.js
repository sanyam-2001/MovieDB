import React, { Component } from 'react';
import Logo from '../AuthHeader/logo.png'
import M from 'materialize-css'
import './MainHeader.css'
const headStyles = {
    display: 'flex',
    padding: "10px",
    width: "80%", margin: "auto",
    justifyContent: "space-between",
    alignItems: 'center'
}
class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        M.AutoInit()
    }
    signOut = () => {
        this.props.changeID('none');
        this.props.changeRoute('login')
    }
    render() {
        return (
            <div >
                <div style={headStyles}>
                    <div>
                        <a href="!#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons" style={{ fontSize: "40px" }}>menu</i></a>

                    </div>
                    <div>
                        <img src={Logo} alt="Logo" height="50px" />
                    </div>
                </div>
                <hr />
                {/* Sidenav Content and Functions */}
                <ul id="slide-out" className="sidenav blue">
                    <li>
                        <div className="head">MovieDB</div>
                        <hr style={{ width: '80%', margin: "auto" }} />
                    </li>
                    <li>
                        <div style={{ color: 'white', display: 'flex', alignItems: 'center', fontSize: '24px', marginLeft: '10%', padding: '10px' }}>
                            <span className="material-icons" style={{ fontSize: '24px', marginRight: '20px' }}>account_circle</span> {this.props.name}
                        </div>
                    </li>
                    <li>
                        <div className="but-links">
                            <div>
                                <a className="waves-effect waves btn-large white blue-text" href="!#" >Favourites</a>
                            </div>
                            <div>
                                <a className="waves-effect waves btn-large white blue-text" href="https://github.com/" >Links</a>
                            </div>
                            <div >
                                <a className="waves-effect waves btn-large white blue-text" href="https://yts.mx/" >Downloads</a>
                            </div>
                            <div >
                                <a className="waves-effect waves btn-large white blue-text" href="https://www.stremio.com/downloads" >Streaming</a>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', bottom: '20%', left: '20%' }}>
                            <a className="waves-effect waves-light btn-large red white-text" style={{ width: "100%" }} href="!#" onClick={this.signOut}><i className="material-icons left">cloud</i>Sign-Out</a>
                        </div>
                    </li>
                </ul>

            </div>

        );
    }
}

export default MainHeader;