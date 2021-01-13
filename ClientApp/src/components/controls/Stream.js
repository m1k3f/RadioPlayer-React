import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';

export default class Stream extends Component {

    // state = {
    //     streamSrc: null
    // }

    static contextType = RadioContext;

    componentDidUpdate() {
        const { selectedStation } = this.context;
        
        if (selectedStation.play && selectedStation.station !== null && 
                this.streamer.src.length === 0 && this.streamer.paused) {
            //station selected, video has src, src not playing => play src
            this.streamer.setAttribute('src', selectedStation.station.url_resolved);
            this.streamer.play();
        }
        else if (!selectedStation.play && selectedStation.station !== null && 
                this.streamer.src.length > 0 && !this.streamer.paused) {
            //station not selected (paused), video has src, src is playing => stop src
            this.streamer.pause();
            this.streamer.removeAttribute('src');            
        }
    }

    handlePlay = (e) => {
        
    }

    render() {        
        let streamStyle = {
            width: 0,
            height: 0
        };
        // if (this.state.streamSrc != null) {
        //     streamStyle = {
        //         width: '200px',
        //         height: '200px'
        //     };
        // }

        return(
            <section className="stream" style={streamStyle}>
                <video ref={el => this.streamer = el} onPlay={this.handlePlay} />
            </section>
        );
    }
}