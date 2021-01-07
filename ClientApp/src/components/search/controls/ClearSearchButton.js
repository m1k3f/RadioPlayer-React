import React, { Component } from 'react';

export default class ClearSearchButton extends Component {

    handleButtonClick = (e) => {

    }

    render() {
        let buttonStyle = {
            padding: '6px'
        };

        return (
            <button onClick={this.handleButtonClick} style={buttonStyle}>
                <i className="fas fa-backspace fa-lg"></i>
            </button>
        );
    }
}