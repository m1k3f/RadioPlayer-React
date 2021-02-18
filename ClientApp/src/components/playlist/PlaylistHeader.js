import React, { Component } from 'react';

import PlaylistClearButton from './controls/PlaylistClearButton';
import PlaylistImportButton from './controls/PlaylistImportButton';
import PlaylistExportButton from './controls/PlaylistExportButton';
import styles from './Playlist.module.css';

export default class PlaylistHeader extends Component {

    state = {
        playlistCount: 0
    }

    static getDerivedStateFromProps(props, state) {
        return {playlistCount: props.playlistCount}
    }

    render() {
        return (
            <div className={styles.playlistHeader}>
                <p className={styles.playlistHeaderItem}>Playlist ({this.state.playlistCount})</p>
                <div className={styles.playlistHeaderItem}>
                    <PlaylistImportButton />
                    <PlaylistExportButton />
                    <PlaylistClearButton />
                </div>
            </div>
        );
    }
}