import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';
import styles from './NavBarControls.module.css';

export default class PlayButton extends Component {

    state = {
        showPauseButton: false
    }

    static contextType = RadioContext;

    componentDidMount() {
        //video always stopped?
    }

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
        let buttonImage = <i className="fas fa-play-circle fa-lg"></i>;
        if (stationPlayLoading) {
            buttonImage = <i className="fas fa-spinner fa-spin"></i>;
        }
        else if (this.state.showPauseButton) {
            buttonImage = <i className="fas fa-pause-circle fa-lg"></i>;
        }

        return (
            <button className={styles.headerControlsButton} onClick={this.handleButtonClick}>
                {buttonImage}
            </button>
        );
    }
}