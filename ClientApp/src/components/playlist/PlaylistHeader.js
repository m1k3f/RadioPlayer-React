import React, { Component } from 'react';
import PlaylistCount from './controls/PlaylistCount'
import PlaylistClearButton from './controls/PlaylistClearButton'

export default class PlaylistHeader extends Component {

    state = {
        playlistCount: 0
    }

    static getDerivedStateFromProps(props, state) {
        return {playlistCount: props.playlistCount}
    }

    render() {
        return (
            <div className="playlistHeader">
                {/* <PlaylistCount /> */}
                <p>Playlist ({this.state.playlistCount})</p>
                <PlaylistClearButton />
            </div>
        );
    }
}