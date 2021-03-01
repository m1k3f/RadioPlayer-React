import React, { Component } from 'react';

import RadioContext from '../context/RadioContext';
import SearchResultItem from './SearchResultItem'
import MoreResultsButton from './controls/MoreResultsButton'
import styles from './Search.module.css';

export default class SearchResults extends Component {

    state = {
        searchResults: null
    }

    static contextType = RadioContext;
    
    static getDerivedStateFromProps(props, state) {
        return {searchResults: props.results};
    }

    handleMoreResultsCallback = async () => {
        await this.props.stationSearchCallback();
    }

    isResultItemDuplicate = (resultItem) => {
        let isDuplicate = false;
        if (resultItem !== null) {
            const { radioPlaylist } = this.context;
            let selectedIndex = radioPlaylist.playlist.findIndex((station) => 
                station.stationuuid === resultItem.stationuuid
            );

            if (selectedIndex > -1) {
                isDuplicate = true;
            }
        }

        return isDuplicate;
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
                let isDuplicate = this.isResultItemDuplicate(item);
                itemCount++;                

                return (
                    <SearchResultItem key={itemCount} resultItem={item} duplicate={isDuplicate} />                    
                );
                
            });
        }

        return (
            <div className={styles.searchResults}>
                <div className={styles.searchResultItems}>
                    {content}
                </div>
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
            <div style={{marginTop:'20px'}}>
                <i className="fas fa-spinner fa-spin fa-lg"></i>
            </div>
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