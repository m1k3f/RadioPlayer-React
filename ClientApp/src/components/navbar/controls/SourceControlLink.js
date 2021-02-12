import React, { Component } from 'react';

export default class SourceControlLink extends Component {

    render() {
        return (
            <a href="https://github.com/m1k3f/RadioPlayer-React" target="_blank" rel="noopener noreferrer"
                title="View the Code!">
                <i className="fab fa-github fa-2x"></i>
            </a>
        );
    }
}