import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import StationTypeImage from './controls/StationTypeImage';
import StationHomepageLink from './controls/StationHomepageLink'
import StationTitle from './controls/StationTitle'
import DeleteStationButton from './controls/DeleteStationButton'

export default class PlaylistStationItem extends Component {

    static contextType = RadioContext;

    handleButtonClick = (e) => {
        const { setStation } = this.context;
        setStation(this.props.station, true, true);
    }

    render() {
        let selectedStyle = {};
        if (this.props.selected) {
            selectedStyle = {
                backgroundColor: "#dae6f0"
            }
        }

        return (
            <div className="playlistStationItem fade-in" style={selectedStyle}>
                <p title={this.props.station.name} onClick={this.handleButtonClick}>
                    <StationTypeImage station={this.props.station} />&nbsp;&nbsp;
                    {this.props.station.name}
                </p>
                <div className="stationItemControls">                    
                    {/* <StationHomepageLink /> */}
                    <a href={this.props.station.homepage} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-home" style={{color: 'black'}}></i>
                    </a>
                    <DeleteStationButton station={this.props.station} />
                </div>
            </div>
        );
    }
}