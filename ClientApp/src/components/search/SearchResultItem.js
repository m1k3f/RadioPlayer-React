import React, { Component } from 'react';

import AddPlaylistStationButton from './controls/AddPlaylistStationButton'
import TagList from './controls/TagList';

export default class SearchResultItem extends Component {

    renderCodecBitrate = (resultItem) => {
        let content = null;
        let codec = (resultItem.codec.length > 0 && resultItem.codec.toLowerCase() === 'unknown') ? 
                    '' : 
                    resultItem.codec;
        let bitrate = (resultItem.bitrate > 0) ? `${resultItem.bitrate}kbps` : '';

        if (resultItem.lastCheckOk) {
            content = (
                <p>{codec} {bitrate}</p>
            );
        }
        else {
            let warningTitle = 'This stream has been experiencing problems.';
            let warningStyle = {
                color: 'red'
            }
            content = (
                <p>
                    <i className="fas fa-exclamation-triangle" style={warningStyle} title={warningTitle}></i>&nbsp;
                    {resultItem.codec}&nbsp;
                    {bitrate}
                </p>
            );
        }

        return (content);
    }

    render() {
        let resultItem = this.props.resultItem;        
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
                    {this.renderCodecBitrate(resultItem)}                   
                </div>
            </div>
        );
    }
}