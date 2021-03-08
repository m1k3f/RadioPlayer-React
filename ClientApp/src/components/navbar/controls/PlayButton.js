import React, { Component } from 'react';
import { FaPlayCircle, FaPauseCircle, FaSpinner } from 'react-icons/fa';

import RadioContext from '../../context/RadioContext';
import styles from './NavBarControls.module.css';

export default class PlayButton extends Component {

    state = {
        showPauseButton: false
    }

    static contextType = RadioContext;

    componentDidUpdate() {
        const { selectedStation } = this.context;

        if (!this.state.showPauseButton && selectedStation.play && selectedStation.firstPlay) {
            //station needs to play and it is first play
            this.setState({
                showPauseButton: true
            });
        }
        else if (this.state.showPauseButton && !selectedStation.play) {
            //station stopped playing
            this.setState({
                showPauseButton: false
            });
        }
    }

    handleButtonClick = (e) => {
        const { selectedStation, setStation } = this.context;
        if (this.state.showPauseButton) {  
            setStation(selectedStation.station, false, false);
            
            this.setState({
                showPauseButton: false
            });            
        }
        else {
            setStation(selectedStation.station, true, false);

            this.setState({
                showPauseButton: true
            });            
        }
    }

    render() {
        const { stationPlayLoading } = this.context;
        let iconStyle = {
            width: '40px',
            height: '40px'
        };

        let buttonImage = <FaPlayCircle style={iconStyle} />
        if (stationPlayLoading) {
            buttonImage = <FaSpinner style={iconStyle} className="spin" />
        }
        else if (this.state.showPauseButton) {
            buttonImage = <FaPauseCircle style={iconStyle} />
        }

        return (
            <button className={styles.headerControlsButton} onClick={this.handleButtonClick}>
                {buttonImage}
            </button>
        );
    }
}