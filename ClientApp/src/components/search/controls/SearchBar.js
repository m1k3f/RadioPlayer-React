import React, { Component } from 'react';

import AdvancedSearchButton from './AdvancedSearchButton'
import ClearSearchButton from './ClearSearchButton'
import AdvancedSearchBars from '../AdvancedSearchBars'

export default class SearchBar extends Component {

    state = {
        showAdvanced: false
    }

    componentDidMount() {
        this.searchStationName.focus();
    }

    handleKeyUp = async (e) => {
        if (e.key === 'Enter') {
            let searchCriteria = this.getSearchCriteria();
            this.props.stationSearchCallback(searchCriteria);
        }
    }

    handleSearchButtonClick = async (e) => {
        let searchCriteria = this.getSearchCriteria();
        this.props.stationSearchCallback(searchCriteria);
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

    getSearchCriteria = () => {
        let searchCriteria = {};
        searchCriteria.offset = 0;
        searchCriteria.limit = 10;
        searchCriteria.order = 'votes';
        searchCriteria.reverse = true;
        if (this.searchStationName.value.length > 0) {
            searchCriteria.name = this.searchStationName.value;
        }

        if (this.state.showAdvanced) {
            if (this.searchCountry.value.length > 0) {
                searchCriteria.country = this.searchCountry.value;
            }
            if (this.searchState.value.length > 0) {
                searchCriteria.state = this.searchState.value;
            }
            if (this.searchLanguage.value.length > 0) {
                searchCriteria.language = this.searchLanguage.value;
            }
            if (this.searchTagList.value.length > 0) {
                let tagArray = this.searchTagList.value.replace(",", "").split(" ");
                searchCriteria.tagList = tagArray.join(",");
            }
            if (this.searchCodec.value.length > 0) {
                searchCriteria.codec = this.searchCodec.value;
            }
            if (this.searchBitrate.value.length > 0) {
                if (!isNaN(this.searchBitrate.value)) {
                    searchCriteria.bitrateMin = parseInt(this.searchBitrate.value);
                    searchCriteria.bitrateMax = parseInt(this.searchBitrate.value);
                }            
            }
        }

        return searchCriteria;
    }

    renderAdvanced = () => {
        let content = null;
        if (this.state.showAdvanced) {
            content = (                
                <div className="searchAdvanced">
                    <div>
                        <input type="text" placeholder="Country..." 
                                onKeyUp={this.handleKeyUp} ref={el => this.searchCountry = el} />
                        <input type="text" placeholder="State..." 
                                onKeyUp={this.handleKeyUp} ref={el => this.searchState = el} />
                        <input type="text" placeholder="Language..." 
                                onKeyUp={this.handleKeyUp} ref={el => this.searchLanguage = el} />
                    </div>
                    <div>
                        <input type="text" placeholder="Tag List..." 
                                onKeyUp={this.handleKeyUp}  ref={el => this.searchTagList = el} />
                        <input type="text" placeholder="Codec..." 
                                onKeyUp={this.handleKeyUp} ref={el => this.searchCodec = el} />
                        <input type="text" placeholder="Kbps..." 
                                onKeyUp={this.handleKeyUp} ref={el => this.searchBitrate = el} />
                    </div>
                </div>
            );
        }

        return (content);
    }

    render() {
        let expandButtonClass = (this.state.showAdvanced) ? 
                                'fas fa-chevron-circle-up fa-lg' : 
                                'fas fa-chevron-circle-down fa-lg';

        return (
            <div className="searchControlsAdvanced">                    
                <div className="searchControls">
                    <div className="controlItem" />
                    <div className="controlItem">
                        <input ref={el => this.searchStationName = el} 
                            type="text" 
                            placeholder="Search by Station..."
                            onKeyUp={this.handleKeyUp} />
                        {/* <ClearSearchButton /> */}
                        <button onClick={this.handleSearchButtonClick}>
                            <i className="fas fa-search fa-lg"></i>
                        </button>
                    </div>
                    {/* <AdvancedSearchButton /> */}
                    <div className="controlItem">
                        <button onClick={this.handleExpandButtonClick} style={{padding: '8px'}}>
                            <i className={expandButtonClass}></i>
                        </button>
                    </div>
                </div>
                {/* <AdvancedSearchBars /> */}
                {this.renderAdvanced()}
            </div>
        );
    }
}