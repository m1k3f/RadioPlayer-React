import React, { Component } from 'react';
import { FaCheckCircle, FaPlusCircle } from 'react-icons/fa';

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
                width: '24px',
                height: '24px',
                padding: 0,
                margin: 0
            }
            content = (
                <FaCheckCircle style={selectedStyle} title="Added to Playlist" />
            );
        }
        else {
            let itemStyle = {                
                padding: 0,
                margin: 0
            };

            let iconStyle = {
                width: '24px',
                height: '24px'
            };

            content = (
                <button className={styles.iconButton} onClick={this.handleButtonClick} style={itemStyle}>
                    <FaPlusCircle style={iconStyle} />
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