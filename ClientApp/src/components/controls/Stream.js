import React, { Component } from 'react';
import RadioContext from '../context/RadioContext';

export default class Stream extends Component {

    state = {
        streamSrc: null
    }

    static contextType = RadioContext;

    handlePlay = (e) => {
        // this.streamer.play();
    }

    render() {        
        let streamStyle = {
            width: 0,
            height: 0
        };
        if (this.state.streamSrc != null) {
            streamStyle = {
                width: '200px',
                height: '200px'
            };
        }

        return(
            <section className="stream" style={streamStyle}>
                <video ref={el => this.streamer = el} onPlay={this.handlePlay} />
            </section>
        );
    }
}