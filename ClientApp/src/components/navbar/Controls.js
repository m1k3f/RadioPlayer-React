import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import PreviousButton from './controls/PreviousButton'
import PlayButton from './controls/PlayButton'
import NextButton from './controls/NextButton'
import VolumeSlider from './controls/VolumeSlider'
import StationImage from './controls/StationImage';

export default class Controls extends Component {

    static contextType = RadioContext;

    updateStation = null;

    handleButtonCallback = async (stationItem) => {
        if (stationItem.lastCheckOk === undefined && stationItem.lastCheckTime === undefined) {
            //station data is missing because it was imported
            await this.setStationData(stationItem);
        }

        const { setStation } = this.context;
        let selectedStation = (this.updateStation !== null) ? this.updateStation : stationItem;
        setStation(selectedStation, true, true);
        this.updateStation = null;
    }

    setStationData = async (stationItem) => {
        const { updatePlaylistStation } = this.context;

        let apiStationDataByUrl = await this.getStationDataByUrl(stationItem.url_resolved);

        if (apiStationDataByUrl.length > 0) {
            //Update station in saved playlist
            updatePlaylistStation(stationItem, apiStationDataByUrl[0]);
            this.updateStation = apiStationDataByUrl[0];
        }
        else if (stationItem.name !== undefined && stationItem.name.length > 0) {
            //Try to find station by name and compare url_resolved
            let apiStationDataByName = await this.getSearchResultsByName(stationItem.name);
            if (apiStationDataByName.length > 0) {                
                updatePlaylistStation(stationItem, apiStationDataByName[0]);
                this.updateStation = apiStationDataByName[0];
            }
        }
    }

    getStationDataByUrl = async (stationUrl) => {
        let urlSearch = {
            url: stationUrl
        }

        let request = new Request('api/radio/searchStationByUrl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(urlSearch)
        });

        let serviceResponse = await fetch(request).then((response) => response.json());
        if (serviceResponse.stationList.length > 0) {
            return serviceResponse.stationList;
        }
        else {
            return [];
        }
    }

    getSearchResultsByName = async (stationName) => {
        let searchCriteria = {
            name: stationName
        }

        let request = new Request('api/radio/searchStations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(searchCriteria)
        });

        let serviceResult = await fetch(request).then((response) => response.json());
        if (serviceResult.serviceError === null && serviceResult.stationList != null &&
            serviceResult.stationList.length > 0) {
                return serviceResult.stationList;
            }
        else {
            return [];
        }
    }

    render() {
        return (
            <section>
                <StationImage />
                <div className="headerControls">
                    <div>
                        <PreviousButton controlsCallback={this.handleButtonCallback} />
                        <PlayButton />
                        <NextButton controlsCallback={this.handleButtonCallback} />
                    </div>
                    <VolumeSlider />
                </div>
            </section>
        );
    }
}