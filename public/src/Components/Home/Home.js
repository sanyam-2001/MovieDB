import React, { Component } from 'react';
import MainHeader from '../MainHeader/MainHeader'
import Dashboard from '../Dashboard/Dashboard'
import Dedicated from '../Dedicated/Dedicated'
import Footer from '../Footer/Footer'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            view: 'dashboard',
            id: null,
            type: null,

        }
    }
    componentDidMount() {
        fetch(`/getUser/${this.props.userID}`)
            .then(res => res.json())
            .then(user => {
                this.setState({ user: user })
                console.log(user)
            })
    }
    dedicatedPage = (view, id, type) => {
        this.setState({
            view: view,
            id: id,
            type: type
        })
    }
    render() {
        return (
            <div>
                <MainHeader name={this.state.user.name} changeRoute={this.props.changeRoute} changeID={this.props.changeID} />
                {this.state.view === 'dashboard' ? <Dashboard dedicatedPage={this.dedicatedPage} /> : <Dedicated dedicatedPage={this.dedicatedPage} id={this.state.id} name={this.state.user.name} />}

                <Footer />
            </div>
        )
    }
}

export default Home;