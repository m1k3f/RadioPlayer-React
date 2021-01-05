import React, { Component } from 'react';
import RadioContext from '../context/RadioContext';
import StationImage from './controls/StationImage'
import PlaylistHeader from './PlaylistHeader'
import PlaylistStations from './PlaylistStations'

export default class Playlist extends Component {

    static contextType = RadioContext;

    render() {
        const { radioPlaylist } = this.context;
        let playlist = radioPlaylist.playlist;

        return (
            <section className="playlist">
                {/* <StationImage /> */}
                <PlaylistHeader playlistCount={playlist.length} />
                <PlaylistStations playlistStations={playlist} />
            </section>
        );
    }
}