﻿import React, { Component } from 'react';
import PlaylistStationItem from './PlaylistStationItem'

export default class PlaylistStations extends Component {

    state = {
        playlistStations: null
    }

    static getDerivedStateFromProps(props, state) {
        return {playlistStations: props.playlistStations};
    }

    renderPlaylistItems = () => {
        let content = null;
        if (this.state.playlistStations !== null && this.state.playlistStations.length > 0) {
            content = this.state.playlistStations.map((station) => {
                return (
                    <PlaylistStationItem station={station} />
                );
            });
        }

        return (
            <div className="playlistStations">
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