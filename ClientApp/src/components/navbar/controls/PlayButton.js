import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';
import styles from './NavBarControls.module.css';

export default class PlayButton extends Component {

    state = {
        showPlayButton: false
    }

    static contextType = RadioContext;

    componentDidMount() {
        //video always stopped?
    }

    componentDidUpdate() {
        const { selectedStation } = this.context;

        if (!this.state.showPlayButton && selectedStation.play && selectedStation.firstPlay) {
            //station needs to play and it is first play
            this.setState({
                showPlayButton: true
            });
        }
    }

    handleButtonClick = (e) => {
        const { selectedStation, setStation } = this.context;
        if (this.state.showPlayButton) {  
            setStation(selectedStation.station, false, false);
            
            this.setState({
                showPlayButton: false
            });            
        }
        else {
            setStation(selectedStation.station, true, false);

            this.setState({
                showPlayButton: true
            });            
        }
    }

    render() {
        let buttonImage = <i className="fas fa-play-circle fa-lg"></i>;
        if (this.state.showPlayButton) {
            buttonImage = <i className="fas fa-pause-circle fa-lg"></i>;
        }

        return (
            <button className={styles.headerControlsButton} onClick={this.handleButtonClick}>
                {buttonImage}
            </button>
        );
    }
}