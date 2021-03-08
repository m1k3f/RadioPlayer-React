import React, { Component } from 'react';
import { FaHeadphones, FaVideo } from 'react-icons/fa';

export default class StationTypeImage extends Component {

    renderImage = () => {
        let content = null;
        let tags = (this.props.station.tags !== undefined) ? this.props.station.tags.split(",") : '';

        let iconStyle = {
            width: '14px',
            height: '14px'
        }

        if (tags.includes("video") || tags.includes("hls video")) {
            content = <FaVideo style={iconStyle} />
        }
        else {
            content = <FaHeadphones  style={iconStyle} />
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