import React, { Component } from 'react';
import { FaHome } from 'react-icons/fa';

import styles from './PlaylistControls.module.css';

export default class StationHomepageLink extends Component {

    renderHomeLink = () => {
        let content = null;
        let iconStyle = {
            color: 'black',
            width: '15px',
            height: '15px',
            margin: 0
        };

        if (this.props.station.homepage.length > 0) {
            content = (
                <a className={styles.stationItemButton} href={this.props.station.homepage} 
                    target="_blank" rel="noopener noreferrer" title="Homepage">
                    <FaHome style={iconStyle} />
                </a>
            );
        }
        else {
            content = (
                <p className={styles.stationItemButton}>
                    <FaHome style={iconStyle} />
                </p>
            );
        }

        return (content);
    }

    render() {
        return (
            <React.Fragment>
                {this.renderHomeLink()}
            </React.Fragment>
        );
    }
}