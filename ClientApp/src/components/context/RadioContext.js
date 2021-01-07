import React, { Component } from 'react';

const RadioContext = React.createContext();

//export const RadioConsumer = RadioContext.Consumer;

class RadioProvider extends Component {
    constructor() {
        super();
        this.state = {
            selectedStation: null,
            radioPlaylist: this.getPlaylistStorage(),
            playStationId: null
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
                radioPlaylist = JSON.parse(radioPlaylist);
            }
        }

        return radioPlaylist;
    }

    saveAndRefreshPlaylist = (playlist) => {
        if (window.localStorage) {
            localStorage.setItem("radioPlaylist", JSON.stringify(playlist));
        }

        this.setState({
            radioPlaylist: this.getPlaylistStorage()
        });
    }

    addPlaylistStation = (station) => {
        const radioPlaylist = {...this.state.radioPlaylist};        
        radioPlaylist.playlist.push(station);

        this.saveAndRefreshPlaylist(radioPlaylist);
    }

    playStation = (stationId) => {
        this.setState({
            playStationId: stationId
        });
    }

    render() {
        const { children } = this.props
        const { selectedStation, radioPlaylist, playStationId } = this.state
        const { setStation, saveAndRefreshPlaylist, addPlaylistStation, playStation } = this

        return(
            <RadioContext.Provider 
                value={
                    {
                        selectedStation,
                        setStation,
                        radioPlaylist,
                        saveAndRefreshPlaylist,
                        addPlaylistStation,
                        playStationId,
                        playStation
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