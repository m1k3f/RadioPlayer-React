import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import PreviousButton from './controls/PreviousButton';
import PlayButton from './controls/PlayButton';
import NextButton from './controls/NextButton';
import StationImage from './controls/StationImage';
import styles from './NavBar.module.css';

export default class Controls extends Component {

    static contextType = RadioContext;

    handleButtonCallback = async (stationItem) => {
        const { setStation } = this.context;
        setStation(stationItem, true, true);
    }

    render() {
        return (
            <section className={styles.headerCenter}>
                <div style={{width:'50px',height:'50px'}} />
                <div className={styles.headerControls}>
                    <div className={styles.headerControlsButtons}>
                        <PreviousButton controlsCallback={this.handleButtonCallback} />
                        <PlayButton />
                        <NextButton controlsCallback={this.handleButtonCallback} />
                    </div>
                    {/* <VolumeSlider /> */}
                </div>
                <StationImage />
            </section>
        );
    }
}