import React, { Component } from 'react';

import styles from './NavBarControls.module.css';

export default class SourceControlLink extends Component {

    render() {
        let iconStyle = {
            color: 'black'
        };

        return (
            <a className={styles.headerSourceLink} href="https://github.com/m1k3f/RadioPlayer-React" 
                target="_blank" rel="noopener noreferrer" title="View the Code!">
                <i className="fab fa-github fa-2x" style={iconStyle}></i>
            </a>
        );
    }
}