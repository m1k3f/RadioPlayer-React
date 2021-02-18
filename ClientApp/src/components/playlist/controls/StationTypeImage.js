import React, { Component } from 'react';

export default class StationTypeImage extends Component {

    renderImage = () => {
        let content = null;
        let tags = (this.props.station.tags !== undefined) ? this.props.station.tags.split(",") : '';

        let iconStyle = {
            fontSize: '14px'
        }

        if (tags.includes("video") || tags.includes("hls video")) {
            content = <i className="fas fa-video" style={iconStyle}></i>
        }
        else {
            content = <i className="fas fa-headphones" style={iconStyle}></i>
        }

        return (content);
    }

    render() {
        return (
            <React.Fragment>
                {this.renderImage()}
            </React.Fragment>
        );
    }
}