import React, { Component } from 'react';
import Hls from 'hls.js';

import RadioContext from '../context/RadioContext';

export default class Stream extends Component {

    // state = {
    //     streamSrc: null
    // }

    static contextType = RadioContext;

    componentDidUpdate() {
        const { selectedStation } = this.context;
        
        if (selectedStation.play && selectedStation.station !== null) {
            //station selected, src not playing => play src            
            if (this.streamer.src.length === 0 || 
                (this.streamer.src.length > 0 && this.streamer.src !== selectedStation.station.url_resolved)) {
                this.playStream(selectedStation.station);
            }
        }
        else if (!selectedStation.play && selectedStation.station !== null && 
                !this.streamer.paused) {
            //station not selected (paused), src is playing => stop src
            this.pauseStream();           
        }
    }

    playStream = (station) => {
        if (!this.streamer.paused) {
            this.pauseStream();
        }
        
        let srcUrl = station.url_resolved.replace('https:', '').replace('http:', '');
        if (!station.hls) {
            this.playBasicStream(srcUrl);
        }
        else if (station.hls && Hls.isSupported()) {
            this.playHlsStream(srcUrl);
        }        
    }

    playBasicStream = (stationUrl) => {
        this.streamer.setAttribute('src', stationUrl);
        this.streamer.load();
        this.streamer.play();
    }

    playHlsStream = (stationUrl) => {
        let hlsJs = new Hls();

        hlsJs.on(Hls.Events.ERROR, (event, data) => {
            hlsJs.stopLoad();
            hlsJs.destroy();
            hlsJs = undefined;
        });

        hlsJs.on(Hls.Events.MANIFEST_PARSED, () => {
            this.streamer.play();
        });

        hlsJs.loadSource(stationUrl);
        hlsJs.attachMedia(this.streamer);
    }

    pauseStream = () => {
        this.streamer.pause();
        this.streamer.removeAttribute('src'); 
    }

    handlePlay = (e) => {
        this.streamer.volume = '0.2';
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
                <video ref={el => this.streamer = el} 
                        onPlay={this.handlePlay} />
            </section>
        );
    }
}