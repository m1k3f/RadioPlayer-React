import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';
import styles from './PlaylistControls.module.css';

export default class PlaylistClearButton extends Component {

    state = {
        isLoading: false
    }

    static contextType = RadioContext;

    handleButtonClick = (e) => {
        this.showSpinner(true);

        const { removePlaylist, setStation } = this.context;
        removePlaylist();
        setStation(null, false, false);

        this.showSpinner(false);
    }

    showSpinner = (show) => {
        this.setState({
            isLoading: show
        });
    }

    renderDeleteButton = () => {
        let content = null;
        if (this.state.isLoading) {
            content = (
                <i className="fas fa-spinner fa-spin fa-lg"></i>
            );
        }
        else {
            content = (
                <button className={styles.playlistHeaderButton} 
                        onClick={this.handleButtonClick} title="Delete Playlist">
                    <i className="fas fa-trash fa-lg"></i>
                </button>
            );
        }

        return (content);
    }

    render() {
        return (
            <React.Fragment>
                {this.renderDeleteButton()}
            </React.Fragment>
        );
    }
}