import React, { Component } from 'react';

const RadioContext = React.createContext();

//export const RadioConsumer = RadioContext.Consumer;

class RadioProvider extends Component {
    constructor() {
        super();
        this.state = {
            selectedStation: {
                play: false,
                station: null
            },
            radioPlaylist: this.getPlaylistStorage(),
            searchResultsLoading: false
        };
    }

    setStation = (station, playStation, firstPlay) => {
        this.setState({
            selectedStation: {
                play: playStation,
                firstPlay: firstPlay,
                station: station
            }
        });
    }

    getPlaylistStorage = () => {
        let radioPlaylist = null;
        if (window.localStorage) {
            radioPlaylist = localStorage.getItem('rpPlaylist');
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

    removePlaylist = () => {
        const radioPlaylist = {...this.state.radioPlaylist};

        if (radioPlaylist.playlist.length > 0) {
            radioPlaylist.playlist.length = 0;
            this.saveAndRefreshPlaylist(radioPlaylist);
        }
    }

    setPlaylist = (newPlaylist) => {
        const radioPlaylist = {...this.state.radioPlaylist};
        radioPlaylist.playlist.length = 0;
        radioPlaylist.playlist = newPlaylist;
        this.saveAndRefreshPlaylist(radioPlaylist);
    }

    saveAndRefreshPlaylist = (playlist) => {
        if (window.localStorage) {
            localStorage.setItem("rpPlaylist", JSON.stringify(playlist));
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

    removePlaylistStation = (removedStation) => {
        const radioPlaylist = {...this.state.radioPlaylist};
        let index = radioPlaylist.playlist.findIndex((station) => {
            if (station.stationuuid === removedStation.stationuuid) {
                return true;
            }
        });

        if (index > -1) {
            radioPlaylist.playlist.splice(index, 1);
        }

        this.saveAndRefreshPlaylist(radioPlaylist);
    }    

    setSearchResultsLoading = (isLoading) => {
        this.setState({
            searchResultsLoading: isLoading
        });
    }

    render() {
        const { children } = this.props;
        const { selectedStation, radioPlaylist, searchResultsLoading } = this.state;
        const { 
                setStation, removePlaylist, setPlaylist, addPlaylistStation, 
                removePlaylistStation, setSearchResultsLoading 
              } = this;

        return(
            <RadioContext.Provider 
                value={
                    {
                        selectedStation,
                        setStation,
                        radioPlaylist,
                        removePlaylist,
                        setPlaylist,
                        addPlaylistStation,
                        removePlaylistStation,
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