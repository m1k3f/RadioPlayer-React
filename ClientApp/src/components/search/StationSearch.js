import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import SearchBar from './controls/SearchBar'
import SearchResults from './SearchResults'

export default class StationSearch extends Component {

    state = {
        searchResults: null
    }

    static contextType = RadioContext;

    handleSearchBarCallback = async (searchCriteria) => {
        let results = await this.getSearchResults(searchCriteria);

        const { setSearchResultsLoading } = this.context;
        setSearchResultsLoading(false);

        this.setState({
            searchResults: results
        });
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