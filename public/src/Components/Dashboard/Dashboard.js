import React, { Component } from 'react';
import './Dashboard.css'
import Slider from '../Slider/Slider'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
        this.state = {
            nowPlaying: {},
            currentSearch: ''
        }
    }
    handleSearchClick = () => {
        this.setState({ currentSearch: this.searchRef.current.value })
    }
    render() {
        return (
            <div>
                <div className="w-80">
                    <div className="title blue-text">MovieDB</div>
                    <div className="about" style={{ marginTop: '2.5%', marginBottom: '2.5%', padding: '10px' }}>
                        A Hub for Movie Enthusiasts <br />
                        Fans of Art and Action <br />
                        One Stop for All things Cinema
                    </div>
                </div>
                <div className="searchBox w-80" style={{ display: 'flex' }}>
                    <div className="input-field" style={{ flex: 1 }}>
                        <input id="search" type="text" ref={this.searchRef} />
                        <label htmlFor="search">Search Box</label>
                    </div>
                    <div>

                        <button className="btn waves-effect waves-light" type="submit" onClick={this.handleSearchClick}>Submit<i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
                {this.state.currentSearch === "" ? null : <Slider mainID="s0" dedicatedPage={this.props.dedicatedPage} url={`https://api.themoviedb.org/3/search/movie?api_key=7ce6f3444cda42a6506370e782b2e857&language=en-US&query=${this.state.currentSearch}&page=1&include_adult=false`} />}

                <div className='w-80' style={{ marginTop: '5%' }}>
                    <div className="nowplaying blue-text">Now Playing</div>
                    <hr />
                </div>
                <Slider mainID="s1" dedicatedPage={this.props.dedicatedPage} url="https://api.themoviedb.org/3/movie/now_playing?api_key=7ce6f3444cda42a6506370e782b2e857&language=en-US&page=1" />
                <div className='w-80' style={{ marginTop: '5%' }}>
                    <div className="nowplaying blue-text">The Classics</div>
                    <hr />
                </div>
                <Slider mainID="s2" dedicatedPage={this.props.dedicatedPage} url="https://api.themoviedb.org/3/movie/top_rated?api_key=7ce6f3444cda42a6506370e782b2e857&language=en-US&page=1" />
                <div style={{ height: '200px' }}></div>
            </div>
        );
    }
}

export default Dashboard;