import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class StationImage extends Component {

    state = {
        faviconSrc: null,
        imageSrc: null,
        imageError: false
    }

    static contextType = RadioContext;

    async componentDidUpdate() {
        const { selectedStation } = this.context;
        if (selectedStation.station !== null && this.state.faviconSrc !== null && 
            this.state.faviconSrc !== selectedStation.station.favicon) {
            //Selected station was changed, so remove image
            this.resetImage();
        }
        else if (this.state.faviconSrc !== null && selectedStation.station === null) {
            //Selected station removed, so remove image
            this.resetImage();
        }
        else if (!this.state.imageError && this.changeImage(selectedStation)) {
            //No image error and we need to set/change the image
            let imageObject = await this.getImage(selectedStation.station);
            let imageSrc = null;
            if (imageObject !== null) {
                imageSrc = `data:${imageObject.imageFileType};base64,${imageObject.imageBytes}`;
            }

            this.setState({
                faviconSrc: selectedStation.station.favicon,
                imageSrc: imageSrc,
                imageError: (imageObject === null)
            });
        }        
    }

    resetImage = () => {
        this.setState({
            faviconSrc: null,
            imageSrc: null,
            imageError: false
        });
    }

    changeImage = (selectedStation) => {
        let change = false;
        if (this.state.imageSrc === null && selectedStation.station !== null && 
            selectedStation.station.favicon.length > 0) {
                //image set for the first time
                change = true;
        }
        else if (this.state.imageSrc !== null && selectedStation.station !== null && 
                selectedStation.station.favicon.length > 0 && 
                this.state.faviconSrc !== selectedStation.station.favicon) {
                    //image set before but station was changed
                    change = true;
        }

        return change;
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
        if (this.state.imageSrc != null && this.state.imageSrc.length > 0 && !this.state.imageError) {
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