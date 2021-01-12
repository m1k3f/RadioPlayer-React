import React, { Component } from 'react';

export default class PlaylistExportButton extends Component {

    handleButtonClick = (e) => {

    }

    render() {
        return(
            <button className="iconButton" onClick={this.handleButtonClick} title="Export">
                <i className="fas fa-download"></i>
            </button>
        );
    }
}