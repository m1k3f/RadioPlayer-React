import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import PlaylistStationItem from './PlaylistStationItem'
import styles from './Playlist.module.css';

export default class PlaylistStations extends Component {

    state = {
        playlistStations: null
    }

    static contextType = RadioContext;

    static getDerivedStateFromProps(props, state) {
        return {playlistStations: props.playlistStations};
    }

    renderPlaylistItems = () => {
        let content = null;
        if (this.state.playlistStations !== null && this.state.playlistStations.length > 0) {
            content = this.state.playlistStations.map((station) => {
                const { selectedStation } = this.context;
                let stationSelected = false;
                if (selectedStation.station != null && 
                    station.stationuuid === selectedStation.station.stationuuid) {
                        stationSelected = true;
                    }

                return (
                    <PlaylistStationItem key={station.stationuuid} 
                                            station={station}
                                            selected={stationSelected} />
                );
            });
        }
        else {
            content = (
                <p className={`fade-in ${styles.emptyPlaylist}`}>
                    <i className="far fa-file fa-4x"></i>&nbsp;
                </p>
            );
        }

        return (
            <div className={styles.playlistStations}>
                {content}
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderPlaylistItems()}
            </React.Fragment>
        );
    }
}