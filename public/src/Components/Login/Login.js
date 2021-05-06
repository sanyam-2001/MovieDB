import React, { Component } from 'react';
import AuthHeader from '../AuthHeader/AuthHeader'
import MainVideo from "../MainPage.mp4"
import Footer from '../Footer/Footer'
import M from 'materialize-css'
import "./Login.css"
class Login extends Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.state = {
            type: 'password'
        }
    }

    togglePassword = () => {
        this.setState((prev) => {
            if (prev.type === 'password') return { type: 'text' }
            else return { type: 'password' }
        })
    }
    attemptLogin = () => {
        const email = this.emailRef.current.value, password = this.passwordRef.current.value;
        let auth = true;
        if (email.indexOf('@') === -1) {
            M.toast({ html: 'Invalid Email Credentials!' });
            auth = false;
        }
        if (password.length < 6) {
            M.toast({ html: 'Invalid Password Credentials!' });
            auth = false;
        }
        if (auth) {
            fetch(`/login/${email}/${password}`)
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Request Processed!' })

                    if (data.code === 110) {
                        M.toast({ html: 'User Not Found!' })
                    }
                    if (data.code === 111) {
                        M.toast({ html: 'Incorrect Password' })
                    }
                    if (data.code === 200) {
                        console.log(data)
                        this.props.changeID(data.response.userID)
                        this.props.changeRoute('home')

                    }

                })
        }

    }
    render() {
        return (
            <div>
                <AuthHeader />
                <div className="w-80 blue-text" style={{ marginTop: "20px", display: "flex" }}>
                    <div className="l" style={{ flex: 1 }}>
                        <div className="signup">Login</div>
                        <div className="form" style={{ padding: "10px" }}>
                            <div className="input-field">
                                <i className="material-icons prefix">email</i>
                                <input id="email" type="text" ref={this.emailRef} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix">https</i>
                                <input id="password" type={this.state.type} ref={this.passwordRef} />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="input-field right-align">
                                <p>
                                    <label>
                                        <input type="checkbox" onClick={this.togglePassword} />
                                        <span>Show Password</span>
                                    </label>
                                </p>
                            </div>
                            <div>
                                <div className="input-field right-align">
                                    <button className="btn waves-effect waves-light blue" type="submit" style={{ width: "30%" }} onClick={this.attemptLogin}>Submit <i className="material-icons right">send</i>
                                    </button>
                                </div>
                                <div className="input-field right-align">
                                    <button className="btn waves-effect waves-light blue" type="submit" style={{ width: "30%" }} onClick={() => { this.props.changeRoute('signup') }}>SignUp?
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="r" style={{ flex: 1 }}>
                        <video className="responsive-video" controls autoPlay muted playsInline>
                            <source src={MainVideo} type="video/mp4" />
                        </video>
                        <video className="responsive-video" controls autoPlay muted playsInline>
                            <source src={MainVideo} type="video/mp4" />
                        </video>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Login;