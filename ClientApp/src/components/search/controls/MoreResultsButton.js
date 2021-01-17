import React, { Component } from 'react';

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
        // this.setState({
        //     isLoading: true
        // });

        this.props.searchResultsCallback();

        // this.setState({
        //     isLoading: false
        // });
    }

    render() {
        let buttonContent = (this.state.isLoading) ? <i className="fas fa-spinner fa-spin"></i> : 'More Results';
        return (
            <button onClick={this.handleButtonClick}>
                {buttonContent}
            </button>
        );
    }
}