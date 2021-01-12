import React, { Component } from 'react';

export default class PlaylistImportButton extends Component {

    handleButtonClick = (e) => {

    }

    render() {
        return(
            <button className="iconButton" onClick={this.handleButtonClick} title="Import">
                <i className="fas fa-upload"></i>
            </button>
        );
    }
}