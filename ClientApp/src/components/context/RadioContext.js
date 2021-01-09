import React, { Component } from 'react';

const RadioContext = React.createContext();

//export const RadioConsumer = RadioContext.Consumer;

class RadioProvider extends Component {
    constructor() {
        super();
        this.state = {
            selectedStation: null,
            radioPlaylist: this.getPlaylistStorage(),
            playStationId: null,
            searchResultsLoading: false
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

    setSearchResultsLoading = (isLoading) => {
        this.setState({
            searchResultsLoading: isLoading
        });
    }

    render() {
        const { children } = this.props
        const { selectedStation, radioPlaylist, playStationId, searchResultsLoading } = this.state
        const { setStation, saveAndRefreshPlaylist, addPlaylistStation, playStation, setSearchResultsLoading } = this

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
                        playStation,
                        searchResultsLoading,
                        setSearchResultsLoading
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