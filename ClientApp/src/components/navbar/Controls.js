import React, { Component } from 'react';
import PreviousButton from './controls/PreviousButton'
import PlayButton from './controls/PlayButton'
import NextButton from './controls/NextButton'
import VolumeSlider from './controls/VolumeSlider'

export default class Controls extends Component {
    render() {
        return (
            <section>
                {/* <StationImage /> */}
                <div>
                    <PreviousButton />
                    <PlayButton />
                    <NextButton />
                </div>
                <VolumeSlider />
            </section>
        );
    }
}