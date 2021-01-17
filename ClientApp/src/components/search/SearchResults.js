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

    handleMoreResultsCallback = () => {
        this.props.stationSearchCallback();
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
        let { searchResults } = this.state;
        if (searchResults != null && searchResults.results !== null && searchResults.results.length > 0) {            
            let itemCount = 0;
            content = searchResults.results.map((item) => {
                itemCount++;
                let limitReached = false;
                if (itemCount === searchResults.limit || 
                    (itemCount > searchResults.limit && itemCount % searchResults.limit === 0)) {
                    limitReached = true;
                }

                return (
                    <SearchResultItem key={itemCount} resultItem={item} limitReached={limitReached} />
                );
                
            });
        }

        return (
            <div className="searchResults">
                {content}
                {this.renderMoreResultsButton(content)}
            </div>
        );
    }

    renderMoreResultsButton = (content) => {
        let moreResults = null;
        if (content != null && 
            (content.length === this.state.searchResults.limit || 
            (content.length > this.state.searchResults.limit &&
            content.length % this.state.searchResults.limit === 0))) {
            moreResults = (
                <MoreResultsButton searchResultsCallback={this.handleMoreResultsCallback} />
            );
        }

        return moreResults;
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