import React, { Component } from 'react';
import Stream from './controls/Stream';
import Playlist from './playlist/Playlist';
import StationSearch from './search/StationSearch'

export default class Content extends Component {

    render() {
        return (
            <main>
                <Stream />
                <Playlist />
                <StationSearch />
            </main>
        );
    }
}