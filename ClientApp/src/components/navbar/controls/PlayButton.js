import React, { Component } from 'react';

import RadioContext from '../../context/RadioContext';

export default class PlayButton extends Component {

    state = {
        playStation: false
    }

    static contextType = RadioContext;

    componentDidMount() {
        //video always stopped?
    }

    componentDidUpdate() {
        const { selectedStation, setStation } = this.context;

        if (!this.state.playStation && selectedStation.play && selectedStation.firstPlay) {
            //station needs to play and it is first play
            this.setState({
                playStation: true
            });
        }
    }

    handleButtonClick = (e) => {
        const { selectedStation, setStation } = this.context;
        if (this.state.playStation) {  
            setStation(selectedStation.station, false, false);
            
            this.setState({
                playStation: false
            });            
        }
        else {
            setStation(selectedStation.station, true, false);

            this.setState({
                playStation: true
            });            
        }
    }

    render() {
        let buttonImage = <i className="fas fa-play-circle fa-lg"></i>;
        if (this.state.playStation) {
            buttonImage = <i className="fas fa-pause-circle fa-lg"></i>;
        }

        return (
            <button onClick={this.handleButtonClick}>
                {buttonImage}
            </button>
        );
    }
}