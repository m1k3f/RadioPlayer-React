import React, { Component } from 'react';

import styles from './SearchControls.module.css';

export default class MoreResultsButton extends Component {

    state = {
        isLoading: false
    }

    // componentDidUpdate() {
    //     if (this.state.isLoading) {
    //         this.props.searchResultsCallback();

    //         this.setState({
    //             isLoading: false
    //         });
    //     }
    // }

    handleButtonClick = (e) => {
        this.setState({
            isLoading: true
        });

        this.props.searchResultsCallback();

        this.setState({
            isLoading: false
        });
    }

    renderItem = () => {
        let content = null;
        if (this.state.isLoading) {
            content = (
                <i className="fas fa-spinner fa-spin"></i>
            );
        }
        else {
            content = (
                <button className={styles.moreResultsButton} onClick={this.handleButtonClick}>
                    More Results
                </button>
            );
        }

        return (content);
    }

    render() {        
        return (
            <div className={styles.moreResults}>
                {this.renderItem()}
            </div>
        );
    }
}