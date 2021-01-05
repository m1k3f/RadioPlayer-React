import React, { Component } from 'react';

export default class NextButton extends Component {
    
    handleButtonClick = (e) => {

    }

    render() {
        return (
            <button onClick={this.handleButtonClick}>
                <i className="fas fa-chevron-circle-right fa-lg"></i>
            </button>
        );
    }
}