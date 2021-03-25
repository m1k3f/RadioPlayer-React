import React, { Component } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaTimesCircle } from 'react-icons/fa';

import RadioContext from '../context/RadioContext';
import styles from './Search.module.css';

export default class SearchBar extends Component {

    state = {
        showAdvanced: false
    }
    
    static contextType = RadioContext;

    componentDidMount() {
        this.searchStationName.focus();
    }

    handleKeyUp = async (e) => {
        if (e.key === 'Enter') {
            let searchFields = this.getSearchFields();
            this.props.stationSearchCallback(searchFields);
        }
    }

    handleSearchButtonClick = async (e) => {
        let searchFields = this.getSearchFields();
        this.props.stationSearchCallback(searchFields);
    }

    getSearchFields = () => {
        let searchFields = {};
        if (this.state.showAdvanced) {
            searchFields = {
                stationName: this.searchStationName.value,
                country: this.searchCountry.value,
                state: this.searchState.value,
                language: this.searchLanguage.value,
                tagList: this.searchTagList.value,
                codec: this.searchCodec.value,
                bitrate: this.searchBitrate.value
            };
        }
        else {
            searchFields = {
                stationName: this.searchStationName.value,
                country: '',
                state: '',
                language: '',
                tagList: '',
                codec: '',
                bitrate: ''
            }
        }

        return searchFields;
    }

    handleClearButtonClick = (e) => {
        this.searchStationName.value = '';
        if (this.state.showAdvanced) {
            this.searchCountry.value = '';
            this.searchState.value = '';
            this.searchLanguage.value = '';
            this.searchTagList.value = '';
            this.searchCodec.value = '';
            this.searchBitrate.value = '';
        }

        this.props.stationSearchCallback(null);
    }

    handleExpandButtonClick = (e) => {
        if (this.state.showAdvanced) {
            this.setState({
                showAdvanced: false
            });
        }
        else {
            this.setState({
                showAdvanced: true
            });
        }
    }    

    renderAdvanced = () => {
        let content = null;
        if (this.state.showAdvanced) {
            content = (                
                <div className={styles.searchAdvanced}>
                    <div className={styles.searchAdvancedRow}>
                        <input className={styles.searchAdvancedItem} type="text" placeholder="Country..." 
                                onKeyUp={this.handleKeyUp} ref={el => this.searchCountry = el} />
                        <input className={styles.searchAdvancedItem} type="text" placeholder="State..." 
                                onKeyUp={this.handleKeyUp} ref={el => this.searchState = el} />
                        <input className={styles.searchAdvancedItem} type="text" placeholder="Language..." 
                                onKeyUp={this.handleKeyUp} ref={el => this.searchLanguage = el} />
                    </div>
                    <div className={styles.searchAdvancedRow}>
                        <input className={styles.searchAdvancedItem} type="text" placeholder="Tag List..." 
                                onKeyUp={this.handleKeyUp}  ref={el => this.searchTagList = el} />
                        <input className={styles.searchAdvancedItem} type="text" placeholder="Codec..." 
                                onKeyUp={this.handleKeyUp} ref={el => this.searchCodec = el} />
                        <input className={styles.searchAdvancedItem} type="text" placeholder="Kbps..." 
                                onKeyUp={this.handleKeyUp} ref={el => this.searchBitrate = el} />
                    </div>
                </div>
            );
        }

        return (content);
    }

    render() {
        let iconStyle = {
            width: '18px',
            height: '18px'
        };

        let advancedIcon = (this.state.showAdvanced) ?
                                <FaChevronUp style={iconStyle} /> :
                                <FaChevronDown style={iconStyle} />;

        return (
            <div className={styles.searchControlsAdvanced}>                    
                <div className={styles.searchControls}>
                    <div className={styles.controlItem} />
                    <div className={styles.controlItem}>
                        <input className={styles.searchControlsInput} 
                            ref={el => this.searchStationName = el} 
                            type="text" 
                            placeholder="Search by Station Name..."
                            onKeyUp={this.handleKeyUp} />                        
                        <button className={styles.iconButton} title="Search"
                                onClick={this.handleSearchButtonClick}>
                            <FaSearch style={iconStyle} />
                        </button>
                        <button className={styles.iconButton} title="Clear Search"
                                onClick={this.handleClearButtonClick}>
                            <FaTimesCircle style={iconStyle} />
                        </button>
                    </div>
                    <div className={styles.controlItem} title="Advanced Search Options">
                        <button className={styles.iconButton} onClick={this.handleExpandButtonClick} 
                                style={{paddingLeft: '8px', paddingRight: '10px'}}>
                            {advancedIcon}
                        </button>
                    </div>
                </div>
                {this.renderAdvanced()}
            </div>
        );
    }
}