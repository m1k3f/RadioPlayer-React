import React, { Component } from 'react';

import PlaylistClearButton from './controls/PlaylistClearButton';
import PlaylistImportButton from './controls/PlaylistImportButton';
import PlaylistExportButton from './controls/PlaylistExportButton';

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
                <div>
                    <PlaylistImportButton />
                    <PlaylistExportButton />
                    <PlaylistClearButton />
                </div>
            </div>
        );
    }
}