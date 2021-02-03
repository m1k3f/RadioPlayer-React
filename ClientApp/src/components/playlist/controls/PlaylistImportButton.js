import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class PlaylistImportButton extends Component {

    state = {
        isLoading: false
    }

    static contextType = RadioContext;

    handleImportButtonClick = (e) => {
        this.fileImport.click();
    }

    handleFiles = async (e) => {
        this.showSpinner(true);

        let file = e.target.files[0];
        if (file && file.type.includes('x-scpls')) {
            //Read through file and set it to playlist
            let fileContents = await this.getFileContents(file);
            if (fileContents.length > 0) {
                let contentArray = this.getContentArray(fileContents);
                if (contentArray.length > 0) {
                    await this.populateStationData(contentArray);
                }
            }
        }

        this.showSpinner(false);
    }

    showSpinner = (show) => {
        this.setState({
            isLoading: show
        });
    }

    getFileContents = (file) => {
        return new Promise((resolve, reject) => {
            let fileContents = '';
            const reader = new FileReader();        
            reader.onload = (e) => {
                fileContents = e.target.result;
                resolve(fileContents);
            }
            reader.onerror = (e) => {
                reject(e);
            }
            reader.readAsText(file);
        });        
    }

    getContentArray = (contentString) => {
        let lineArray = contentString.split('\n');
        let fileArray = lineArray.filter((line) => line.startsWith('File'));
        let titleArray = lineArray.filter((line) => line.startsWith('Title'));

        let contentArray = [];
        fileArray.forEach(item => {
            let separatorIndex = item.indexOf('=');
            let itemName = item.substring(0, separatorIndex);
            let itemValue = item.substring(separatorIndex+1);

            if (itemValue.length > 0) {
                let count = parseInt(itemName.replace('File', ''));
                let titleArrayItem = titleArray.filter(t => t.startsWith(`Title${count}`));
                let titleSeparatorIndex = (titleArrayItem.length > 0) ? titleArrayItem[0].indexOf('=') : -1;
                let titleValue = (titleSeparatorIndex > -1) ? titleArrayItem[0].substring(titleSeparatorIndex+1) : '';

                contentArray.push({
                    file: itemValue,
                    title: titleValue
                });
            }
        });

        return contentArray;
    }

    populateStationData = async (fileContents) => {       
        const { setPlaylist, setStation } = this.context; 
        let populatedPlaylist = [];
        for (let i=0; i < fileContents.length; i++) {
            let stationItem = {
                name: fileContents[i].title,
                url_resolved: fileContents[i].file,
            }
            stationItem = await this.getStationData(stationItem, i);
            populatedPlaylist.push(stationItem);
        }

        setPlaylist(populatedPlaylist);
        setStation(null, false, false);
    }

    getStationData = async (stationItem, index) => {
        let returnStation = stationItem;

        let apiStationDataByUrl = await this.getStationDataByUrl(stationItem.url_resolved);
        if (apiStationDataByUrl.length > 0) {
            returnStation = apiStationDataByUrl[0];
        }
        else if (stationItem.name !== undefined && stationItem.name.length > 0) {
            //Try to find station by name and compare url_resolved
            let apiStationDataByName = await this.getSearchResultsByName(stationItem.name);
            if (apiStationDataByName.length > 0) {                
                returnStation = apiStationDataByName[0];
            }
        }
        
        if (returnStation.stationuuid === undefined) {
            returnStation.stationuuid = index;
            returnStation.homepage = '';
            returnStation.codec = '';
            returnStation.favicon = '';
            returnStation.tags = '';
        }

        return returnStation;
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

    renderImportButton = () => {
        let content = null;
        if (this.state.isLoading) {
            content = (
                <i className="fas fa-spinner fa-spin fa-lg"></i>
            );
        }
        else {
            content = (
                <button className="iconButton" onClick={this.handleImportButtonClick} title="Upload Playlist">
                    <i className="fas fa-file-upload fa-lg"></i>
                </button> 
            );
        }

        return (content);
    }

    render() {
        return(
            <React.Fragment>
                <input type="file" id="playlistFile" style={{display:'none'}} accept=".pls"
                        ref={el => this.fileImport = el} onChange={this.handleFiles} />
                {this.renderImportButton()}
            </React.Fragment>
        );
    }
}