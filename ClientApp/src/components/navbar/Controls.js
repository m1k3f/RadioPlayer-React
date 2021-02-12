import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import PreviousButton from './controls/PreviousButton'
import PlayButton from './controls/PlayButton'
import NextButton from './controls/NextButton'
import VolumeSlider from './controls/VolumeSlider'
import StationImage from './controls/StationImage';

export default class Controls extends Component {

    static contextType = RadioContext;

    handleButtonCallback = async (stationItem) => {
        const { setStation } = this.context;
        setStation(stationItem, true, true);
    }

    render() {
        return (
            <section>
                <div style={{width:'50px',height:'50px'}} />
                <div className="headerControls">
                    <div>
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