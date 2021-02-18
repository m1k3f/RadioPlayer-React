import React, { Component } from 'react';

import Stream from './stream/Stream';
import Playlist from './playlist/Playlist';
import StationSearch from './search/StationSearch'
import styles from './Content.module.css';

export default class Content extends Component {

    render() {
        return (
            <main className={styles.main}>
                <Stream />
                <Playlist />
                <StationSearch />
            </main>
        );
    }
}