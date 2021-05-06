import React, { Component } from 'react';
import './Slider.css'
class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowPlaying: []
        }
    }
    componentDidMount() {
        const url = this.props.url
        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({ nowPlaying: data.results }))
    }
    componentDidUpdate() {
        const url = this.props.url
        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({ nowPlaying: data.results }))
    }
    render() {
        const movies = this.state.nowPlaying.map(m => {
            return (
                <div key={m.id}>
                    <div>
                        <div className="card">
                            <div className="card-image sliderImg">
                                <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt="Poster" onClick={() => { this.props.dedicatedPage('dedicated', m.id, 'movie') }} />
                            </div>

                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div id={this.props.mainID} className="slider-container" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="leftNav" style={{ visibility: 'hidden' }}><i className="material-icons">send</i></div>
                <div className="slider scrollbar-hidden">{movies}</div>
                <div className="leftNav" style={{ visibility: 'hidden' }}><i className="material-icons">send</i></div>
            </div>
        );
    }
}

export default Slider