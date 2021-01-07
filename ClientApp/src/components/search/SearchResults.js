import React, { Component } from 'react';
import SearchResultItem from './SearchResultItem'
import MoreResultsButton from './controls/MoreResultsButton'

export default class SearchResults extends Component {

    renderSearchItems = () => {
        let content = null;
        let items = this.props.results;
        if (items !== null && items.length > 0) {
            content = items.map((item) => {
                return (
                    <SearchResultItem resultItem={item} />
                );
            });
        }

        return (
            <div className="searchResults">
                {content}
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderSearchItems()}
            </React.Fragment>
        );
    }
}