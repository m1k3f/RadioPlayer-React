import React, { Component } from 'react';
import PreviousButton from './controls/PreviousButton'
import PlayButton from './controls/PlayButton'
import NextButton from './controls/NextButton'
import VolumeSlider from './controls/VolumeSlider'
import StationImage from './controls/StationImage';

export default class Controls extends Component {
    render() {
        return (
            <section>
                <StationImage />
                <div className="headerControls">
                    <div>
                        <PreviousButton />
                        <PlayButton />
                        <NextButton />
                    </div>
                    <VolumeSlider />
                </div>
            </section>
        );
    }
}