import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';

import RadioContext from '../../context/RadioContext';
import styles from './PlaylistControls.module.css';

export default class DeleteStationButton extends Component {

    static contextType = RadioContext;

    handleButtonClick = (e) => {
        const { removePlaylistStation } = this.context;
        removePlaylistStation(this.props.station);
    }

    render() {
        let iconStyle = {
            color: 'red',
            width: '15px',
            height: '15px'
        };

        return (
            <button className={`${styles.iconButton} ${styles.stationItemButton}`} 
                    onClick={this.handleButtonClick}>
                <FaTimes style={iconStyle} />
            </button>
        );
    }
}