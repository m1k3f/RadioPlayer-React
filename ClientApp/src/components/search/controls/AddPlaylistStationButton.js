import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';
import styles from './SearchControls.module.css';

export default class AddPlaylistStationButton extends Component {

    state = {
        stationAdded: false
    }

    static contextType = RadioContext;

    static getDerivedStateFromProps(props, state) {
        return {stationAdded: props.added}
    }

    handleButtonClick = (e) => {
        const { addPlaylistStation } = this.context;
        addPlaylistStation(this.props.stationItem);

        this.setState({
            stationAdded: true
        });
    }

    renderButton = (e) => {
        let content = null;
        if (this.state.stationAdded) {
            let selectedStyle = {
                color: 'green',
                fontSize: '24px',
                padding: 0,
                margin: 0
            }
            content = (
                <i className="fas fa-check-circle fa-2x" style={selectedStyle} title="Added to Playlist"></i>
            );
        }
        else {
            let itemStyle = {                
                padding: 0,
                margin: 0
            };

            content = (
                <button className={styles.iconButton} onClick={this.handleButtonClick} style={itemStyle}>
                    <i className="fas fa-plus-circle fa-2x" style={{fontSize:'24px'}}></i>
                </button>
            );
        }

        return (content);
    }

    render() {
        return (
            <div className={styles.playlistAdd}>
                {this.renderButton()}
            </div>
        );
    }
}