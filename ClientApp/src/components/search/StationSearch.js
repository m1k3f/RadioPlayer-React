import React, { Component } from 'react';

import SearchBar from './controls/SearchBar'
import SearchResults from './SearchResults'

export default class StationSearch extends Component {

    state = {
        searchResults: null
    }

    handleSearchBarCallback = async (searchCriteria) => {
        let results = await this.getSearchResults(searchCriteria);

        this.setState({
            searchResults: results
        });
    }

    getSearchResults = async (searchCriteria) => {
        return [];
        // let request = new Request('api/radio/searchStations', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },                    
        //     body: JSON.stringify(searchCriteria)
        // });

        //send request to service
        //let serviceResultsObject = await fetch(request).then((response) => response.json());

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