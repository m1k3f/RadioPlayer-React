import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class NextButton extends Component {
    
    static contextType = RadioContext;

    handleButtonClick = (e) => {
        const { selectedStation, setStation, radioPlaylist } = this.context;

        if (selectedStation.station !== null) {
            let selectedIndex = radioPlaylist.playlist.findIndex((station) => 
                station.stationuuid === selectedStation.station.stationuuid
            );

            if (selectedIndex > -1 && selectedIndex < radioPlaylist.playlist.length) {
                let nextStation = radioPlaylist.playlist[selectedIndex + 1];
                setStation(nextStation, true, true);
            }
        }
    }

    render() {
        return (
            <button onClick={this.handleButtonClick}>
                <i className="fas fa-step-forward"></i>
            </button>
        );
    }
}