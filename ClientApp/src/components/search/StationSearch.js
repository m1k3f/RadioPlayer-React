import React, { Component } from 'react';
import AdvancedSearchButton from './controls/AdvancedSearchButton'
import SearchBar from './controls/SearchBar'
import ClearSearchButton from './controls/ClearSearchButton'
import AdvancedSearchBars from './AdvancedSearchBars'
import SearchResults from './SearchResults'

export default class StationSearch extends Component {

    render() {
        return (
            <section>
                <AdvancedSearchButton />
                <SearchBar />
                <ClearSearchButton />
                <AdvancedSearchBars />
                <SearchResults />
            </section>
        );
    }
}