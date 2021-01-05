import React, { Component } from 'react';

export default class VolumeSlider extends Component {

    handleInputChange = (e) => {

    }

    render() {
        return (
            <input type="range" min="0" max="100" step="10" value="20" 
                    onChange={this.handleInputChange} />
        );
    }
}