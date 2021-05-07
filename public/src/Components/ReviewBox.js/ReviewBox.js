import React, { Component } from 'react';
import './Box.css'
import M from 'materialize-css'
class ReviewBox extends Component {
    constructor(props) {
        super(props);
        this.textRef = React.createRef();
        this.state = {
            comms: []
        }
    }
    componentDidMount() {
        fetch('/comments/' + this.props.mID)
            .then((res) => res.json())
            .then(dat => {
                this.setState({ comms: dat })

            })
    }
    postComment = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": this.props.name,
            "movieID": this.props.mID,
            "timestamp": Date.now(),
            "comment": this.textRef.current.value
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/newComment", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState((prev) => {
                    const newone = prev.comms;
                    newone.push(result.obj)
                    M.toast({ html: 'Comment Posted' });

                    return { comms: newone }
                })
            })
            .catch(error => console.log('error', error));
    }
    render() {


        const comments = this.state.comms.map((c, k) => {
            const d = new Date(parseInt(c.timestamp))
            return (
                <div className="card blue-grey darken-1" style={{ width: '100%' }} key={k}>
                    <div className="card-content white-text">
                        <span className="card-title">{this.props.name}</span>
                        <span style={{ fontSize: '10px' }}>{`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`}</span>
                        <p>{c.comment}</p>
                    </div>

                </div>
            )
        })

        return (
            <div>
                <div className="title blue-text w-80">Reviews</div>
                <hr />
                <div className="w-80 text-a" >
                    <div className="input-field col s12">
                        <textarea id="textarea1" className="materialize-textarea" ref={this.textRef}></textarea>
                        <label htmlFor="textarea1">Your Review</label>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" onClick={this.postComment}>Submit
    <i className="material-icons right">send</i>
                    </button>
                </div>
                <div className="w-80">
                    {comments}
                </div>


            </div>
        );
    }
}

export default ReviewBox;