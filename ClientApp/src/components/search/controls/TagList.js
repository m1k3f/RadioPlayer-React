import React, { Component } from 'react';

export default class TagList extends Component  {

    renderTags = () => {
        let content = null;
        let { tagList } = this.props;
        if (tagList !== null && tagList.length > 0) {
            let tagArray = tagList.split(',');
            content = tagArray.map((tag) => {
                return (
                    <span key={tag} className="searchResultItemTag">
                        {tag}
                    </span>
                );
            });
        }

        return (content);
    }

    render() {
        return (
            <p className="searchResultItemTagList">
                {this.renderTags()}
            </p>
        );
    }
}