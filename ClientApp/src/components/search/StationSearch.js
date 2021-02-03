import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import SearchBar from './controls/SearchBar'
import SearchResults from './SearchResults'

export default class StationSearch extends Component {

    state = {
        searchResults: {
            offset: 0,
            limit: 10,
            results: null
        }
    }

    static contextType = RadioContext;

    searchFields = null;

    handleSearchBarCallback = async (searchFields) => {
        if (searchFields !== null) {
            const { setSearchResultsLoading } = this.context;
            setSearchResultsLoading(true);

            this.searchFields = searchFields;

            let offset = 0;
            let limit = 10;
            let searchCriteria = this.getSearchCriteria(searchFields, offset, limit);
            let results = await this.getSearchResults(searchCriteria);
            
            this.setState(
                {
                    searchResults: {
                        offset: offset,
                        limit: limit,
                        results: results
                    }
                },
                () => {
                    const { setSearchResultsLoading } = this.context;
                    setSearchResultsLoading(false);
                }
            );
        }
        else {
            this.setState(
            {
                searchResults: {
                    offset: 0,
                    limit: 10,
                    results: null
                }
            });

        }
    }

    handleSearchResultsCallback = async () => {
        let newOffset = this.state.searchResults.offset + this.state.searchResults.limit;
        let limit = this.state.searchResults.limit;
        let searchCriteria = this.getSearchCriteria(this.searchFields, newOffset, limit);
        let newResultSet = await this.getSearchResults(searchCriteria);

        let newResults = this.state.searchResults.results.concat(newResultSet);

        this.setState({
            searchResults: {
                offset: newOffset,
                limit: limit,
                results: newResults
            }
        })
    }

    getSearchCriteria = (searchFields, offset, limit) => {
        let searchCriteria = {};
        searchCriteria.offset = offset;
        searchCriteria.limit = limit;
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
                <SearchResults results={this.state.searchResults}
                                stationSearchCallback={this.handleSearchResultsCallback} />
            </section>
        );
    }
}