import React, { Component } from 'react';
import { FaStepForward } from 'react-icons/fa';

import RadioContext from '../../context/RadioContext';
import styles from './NavBarControls.module.css';

export default class NextButton extends Component {
    
    static contextType = RadioContext;

    handleButtonClick = (e) => {
        const { selectedStation, setStationPlayLoading, radioPlaylist } = this.context;

        if (selectedStation.station !== null) {
            let selectedIndex = radioPlaylist.playlist.findIndex((station) => 
                station.stationuuid === selectedStation.station.stationuuid
            );

            if (selectedIndex > -1 && selectedIndex < radioPlaylist.playlist.length) {
                setStationPlayLoading(true);
                let nextStation = radioPlaylist.playlist[selectedIndex + 1];
                this.props.controlsCallback(nextStation);
            }
        }
    }

    render() {
        let iconStyle = {
            width: '25px',
            height: '25px'
        };

        return (
            <button className={styles.headerControlsButton} onClick={this.handleButtonClick}>
                <FaStepForward style={iconStyle} />
            </button>
        );
    }
}