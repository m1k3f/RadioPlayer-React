import React, { Component } from 'react';

import SearchBar from './controls/SearchBar'
import SearchResults from './SearchResults'

export default class StationSearch extends Component {

    state = {
        searchResults: null
    }

    handleSearchBarCallback = (searchCriteria) => {

    }

    getSearchResults = async () => {
        let advancedSearch = this.getSearchObject();

        let request = new Request('api/radio/searchStations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(advancedSearch)
        });

        //send request to service
        let serviceResultsObject = await fetch(request).then((response) => response.json());

    }

    render() {
        return (
            <section className="stationSearch">
                <SearchBar stationSearchCallback={this.handleSearchBarCallback()} />
                <SearchResults results={this.state.searchResults} />
            </section>
        );
    }
}