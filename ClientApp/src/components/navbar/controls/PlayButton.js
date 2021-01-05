import React, { Component } from 'react';

export default class PlayButton extends Component {

    handleButtonClick = (e) => {

    }

    render() {
        return (
            <button onClick={this.handleButtonClick}>
                <i className="fas fa-play-circle fa-lg"></i>
            </button>
        );
    }
}