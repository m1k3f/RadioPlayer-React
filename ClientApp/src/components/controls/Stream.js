import React, { Component } from 'react';
import Hls from 'hls.js';

import RadioContext from '../context/RadioContext';

export default class Stream extends Component {

    // state = {
    //     streamSrc: null
    // }

    static contextType = RadioContext;

    stationSrc = '';

    componentDidUpdate() {
        const { selectedStation } = this.context;
        
        if (selectedStation.play && selectedStation.station !== null) {                       
            if (this.shouldPlay(selectedStation.station)) {
                this.playStream(selectedStation.station);
            }
        }
        else if (!selectedStation.play && selectedStation.station !== null && 
                !this.streamer.paused) {
            //station not selected (paused), src is playing => stop src
            this.pauseStream();           
        }
    }

    shouldPlay = (station) => {
        let shouldPlay = false;
        if (this.stationSrc.length === 0 && this.streamer.paused) {
            //playing for the first time
            shouldPlay = true;
        }
        else if (this.stationSrc.length > 0 && station.url_resolved.length > 0) {
            //let streamerSrc = this.streamer.src.replace('https://', '').replace('http://', '');
            let selectedSrc = station.url_resolved.replace('https:', '').replace('http:', '');
            
            //if true: not playing for the first time, station was switched
            shouldPlay = (this.stationSrc !== selectedSrc); 
        }

        return shouldPlay;
    }

    playStream = (station) => {
        this.pauseStream();
        
        let srcUrl = station.url_resolved.replace('https:', '').replace('http:', '');
        this.stationSrc = srcUrl;
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
            hlsJs.detachMedia();
            hlsJs.destroy();
            hlsJs = undefined;
        });        

        hlsJs.on(Hls.Events.MANIFEST_PARSED, () => {            
            hlsJs.startLoad();
            this.streamer.play();
        });

        hlsJs.attachMedia(this.streamer);        
        hlsJs.loadSource(stationUrl);
        this.streamer.load();
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