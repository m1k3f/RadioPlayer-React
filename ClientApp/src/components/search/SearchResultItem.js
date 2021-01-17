import React, { Component } from 'react';
import AddPlaylistStationButton from './controls/AddPlaylistStationButton'
import SearchStationLink from './controls/SearchStationLink'

export default class SearchResultItem extends Component {

    renderResultDescription = () => {
        let content = null;

    }

    render() {
        let resultItem = this.props.resultItem;
        let bitrate = (resultItem.bitrate > 0) ? `${resultItem.bitrate}kbps` : '';
        let state = (resultItem.state.length > 0) ? `${resultItem.state} - ` : '';

        return (
            <div className="searchResultItem">
                <AddPlaylistStationButton stationItem={resultItem} />
                <div className="searchResultItemDescription">                    
                    {/* <SearchStationLink /> */}                    
                    <a href={resultItem.homepage} title={resultItem.name} target="_blank" rel="noopener noreferrer">
                        {resultItem.name}
                    </a>
                    <p>{state}{resultItem.country}</p>
                    <p>{resultItem.codec} {bitrate}</p>                    
                </div>
            </div>
        );
    }
}