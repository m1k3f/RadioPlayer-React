import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class PlaylistExportButton extends Component {

    state = {
        isLoading: false
    }

    static contextType = RadioContext;

    handleButtonClick = async (e) => {
        this.showSpinner(true);

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

        await fetch(request)
                .then((response) => response.blob())
                .then((blob) => {
                    let url = URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'playlist.pls';
                    a.click();                                      
                });

        this.showSpinner(false);
    }

    showSpinner = (show) => {
        this.setState({
            isLoading: show
        });
    }

    renderExportButton = () => {
        let content = null;
        if (this.state.isLoading) {
            content = (
                <i className="fas fa-spinner fa-spin fa-lg"></i>
            );
        }
        else {
            content = (
                <button className="iconButton" onClick={this.handleButtonClick} title="Download Playlist">
                    <i className="fas fa-file-download fa-lg"></i>
                </button>
            );
        }

        return (content);
    }

    render() {
        return(
            <React.Fragment>
                {this.renderExportButton()}
            </React.Fragment>            
        );
    }
}