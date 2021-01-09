import React, { Component } from 'react';

export default class DeleteStationButton extends Component {

    handleButtonClick = (e) => {

    }

    render() {
        return (
            <button onClick={this.handleButtonClick} className="iconButton" style={{color: 'red'}}>
                <i className="fas fa-times"></i>
            </button>
        );
    }
}