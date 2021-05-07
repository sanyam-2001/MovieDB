import React, { Component } from 'react';
import AuthHeader from '../AuthHeader/AuthHeader'
import './Signup.css'
import MainVideo from "../MainPage.mp4"
import Footer from '../Footer/Footer'
import M from 'materialize-css'
class Signup extends Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.state = {
            type: "password"
        }
    }
    togglePassword = () => {
        this.setState((prev) => {
            if (prev.type === "password") { return { type: "text" } }
            else return { type: "password" }
        })
    }
    attempSignUp = (e) => {
        const name = this.nameRef.current.value, email = this.emailRef.current.value, password = this.passwordRef.current.value;
        const obj = {
            name,
            email,
            password
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(obj);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/signup", requestOptions)
            .then(response => response.json())
            .then(result => {
                M.toast({ html: 'Request Processed!' })

                if (result.code === 200) {
                    this.props.changeID(result.response.userID)
                    this.props.changeRoute('home')
                }
                if (result.code === 100) {
                    M.toast({ html: 'Invalid Name Parameter!' })
                }
                if (result.code === 101) {
                    M.toast({ html: 'Invalid E-Mail Parameter!' })
                }
                if (result.code === 102) {
                    M.toast({ html: 'Invalid Password Parameter!' })
                }
                if (result.code === 11000) {
                    M.toast({ html: 'E-Mail Adress Already Taken' })
                }


            })
            .catch(error => console.log('error', error));

    }
    render() {
        return (
            <div>
                <AuthHeader />
                <div className="w-80 blue-text" style={{ marginTop: "20px", display: "flex" }}>
                    <div className="l" style={{ flex: 1 }}>
                        <div className="signup">SignUp</div>
                        <div className="form" style={{ padding: "10px" }}>
                            <div className="input-field">
                                <i className="material-icons prefix">account_box</i>
                                <input id="name" type="text" ref={this.nameRef} />
                                <label htmlFor="name">Name</label>
                            </div>
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
                                    <button className="btn waves-effect waves-light blue" type="submit" style={{ width: "30%" }} onClick={this.attempSignUp}>Submit <i className="material-icons right">send</i>
                                    </button>
                                </div>
                                <div className="input-field right-align">
                                    <button className="btn waves-effect waves-light blue" type="submit" style={{ width: "30%" }} onClick={() => { this.props.changeRoute('login') }}>Login Instead?
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

        );
    }
}

export default Signup;