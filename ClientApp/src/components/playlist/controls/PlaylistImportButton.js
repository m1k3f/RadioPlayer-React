import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class PlaylistImportButton extends Component {

    state = {
        isLoading: false,
        fileContents: null
    }

    static contextType = RadioContext;

    componentDidUpdate() {
        if (this.state.isLoading && this.state.fileContents !== null) {
            //Build playlist object and set context state
            this.setNewPlaylist();

            this.setState({
                isLoading: false,
                fileContents: null
            });
        }
    }

    handleImportButtonClick = (e) => {
        this.fileImport.click();
    }

    handleFiles = (e) => {
        this.showSpinner(true);

        let file = e.target.files[0];
        if (file && file.type.includes('x-scpls')) {
            //Read through file and set it to playlist
            let fileContents = this.getFileContents(file);
            if (fileContents.length > 0) {
                let contentArray = this.getContentArray(fileContents);
                if (contentArray.length > 0) {
                    this.setState({
                        fileContents: contentArray
                    });
                }
                else {
                    this.showSpinner(false);
                }
            }
            else {
                this.showSpinner(false);
            }
        }
        else {
            this.showSpinner(false);
        }      
    }

    showSpinner = (show) => {
        this.setState({
            isLoading: show
        });
    }

    setNewPlaylist = () => {
        const { setPlaylist } = this.context;
        let playlist = [];
        let playlistItem = null;
        let itemCount = 0;
        this.state.fileContents.forEach(item => {
            itemCount++;
            playlistItem = {
                stationuuid: itemCount,
                name: item.title,
                url_resolved: item.file,
                homepage: '',
                codec: '',
                favicon: '',
                tags: ''                
            };
            playlist.push(playlistItem);
        });
        
        setPlaylist(playlist);

        //set playlist
        // on station play, if no station id => search by name and match results by url, save to storage
    }

    getFileContents = (file) => {
        let fileContents = '';
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            fileContents = reader.result;
        }

        return fileContents;
    }

    getContentArray = (contentString) => {
        let lineArray = contentString.split('\n');
        let fileArray = lineArray.filter((line) => line.startsWith('File'));
        let titleArray = lineArray.filter((line) => line.startsWith('Title'));

        let contentArray = [];
        fileArray.forEach(item => {
            let fileSplit = item.split('=');
            if (fileSplit.length > 1) {
                let count = parseInt(fileSplit[0].replace('File', ''));
                let titleArrayItem = titleArray.filter(t => t.startsWith(`Title${count}`));
                let titleValue = (titleArrayItem.length > 0) ? titleArrayItem[0].split('=')[1] : '';

                contentArray.push({
                    file: fileSplit[1],
                    title: titleValue
                });
            }
        });

        return contentArray;
    }

    renderImportButton = () => {
        let content = null;
        if (this.state.isLoading) {
            content = (
                <i className="fas fa-spinner fa-spin"></i>
            );
        }
        else {
            content = (
                <button className="iconButton" onClick={this.handleImportButtonClick} title="Import">
                    <i className="fas fa-upload"></i>
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