import React, { Component } from 'react';
import { FaTrash, FaSpinner } from 'react-icons/fa';

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
        let iconStyle = {
            width: '18px',
            height: '18px'
        };

        if (this.state.isLoading) {
            content = (
                <FaSpinner style={iconStyle} className="spin" />
            );
        }
        else {
            content = (
                <button className={styles.playlistHeaderButton} 
                        onClick={this.handleButtonClick} title="Delete Playlist">
                    <FaTrash style={iconStyle} />
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