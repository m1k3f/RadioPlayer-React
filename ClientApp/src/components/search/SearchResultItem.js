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

        return (
            <div className="searchResultItem">
                <AddPlaylistStationButton stationItem={resultItem} />
                <div className="searchResultItemDescription">                    
                    {/* <SearchStationLink /> */}                    
                    <a href={resultItem.homepage} title={resultItem.name} target="_blank" rel="noopener noreferrer">
                        {resultItem.name}
                    </a>                    
                    <p>{resultItem.codec} {bitrate}</p>
                    <p>{resultItem.state} {resultItem.countrycode}</p>
                </div>
            </div>
        );
    }
}