import React, { Component } from 'react';
import HeaderTitle from './controls/HeaderTitle'
import Controls from './Controls'
import SourceControlLink from './controls/SourceControlLink'

export default class NavBar extends Component {
    render() {
        return (
            <header>
                {/* <HeaderTitle /> */}
                <Controls />
                <SourceControlLink />
            </header>
        );
    }
}