import React, { Component } from 'react';
import AddPlaylistStationButton from './controls/AddPlaylistStationButton'
import SearchStationLink from './controls/SearchStationLink'

export default class SearchResultItem extends Component {

    render() {
        return (
            <div>
                <AddPlaylistStationButton />
                <SearchStationLink />
            </div>
        );
    }
}