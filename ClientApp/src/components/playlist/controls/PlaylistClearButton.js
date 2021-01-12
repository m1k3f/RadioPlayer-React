import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class PlaylistClearButton extends Component {

    static contextType = RadioContext;

    handleButtonClick = (e) => {
        const { removePlaylist } = this.context;
        removePlaylist();
    }

    render() {
        return (
            <button onClick={this.handleButtonClick} className="iconButton" title="Clear">
                <i className="fas fa-trash"></i>
            </button>
        );
    }
}