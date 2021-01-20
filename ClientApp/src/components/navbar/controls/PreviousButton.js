﻿import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class PreviousButton extends Component {

    static contextType = RadioContext;

    handleButtonClick = (e) => {
        const { selectedStation, setStation, radioPlaylist } = this.context;

        if (selectedStation.station !== null) {
            let selectedIndex = radioPlaylist.playlist.findIndex((station) => 
                station.stationuuid === selectedStation.station.stationuuid
            );

            if (selectedIndex > 0 && selectedIndex <= radioPlaylist.playlist.length) {
                let previousStation = radioPlaylist.playlist[selectedIndex - 1];
                setStation(previousStation, true, true);
            }
        }
    }

    render() {
        return (
            <button onClick={this.handleButtonClick}>
                <i className="fas fa-step-backward"></i>
            </button>
        );
    }
}