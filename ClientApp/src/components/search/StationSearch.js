import React, { Component } from 'react';

export default class StationSearch extends Component {

    render() {
        return (
            <section>
                <AdvancedSearchButton />
                <SearchBar />
                <ClearSearchButton />
                <SearchResults />
            </section>
        );
    }
}