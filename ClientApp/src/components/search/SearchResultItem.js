import React, { Component } from 'react';
import AddPlaylistStationButton from './controls/AddPlaylistStationButton'
import SearchStationLink from './controls/SearchStationLink'

export default class SearchResultItem extends Component {

    render() {
        let resultItem = this.props.resultItem;

        return (
            <div>
                <AddPlaylistStationButton stationItem={resultItem} />
                {/* <SearchStationLink /> */}
                <a href={resultItem.homepage} target="_blank" rel="noopener noreferrer">
                    {resultItem.name}
                </a>
            </div>
        );
    }
}