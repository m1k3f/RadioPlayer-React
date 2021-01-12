import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class DeleteStationButton extends Component {

    static contextType = RadioContext;

    handleButtonClick = (e) => {
        const { removePlaylistStation } = this.context;
        removePlaylistStation(this.props.station);
    }

    render() {
        return (
            <button onClick={this.handleButtonClick} className="iconButton" style={{color: 'red'}}>
                <i className="fas fa-times"></i>
            </button>
        );
    }
}