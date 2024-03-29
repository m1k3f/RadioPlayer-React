import React, { Component } from 'react';
import { FaFileDownload, FaSpinner } from 'react-icons/fa';

import RadioContext from '../../context/RadioContext';
import styles from './PlaylistControls.module.css';

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

        let request = new Request(process.env.REACT_APP_APIDOWNLOADPLAYLIST, {
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
        let iconStyle = {
            width: '18px',
            height: '18px'
        };

        if (this.state.isLoading) {
            content = (
                <FaSpinner style={iconStyle} className="spin" />
            );
        }
        else {
            content = (
                <button className={styles.playlistHeaderButton} 
                        onClick={this.handleButtonClick} title="Download Playlist">
                    <FaFileDownload style={iconStyle} />
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