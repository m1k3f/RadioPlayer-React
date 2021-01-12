import React, { Component } from 'react';

import StationTypeImage from './controls/StationTypeImage';
import StationHomepageLink from './controls/StationHomepageLink'
import StationTitle from './controls/StationTitle'
import DeleteStationButton from './controls/DeleteStationButton'

export default class PlaylistStationItem extends Component {

    handleButtonClick = (e) => {

    }

    render() {
        return (
            <div className="playlistStationItem">
                <a className="iconButton" onClick={this.handleButtonClick}>
                    <p title={this.props.station.name}>
                        <StationTypeImage station={this.props.station} />&nbsp;&nbsp;
                        {this.props.station.name}
                    </p>
                </a>
                <div className="stationItemControls">                    
                    {/* <StationHomepageLink /> */}
                    <a href={this.props.station.homepage}>
                        <i className="fas fa-home" style={{color: 'black'}}></i>
                    </a>
                    <DeleteStationButton station={this.props.station} />
                </div>
            </div>
        );
    }
}