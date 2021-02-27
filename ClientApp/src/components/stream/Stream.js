import React, { Component } from 'react';
import Hls from 'hls.js';

import RadioContext from '../context/RadioContext';
import styles from './Stream.module.css';

export default class Stream extends Component {

    // state = {
    //     streamSrc: null
    // }

    static contextType = RadioContext;

    stationSrc = '';
    stationSrcRetry = false;
    hlsJs = null;

    componentDidUpdate() {
        const { selectedStation } = this.context;
        
        if (selectedStation.play && selectedStation.station !== null) {                       
            if (this.shouldPlay(selectedStation.station)) {
                this.playStream(selectedStation.station);
            }
        }
        else if (!selectedStation.play && selectedStation.station !== null && 
                !this.streamer.paused) {
            //pause button is pushed, src is still playing => stop src
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
            //let selectedSrc = station.url_resolved.replace('https:', '').replace('http:', '');
            let selectedSrc = station.url_resolved;
            
            //if true: not playing for the first time, station was switched
            shouldPlay = (this.stationSrc !== selectedSrc);
            this.stationSrcRetry = (shouldPlay) ? false : true;
        }

        return shouldPlay;
    }

    playStream = (station) => {
        this.pauseStream();
        
        //let srcUrl = station.url_resolved.replace('https:', '').replace('http:', '');
        let srcUrl = station.url_resolved;
        this.stationSrc = srcUrl;
        if (!station.hls) {
            this.hlsJs = null;
            this.playBasicStream(srcUrl);
        }
        else if (station.hls && Hls.isSupported()) {
            this.playHlsStream(srcUrl);
        }        
    }

    playBasicStream = (stationUrl) => {
        this.streamer.src = stationUrl;
        if (this.streamer.error === null) {
            this.streamer.load();
            this.streamer.volume = '0.25';
            this.streamer.play();
        }
    }

    playHlsStream = (stationUrl) => {
        this.hlsJs = new Hls();

        this.hlsJs.on(Hls.Events.ERROR, (event, data) => {
            this.hlsJs.stopLoad();
            
            if (data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR && !this.stationSrcRetry) {
                this.stationSrcRetry = true;
                let newSrc = this.stationSrc.replace('https:', '').replace('http:', '');
                this.hlsJs.loadSource(newSrc);

                this.streamer.load();
            }
            else {
                this.hlsJs.detachMedia();
                this.hlsJs.destroy(); 
                this.hlsJs = null;
            }
        });        

        this.hlsJs.on(Hls.Events.MANIFEST_PARSED, () => {            
            this.hlsJs.startLoad();
            this.streamer.volume = '0.25';
            this.streamer.play();
        });

        this.hlsJs.attachMedia(this.streamer);        
        this.hlsJs.loadSource(stationUrl);
        this.streamer.load();
    }

    pauseStream = () => {
        if (this.hlsJs !== null) {
            this.hlsJs.stopLoad();
        }

        this.streamer.pause();
        this.streamer.removeAttribute('src');
        this.stationSrc = '';
    }

    handlePlay = (e) => {
        const { selectedStation, setStationPlayLoading } = this.context;
        setStationPlayLoading(false);

        this.countStation(selectedStation.station.stationuuid);
    }

    countStation = (stationId) => {
        let stationCount = {
            stationId: stationId
        }

        let request = new Request(process.env.REACT_APP_APICOUNTSTATION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(stationCount)
        });

        fetch(request);
    }

    handleError = () => {
        this.pauseStream();

        const { setStation, setStationPlayLoading } = this.context;
        setStationPlayLoading(false);
        setStation(null, false, false);
    }

    render() {        
        let streamStyle = {
            width: 0,
            height: 0
        };

        return(
            <section className={styles.stream} style={streamStyle}>
                <video ref={el => this.streamer = el} 
                        onPlaying={this.handlePlay} onError={this.handleError} />
            </section>
        );
    }
}