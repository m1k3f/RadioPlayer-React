import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class AddPlaylistStationButton extends Component {

    state = {
        stationAdded: false
    }

    static contextType = RadioContext;

    handleButtonClick = (e) => {
        const { addPlaylistStation } = this.context;
        addPlaylistStation(this.props.stationItem);

        this.setState({
            stationAdded: true
        });
    }

    renderButton = (e) => {
        let content = null;
        if (this.state.stationAdded) {
            let selectedStyle = {
                color: 'green'
            }
            content = (
                <i className="fas fa-check-circle fa-2x" style={selectedStyle}></i>
            );
        }
        else {
            content = (
                <button onClick={this.handleButtonClick} className="iconButton">
                    <i className="fas fa-plus-circle fa-2x"></i>
                </button>
            );
        }

        return (content);
    }

    render() {
        return (
            <div className="playlistAdd">
                {this.renderButton()}
            </div>
        );
    }
}