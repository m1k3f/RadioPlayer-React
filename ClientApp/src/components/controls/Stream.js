import React, { Component } from 'react';
import RadioContext from '../context/RadioContext';

export default class Stream extends Component {

    static contextType = RadioContext;

    handlePlay = (e) => {
        // this.streamer.play();
    }

    render() {
        return(
            <section className="stream">
                <video ref={el => this.streamer = el} onPlay={this.handlePlay} />
            </section>
        );
    }
}