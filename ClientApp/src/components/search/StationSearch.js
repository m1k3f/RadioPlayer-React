import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import SearchBar from './controls/SearchBar'
import SearchResults from './SearchResults'

export default class StationSearch extends Component {

    state = {
        searchResults: null
    }

    static contextType = RadioContext;

    handleSearchBarCallback = async (searchFields) => {
        const { setSearchResultsLoading } = this.context;
        setSearchResultsLoading(true);

        let searchCriteria = this.getSearchCriteria(searchFields);
        let results = await this.getSearchResults(searchCriteria);

        this.setState(
            {
                searchResults: results
            },
            () => {
                const { setSearchResultsLoading } = this.context;
                setSearchResultsLoading(false);
            }
        );        
    }

    getSearchCriteria = (searchFields) => {
        let searchCriteria = {};
        searchCriteria.offset = 0;
        searchCriteria.limit = 10;
        searchCriteria.order = 'votes';
        searchCriteria.reverse = true;
        if (searchFields.stationName.length > 0) {
            searchCriteria.name = searchFields.stationName;
        }        
        if (searchFields.country.length > 0) {
            searchCriteria.country = searchFields.country;
        }
        if (searchFields.state.length > 0) {
            searchCriteria.state = searchFields.state;
        }
        if (searchFields.language.length > 0) {
            searchCriteria.language = searchFields.language;
        }
        if (searchFields.tagList.length > 0) {
            let tagArray = searchFields.tagList.replace(",", "").split(" ");
            searchCriteria.tagList = tagArray.join(",");
        }
        if (searchFields.codec.length > 0) {
            searchCriteria.codec = searchFields.codec;
        }
        if (searchFields.bitrate.length > 0) {
            if (!isNaN(this.searchBitrate.value)) {
                searchCriteria.bitrateMin = parseInt(searchFields.bitrate);
                searchCriteria.bitrateMax = parseInt(searchFields.bitrate);
            }            
        }        

        return searchCriteria;
    }

    getSearchResults = async (searchCriteria) => {
        let request = new Request('api/radio/searchStations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(searchCriteria)
        });

        //send request to service
        let serviceResultsObject = await fetch(request).then((response) => response.json());

        if (serviceResultsObject.serviceError === null && serviceResultsObject.stationList != null &&
            serviceResultsObject.stationList.length > 0) {
                return serviceResultsObject.stationList;
            }
        else {
            return null;
        }
    }

    render() {
        return (
            <section className="stationSearch">
                <SearchBar stationSearchCallback={this.handleSearchBarCallback} />
                <SearchResults results={this.state.searchResults} />
            </section>
        );
    }
}