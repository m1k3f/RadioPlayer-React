import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import StationTypeImage from './controls/StationTypeImage';
import StationHomepageLink from './controls/StationHomepageLink'
import DeleteStationButton from './controls/DeleteStationButton'

export default class PlaylistStationItem extends Component {

    static contextType = RadioContext;

    handleButtonClick = async (e) => {
        const { setStation, updatePlaylistStation } = this.context;
        setStation(this.props.station, true, true);

        //Get station data by url from api
        let apiStationData = await this.getStationData(this.props.station.url_resolved);

        //Update station in saved playlist
        updatePlaylistStation(this.props.station, apiStationData);
    }

    getStationData = async (stationUrl) => {
        let urlSearch = {
            url: stationUrl
        }

        let request = new Request('api/radio/searchStationByUrl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(urlSearch)
        });

        let serviceResponse = await fetch(request).then((response) => response.json());
        if (serviceResponse.stationList.length > 0) {
            return serviceResponse.stationList[0];
        }
        else {
            return [];
        }
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
                    <StationHomepageLink station={this.props.station} />
                    <DeleteStationButton station={this.props.station} />
                </div>
            </div>
        );
    }
}