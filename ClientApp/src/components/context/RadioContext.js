import React, { Component } from 'react';

const RadioContext = React.createContext();

//export const RadioConsumer = RadioContext.Consumer;

class RadioProvider extends Component {
    constructor() {
        super();
        this.state = {
            selectedStation: null,
            radioPlaylist: this.getPlaylistStorage()
        };
    }

    setStation = (station) => {
        this.setState({
            selectedStation: station
        });
    }

    getPlaylistStorage = () => {
        let radioPlaylist = null;
        if (window.localStorage) {
            radioPlaylist = localStorage.getItem('radioPlaylist');
            if (radioPlaylist === undefined || radioPlaylist === null || radioPlaylist === '') {
                radioPlaylist = {
                    settings: {},
                    playlist: []
                };
            }
            else {
                playlist = JSON.parse(playlist);
            }
        }

        return playlist;
    }

    saveAndRefreshPlaylist = (playlist) => {
        if (window.localStorage) {
            localStorage.setItem("radioPlaylist", JSON.stringify(playlist));
        }

        this.setState({
            radioPlaylist: this.getPlaylistStorage()
        });
    }

    render() {
        const { children } = this.props
        const { selectedStation, radioPlaylist } = this.state
        const { setStation, saveAndRefreshPlaylist } = this

        return(
            <RadioContext.Provider 
                value={
                    {
                        selectedStation,
                        setStation,
                        radioPlaylist,
                        saveAndRefreshPlaylist
                    }
                }
                >
                {children}
            </RadioContext.Provider>
        );
    }
}

export default RadioContext;
export { RadioProvider };