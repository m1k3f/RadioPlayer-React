import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';
import styles from './PlaylistControls.module.css';

export default class DeleteStationButton extends Component {

    static contextType = RadioContext;

    handleButtonClick = (e) => {
        const { removePlaylistStation } = this.context;
        removePlaylistStation(this.props.station);
    }

    render() {
        return (
            <button className={`${styles.iconButton} ${styles.stationItemButton}`} 
                    onClick={this.handleButtonClick} style={{color: 'red'}}>
                <i className="fas fa-times"></i>
            </button>
        );
    }
}