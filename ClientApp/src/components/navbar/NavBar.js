import React, { Component } from 'react';

import Controls from './Controls';
import SourceControlLink from './controls/SourceControlLink';
import styles from './NavBar.module.css';

export default class NavBar extends Component {
    render() {
        return (
            <header className={styles.header}>
                {/* <HeaderTitle /> */}
                <Controls />
                <SourceControlLink />
            </header>
        );
    }
}