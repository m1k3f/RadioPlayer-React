import React, { Component } from 'react';

import styles from './SearchControls.module.css';

export default class MoreResultsButton extends Component {

    state = {
        isLoading: false
    }

    handleButtonClick = async (e) => {
        this.setState({
            isLoading: true
        });

        await this.props.searchResultsCallback();

        this.setState({
            isLoading: false
        });
    }

    renderItem = () => {
        let content = null;
        if (this.state.isLoading) {
            content = (
                <i className="fas fa-spinner fa-spin" style={{fontSize:'20px',marginTop:'10px'}}></i>
            );
        }
        else {
            content = (
                <React.Fragment>
                    <hr />
                    <button className={styles.moreResultsButton} onClick={this.handleButtonClick}>
                        More Results
                    </button>
                </React.Fragment>
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