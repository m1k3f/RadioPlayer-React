import React, { Component } from 'react';
import StationImage from './controls/StationImage'
import PlaylistHeader from './PlaylistHeader'
import PlaylistStations from './PlaylistStations'

export default class Playlist extends Component {

    render() {
        return (
            <section>
                <StationImage />
                <PlaylistHeader />
                <PlaylistStations />
            </section>
        );
    }
}