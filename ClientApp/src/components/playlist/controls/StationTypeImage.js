import React, { Component } from 'react';

export default class StationTypeImage extends Component {

    renderImage = () => {
        let content = null;
        let codec = (this.props.station.codec != undefined) ? this.props.station.codec.toLowerCase() : '';
        let tags = (this.props.station.tags != undefined) ? this.props.station.tags.split(",") : '';

        if (tags.includes("video") || tags.includes("hls video")) {
            content = <i className="fas fa-video"></i>
        }
        else {
            content = <i className="fas fa-headphones"></i>
        }

        // if (codec === 'mp3' || codec === 'ogg' || codec === 'wav') {
        //     content = <i className="fas fa-headphones"></i>
        // }
        // else if (tags.includes("video") || tags.includes("hls video")) {
        //     content = <i className="fas fa-video"></i>
        // }
        // else {
        //     content = <i className="fas fa-question-circle"></i>
        // }

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