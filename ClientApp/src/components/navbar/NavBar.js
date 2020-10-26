import React, { Component } from 'react';
import Controls from './Controls'
import SourceControlLink from './controls/SourceControlLink'

export default class NavBar extends Component {
    render() {
        return (
            <header>
                <Controls />
                <SourceControlLink />
            </header>
        );
    }
}