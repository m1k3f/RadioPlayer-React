import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import StationTypeImage from './controls/StationTypeImage';
import StationHomepageLink from './controls/StationHomepageLink';
import DeleteStationButton from './controls/DeleteStationButton';
import styles from './Playlist.module.css';

export default class PlaylistStationItem extends Component {

    static contextType = RadioContext;

    handleButtonClick = async (e) => {
        let stationItem = this.props.station;

        const { setStation } = this.context;
        setStation(stationItem, true, true);
    }

    render() {
        let selectedStyle = {};
        if (this.props.selected) {
            selectedStyle = {
                backgroundColor: "#dae6f0"
            }
        }

        let stationName = (this.props.station.name === undefined || this.props.station.name.length === 0) ?
                            this.props.station.url_resolved : 
                            this.props.station.name;

        return (
            <div className={`fade-in ${styles.playlistStationItem}`} style={selectedStyle}>
                <p className={styles.playlistStationItemText} title={this.props.station.name} 
                    onClick={this.handleButtonClick}>
                    <StationTypeImage station={this.props.station} />&nbsp;&nbsp;
                    {stationName}
                </p>
                <div className={styles.stationItemControls}>
                    <StationHomepageLink station={this.props.station} />
                    <DeleteStationButton station={this.props.station} />
                </div>
            </div>
        );
    }
}