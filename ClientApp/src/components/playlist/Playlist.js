﻿import React, { Component } from 'react';
import RadioContext from '../context/RadioContext';
import PlaylistHeader from './PlaylistHeader'
import PlaylistStations from './PlaylistStations'

export default class Playlist extends Component {

    state = {
        playlist: null
    }

    static contextType = RadioContext;

    componentDidMount() {
        const { radioPlaylist } = this.context;
        let contextPlaylist = radioPlaylist.playlist;
        this.setState({
            playlist: contextPlaylist
        });
    }

    componentDidUpdate() {
        const { radioPlaylist } = this.context;
        let contextPlaylist = radioPlaylist.playlist;

        if (this.playlistChanged(contextPlaylist, this.state.playlist)) {
            this.setState({
                playlist: contextPlaylist
            });
        }
    }

    playlistChanged = (savedPlaylist, statePlaylist) => {
        let changed = false;

        if (savedPlaylist.length !== statePlaylist.length) {
            changed = true;
        }
        else {
            //compare each array object
            savedPlaylist.every((item, index) => {
                if (JSON.stringify(item) !== JSON.stringify(statePlaylist[index])) {
                    changed = true;
                    return false;
                }
            });
        }

        return changed;
    }

    render() {
        let playlistCount = (this.state.playlist != null) ? this.state.playlist.length : 0;

        return (
            <section className="playlist">
                <PlaylistHeader playlistCount={playlistCount} />
                <PlaylistStations playlistStations={this.state.playlist} />
            </section>
        );
    }
}