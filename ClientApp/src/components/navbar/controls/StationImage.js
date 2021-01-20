import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class StationImage extends Component {

    state = {
        imageSrc: null
    }

    static contextType = RadioContext;

    async componentDidUpdate() {
        const { selectedStation } = this.context;
        if (this.state.imageSrc === null && selectedStation.station !== null && 
            selectedStation.station.favicon.length > 0) {
                let imageObject = await this.getImage(selectedStation.station);
                let imageSrc = null;
                if (imageObject != null) {
                    imageSrc = `data:${imageObject.imageFileType};base64,${imageObject.imageBytes}`;
                }

                this.setState({
                    imageSrc: imageSrc
                });
        }
    }

    getImage = async (station) => {
        let stationImage = {
            stationuuid: station.stationuuid,
            imageUrl: station.favicon
        }

        let request = new Request('api/radio/getStationImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(stationImage)
        });

        let serviceImageObject = await fetch(request).then((response) => response.json());

        if (serviceImageObject.serviceError === null && serviceImageObject.imageBytes !== null) {
            return serviceImageObject;
        }
        else {
            return null;
        }
    }

    renderImage = () => {
        let content = null;
        if (this.state.imageSrc != null && this.state.imageSrc.length > 0) {
            content = (
                <img className="stationImage" src={this.state.imageSrc} alt=""></img>
            );
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