import React, { Component } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

import AddPlaylistStationButton from './controls/AddPlaylistStationButton'
import TagList from './controls/TagList';
import styles from './Search.module.css';

export default class SearchResultItem extends Component {

    renderCodecBitrate = (resultItem) => {
        let content = null;
        let codec = (resultItem.codec.length > 0 && resultItem.codec.toLowerCase() === 'unknown') ? 
                    '' : 
                    resultItem.codec;
        let bitrate = (resultItem.bitrate > 0) ? `${resultItem.bitrate}kbps` : '';

        if (resultItem.lastCheckOk) {
            content = (
                <p className={styles.resultItemDescriptionText}>{codec} {bitrate}</p>
            );
        }
        else {
            let warningTitle = 'This stream has been experiencing problems and may not play correctly.';
            let warningStyle = {
                color: 'red',
                width: '14px',
                height: '14px'
            }
            content = (
                <p className={styles.resultItemDescriptionText}>
                    {/* <i className="fas fa-exclamation-triangle" style={warningStyle} title={warningTitle}></i>&nbsp;&nbsp; */}
                    <FaExclamationTriangle style={warningStyle} title={warningTitle} />&nbsp;&nbsp;
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

        return (
            <div className={styles.searchResultItem}>
                <AddPlaylistStationButton stationItem={resultItem} added={this.props.duplicate} />
                <div className={styles.searchResultItemDescription}>
                    <a className={styles.resultItemDescriptionHomepage} href={resultItem.homepage} 
                        title={resultItem.name} target="_blank" rel="noopener noreferrer">
                        <p className={styles.descriptionHomepageText}>{resultItem.name}</p>
                    </a>
                    <TagList tagList={resultItem.tags} />
                    <p className={styles.resultItemDescriptionText}>{state}{resultItem.country}</p>
                    {this.renderCodecBitrate(resultItem)}                   
                </div>
            </div>
        );
    }
}