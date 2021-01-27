import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class PlaylistExportButton extends Component {

    static contextType = RadioContext;

    handleButtonClick = async (e) => {

        const { radioPlaylist } = this.context;

        let stations = {
            stationList: radioPlaylist.playlist
        }

        let request = new Request('api/radio/downloadPlaylistFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(stations)
        });

        let serviceResultsObject = await fetch(request).then((response) => response.json());
    }

    render() {
        return(
            <button className="iconButton" onClick={this.handleButtonClick} title="Export">
                <i className="fas fa-download"></i>
            </button>
        );
    }
}