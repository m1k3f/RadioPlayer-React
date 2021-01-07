import React, { Component } from 'react';

import AdvancedSearchButton from './AdvancedSearchButton'
import ClearSearchButton from './ClearSearchButton'
import AdvancedSearchBars from '../AdvancedSearchBars'

export default class SearchBar extends Component {

    componentDidMount() {
        this.searchStationName.focus();
    }

    handleKeyUp = async (e) => {
        if (e.key === 'Enter') {
            let searchCriteria = this.getSearchCriteria();
            this.props.stationSearchCallback(searchCriteria);
        }
    }    

    getSearchCriteria = () => {
        let searchCriteria = {};
        searchCriteria.offset = 0;
        searchCriteria.limit = 10;
        searchCriteria.order = 'votes';
        searchCriteria.reverse = true;
        if (this.searchStationName.length > 0) {
            searchCriteria.name = this.searchStationName;
        }        
        // if (countrySearch.length > 0) {
        //     searchCriteria.country = countrySearch;
        // }
        // if (stateSearch.length > 0) {
        //     searchCriteria.state = stateSearch;
        // }
        // if (languageSearch.length > 0) {
        //     searchCriteria.language = languageSearch;
        // }
        // if (tagSearch.length > 0) {
        //     let tagArray = tagSearch.replace(",", "").split(" ");
        //     searchCriteria.tagList = tagArray.join(",");
        // }
        // if (codecSearch.length > 0) {
        //     searchCriteria.codec = codecSearch;
        // }
        // if (bitrateSearch.length > 0) {
        //     if (!isNaN(bitrateSearch)) {
        //         searchCriteria.bitrateMin = parseInt(bitrateSearch);
        //         searchCriteria.bitrateMax = parseInt(bitrateSearch);
        //     }            
        // }

        return searchCriteria;
    }

    render() {
        return (
            <div className="searchControlsAdvanced">                    
                <div className="searchControls">
                    <div />
                    <div>
                        <input ref={el => this.searchStationName = el} 
                            type="text" 
                            placeholder="Search by Station..."
                            onKeyUp={this.handleKeyUp} />
                        {/* <ClearSearchButton /> */}
                    </div>
                    <AdvancedSearchButton />
                </div>
                <AdvancedSearchBars />
            </div>
        );
    }
}