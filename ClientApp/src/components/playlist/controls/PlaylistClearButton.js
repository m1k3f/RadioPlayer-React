﻿import React, { Component } from 'react';

export default class PlaylistClearButton extends Component {

    handleButtonClick = (e) => {

    }

    render() {
        return (
            <button onClick={this.handleButtonClick}>
                <i className="fas fa-trash"></i>
            </button>
        );
    }
}