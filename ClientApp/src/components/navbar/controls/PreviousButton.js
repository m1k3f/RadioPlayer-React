import React, { Component } from 'react';

export default class PreviousButton extends Component {

    handleButtonClick = (e) => {

    }

    render() {
        return (
            <button onClick={this.handleButtonClick}>
                <i className="fas fa-chevron-circle-left fa-lg"></i>
            </button>
        );
    }
}