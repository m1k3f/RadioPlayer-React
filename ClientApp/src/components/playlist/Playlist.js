import React, { Component } from 'react';
import RadioContext from '../context/RadioContext';
import StationImage from './controls/StationImage'
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

        if (contextPlaylist.length !== this.state.playlist.length) {
            this.setState({
                playlist: contextPlaylist
            });
        }
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