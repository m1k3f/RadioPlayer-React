import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';

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
            let iconStyle = {
                marginTop:'10px',
                width: '20px',
                height: '20px'
            };

            content = (
                <React.Fragment>
                    <hr />
                    <FaSpinner style={iconStyle} className="spin" />
                </React.Fragment>
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