import React, { Component } from 'react';

import AddPlaylistStationButton from './controls/AddPlaylistStationButton'
import TagList from './controls/TagList';

export default class SearchResultItem extends Component {

    render() {
        let resultItem = this.props.resultItem;
        let bitrate = (resultItem.bitrate > 0) ? `${resultItem.bitrate}kbps` : '';
        let state = (resultItem.state.length > 0) ? `${resultItem.state} - ` : '';

        let resultItemStyle = {};
        if (this.props.limitReached) {
            resultItemStyle = {
                borderBottom: '1px solid black'
            }
        }

        return (
            <div className="searchResultItem" style={resultItemStyle}>
                <AddPlaylistStationButton stationItem={resultItem} />
                <div className="searchResultItemDescription">
                    <a href={resultItem.homepage} title={resultItem.name} target="_blank" rel="noopener noreferrer">
                        {resultItem.name}
                    </a>
                    <TagList tagList={resultItem.tags} />
                    <p>{state}{resultItem.country}</p>
                    <p>{resultItem.codec} {bitrate}</p>                    
                </div>
            </div>
        );
    }
}