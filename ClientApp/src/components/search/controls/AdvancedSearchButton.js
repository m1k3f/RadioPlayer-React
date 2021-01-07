import React, { Component } from 'react';

export default class AdvancedSearchButton extends Component {

    handlButtonClick = (e) => {

    }

    render() {
        let buttonStyle = {
            padding: '8px'
        };

        return (
            <button onClick={this.handlButtonClick} style={buttonStyle}>
                <i className="fas fa-chevron-circle-down fa-lg"></i>
            </button>
        );
    }
}