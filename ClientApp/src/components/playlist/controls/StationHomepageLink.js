import React, { Component } from 'react';

import styles from './PlaylistControls.module.css';

export default class StationHomepageLink extends Component {

    renderHomeLink = () => {
        let content = null;
        if (this.props.station.homepage.length > 0) {
            content = (
                <a className={styles.stationItemButton} href={this.props.station.homepage} 
                    target="_blank" rel="noopener noreferrer" title="Homepage">
                    <i className="fas fa-home" style={{color: 'black'}}></i>
                </a>
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