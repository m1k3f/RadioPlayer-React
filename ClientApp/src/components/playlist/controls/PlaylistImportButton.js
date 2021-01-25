import React, { Component } from 'react';

export default class PlaylistImportButton extends Component {

    handleImportButtonClick = (e) => {
        this.fileImport.click();
    }

    handleFiles = (e) => {
        let file = e.target.files[0];
        if (file) {

        }
    }

    render() {
        return(
            <React.Fragment>
                <input type="file" id="playlistFile" style={{display:'none'}} accept=".pls"
                        ref={el => this.fileImport = el} onChange={this.handleFiles} />
                <button className="iconButton" onClick={this.handleImportButtonClick} title="Import">
                    <i className="fas fa-upload"></i>
                </button>                
                {/* <label for="playlistFile" className="iconButton">
                    <i className="fas fa-upload fa-sm"></i>
                </label> */}
            </React.Fragment>
        );
    }
}