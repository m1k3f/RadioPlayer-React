import React, { Component } from 'react';
import AddPlaylistStationButton from './controls/AddPlaylistStationButton'
import SearchStationLink from './controls/SearchStationLink'

export default class SearchResultItem extends Component {

    render() {
        let resultItem = this.props.resultItem;

        return (
            <div>
                <AddPlaylistStationButton />
                <SearchStationLink />
            </div>
        );
    }
}