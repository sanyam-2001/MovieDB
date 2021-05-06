import React, { Component } from 'react';
import './Dedicated.css'
import ReviewBox from '../ReviewBox.js/ReviewBox'
class Dedicated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMovie: {},
            ytLink: '',
            downloads: []
        }
    }
    componentDidMount() {
        fetch(`/getMovieDetails/${this.props.id}`)
            .then(dat => dat.json())
            .then(res => {
                if (res.videos.results.length === 0) {
                    this.setState({ currentMovie: res, downloads: res.downloads })

                }
                else this.setState({ currentMovie: res, ytLink: res.videos.results[0], downloads: res.downloads })
            })
    }
    handleBack = () => {
        this.props.dedicatedPage('dashboard', null, null);
    }

    render() {
        console.log(this.state.currentMovie)
        const downloadLinks = this.state.downloads.map((m, i) => {
            return (
                <div key={i} style={{ marginTop: '2.5%', textAlign: 'center', border: '1px solid black', padding: "10px" }}>
                    <a href={m.link} style={{ width: '100%', fontSize: '10px' }}><i class="material-icons left">cloud</i>{m.title}</a>
                </div>
            )
        })
        if (this.state.currentMovie.videos) {
            return (

                <div>
                    <div className="w-80">
                        <button className="btn waves-effect pulse waves-light" type="submit" onClick={this.handleBack}> Back<i className="material-icons right">assignment_return</i></button>
                    </div>
                    <div className="row" style={{ marginTop: '5%' }}>
                        <div className="col s2 m2"></div>
                        <div className="col s10 m4">


                            <div className="card" style={{ width: '80%', margin: 'auto' }} >
                                <div className="card-image">
                                    <img src={`https://image.tmdb.org/t/p/w500${this.state.currentMovie.poster_path}`} alt="Path" />
                                    <a className="btn-floating halfway-fab waves-effect waves-light red" href="!#"><i className="material-icons">add</i></a>
                                </div>
                                <div class="card-action">
                                    <a href={`https://www.youtube.com/watch?v=${this.state.ytLink.key}`}>Trailer</a>
                                </div>
                            </div>


                        </div>

                        <div className="col s10 m4" id="info">
                            <div>
                                <h2> {this.state.currentMovie.original_title}</h2>
                                <h6>{this.state.currentMovie.tagline}</h6>
                            </div>
                            <hr />
                            <div className="card-panel teal">
                                <span className="white-text">
                                    {this.state.currentMovie.overview}
                                </span>
                            </div>
                            <div className="card-panel blue">
                                <h6 className="white-text">
                                    <i className="material-icons">home</i>
                                    <a href={this.state.currentMovie.homepage} className="white-text">Homepage</a>
                                </h6>
                            </div>
                            <div className="card-panel teal">
                                <h6 className="white-text">
                                    <i className="material-icons">hourglass_empty</i>
                                    <a href="!#" className="white-text">Runtime: {this.state.currentMovie.runtime} Mins</a>
                                </h6>
                            </div>
                            <div className="card-panel blue">
                                <h6 className="white-text">
                                    <i className="material-icons">star</i>
                                    <a href="!#" className="white-text">Rating: {this.state.currentMovie.vote_average}</a>
                                </h6>
                            </div>

                        </div>
                        <div className="col s2 m2"></div>
                    </div>

                    <div className='w-80' style={{ padding: '20px' }}>
                        {downloadLinks}
                    </div>
                    <hr />

                    <ReviewBox mID={this.state.currentMovie.id} name={this.props.name} />
                </div>
            );
        }
        else {
            return null
        }

    }
}

export default Dedicated;