import React, { Component } from 'react';

import StationTypeImage from './controls/StationTypeImage';
import StationHomepageLink from './controls/StationHomepageLink'
import StationTitle from './controls/StationTitle'
import DeleteStationButton from './controls/DeleteStationButton'

export default class PlaylistStationItem extends Component {

    render() {
        return (
            <div className="playlistStationItem">
                <p title={this.props.station.name}>
                    <StationTypeImage station={this.props.station} />&nbsp;&nbsp;
                    {this.props.station.name}
                </p>
                <div>                    
                    {/* <StationHomepageLink /> */}
                    <a href={this.props.station.homepage}>
                        <i className="fas fa-home" style={{color: 'black'}}></i>
                    </a>
                    <DeleteStationButton />
                </div>
            </div>
        );
    }
}