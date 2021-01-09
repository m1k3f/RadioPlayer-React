import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import SearchResultItem from './SearchResultItem'
import MoreResultsButton from './controls/MoreResultsButton'

export default class SearchResults extends Component {

    state = {
        searchResults: null
    }

    static contextType = RadioContext;
    
    static getDerivedStateFromProps(props, state) {
        return {searchResults: props.results};
    }

    renderSearchResultsDiv = () => {
        const { searchResultsLoading } = this.context;
        if (searchResultsLoading) {
            return(this.renderSpinner());
        }
        else {
            return(this.renderResults());
        }
    }

    renderResults = () => {
        let content = null;
        if (this.state.searchResults !== null && this.state.searchResults.length > 0) {
            content = this.state.searchResults.map((item) => {
                return (
                    <SearchResultItem key={item.stationuuid} resultItem={item} />
                );
            });
        }

        return (
            <div className="searchResults">
                {content}
            </div>
        );
    }

    renderSpinner = () => {
        return (
            <i className="fas fa-spinner fa-spin fa-lg"></i>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderSearchResultsDiv()}
            </React.Fragment>
        );
    }
}