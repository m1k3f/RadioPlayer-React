import React, { Component } from 'react';
import RadioContext from '../context/RadioContext';
import StationImage from './controls/StationImage'
import PlaylistHeader from './PlaylistHeader'
import PlaylistStations from './PlaylistStations'

export default class Playlist extends Component {

    state = {
        playlist: null
    }

    static contextType = RadioContext;

    componentDidMount() {
        const { radioPlaylist } = this.context;
        let contextPlaylist = radioPlaylist.playlist;
        this.setState({
            playlist: contextPlaylist
        });
    }

    showPlaylist = () => {
        let content = null;
        if (this.state.playlist != null && this.state.playlist.length > 0) {
            content = (
                <section className="playlist">
                    {/* <StationImage /> */}
                    <PlaylistHeader playlistCount={this.state.playlist.length} />
                    <PlaylistStations playlistStations={this.state.playlist} />
                </section>
            );
        }

        return (content);
    }

    render() {
        return (
            <React.Fragment>
                {this.showPlaylist()}
            </React.Fragment>
        );
    }
}