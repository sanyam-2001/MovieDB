import React, { Component } from 'react'
import './App.css'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Home from './Components/Home/Home'
class App extends Component {

  constructor() {
    super();
    this.state = {
      router: "login",
      userID: ""
    }
  }
  changeRoute = (route) => {
    this.setState({ router: route })
  }
  changeID = (id) => {
    this.setState({ userID: id })
  }
  render() {
    if (this.state.router === "login") {
      return <Login changeRoute={this.changeRoute} changeID={this.changeID} />
    }
    else if (this.state.router === "signup") {
      return <Signup changeRoute={this.changeRoute} changeID={this.changeID} />
    }
    else if (this.state.router === "home") {
      return <Home userID={this.state.userID} changeRoute={this.changeRoute} changeID={this.changeID} />
    }
  }
}

export default App;
