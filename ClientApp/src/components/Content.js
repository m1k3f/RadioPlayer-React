import React, { Component } from 'react';
import Playlist from './playlist/Playlist';
import StationSearch from './search/StationSearch'

export default class Content extends Component {

    render() {
        return (
            <main>
                <Playlist />
                <StationSearch />
            </main>
        );
    }
}