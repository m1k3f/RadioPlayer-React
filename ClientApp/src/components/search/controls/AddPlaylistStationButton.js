import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class AddPlaylistStationButton extends Component {

    static contextType = RadioContext;

    handleButtonClick = (e) => {
        const { addPlaylistStation } = this.context;
        addPlaylistStation(this.props.stationItem);
    }

    render() {
        return (
            <button onClick={this.handleButtonClick} className="iconButton">
                <i className="fas fa-plus-circle fa-2x"></i>
            </button>
        );
    }
}